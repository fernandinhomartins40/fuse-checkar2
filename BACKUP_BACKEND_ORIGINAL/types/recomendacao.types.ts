/**
 * Tipos para Recomendação
 */

import { Prioridade, StatusRecomendacao, Prisma } from '@prisma/client';

export interface CreateRecomendacaoData {
  clienteId: number;
  veiculoId: number;
  titulo: string;
  descricao: string;
  prioridade?: Prioridade;
  valorEstimado?: number;
  prazoEstimado?: number;
  categoria?: string;
}

export interface UpdateRecomendacaoData {
  titulo?: string;
  descricao?: string;
  prioridade?: Prioridade;
  status?: StatusRecomendacao;
  valorEstimado?: number;
  prazoEstimado?: number;
  categoria?: string;
}

export interface RecomendacaoFilters {
  clienteId?: number;
  veiculoId?: number;
  status?: StatusRecomendacao;
  prioridade?: Prioridade;
  categoria?: string;
}

export type RecomendacaoWithRelations = Prisma.RecomendacaoGetPayload<{
  include: {
    cliente: true;
    veiculo: true;
  };
}>;
