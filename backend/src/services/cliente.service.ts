/**
 * Service de Cliente
 */

import { StatusCliente } from '@prisma/client';
import prisma from '@config/database';
import { hashPassword } from '@utils/bcrypt';
import { NotFoundError, ConflictError } from '@utils/errors';
import { createPaginatedResponse, calculateOffset } from '@utils/pagination';
import {
  CreateClienteData,
  UpdateClienteData,
  ClienteFilters,
  PaginationParams,
  PaginatedResponse,
  ClienteWithCounts,
} from '@types';

class ClienteService {
  /**
   * Lista clientes com paginação e filtros
   */
  async list(
    filters: ClienteFilters = {},
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<ClienteWithCounts>> {
    const { page = 1, limit = 10, orderBy = 'createdAt', order = 'desc' } = pagination;
    const { search, status, cidade, estado, createdAfter, createdBefore } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { sobrenome: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { cpf: { contains: search } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (cidade) {
      where.cidade = { equals: cidade, mode: 'insensitive' };
    }

    if (estado) {
      where.estado = estado;
    }

    if (createdAfter || createdBefore) {
      where.createdAt = {};
      if (createdAfter) {
        where.createdAt.gte = new Date(createdAfter);
      }
      if (createdBefore) {
        where.createdAt.lte = new Date(createdBefore);
      }
    }

    const [clientes, total] = await Promise.all([
      prisma.cliente.findMany({
        where,
        skip: calculateOffset(page, limit),
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          _count: {
            select: {
              veiculos: true,
              revisoes: true,
              recomendacoes: true,
            },
          },
        },
      }),
      prisma.cliente.count({ where }),
    ]);

    return createPaginatedResponse(clientes, page, limit, total);
  }

  /**
   * Busca cliente por ID
   */
  async findById(id: number): Promise<ClienteWithCounts> {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            veiculos: true,
            revisoes: true,
            recomendacoes: true,
          },
        },
      },
    });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    return cliente;
  }

  /**
   * Cria novo cliente
   */
  async create(data: CreateClienteData): Promise<ClienteWithCounts> {
    const { email, senha, cpf, ...clienteData } = data;

    // Verifica duplicatas
    const [existingUser, existingCliente] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.cliente.findUnique({ where: { cpf } }),
    ]);

    if (existingUser) {
      throw new ConflictError('Email já cadastrado');
    }

    if (existingCliente) {
      throw new ConflictError('CPF já cadastrado');
    }

    const senhaHash = await hashPassword(senha);

    const cliente = await prisma.cliente.create({
      data: {
        ...clienteData,
        email,
        cpf,
        user: {
          create: {
            email,
            senha: senhaHash,
            role: 'CLIENTE',
          },
        },
      },
      include: {
        _count: {
          select: {
            veiculos: true,
            revisoes: true,
            recomendacoes: true,
          },
        },
      },
    });

    return cliente;
  }

  /**
   * Atualiza cliente
   */
  async update(id: number, data: UpdateClienteData): Promise<ClienteWithCounts> {
    const cliente = await prisma.cliente.findUnique({ where: { id } });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    const updated = await prisma.cliente.update({
      where: { id },
      data,
      include: {
        _count: {
          select: {
            veiculos: true,
            revisoes: true,
            recomendacoes: true,
          },
        },
      },
    });

    return updated;
  }

  /**
   * Deleta cliente
   */
  async delete(id: number): Promise<void> {
    const cliente = await prisma.cliente.findUnique({ where: { id } });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    await prisma.cliente.delete({ where: { id } });
  }

  /**
   * Atualiza status do cliente
   */
  async updateStatus(id: number, status: StatusCliente): Promise<ClienteWithCounts> {
    return this.update(id, { status });
  }

  /**
   * Busca estatísticas do cliente
   */
  async getStatistics(id: number) {
    const cliente = await this.findById(id);

    const [
      totalVeiculos,
      totalRevisoes,
      totalRecomendacoes,
      revisoesConcluidas,
      revisoesAgendadas,
      recomendacoesPendentes,
    ] = await Promise.all([
      prisma.veiculo.count({ where: { clienteId: id } }),
      prisma.revisao.count({ where: { clienteId: id } }),
      prisma.recomendacao.count({ where: { clienteId: id } }),
      prisma.revisao.count({ where: { clienteId: id, status: 'CONCLUIDA' } }),
      prisma.revisao.count({ where: { clienteId: id, status: 'AGENDADA' } }),
      prisma.recomendacao.count({ where: { clienteId: id, status: 'PENDENTE' } }),
    ]);

    return {
      cliente: {
        id: cliente.id,
        nome: `${cliente.nome} ${cliente.sobrenome}`,
        email: cliente.email,
        status: cliente.status,
      },
      statistics: {
        totalVeiculos,
        totalRevisoes,
        totalRecomendacoes,
        revisoesConcluidas,
        revisoesAgendadas,
        recomendacoesPendentes,
      },
    };
  }
}

export default new ClienteService();
