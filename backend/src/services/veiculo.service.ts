/**
 * Service de Veículo
 */

import prisma from '@config/database';
import { NotFoundError, ConflictError } from '@utils/errors';
import { createPaginatedResponse, calculateOffset } from '@utils/pagination';
import {
  CreateVeiculoData,
  UpdateVeiculoData,
  VeiculoFilters,
  PaginationParams,
  PaginatedResponse,
  VeiculoWithRelations,
} from '@types';

class VeiculoService {
  async list(
    filters: VeiculoFilters = {},
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<VeiculoWithRelations>> {
    const { page = 1, limit = 10, orderBy = 'createdAt', order = 'desc' } = pagination;
    const { clienteId, marca, modelo, ano, placa, status, combustivel } = filters;

    const where: any = {};

    if (clienteId) where.clienteId = clienteId;
    if (marca) where.marca = { contains: marca, mode: 'insensitive' };
    if (modelo) where.modelo = { contains: modelo, mode: 'insensitive' };
    if (ano) where.ano = ano;
    if (placa) where.placa = { contains: placa };
    if (status) where.status = status;
    if (combustivel) where.combustivel = combustivel;

    const [veiculos, total] = await Promise.all([
      prisma.veiculo.findMany({
        where,
        skip: calculateOffset(page, limit),
        take: limit,
        orderBy: { [orderBy]: order },
        include: { cliente: true, revisoes: true, recomendacoes: true },
      }),
      prisma.veiculo.count({ where }),
    ]);

    return createPaginatedResponse(veiculos, page, limit, total);
  }

  async findById(id: number): Promise<VeiculoWithRelations> {
    const veiculo = await prisma.veiculo.findUnique({
      where: { id },
      include: { cliente: true, revisoes: true, recomendacoes: true },
    });

    if (!veiculo) {
      throw new NotFoundError('Veículo não encontrado');
    }

    return veiculo;
  }

  async create(data: CreateVeiculoData): Promise<VeiculoWithRelations> {
    const existingPlaca = await prisma.veiculo.findUnique({
      where: { placa: data.placa },
    });

    if (existingPlaca) {
      throw new ConflictError('Placa já cadastrada');
    }

    const veiculo = await prisma.veiculo.create({
      data,
      include: { cliente: true, revisoes: true, recomendacoes: true },
    });

    return veiculo;
  }

  async update(id: number, data: UpdateVeiculoData): Promise<VeiculoWithRelations> {
    const veiculo = await this.findById(id);

    return prisma.veiculo.update({
      where: { id },
      data,
      include: { cliente: true, revisoes: true, recomendacoes: true },
    });
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await prisma.veiculo.delete({ where: { id } });
  }
}

export default new VeiculoService();
