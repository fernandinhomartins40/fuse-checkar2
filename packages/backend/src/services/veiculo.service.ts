import prisma from '@/config/database';
import logger from '@/config/logger';
import { NotFoundError, ConflictError, BadRequestError } from '@/utils/errors';
import { paginateQuery, type PaginationParams, type PaginationResult } from '@/utils/pagination';
import { Veiculo, StatusVeiculo } from '@prisma/client';

/**
 * Dados para criação de veículo
 */
export interface CreateVeiculoData {
  clienteId: number;

  // Informações do Veículo
  marca: string;
  modelo: string;
  ano: number;
  anoModelo?: number;
  placa: string;
  cor?: string;
  chassi?: string;
  renavam?: string;

  // Dados Técnicos
  motor?: string;
  combustivel?: string;
  cambio?: string;

  // Quilometragem
  kmAtual?: number;

  // Observações
  observacoes?: string;
}

/**
 * Dados para atualização de veículo
 */
export interface UpdateVeiculoData extends Partial<Omit<CreateVeiculoData, 'clienteId'>> {
  status?: StatusVeiculo;
  kmUltimaRevisao?: number;
}

/**
 * Filtros de busca de veículos
 */
export interface VeiculoFilters {
  search?: string;
  clienteId?: number;
  marca?: string;
  status?: StatusVeiculo;
  anoMin?: number;
  anoMax?: number;
}

/**
 * Service de veículos
 * Gerencia operações CRUD de veículos
 */
