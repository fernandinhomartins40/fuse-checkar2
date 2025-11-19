/**
 * Tipos para Mecânico
 */

import { Prisma } from '@prisma/client';

export interface CreateMecanicoData {
  email: string;
  senha: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;
  especialidade?: string;
  registro?: string;
}

export interface UpdateMecanicoData {
  nome?: string;
  sobrenome?: string;
  telefone?: string;
  especialidade?: string;
  registro?: string;
  isActive?: boolean;
}

export interface MecanicoFilters {
  search?: string;
  especialidade?: string;
  isActive?: boolean;
}

export type MecanicoWithRelations = Prisma.MecanicoGetPayload<{
  include: {
    user: true;
    revisoes: true;
  };
}>;
