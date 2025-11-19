/**
 * Tipos para Cliente
 */

import { StatusCliente, Prisma } from '@prisma/client';

export interface CreateClienteData {
  // User
  email: string;
  senha: string;

  // Informações Pessoais
  nome: string;
  sobrenome: string;
  cpf: string;
  rg?: string;
  dataNascimento?: Date | string;
  profissao?: string;

  // Contato
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

export interface UpdateClienteData {
  // Informações Pessoais
  nome?: string;
  sobrenome?: string;
  rg?: string;
  dataNascimento?: Date | string;
  profissao?: string;

  // Contato
  telefone?: string;
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

  // Status
  status?: StatusCliente;

  // Preferências
  notificacoesEmail?: boolean;
  notificacoesSms?: boolean;
  newsletter?: boolean;
}

export interface ClienteFilters {
  search?: string;
  status?: StatusCliente;
  cidade?: string;
  estado?: string;
  createdAfter?: Date | string;
  createdBefore?: Date | string;
}

export type ClienteWithRelations = Prisma.ClienteGetPayload<{
  include: {
    user: true;
    veiculos: true;
    revisoes: true;
    recomendacoes: true;
  };
}>;

export type ClienteWithCounts = Prisma.ClienteGetPayload<{
  include: {
    _count: {
      select: {
        veiculos: true;
        revisoes: true;
        recomendacoes: true;
      };
    };
  };
}>;