class VeiculoService {
  /**
   * Listar veículos com paginação e filtros
   *
   * @param params - Parâmetros de paginação
   * @param filters - Filtros de busca
   * @returns Lista paginada de veículos
   *
   * @example
   * ```ts
   * const result = await veiculoService.list(
   *   { page: 1, limit: 10, sortBy: 'marca', sortOrder: 'asc' },
   *   { status: 'ATIVO', marca: 'Toyota' }
   * );
   * ```
   */
  async list(
    params: PaginationParams,
    filters?: VeiculoFilters
  ): Promise<PaginationResult<Veiculo>> {
    logger.info('Listing veiculos with filters:', filters);

    // Construir where clause
    const where: any = {};

    if (filters?.clienteId) {
      where.clienteId = filters.clienteId;
    }

    if (filters?.marca) {
      where.marca = { contains: filters.marca, mode: 'insensitive' };
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.anoMin || filters?.anoMax) {
      where.ano = {};
      if (filters.anoMin) {
        where.ano.gte = filters.anoMin;
      }
      if (filters.anoMax) {
        where.ano.lte = filters.anoMax;
      }
    }

    if (filters?.search) {
      where.OR = [
        { marca: { contains: filters.search, mode: 'insensitive' } },
        { modelo: { contains: filters.search, mode: 'insensitive' } },
        { placa: { contains: filters.search, mode: 'insensitive' } },
        { cor: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const result = await paginateQuery<Veiculo>(
      prisma.veiculo,
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
      }
    );

    logger.info(`Found ${result.meta.total} veiculos`);
    return result;
  }

  /**
   * Buscar veículo por ID
   *
   * @param id - ID do veículo
   * @returns Veículo encontrado
   * @throws NotFoundError se veículo não for encontrado
   *
   * @example
   * ```ts
   * const veiculo = await veiculoService.getById(1);
   * ```
   */
  async getById(id: number): Promise<Veiculo> {
    logger.info(`Fetching veiculo with ID: ${id}`);

    const veiculo = await prisma.veiculo.findUnique({
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
        revisoes: {
          orderBy: { dataRevisao: 'desc' },
          take: 10,
          include: {
            mecanico: {
              select: {
                id: true,
                nome: true,
                sobrenome: true,
              },
            },
          },
        },
        recomendacoes: {
          where: {
            status: { in: ['PENDENTE', 'ACEITA'] },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!veiculo) {
      throw new NotFoundError('Veículo não encontrado');
    }

    logger.info(`Veiculo found: ${veiculo.marca} ${veiculo.modelo} - ${veiculo.placa}`);
    return veiculo as any;
  }

  /**
   * Buscar veículo por placa
   *
   * @param placa - Placa do veículo
   * @returns Veículo encontrado ou null
   *
   * @example
   * ```ts
   * const veiculo = await veiculoService.getByPlaca('ABC-1234');
   * ```
   */
  async getByPlaca(placa: string): Promise<Veiculo | null> {
    logger.info(`Fetching veiculo with placa: ${placa}`);

    const veiculo = await prisma.veiculo.findUnique({
      where: { placa },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
            telefone: true,
          },
        },
      },
    });

    return veiculo as any;
  }

  /**
   * Listar veículos de um cliente
   *
   * @param clienteId - ID do cliente
   * @returns Lista de veículos do cliente
   *
   * @example
   * ```ts
   * const veiculos = await veiculoService.getByClienteId(1);
   * ```
   */
  async getByClienteId(clienteId: number): Promise<Veiculo[]> {
    logger.info(`Fetching veiculos for cliente ID: ${clienteId}`);

    const veiculos = await prisma.veiculo.findMany({
      where: {
        clienteId,
        status: { not: StatusVeiculo.VENDIDO },
      },
      orderBy: { createdAt: 'desc' },
    });

    return veiculos;
  }

  /**
   * Criar novo veículo
   *
   * @param data - Dados do veículo
   * @returns Veículo criado
   *
   * @example
   * ```ts
   * const veiculo = await veiculoService.create({
   *   clienteId: 1,
   *   marca: 'Toyota',
   *   modelo: 'Corolla',
   *   ano: 2020,
   *   placa: 'ABC-1234'
   * });
   * ```
   */
  async create(data: CreateVeiculoData): Promise<Veiculo> {
    logger.info(`Creating new veiculo: ${data.marca} ${data.modelo} - ${data.placa}`);

    // Verificar se cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: data.clienteId },
    });

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    // Verificar se placa já existe
    const existingPlaca = await prisma.veiculo.findUnique({
      where: { placa: data.placa },
    });

    if (existingPlaca) {
      throw new ConflictError('Placa já cadastrada');
    }

    // Se chassi foi fornecido, verificar se já existe
    if (data.chassi) {
      const existingChassi = await prisma.veiculo.findUnique({
        where: { chassi: data.chassi },
      });

      if (existingChassi) {
        throw new ConflictError('Chassi já cadastrado');
      }
    }

    // Se renavam foi fornecido, verificar se já existe
    if (data.renavam) {
      const existingRenavam = await prisma.veiculo.findUnique({
        where: { renavam: data.renavam },
      });

      if (existingRenavam) {
        throw new ConflictError('Renavam já cadastrado');
      }
    }

    const veiculo = await prisma.veiculo.create({
      data: {
        clienteId: data.clienteId,
        marca: data.marca,
        modelo: data.modelo,
        ano: data.ano,
        anoModelo: data.anoModelo || data.ano,
        placa: data.placa,
        cor: data.cor,
        chassi: data.chassi,
        renavam: data.renavam,
        motor: data.motor,
        combustivel: data.combustivel,
        cambio: data.cambio,
        kmAtual: data.kmAtual,
        observacoes: data.observacoes,
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
            telefone: true,
          },
        },
      },
    });

    logger.info(`Veiculo created successfully: ${veiculo.marca} ${veiculo.modelo}`);
    return veiculo as any;
  }

  /**
   * Atualizar veículo
   *
   * @param id - ID do veículo
   * @param data - Dados a serem atualizados
   * @returns Veículo atualizado
   * @throws NotFoundError se veículo não for encontrado
   *
   * @example
   * ```ts
   * const veiculo = await veiculoService.update(1, {
   *   kmAtual: 50000,
   *   cor: 'Azul'
   * });
   * ```
   */
  async update(id: number, data: UpdateVeiculoData): Promise<Veiculo> {
    logger.info(`Updating veiculo with ID: ${id}`);

    // Verificar se veículo existe
    const existing = await prisma.veiculo.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Veículo não encontrado');
    }

    // Se está atualizando placa, verificar se já existe
    if (data.placa && data.placa !== existing.placa) {
      const existingPlaca = await prisma.veiculo.findUnique({
        where: { placa: data.placa },
      });

      if (existingPlaca) {
        throw new ConflictError('Placa já cadastrada');
      }
    }

    // Se está atualizando chassi, verificar se já existe
    if (data.chassi && data.chassi !== existing.chassi) {
      const existingChassi = await prisma.veiculo.findUnique({
        where: { chassi: data.chassi },
      });

      if (existingChassi) {
        throw new ConflictError('Chassi já cadastrado');
      }
    }

    // Se está atualizando renavam, verificar se já existe
    if (data.renavam && data.renavam !== existing.renavam) {
      const existingRenavam = await prisma.veiculo.findUnique({
        where: { renavam: data.renavam },
      });

      if (existingRenavam) {
        throw new ConflictError('Renavam já cadastrado');
      }
    }

    const veiculo = await prisma.veiculo.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
            telefone: true,
          },
        },
      },
    });

    logger.info(`Veiculo updated successfully: ${veiculo.marca} ${veiculo.modelo}`);
    return veiculo as any;
  }

  /**
   * Deletar veículo (soft delete - marcar como VENDIDO)
   *
   * @param id - ID do veículo
   *
   * @example
   * ```ts
   * await veiculoService.delete(1);
   * ```
   */
  async delete(id: number): Promise<void> {
    logger.info(`Deleting veiculo with ID: ${id}`);

    const veiculo = await prisma.veiculo.findUnique({ where: { id } });

    if (!veiculo) {
      throw new NotFoundError('Veículo não encontrado');
    }

    // Verificar se há revisões em andamento
    const revisoesEmAndamento = await prisma.revisao.count({
      where: {
        veiculoId: id,
        status: { in: ['AGENDADA', 'EM_ANDAMENTO'] },
      },
    });

    if (revisoesEmAndamento > 0) {
      throw new BadRequestError('Não é possível deletar veículo com revisões em andamento');
    }

    // Soft delete - marcar como vendido
    await prisma.veiculo.update({
      where: { id },
      data: {
        status: StatusVeiculo.VENDIDO,
        updatedAt: new Date(),
      },
    });

    logger.info(`Veiculo deleted successfully (soft delete): ${id}`);
  }

  /**
   * Atualizar quilometragem do veículo
   *
   * @param id - ID do veículo
   * @param kmAtual - Quilometragem atual
   *
   * @example
   * ```ts
   * await veiculoService.updateKilometragem(1, 50000);
   * ```
   */
  async updateKilometragem(id: number, kmAtual: number): Promise<void> {
    logger.info(`Updating kilometragem for veiculo ID: ${id} to ${kmAtual}km`);

    const veiculo = await prisma.veiculo.findUnique({ where: { id } });

    if (!veiculo) {
      throw new NotFoundError('Veículo não encontrado');
    }

    // Validar se a nova quilometragem é maior que a atual
    if (veiculo.kmAtual && kmAtual < veiculo.kmAtual) {
      throw new BadRequestError('Nova quilometragem não pode ser menor que a atual');
    }

    await prisma.veiculo.update({
      where: { id },
      data: { kmAtual },
    });

    logger.info(`Kilometragem updated successfully for veiculo ID: ${id}`);
  }

  /**
   * Obter histórico de revisões do veículo
   *
   * @param id - ID do veículo
   * @returns Lista de revisões do veículo
   *
   * @example
   * ```ts
   * const historico = await veiculoService.getHistoricoRevisoes(1);
   * ```
   */
  async getHistoricoRevisoes(id: number): Promise<any[]> {
    logger.info(`Fetching historico de revisoes for veiculo ID: ${id}`);

    const veiculo = await prisma.veiculo.findUnique({ where: { id } });

    if (!veiculo) {
      throw new NotFoundError('Veículo não encontrado');
    }

    const revisoes = await prisma.revisao.findMany({
      where: { veiculoId: id },
      orderBy: { dataRevisao: 'desc' },
      include: {
        mecanico: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            especialidade: true,
          },
        },
      },
    });

    return revisoes;
  }

  /**
   * Obter estatísticas do veículo
   *
   * @param id - ID do veículo
   * @returns Estatísticas do veículo
   *
   * @example
   * ```ts
   * const stats = await veiculoService.getStats(1);
   * ```
   */
  async getStats(id: number): Promise<any> {
    logger.info(`Fetching stats for veiculo ID: ${id}`);

    const veiculo = await prisma.veiculo.findUnique({ where: { id } });

    if (!veiculo) {
      throw new NotFoundError('Veículo não encontrado');
    }

    const [totalRevisoes, ultimaRevisao, proximaRevisao] = await Promise.all([
      // Contar total de revisões
      prisma.revisao.count({
        where: { veiculoId: id },
      }),

      // Última revisão
      prisma.revisao.findFirst({
        where: {
          veiculoId: id,
          status: 'CONCLUIDA',
        },
        orderBy: { dataRevisao: 'desc' },
      }),

      // Próxima revisão agendada
      prisma.revisao.findFirst({
        where: {
          veiculoId: id,
          status: { in: ['AGENDADA', 'EM_ANDAMENTO'] },
        },
        orderBy: { dataRevisao: 'asc' },
      }),
    ]);

    return {
      totalRevisoes,
      ultimaRevisao,
      proximaRevisao,
      kmDesdeUltimaRevisao:
        veiculo.kmAtual && veiculo.kmUltimaRevisao
          ? veiculo.kmAtual - veiculo.kmUltimaRevisao
          : null,
    };
  }
}

export default new VeiculoService();
