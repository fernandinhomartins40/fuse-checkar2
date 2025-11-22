import prisma from '@/config/database';
import logger from '@/config/logger';
import { NotFoundError, BadRequestError } from '@/utils/errors';
import { paginateQuery, type PaginationParams, type PaginationResult } from '@/utils/pagination';
import { Revisao, StatusRevisao, TipoRevisao } from '@prisma/client';

/**
 * Dados para criação de revisão
 */
export interface CreateRevisaoData {
  clienteId: number;
  veiculoId: number;
  mecanicoId?: number;

  // Informações da Revisão
  tipo: TipoRevisao;
  dataAgendamento: Date;
  dataRevisao: Date;

  // Quilometragem
  kmAtual?: number;
  kmProxima?: number;

  // Observações
  observacoes?: string;
}

/**
 * Dados para atualização de revisão
 */
export interface UpdateRevisaoData {
  mecanicoId?: number;
  tipo?: TipoRevisao;
  status?: StatusRevisao;
  dataAgendamento?: Date;
  dataRevisao?: Date;
  dataInicio?: Date;
  dataConclusao?: Date;
  kmAtual?: number;
  kmProxima?: number;
  checklist?: any;
  servicosRealizados?: any;
  pecasSubstituidas?: any;
  valorServico?: number;
  valorPecas?: number;
  valorTotal?: number;
  observacoes?: string;
  diagnostico?: string;
  garantiaDias?: number;
  garantiaKm?: number;
}

/**
 * Filtros de busca de revisões
 */
export interface RevisaoFilters {
  search?: string;
  clienteId?: number;
  veiculoId?: number;
  mecanicoId?: number;
  status?: StatusRevisao;
  tipo?: TipoRevisao;
  dataInicio?: Date;
  dataFim?: Date;
}

/**
 * Service de revisões
 * Gerencia operações CRUD de revisões
 */
class RevisaoService {
  /**
   * Listar revisões com paginação e filtros
   *
   * @param params - Parâmetros de paginação
   * @param filters - Filtros de busca
   * @returns Lista paginada de revisões
   *
   * @example
   * ```ts
   * const result = await revisaoService.list(
   *   { page: 1, limit: 10, sortBy: 'dataRevisao', sortOrder: 'desc' },
   *   { status: 'AGENDADA', tipo: 'PREVENTIVA' }
   * );
   * ```
   */
  async list(
    params: PaginationParams,
    filters?: RevisaoFilters
  ): Promise<PaginationResult<Revisao>> {
    logger.info('Listing revisoes with filters:', filters);

    // Construir where clause
    const where: any = {};

    if (filters?.clienteId) {
      where.clienteId = filters.clienteId;
    }

    if (filters?.veiculoId) {
      where.veiculoId = filters.veiculoId;
    }

    if (filters?.mecanicoId) {
      where.mecanicoId = filters.mecanicoId;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.tipo) {
      where.tipo = filters.tipo;
    }

    if (filters?.dataInicio || filters?.dataFim) {
      where.dataRevisao = {};
      if (filters.dataInicio) {
        where.dataRevisao.gte = filters.dataInicio;
      }
      if (filters.dataFim) {
        where.dataRevisao.lte = filters.dataFim;
      }
    }

    if (filters?.search) {
      where.OR = [
        { cliente: { nome: { contains: filters.search, mode: 'insensitive' } } },
        { cliente: { sobrenome: { contains: filters.search, mode: 'insensitive' } } },
        { veiculo: { placa: { contains: filters.search, mode: 'insensitive' } } },
        { veiculo: { marca: { contains: filters.search, mode: 'insensitive' } } },
        { veiculo: { modelo: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }

    const result = await paginateQuery<Revisao>(
      prisma.revisao,
      params,
      where,
      {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
            telefone: true,
          },
        },
        veiculo: {
          select: {
            id: true,
            marca: true,
            modelo: true,
            placa: true,
            ano: true,
            cor: true,
          },
        },
        mecanico: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            especialidade: true,
          },
        },
      }
    );

