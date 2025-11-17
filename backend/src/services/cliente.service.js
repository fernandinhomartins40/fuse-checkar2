import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../config/logger.js';

/**
 * Service para operações de clientes
 */
class ClienteService {
  /**
   * Listar todos os clientes
   */
  async listarClientes(filtros = {}) {
    try {
      const { ativo, search, limit = 100, offset = 0 } = filtros;

      const where = {};

      // Filtro por status ativo/inativo
      if (ativo !== undefined) {
        where.ativo = ativo === 'true' || ativo === true;
      }

      // Busca por nome, email ou CPF
      if (search) {
        where.OR = [
          { nome: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { cpf: { contains: search } },
        ];
      }

      const [clientes, total] = await Promise.all([
        prisma.cliente.findMany({
          where,
          include: {
            veiculos: {
              where: { ativo: true },
              select: {
                id: true,
                marca: true,
                modelo: true,
                placa: true,
                ano: true,
              },
            },
          },
          orderBy: { dataCadastro: 'desc' },
          take: parseInt(limit),
          skip: parseInt(offset),
        }),
        prisma.cliente.count({ where }),
      ]);

      return {
        clientes,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: total > parseInt(offset) + parseInt(limit),
        },
      };
    } catch (error) {
      logger.error('Erro ao listar clientes:', error);
      throw new AppError('Erro ao buscar clientes', 500);
    }
  }

  /**
   * Buscar cliente por ID
   */
  async buscarClientePorId(id) {
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id },
        include: {
          veiculos: {
            orderBy: { createdAt: 'desc' },
          },
          revisoes: {
            orderBy: { data: 'desc' },
            take: 10, // Últimas 10 revisões
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
        throw new AppError('Cliente não encontrado', 404);
      }

      return cliente;
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Erro ao buscar cliente:', error);
      throw new AppError('Erro ao buscar cliente', 500);
    }
  }

  /**
   * Criar novo cliente
   */
  async criarCliente(data, userId) {
    try {
      // Verificar se já existe cliente vinculado a este usuário
      const clienteExistente = await prisma.cliente.findUnique({
        where: { userId },
      });

      if (clienteExistente) {
        throw new AppError('Usuário já possui um cliente vinculado', 409);
      }

      // Verificar se email ou CPF já existem
      const emailExistente = await prisma.cliente.findUnique({
        where: { email: data.email },
      });

      if (emailExistente) {
        throw new AppError('Email já cadastrado', 409);
      }

      const cpfExistente = await prisma.cliente.findUnique({
        where: { cpf: data.cpf },
      });

      if (cpfExistente) {
        throw new AppError('CPF já cadastrado', 409);
      }

      const cliente = await prisma.cliente.create({
        data: {
          ...data,
          userId,
          ativo: true,
        },
      });

      logger.info(`Cliente criado: ${cliente.id} - ${cliente.nome}`);

      return cliente;
    } catch (error) {
      if (error instanceof AppError) throw error;

      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0];
        throw new AppError(`${field} já cadastrado`, 409);
      }

      logger.error('Erro ao criar cliente:', error);
      throw new AppError('Erro ao criar cliente', 500);
    }
  }

  /**
   * Atualizar cliente
   */
  async atualizarCliente(id, data) {
    try {
      // Verificar se cliente existe
      const clienteExistente = await prisma.cliente.findUnique({
        where: { id },
      });

      if (!clienteExistente) {
        throw new AppError('Cliente não encontrado', 404);
      }

      // Se está tentando atualizar email ou CPF, verificar duplicatas
      if (data.email && data.email !== clienteExistente.email) {
        const emailExistente = await prisma.cliente.findUnique({
          where: { email: data.email },
        });

        if (emailExistente) {
          throw new AppError('Email já cadastrado', 409);
        }
      }

      if (data.cpf && data.cpf !== clienteExistente.cpf) {
        const cpfExistente = await prisma.cliente.findUnique({
          where: { cpf: data.cpf },
        });

        if (cpfExistente) {
          throw new AppError('CPF já cadastrado', 409);
        }
      }

      const cliente = await prisma.cliente.update({
        where: { id },
        data,
      });

      logger.info(`Cliente atualizado: ${id}`);

      return cliente;
    } catch (error) {
      if (error instanceof AppError) throw error;

      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0];
        throw new AppError(`${field} já cadastrado`, 409);
      }

      logger.error('Erro ao atualizar cliente:', error);
      throw new AppError('Erro ao atualizar cliente', 500);
    }
  }

  /**
   * Remover cliente (soft delete - apenas desativa)
   */
  async removerCliente(id) {
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id },
      });

      if (!cliente) {
        throw new AppError('Cliente não encontrado', 404);
      }

      // Soft delete - apenas marca como inativo
      await prisma.cliente.update({
        where: { id },
        data: { ativo: false },
      });

      logger.info(`Cliente desativado: ${id}`);

      return { message: 'Cliente removido com sucesso' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Erro ao remover cliente:', error);
      throw new AppError('Erro ao remover cliente', 500);
    }
  }

  /**
   * Estatísticas de clientes
   */
  async obterEstatisticas() {
    try {
      const [total, ativos, novosNoMes] = await Promise.all([
        prisma.cliente.count(),
        prisma.cliente.count({ where: { ativo: true } }),
        prisma.cliente.count({
          where: {
            dataCadastro: {
              gte: new Date(new Date().setDate(1)), // Primeiro dia do mês atual
            },
          },
        }),
      ]);

      return {
        total,
        ativos,
        inativos: total - ativos,
        novosNoMes,
      };
    } catch (error) {
      logger.error('Erro ao obter estatísticas de clientes:', error);
      throw new AppError('Erro ao obter estatísticas', 500);
    }
  }
}

export default new ClienteService();
