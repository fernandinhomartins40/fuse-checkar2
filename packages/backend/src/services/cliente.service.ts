import prisma from '@/config/database';
import logger from '@/config/logger';
import { NotFoundError, ConflictError, BadRequestError } from '@/utils/errors';
import { paginateQuery, type PaginationParams, type PaginationResult } from '@/utils/pagination';
import { Cliente, StatusCliente } from '@prisma/client';

/**
 * Dados para criação de cliente
 */
export interface CreateClienteData {
  // Informações Pessoais
  nome: string;
  sobrenome: string;
  cpf: string;
  rg?: string;
  dataNascimento?: Date;
  profissao?: string;

  // Informações de Contato
  email: string;
  telefone: string;
  telefone2?: string;
  whatsapp?: string;

  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pais?: string;

  // Preferências
  notificacoesEmail?: boolean;
  notificacoesSms?: boolean;
  newsletter?: boolean;
}

/**
 * Dados para atualização de cliente
 */
export interface UpdateClienteData extends Partial<CreateClienteData> {
  status?: StatusCliente;
}

/**
 * Filtros de busca de clientes
 */
export interface ClienteFilters {
  search?: string;
  status?: StatusCliente;
  cidade?: string;
  estado?: string;
}

/**
 * Service de clientes
 * Gerencia operações CRUD de clientes
 */
class ClienteService {
  /**
   * Listar clientes com paginação e filtros
   *
   * @param params - Parâmetros de paginação
   * @param filters - Filtros de busca
   * @returns Lista paginada de clientes
   *
   * @example
   * ```ts
   * const result = await clienteService.list(
   *   { page: 1, limit: 10, sortBy: 'nome', sortOrder: 'asc' },
   *   { status: 'ATIVO', search: 'João' }
   * );
   * ```
   */
  async list(
    params: PaginationParams,
    filters?: ClienteFilters
  ): Promise<PaginationResult<Cliente>> {
    logger.info('Listing clientes with filters:', filters);

    // Construir where clause
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.cidade) {
      where.cidade = { contains: filters.cidade, mode: 'insensitive' };
    }

    if (filters?.estado) {
      where.estado = filters.estado;
    }