    logger.info(`Found ${result.meta.total} revisoes`);
    return result;
  }

  /**
   * Buscar revisão por ID
   *
   * @param id - ID da revisão
   * @returns Revisão encontrada
   * @throws NotFoundError se revisão não for encontrada
   *
   * @example
   * ```ts
   * const revisao = await revisaoService.getById(1);
   * ```
   */
  async getById(id: number): Promise<Revisao> {
    logger.info(`Fetching revisao with ID: ${id}`);

    const revisao = await prisma.revisao.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
            telefone: true,
            whatsapp: true,
          },
        },
        veiculo: {
          select: {
            id: true,
            marca: true,
            modelo: true,
            placa: true,
            ano: true,
            anoModelo: true,
            cor: true,
            chassi: true,
            motor: true,
            combustivel: true,
            cambio: true,
          },
        },
        mecanico: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            especialidade: true,
            registro: true,
          },
        },
      },
    });

    if (!revisao) {
      throw new NotFoundError('Revisão não encontrada');
    }

    logger.info(`Revisao found: ID ${revisao.id} - Status ${revisao.status}`);
    return revisao as any;
  }

  /**
   * Criar nova revisão
   *
   * @param data - Dados da revisão
   * @returns Revisão criada
   *
   * @example
   * ```ts
   * const revisao = await revisaoService.create({
   *   clienteId: 1,
   *   veiculoId: 1,
   *   tipo: 'PREVENTIVA',
   *   dataAgendamento: new Date(),
   *   dataRevisao: new Date('2024-12-25')
   * });
   * ```
   */
  async create(data: CreateRevisaoData): Promise<Revisao> {
    logger.info(`Creating new revisao for veiculo ID: ${data.veiculoId}`);

    // Verificar se cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: data.clienteId },
    });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    // Verificar se veículo existe e pertence ao cliente
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: data.veiculoId },
    });

    if (!veiculo) {
      throw new NotFoundError('Veículo não encontrado');
    }

    if (veiculo.clienteId !== data.clienteId) {
      throw new BadRequestError('Veículo não pertence ao cliente informado');
    }

    // Se mecânico foi informado, verificar se existe
    if (data.mecanicoId) {
      const mecanico = await prisma.mecanico.findUnique({
        where: { id: data.mecanicoId },
      });

      if (!mecanico) {
        throw new NotFoundError('Mecânico não encontrado');
      }

      if (!mecanico.isActive) {
        throw new BadRequestError('Mecânico inativo');
      }
    }

    const revisao = await prisma.revisao.create({
      data: {
        clienteId: data.clienteId,
        veiculoId: data.veiculoId,
        mecanicoId: data.mecanicoId,
        tipo: data.tipo,
        dataAgendamento: data.dataAgendamento,
        dataRevisao: data.dataRevisao,
        kmAtual: data.kmAtual,
        kmProxima: data.kmProxima,
        observacoes: data.observacoes,
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
          },
        },
        veiculo: {
          select: {
            id: true,
            marca: true,
            modelo: true,
            placa: true,
          },
        },
        mecanico: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
          },
        },
      },
    });

    logger.info(`Revisao created successfully: ID ${revisao.id}`);
    return revisao as any;
  }

  /**
   * Atualizar revisão
   *
   * @param id - ID da revisão
   * @param data - Dados a serem atualizados
   * @returns Revisão atualizada
   * @throws NotFoundError se revisão não for encontrada
   *
   * @example
   * ```ts
   * const revisao = await revisaoService.update(1, {
   *   status: 'EM_ANDAMENTO',
   *   dataInicio: new Date()
   * });
   * ```
   */
  async update(id: number, data: UpdateRevisaoData): Promise<Revisao> {
    logger.info(`Updating revisao with ID: ${id}`);

    // Verificar se revisão existe
    const existing = await prisma.revisao.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Revisão não encontrada');
    }

    // Se mecânico foi informado, verificar se existe e está ativo
    if (data.mecanicoId) {
      const mecanico = await prisma.mecanico.findUnique({
        where: { id: data.mecanicoId },
      });

      if (!mecanico) {
        throw new NotFoundError('Mecânico não encontrado');
      }

      if (!mecanico.isActive) {
        throw new BadRequestError('Mecânico inativo');
      }
    }

    // Calcular valor total se valores de serviço ou peças foram fornecidos
    let valorTotal = data.valorTotal;
    if (data.valorServico !== undefined || data.valorPecas !== undefined) {
      const valorServico = data.valorServico ?? existing.valorServico ?? 0;
      const valorPecas = data.valorPecas ?? existing.valorPecas ?? 0;
      valorTotal = Number(valorServico) + Number(valorPecas);
    }

    const revisao = await prisma.revisao.update({
      where: { id },
      data: {
        ...data,
        valorTotal,
        updatedAt: new Date(),
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
          },
        },
        veiculo: {
          select: {
            id: true,
            marca: true,
            modelo: true,
            placa: true,
          },
        },
        mecanico: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
          },
        },
      },
    });

    logger.info(`Revisao updated successfully: ID ${revisao.id}`);
    return revisao as any;
  }

  /**
   * Deletar revisão
   *
   * @param id - ID da revisão
   *
   * @example
   * ```ts
   * await revisaoService.delete(1);
   * ```
   */
  async delete(id: number): Promise<void> {
    logger.info(`Deleting revisao with ID: ${id}`);

    const revisao = await prisma.revisao.findUnique({ where: { id } });

    if (!revisao) {
      throw new NotFoundError('Revisão não encontrada');
    }

    // Só permitir deletar revisões que ainda não foram concluídas
    if (revisao.status === StatusRevisao.CONCLUIDA) {
      throw new BadRequestError('Não é possível deletar revisão concluída. Use cancelar.');
    }

    await prisma.revisao.delete({
      where: { id },
    });

    logger.info(`Revisao deleted successfully: ${id}`);
  }

  /**
   * Iniciar revisão
   *
   * @param id - ID da revisão
   * @param mecanicoId - ID do mecânico (opcional)
   * @returns Revisão atualizada
   *
   * @example
   * ```ts
   * const revisao = await revisaoService.iniciar(1, 5);
   * ```
   */
  async iniciar(id: number, mecanicoId?: number): Promise<Revisao> {
    logger.info(`Starting revisao with ID: ${id}`);

    const revisao = await prisma.revisao.findUnique({ where: { id } });

    if (!revisao) {
      throw new NotFoundError('Revisão não encontrada');
    }

    if (revisao.status !== StatusRevisao.AGENDADA) {
      throw new BadRequestError('Apenas revisões agendadas podem ser iniciadas');
    }

    const updateData: any = {
      status: StatusRevisao.EM_ANDAMENTO,
      dataInicio: new Date(),
    };

    if (mecanicoId) {
      updateData.mecanicoId = mecanicoId;
    }

    return this.update(id, updateData);
  }

  /**
   * Finalizar revisão
   *
   * @param id - ID da revisão
   * @param data - Dados de finalização
   * @returns Revisão atualizada
   *
   * @example
   * ```ts
   * const revisao = await revisaoService.finalizar(1, {
   *   diagnostico: 'Revisão completa',
   *   valorServico: 500,
   *   valorPecas: 200
   * });
   * ```
   */
  async finalizar(id: number, data: UpdateRevisaoData): Promise<Revisao> {
    logger.info(`Finalizing revisao with ID: ${id}`);

    const revisao = await prisma.revisao.findUnique({
      where: { id },
      include: { veiculo: true },
    });

    if (!revisao) {
      throw new NotFoundError('Revisão não encontrada');
    }

    if (revisao.status === StatusRevisao.CONCLUIDA) {
      throw new BadRequestError('Revisão já foi concluída');
    }

    if (revisao.status === StatusRevisao.CANCELADA) {
      throw new BadRequestError('Revisão cancelada não pode ser finalizada');
    }

    // Atualizar quilometragem do veículo se foi informada
    if (data.kmAtual) {
      await prisma.veiculo.update({
        where: { id: revisao.veiculoId },
        data: {
          kmAtual: data.kmAtual,
          kmUltimaRevisao: data.kmAtual,
        },
      });
    }

    // Finalizar revisão
    const updated = await this.update(id, {
      ...data,
      status: StatusRevisao.CONCLUIDA,
      dataConclusao: new Date(),
    });

    logger.info(`Revisao finalized successfully: ID ${id}`);
    return updated;
  }

  /**
   * Cancelar revisão
   *
   * @param id - ID da revisão
   * @param observacoes - Motivo do cancelamento
   * @returns Revisão atualizada
   *
   * @example
   * ```ts
   * const revisao = await revisaoService.cancelar(1, 'Cliente não compareceu');
   * ```
   */
  async cancelar(id: number, observacoes?: string): Promise<Revisao> {
    logger.info(`Canceling revisao with ID: ${id}`);

    const revisao = await prisma.revisao.findUnique({ where: { id } });

    if (!revisao) {
      throw new NotFoundError('Revisão não encontrada');
    }

    if (revisao.status === StatusRevisao.CONCLUIDA) {
      throw new BadRequestError('Revisão concluída não pode ser cancelada');
    }

    if (revisao.status === StatusRevisao.CANCELADA) {
      throw new BadRequestError('Revisão já está cancelada');
    }

    return this.update(id, {
      status: StatusRevisao.CANCELADA,
      observacoes: observacoes || revisao.observacoes || undefined,
    });
  }

  /**
   * Reagendar revisão
   *
   * @param id - ID da revisão
   * @param novaData - Nova data da revisão
   * @returns Revisão atualizada
   *
   * @example
   * ```ts
   * const revisao = await revisaoService.reagendar(1, new Date('2024-12-30'));
   * ```
   */
  async reagendar(id: number, novaData: Date): Promise<Revisao> {
    logger.info(`Rescheduling revisao with ID: ${id} to ${novaData}`);

    const revisao = await prisma.revisao.findUnique({ where: { id } });

    if (!revisao) {
      throw new NotFoundError('Revisão não encontrada');
    }

    if (revisao.status !== StatusRevisao.AGENDADA) {
      throw new BadRequestError('Apenas revisões agendadas podem ser reagendadas');
    }

    return this.update(id, {
      dataRevisao: novaData,
    });
  }

  /**
   * Obter estatísticas gerais de revisões
   *
   * @returns Estatísticas de revisões
   *
   * @example
   * ```ts
   * const stats = await revisaoService.getStats();
   * ```
   */
  async getStats(): Promise<any> {
    logger.info('Fetching revisoes stats');

    const [totalRevisoes, revisoesPorStatus, revisoesPorTipo] = await Promise.all([
      // Total de revisões
      prisma.revisao.count(),

      // Revisões por status
      prisma.revisao.groupBy({
        by: ['status'],
        _count: true,
      }),

      // Revisões por tipo
      prisma.revisao.groupBy({
        by: ['tipo'],
        _count: true,
      }),
    ]);

    return {
      total: totalRevisoes,
      porStatus: revisoesPorStatus.reduce((acc: any, stat: any) => {
        acc[stat.status] = stat._count;
        return acc;
      }, {}),
      porTipo: revisoesPorTipo.reduce((acc: any, stat: any) => {
        acc[stat.tipo] = stat._count;
        return acc;
      }, {}),
    };
  }

  /**
   * Obter revisões agendadas para hoje
   *
   * @returns Lista de revisões agendadas para hoje
   *
   * @example
   * ```ts
   * const hoje = await revisaoService.getRevisoesHoje();
   * ```
   */
  async getRevisoesHoje(): Promise<Revisao[]> {
    logger.info('Fetching revisoes for today');

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const revisoes = await prisma.revisao.findMany({
      where: {
        dataRevisao: {
          gte: hoje,
          lt: amanha,
        },
        status: { in: [StatusRevisao.AGENDADA, StatusRevisao.EM_ANDAMENTO] },
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            telefone: true,
          },
        },
        veiculo: {
          select: {
            marca: true,
            modelo: true,
            placa: true,
          },
        },
        mecanico: {
          select: {
            nome: true,
            sobrenome: true,
          },
        },
      },
      orderBy: { dataRevisao: 'asc' },
    });

    return revisoes as any;
  }
}

export default new RevisaoService();
