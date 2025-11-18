/**
 * Tipos para Revisão
 */

import { StatusRevisao, TipoRevisao, Prisma } from '@prisma/client';

export interface CreateRevisaoData {
  clienteId: number;
  veiculoId: number;
  mecanicoId?: number;
  tipo: TipoRevisao;
  dataAgendamento: Date | string;
  dataRevisao: Date | string;
  kmAtual?: number;
  kmProxima?: number;
  checklist?: Record<string, unknown>;
  observacoes?: string;
}

export interface UpdateRevisaoData {
  mecanicoId?: number;
  tipo?: TipoRevisao;
  status?: StatusRevisao;
  dataRevisao?: Date | string;
  dataInicio?: Date | string;
  dataConclusao?: Date | string;
  kmAtual?: number;
  kmProxima?: number;
  checklist?: Record<string, unknown>;
  servicosRealizados?: ServicoRealizado[];
  pecasSubstituidas?: PecaSubstituida[];
  valorServico?: number;
  valorPecas?: number;
  valorTotal?: number;
  observacoes?: string;
  diagnostico?: string;
  garantiaDias?: number;
  garantiaKm?: number;
}

export interface ServicoRealizado {
  id: string;
  descricao: string;
  valor: number;
  tempo?: number;
}

export interface PecaSubstituida {
  id: string;
  nome: string;
  marca?: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface RevisaoFilters {
  clienteId?: number;
  veiculoId?: number;
  mecanicoId?: number;
  tipo?: TipoRevisao;
  status?: StatusRevisao;
  dataInicio?: Date | string;
  dataFim?: Date | string;
}

export type RevisaoWithRelations = Prisma.RevisaoGetPayload<{
  include: {
    cliente: true;
    veiculo: true;
    mecanico: true;
  };
}>;