    if (filters?.search) {
      where.OR = [
        { nome: { contains: filters.search, mode: 'insensitive' } },
        { sobrenome: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { cpf: { contains: filters.search } },
        { telefone: { contains: filters.search } },
      ];
    }

    const result = await paginateQuery<Cliente>(
      prisma.cliente,
      params,
      where,
      {
        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
            lastLogin: true,
          },
        },
      }
    );

    logger.info(`Found ${result.meta.total} clientes`);
    return result;
  }

  /**
   * Buscar cliente por ID
   *
   * @param id - ID do cliente
   * @returns Cliente encontrado
   * @throws NotFoundError se cliente não for encontrado
   *
   * @example
   * ```ts
   * const cliente = await clienteService.getById(1);
   * ```
   */
  async getById(id: number): Promise<Cliente> {
    logger.info(`Fetching cliente with ID: ${id}`);

    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
            emailVerified: true,
            lastLogin: true,
            createdAt: true,
          },
        },
        veiculos: {
          where: { status: { not: 'VENDIDO' } },
          orderBy: { createdAt: 'desc' },
        },
        revisoes: {
          take: 5,
          orderBy: { dataRevisao: 'desc' },
          include: {
            veiculo: {
              select: {
                marca: true,
                modelo: true,
                placa: true,
              },
            },
          },
        },
      },
    });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    logger.info(`Cliente found: ${cliente.nome} ${cliente.sobrenome}`);
    return cliente as any;
  }

  /**
   * Buscar cliente por CPF
   *
   * @param cpf - CPF do cliente
   * @returns Cliente encontrado ou null
   *
   * @example
   * ```ts
   * const cliente = await clienteService.getByCpf('123.456.789-00');
   * ```
   */
  async getByCpf(cpf: string): Promise<Cliente | null> {
    logger.info(`Fetching cliente with CPF: ${cpf}`);

    const cliente = await prisma.cliente.findUnique({
      where: { cpf },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
          },
        },
      },
    });

    return cliente as any;
  }

  /**
   * Buscar cliente por email
   *
   * @param email - Email do cliente
   * @returns Cliente encontrado ou null
   *
   * @example
   * ```ts
   * const cliente = await clienteService.getByEmail('cliente@example.com');
   * ```
   */
  async getByEmail(email: string): Promise<Cliente | null> {
    logger.info(`Fetching cliente with email: ${email}`);

    const cliente = await prisma.cliente.findUnique({
      where: { email },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
          },
        },
      },
    });

    return cliente as any;
  }

  /**
   * Criar novo cliente
   *
   * @param data - Dados do cliente
   * @param userId - ID do usuário associado (opcional)
   * @returns Cliente criado
   *
   * @example
   * ```ts
   * const cliente = await clienteService.create({
   *   nome: 'João',
   *   sobrenome: 'Silva',
   *   cpf: '123.456.789-00',
   *   email: 'joao@example.com',
   *   telefone: '(11) 98765-4321'
   * });
   * ```
   */
  async create(data: CreateClienteData, userId?: number): Promise<Cliente> {
    logger.info(`Creating new cliente: ${data.email}`);

    // Verificar se CPF já existe
    const existingCpf = await prisma.cliente.findUnique({
      where: { cpf: data.cpf },
    });

    if (existingCpf) {
      throw new ConflictError('CPF já cadastrado');
    }

    // Verificar se email já existe
    const existingEmail = await prisma.cliente.findUnique({
      where: { email: data.email },
    });

    if (existingEmail) {
      throw new ConflictError('Email já cadastrado');
    }

    // Se userId não foi fornecido, precisamos criar um usuário
    if (!userId) {
      throw new BadRequestError('userId é obrigatório para criar cliente');
    }

    const cliente = await prisma.cliente.create({
      data: {
        userId,
        nome: data.nome,
        sobrenome: data.sobrenome,
        cpf: data.cpf,
        rg: data.rg,
        dataNascimento: data.dataNascimento,
        profissao: data.profissao,
        email: data.email,
        telefone: data.telefone,
        telefone2: data.telefone2,
        whatsapp: data.whatsapp,
        cep: data.cep,
        endereco: data.endereco,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        pais: data.pais,
        notificacoesEmail: data.notificacoesEmail ?? true,
        notificacoesSms: data.notificacoesSms ?? false,
        newsletter: data.newsletter ?? true,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
          },
        },
      },
    });

    logger.info(`Cliente created successfully: ${cliente.nome} ${cliente.sobrenome}`);
    return cliente as any;
  }

  /**
   * Atualizar cliente
   *
   * @param id - ID do cliente
   * @param data - Dados a serem atualizados
   * @returns Cliente atualizado
   * @throws NotFoundError se cliente não for encontrado
   *
   * @example
   * ```ts
   * const cliente = await clienteService.update(1, {
   *   telefone: '(11) 99999-9999',
   *   status: 'ATIVO'
   * });
   * ```
   */
  async update(id: number, data: UpdateClienteData): Promise<Cliente> {
    logger.info(`Updating cliente with ID: ${id}`);

    // Verificar se cliente existe
    const existing = await prisma.cliente.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Cliente não encontrado');
    }

    // Se está atualizando CPF, verificar se já existe
    if (data.cpf && data.cpf !== existing.cpf) {
      const existingCpf = await prisma.cliente.findUnique({
        where: { cpf: data.cpf },
      });

      if (existingCpf) {
        throw new ConflictError('CPF já cadastrado');
      }
    }

    // Se está atualizando email, verificar se já existe
    if (data.email && data.email !== existing.email) {
      const existingEmail = await prisma.cliente.findUnique({
        where: { email: data.email },
      });

      if (existingEmail) {
        throw new ConflictError('Email já cadastrado');
      }
    }

    const cliente = await prisma.cliente.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
          },
        },
      },
    });

    logger.info(`Cliente updated successfully: ${cliente.nome} ${cliente.sobrenome}`);
    return cliente as any;
  }

  /**
   * Deletar cliente (soft delete - marcar como INATIVO)
   *
   * @param id - ID do cliente
   *
   * @example
   * ```ts
   * await clienteService.delete(1);
   * ```
   */
  async delete(id: number): Promise<void> {
    logger.info(`Deleting cliente with ID: ${id}`);

    const cliente = await prisma.cliente.findUnique({ where: { id } });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    // Soft delete - marcar como inativo
    await prisma.cliente.update({
      where: { id },
      data: {
        status: StatusCliente.INATIVO,
        updatedAt: new Date(),
      },
    });

    // Também desativar o usuário associado
    await prisma.user.update({
      where: { id: cliente.userId },
      data: {
        isActive: false,
      },
    });

    logger.info(`Cliente deleted successfully (soft delete): ${id}`);
  }

  /**
   * Obter estatísticas do cliente
   *
   * @param id - ID do cliente
   * @returns Estatísticas do cliente
   *
   * @example
   * ```ts
   * const stats = await clienteService.getStats(1);
   * ```
   */
  async getStats(id: number): Promise<any> {
    logger.info(`Fetching stats for cliente ID: ${id}`);

    const cliente = await prisma.cliente.findUnique({ where: { id } });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    const [veiculosCount, revisoesCount, revisoesStats] = await Promise.all([
      // Contar veículos ativos
      prisma.veiculo.count({
        where: {
          clienteId: id,
          status: { not: 'VENDIDO' },
        },
      }),

      // Contar revisões
      prisma.revisao.count({
        where: { clienteId: id },
      }),

      // Estatísticas de revisões
      prisma.revisao.groupBy({
        by: ['status'],
        where: { clienteId: id },
        _count: true,
      }),
    ]);

    return {
      totalVeiculos: veiculosCount,
      totalRevisoes: revisoesCount,
      revisoesPorStatus: revisoesStats.reduce((acc: any, stat: any) => {
        acc[stat.status] = stat._count;
        return acc;
      }, {}),
    };
  }

  /**
   * Atualizar última visita do cliente
   *
   * @param id - ID do cliente
   *
   * @example
   * ```ts
   * await clienteService.updateLastVisit(1);
   * ```
   */
  async updateLastVisit(id: number): Promise<void> {
    logger.info(`Updating last visit for cliente ID: ${id}`);

    await prisma.cliente.update({
      where: { id },
      data: { lastVisit: new Date() },
    });
  }
}

export default new ClienteService();
