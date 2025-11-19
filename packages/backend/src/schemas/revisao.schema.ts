import { z } from 'zod';
import { StatusRevisao, TipoRevisao } from '@fuse-checkar2/shared';
import { idSchema, kmSchema, moneySchema, isoDateSchema } from './common.schema';
import { paginationWithSearchAndDateSchema } from './pagination.schema';

/**
 * Schemas de validação para Revisão
 * Create, Update, Finalizar, Filters
 */

/**
 * Schema para criação de revisão
 */
export const createRevisaoSchema = z.object({
  /**
   * ID do cliente
   */
  clienteId: idSchema,

  /**
   * ID do veículo
   */
  veiculoId: idSchema,

  /**
   * ID do mecânico responsável (opcional)
   */
  mecanicoId: idSchema.optional(),

  /**
   * Tipo de revisão
   */
  tipo: z.nativeEnum(TipoRevisao),

  /**
   * Data de agendamento (ISO 8601)
   */
  dataAgendamento: isoDateSchema,

  /**
   * Data prevista para revisão (ISO 8601)
   */
  dataRevisao: isoDateSchema,

  /**
   * Quilometragem atual do veículo
   */
  kmAtual: kmSchema.optional(),

  /**
   * Observações iniciais
   */
  observacoes: z.string().optional(),
});

/**
 * Tipo inferido do schema de criação de revisão
 */
export type CreateRevisaoInput = z.infer<typeof createRevisaoSchema>;

/**
 * Schema para atualização de revisão
 */
export const updateRevisaoSchema = createRevisaoSchema.partial().extend({
  /**
   * Status da revisão
   */
  status: z.nativeEnum(StatusRevisao).optional(),

  /**
   * Data de início (ISO 8601)
   */
  dataInicio: isoDateSchema.optional(),

  /**
   * Data de conclusão (ISO 8601)
   */
  dataConclusao: isoDateSchema.optional(),

  /**
   * Quilometragem para próxima revisão
   */
  kmProxima: kmSchema.optional(),

  /**
   * Checklist (JSON)
   */
  checklist: z.record(z.any()).optional(),

  /**
   * Serviços realizados (JSON)
   */
  servicosRealizados: z.array(z.record(z.any())).optional(),

  /**
   * Peças substituídas (JSON)
   */
  pecasSubstituidas: z.array(z.record(z.any())).optional(),

  /**
   * Valor dos serviços
   */
  valorServico: moneySchema.optional(),

  /**
   * Valor das peças
   */
  valorPecas: moneySchema.optional(),

  /**
   * Valor total
   */
  valorTotal: moneySchema.optional(),

  /**
   * Diagnóstico final
   */
  diagnostico: z.string().optional(),

  /**
   * Garantia em dias
   */
  garantiaDias: z.coerce.number().int().nonnegative().optional(),

  /**
   * Garantia em quilômetros
   */
  garantiaKm: kmSchema.optional(),
});

/**
 * Tipo inferido do schema de atualização de revisão
 */
export type UpdateRevisaoInput = z.infer<typeof updateRevisaoSchema>;

/**
 * Schema para iniciar revisão
 */
export const iniciarRevisaoSchema = z.object({
  /**
   * ID do mecânico responsável
   */
  mecanicoId: idSchema.optional(),

  /**
   * Quilometragem atual
   */
  kmAtual: kmSchema.optional(),

  /**
   * Observações iniciais
   */
  observacoes: z.string().optional(),
});

/**
 * Tipo inferido do schema de iniciar revisão
 */
export type IniciarRevisaoInput = z.infer<typeof iniciarRevisaoSchema>;

/**
 * Schema para finalizar revisão
 */
export const finalizarRevisaoSchema = z.object({
  /**
   * Quilometragem para próxima revisão
   */
  kmProxima: kmSchema.optional(),

  /**
   * Checklist (JSON)
   */
  checklist: z.record(z.any()).optional(),

  /**
   * Serviços realizados (JSON array)
   */
  servicosRealizados: z.array(z.record(z.any())).optional(),

  /**
   * Peças substituídas (JSON array)
   */
  pecasSubstituidas: z.array(z.record(z.any())).optional(),

  /**
   * Valor dos serviços
   */
  valorServico: moneySchema.optional(),

  /**
   * Valor das peças
   */
  valorPecas: moneySchema.optional(),

  /**
   * Valor total
   */
  valorTotal: moneySchema.optional(),

  /**
   * Diagnóstico final
   */
  diagnostico: z.string().optional(),

  /**
   * Garantia em dias
   */
  garantiaDias: z.coerce.number().int().nonnegative().optional(),

  /**
   * Garantia em quilômetros
   */
  garantiaKm: kmSchema.optional(),

  /**
   * Observações finais
   */
  observacoes: z.string().optional(),
});

/**
 * Tipo inferido do schema de finalizar revisão
 */
export type FinalizarRevisaoInput = z.infer<typeof finalizarRevisaoSchema>;

/**
 * Schema para reagendar revisão
 */
export const reagendarRevisaoSchema = z.object({
  /**
   * Nova data de agendamento (ISO 8601)
   */
  dataAgendamento: isoDateSchema,

  /**
   * Nova data prevista para revisão (ISO 8601)
   */
  dataRevisao: isoDateSchema,

  /**
   * Motivo do reagendamento
   */
  motivo: z.string().optional(),
});

/**
 * Tipo inferido do schema de reagendar revisão
 */
export type ReagendarRevisaoInput = z.infer<typeof reagendarRevisaoSchema>;

/**
 * Schema para cancelar revisão
 */
export const cancelarRevisaoSchema = z.object({
  /**
   * Motivo do cancelamento
   */
  motivo: z.string().min(5, 'Motivo deve ter no mínimo 5 caracteres'),
});

/**
 * Tipo inferido do schema de cancelar revisão
 */
export type CancelarRevisaoInput = z.infer<typeof cancelarRevisaoSchema>;

/**
 * Schema para parâmetros de ID
 */
export const revisaoIdParamSchema = z.object({
  id: idSchema,
});

/**
 * Tipo inferido do schema de parâmetro de ID
 */
export type RevisaoIdParam = z.infer<typeof revisaoIdParamSchema>;

/**
 * Schema para filtros de listagem de revisões
 */
export const revisaoFiltersSchema = paginationWithSearchAndDateSchema.extend({
  /**
   * Filtro por status
   */
  status: z.nativeEnum(StatusRevisao).optional(),

  /**
   * Filtro por tipo
   */
  tipo: z.nativeEnum(TipoRevisao).optional(),

  /**
   * Filtro por cliente ID
   */
  clienteId: idSchema.optional(),

  /**
   * Filtro por veículo ID
   */
  veiculoId: idSchema.optional(),

  /**
   * Filtro por mecânico ID
   */
  mecanicoId: idSchema.optional(),

  /**
   * Filtro por data de revisão inicial
   */
  dataRevisaoInicio: isoDateSchema.optional(),

  /**
   * Filtro por data de revisão final
   */
  dataRevisaoFim: isoDateSchema.optional(),

  /**
   * Ordenar por (campos específicos de revisão)
   */
  orderBy: z
    .enum([
      'dataAgendamento',
      'dataRevisao',
      'dataInicio',
      'dataConclusao',
      'valorTotal',
      'createdAt',
      'updatedAt',
    ])
    .default('dataRevisao')
    .optional(),
});

/**
 * Tipo inferido do schema de filtros de revisão
 */
export type RevisaoFilters = z.infer<typeof revisaoFiltersSchema>;
