/**
 * Tipos para Veículo
 */

import { StatusVeiculo, Prisma } from '@prisma/client';

export interface CreateVeiculoData {
  clienteId: number;
  marca: string;
  modelo: string;
  ano: number;
  anoModelo?: number;
  placa: string;
  cor?: string;
  chassi?: string;
  renavam?: string;
  motor?: string;
  combustivel?: string;
  cambio?: string;
  kmAtual?: number;
  observacoes?: string;
}

export interface UpdateVeiculoData {
  marca?: string;
  modelo?: string;
  ano?: number;
  anoModelo?: number;
  cor?: string;
  motor?: string;
  combustivel?: string;
  cambio?: string;
  kmAtual?: number;
  kmUltimaRevisao?: number;
  status?: StatusVeiculo;
  observacoes?: string;
}

export interface VeiculoFilters {
  clienteId?: number;
  marca?: string;
  modelo?: string;
  ano?: number;
  placa?: string;
  status?: StatusVeiculo;
  combustivel?: string;
}

export type VeiculoWithRelations = Prisma.VeiculoGetPayload<{
  include: {
    cliente: true;
    revisoes: true;
    recomendacoes: true;
  };
}>;
