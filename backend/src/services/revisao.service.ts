/**
 * Service de Revisão
 */

import prisma from '@config/database';
import { StatusRevisao } from '@prisma/client';
import { NotFoundError } from '@utils/errors';
import { createPaginatedResponse, calculateOffset } from '@utils/pagination';
import {
  CreateRevisaoData,
  UpdateRevisaoData,
  RevisaoFilters,
  PaginationParams,
  PaginatedResponse,
  RevisaoWithRelations,
} from '@types';

class RevisaoService {
  async list(
    filters: RevisaoFilters = {},
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<RevisaoWithRelations>> {
    const { page = 1, limit = 10, orderBy = 'dataRevisao', order = 'desc' } = pagination;
    const { clienteId, veiculoId, mecanicoId, tipo, status, dataInicio, dataFim } = filters;

    const where: any = {};

    if (clienteId) where.clienteId = clienteId;
    if (veiculoId) where.veiculoId = veiculoId;
    if (mecanicoId) where.mecanicoId = mecanicoId;
    if (tipo) where.tipo = tipo;
    if (status) where.status = status;

    if (dataInicio || dataFim) {
      where.dataRevisao = {};
      if (dataInicio) where.dataRevisao.gte = new Date(dataInicio);
      if (dataFim) where.dataRevisao.lte = new Date(dataFim);
    }

    const [revisoes, total] = await Promise.all([
      prisma.revisao.findMany({
        where,
        skip: calculateOffset(page, limit),
        take: limit,
        orderBy: { [orderBy]: order },
        include: { cliente: true, veiculo: true, mecanico: true },
      }),
      prisma.revisao.count({ where }),
    ]);

    return createPaginatedResponse(revisoes, page, limit, total);
  }

  async findById(id: number): Promise<RevisaoWithRelations> {
    const revisao = await prisma.revisao.findUnique({
      where: { id },
      include: { cliente: true, veiculo: true, mecanico: true },
    });

    if (!revisao) {
      throw new NotFoundError('Revisão não encontrada');
    }

    return revisao;
  }

  async create(data: CreateRevisaoData): Promise<RevisaoWithRelations> {
    const revisao = await prisma.revisao.create({
      data,
      include: { cliente: true, veiculo: true, mecanico: true },
    });

    return revisao;
  }

  async update(id: number, data: UpdateRevisaoData): Promise<RevisaoWithRelations> {
    await this.findById(id);

    return prisma.revisao.update({
      where: { id },
      data,
      include: { cliente: true, veiculo: true, mecanico: true },
    });
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await prisma.revisao.delete({ where: { id } });
  }

  async updateStatus(id: number, status: StatusRevisao): Promise<RevisaoWithRelations> {
    const updateData: any = { status };

    if (status === StatusRevisao.EM_ANDAMENTO && !updateData.dataInicio) {
      updateData.dataInicio = new Date();
    }

    if (status === StatusRevisao.CONCLUIDA) {
      updateData.dataConclusao = new Date();
    }

    return this.update(id, updateData);
  }
}

export default new RevisaoService();
