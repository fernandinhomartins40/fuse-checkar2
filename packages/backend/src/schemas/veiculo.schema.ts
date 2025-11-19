import { z } from 'zod';
import { StatusVeiculo } from '@fuse-checkar2/shared';
import { idSchema, placaSchema, yearSchema, kmSchema } from './common.schema';
import { paginationWithSearchAndDateSchema } from './pagination.schema';

/**
 * Schemas de validação para Veículo
 * Create, Update, Filters
 */

/**
 * Schema para criação de veículo
 */
export const createVeiculoSchema = z.object({
  /**
   * ID do cliente proprietário
   */
  clienteId: idSchema,

  /**
   * Marca do veículo
   */
  marca: z.string().min(2, 'Marca deve ter no mínimo 2 caracteres').trim(),

  /**
   * Modelo do veículo
   */
  modelo: z.string().min(2, 'Modelo deve ter no mínimo 2 caracteres').trim(),

  /**
   * Ano de fabricação
   */
  ano: yearSchema,

  /**
   * Ano do modelo
   */
  anoModelo: yearSchema.optional(),

  /**
   * Placa do veículo (Mercosul ou antiga)
   */
  placa: placaSchema,

  /**
   * Cor do veículo
   */
  cor: z.string().optional(),

  /**
   * Chassi
   */
  chassi: z.string().length(17, 'Chassi deve ter 17 caracteres').toUpperCase().optional(),

  /**
   * RENAVAM
   */
  renavam: z.string().min(9, 'RENAVAM deve ter no mínimo 9 dígitos').max(11, 'RENAVAM deve ter no máximo 11 dígitos').optional(),

  /**
   * Motor
   */
  motor: z.string().optional(),

  /**
   * Tipo de combustível
   */
  combustivel: z.enum(['GASOLINA', 'ALCOOL', 'DIESEL', 'FLEX', 'GNV', 'ELETRICO', 'HIBRIDO']).optional(),

  /**
   * Tipo de câmbio
   */
  cambio: z.enum(['MANUAL', 'AUTOMATICO', 'AUTOMATIZADO', 'CVT']).optional(),

  /**
   * Quilometragem atual
   */
  kmAtual: kmSchema.optional(),

  /**
   * Observações
   */
  observacoes: z.string().optional(),
});

/**
 * Tipo inferido do schema de criação de veículo
 */
export type CreateVeiculoInput = z.infer<typeof createVeiculoSchema>;

/**
 * Schema para atualização de veículo
 */
export const updateVeiculoSchema = createVeiculoSchema
  .omit({ clienteId: true })
  .partial()
  .extend({
    /**
     * Status do veículo
     */
    status: z.nativeEnum(StatusVeiculo).optional(),
  });

/**
 * Tipo inferido do schema de atualização de veículo
 */
export type UpdateVeiculoInput = z.infer<typeof updateVeiculoSchema>;

/**
 * Schema para atualização de quilometragem
 */
export const updateKmSchema = z.object({
  /**
   * Nova quilometragem
   */
  kmAtual: kmSchema,
});

/**
 * Tipo inferido do schema de atualização de quilometragem
 */
export type UpdateKmInput = z.infer<typeof updateKmSchema>;

/**
 * Schema para parâmetros de ID
 */
export const veiculoIdParamSchema = z.object({
  id: idSchema,
});

/**
 * Tipo inferido do schema de parâmetro de ID
 */
export type VeiculoIdParam = z.infer<typeof veiculoIdParamSchema>;

/**
 * Schema para parâmetros de placa
 */
export const veiculoPlacaParamSchema = z.object({
  placa: placaSchema,
});

/**
 * Tipo inferido do schema de parâmetro de placa
 */
export type VeiculoPlacaParam = z.infer<typeof veiculoPlacaParamSchema>;

/**
 * Schema para parâmetros de cliente ID
 */
export const veiculoClienteIdParamSchema = z.object({
  clienteId: idSchema,
});

/**
 * Tipo inferido do schema de parâmetro de cliente ID
 */
export type VeiculoClienteIdParam = z.infer<typeof veiculoClienteIdParamSchema>;

/**
 * Schema para filtros de listagem de veículos
 */
export const veiculoFiltersSchema = paginationWithSearchAndDateSchema.extend({
  /**
   * Filtro por status
   */
  status: z.nativeEnum(StatusVeiculo).optional(),

  /**
   * Filtro por marca
   */
  marca: z.string().optional(),

  /**
   * Filtro por modelo
   */
  modelo: z.string().optional(),

  /**
   * Filtro por ano inicial
   */
  anoInicio: yearSchema.optional(),

  /**
   * Filtro por ano final
   */
  anoFim: yearSchema.optional(),

  /**
   * Filtro por cliente ID
   */
  clienteId: idSchema.optional(),

  /**
   * Filtro por combustível
   */
  combustivel: z.enum(['GASOLINA', 'ALCOOL', 'DIESEL', 'FLEX', 'GNV', 'ELETRICO', 'HIBRIDO']).optional(),

  /**
   * Ordenar por (campos específicos de veículo)
   */
  orderBy: z
    .enum(['marca', 'modelo', 'ano', 'placa', 'kmAtual', 'createdAt', 'updatedAt'])
    .default('createdAt')
    .optional(),
});

/**
 * Tipo inferido do schema de filtros de veículo
 */
export type VeiculoFilters = z.infer<typeof veiculoFiltersSchema>;
