/**
 * Enums compartilhados entre frontend e backend
 * Extraídos do schema Prisma original
 */

export enum Role {
  CLIENTE = 'CLIENTE',
  MECANICO = 'MECANICO',
  ADMIN = 'ADMIN',
}

export enum StatusCliente {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  BLOQUEADO = 'BLOQUEADO',
  PENDENTE = 'PENDENTE',
}

export enum StatusRevisao {
  AGENDADA = 'AGENDADA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
}

export enum Prioridade {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA',
}

export enum StatusRecomendacao {
  PENDENTE = 'PENDENTE',
  ACEITA = 'ACEITA',
  RECUSADA = 'RECUSADA',
  IMPLEMENTADA = 'IMPLEMENTADA',
}

export enum TipoRevisao {
  PREVENTIVA = 'PREVENTIVA',
  CORRETIVA = 'CORRETIVA',
  PERIODICA = 'PERIODICA',
  EMERGENCIAL = 'EMERGENCIAL',
}

export enum StatusVeiculo {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  EM_MANUTENCAO = 'EM_MANUTENCAO',
  VENDIDO = 'VENDIDO',
}
