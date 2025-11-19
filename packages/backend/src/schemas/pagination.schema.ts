import { z } from 'zod';

/**
 * Schema de paginação e ordenação
 * Usado para queries que retornam listas paginadas
 */

/**
 * Schema para parâmetros de paginação
 */
export const paginationSchema = z.object({
  /**
   * Número da página (começa em 1)
   * @default 1
   */
  page: z.coerce
    .number()
    .int()
    .positive('Página deve ser um número positivo')
    .default(1)
    .optional(),

  /**
   * Quantidade de itens por página
   * @default 10
   * @max 100
   */
  limit: z.coerce
    .number()
    .int()
    .positive('Limite deve ser um número positivo')
    .max(100, 'Limite máximo é 100 itens por página')
    .default(10)
    .optional(),

  /**
   * Campo para ordenação
   */
  orderBy: z.string().optional(),

  /**
   * Direção da ordenação
   * @default 'desc'
   */
  order: z.enum(['asc', 'desc']).default('desc').optional(),
});

/**
 * Tipo inferido do schema de paginação
 */
export type PaginationParams = z.infer<typeof paginationSchema>;

/**
 * Schema para filtros de data
 */
export const dateRangeSchema = z.object({
  /**
   * Data inicial (formato YYYY-MM-DD ou ISO 8601)
   */
  dataInicio: z.string().optional(),

  /**
   * Data final (formato YYYY-MM-DD ou ISO 8601)
   */
  dataFim: z.string().optional(),
});

/**
 * Tipo inferido do schema de filtro de data
 */
export type DateRangeParams = z.infer<typeof dateRangeSchema>;

/**
 * Schema para busca/pesquisa
 */
export const searchSchema = z.object({
  /**
   * Termo de busca
   */
  q: z.string().min(1, 'Termo de busca não pode ser vazio').optional(),

  /**
   * Campos para busca (separados por vírgula)
   */
  fields: z.string().optional(),
});

/**
 * Tipo inferido do schema de busca
 */
export type SearchParams = z.infer<typeof searchSchema>;

/**
 * Schema combinado de paginação + busca
 */
export const paginationWithSearchSchema = paginationSchema.merge(searchSchema);

/**
 * Tipo inferido do schema de paginação com busca
 */
export type PaginationWithSearchParams = z.infer<typeof paginationWithSearchSchema>;

/**
 * Schema combinado de paginação + busca + filtro de data
 */
export const paginationWithSearchAndDateSchema = paginationSchema
  .merge(searchSchema)
  .merge(dateRangeSchema);

/**
 * Tipo inferido do schema de paginação com busca e data
 */
export type PaginationWithSearchAndDateParams = z.infer<
  typeof paginationWithSearchAndDateSchema
>;
