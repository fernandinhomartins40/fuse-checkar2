import { z } from 'zod';
import { StatusCliente } from '@fuse-checkar2/shared';
import { idSchema, cpfSchema, emailSchema, telefoneSchema, cepSchema } from './common.schema';
import { paginationWithSearchAndDateSchema } from './pagination.schema';

/**
 * Schemas de validação para Cliente
 * Create, Update, Filters
 */

/**
 * Schema para criação de cliente
 */
export const createClienteSchema = z.object({
  /**
   * Nome do cliente
   */
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').trim(),

  /**
   * Sobrenome do cliente
   */
  sobrenome: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres').trim(),

  /**
   * Email do cliente
   */
  email: emailSchema,

  /**
   * CPF do cliente
   */
  cpf: cpfSchema,

  /**
   * RG do cliente (opcional)
   */
  rg: z.string().optional(),

  /**
   * Data de nascimento (formato YYYY-MM-DD)
   */
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida. Use o formato: YYYY-MM-DD').optional(),

  /**
   * Profissão do cliente
   */
  profissao: z.string().optional(),

  /**
   * Telefone principal
   */
  telefone: telefoneSchema,

  /**
   * Telefone secundário (opcional)
   */
  telefone2: telefoneSchema.optional(),

  /**
   * WhatsApp (opcional)
   */
  whatsapp: telefoneSchema.optional(),

  /**
   * CEP
   */
  cep: cepSchema.optional(),

  /**
   * Endereço
   */
  endereco: z.string().optional(),

  /**
   * Número
   */
  numero: z.string().optional(),

  /**
   * Complemento
   */
  complemento: z.string().optional(),

  /**
   * Bairro
   */
  bairro: z.string().optional(),

  /**
   * Cidade
   */
  cidade: z.string().optional(),

  /**
   * Estado (UF)
   */
  estado: z.string().length(2, 'Estado deve ter 2 caracteres').toUpperCase().optional(),

  /**
   * Notificações por email
   */
  notificacoesEmail: z.boolean().default(true).optional(),

  /**
   * Notificações por SMS
   */
  notificacoesSms: z.boolean().default(false).optional(),

  /**
   * Aceita newsletter
   */
  newsletter: z.boolean().default(false).optional(),
});

/**
 * Tipo inferido do schema de criação de cliente
 */
export type CreateClienteInput = z.infer<typeof createClienteSchema>;

/**
 * Schema para atualização de cliente
 */
export const updateClienteSchema = createClienteSchema.partial().extend({
  /**
   * Status do cliente
   */
  status: z.nativeEnum(StatusCliente).optional(),
});

/**
 * Tipo inferido do schema de atualização de cliente
 */
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;

/**
 * Schema para parâmetros de ID
 */
export const clienteIdParamSchema = z.object({
  id: idSchema,
});

/**
 * Tipo inferido do schema de parâmetro de ID
 */
export type ClienteIdParam = z.infer<typeof clienteIdParamSchema>;

/**
 * Schema para parâmetros de CPF
 */
export const clienteCpfParamSchema = z.object({
  cpf: cpfSchema,
});

/**
 * Tipo inferido do schema de parâmetro de CPF
 */
export type ClienteCpfParam = z.infer<typeof clienteCpfParamSchema>;

/**
 * Schema para parâmetros de email
 */
export const clienteEmailParamSchema = z.object({
  email: emailSchema,
});

/**
 * Tipo inferido do schema de parâmetro de email
 */
export type ClienteEmailParam = z.infer<typeof clienteEmailParamSchema>;

/**
 * Schema para filtros de listagem de clientes
 */
export const clienteFiltersSchema = paginationWithSearchAndDateSchema.extend({
  /**
   * Filtro por status
   */
  status: z.nativeEnum(StatusCliente).optional(),

  /**
   * Filtro por cidade
   */
  cidade: z.string().optional(),

  /**
   * Filtro por estado (UF)
   */
  estado: z.string().length(2).toUpperCase().optional(),

  /**
   * Ordenar por (campos específicos de cliente)
   */
  orderBy: z
    .enum(['nome', 'email', 'cpf', 'createdAt', 'updatedAt', 'lastVisit'])
    .default('createdAt')
    .optional(),
});

/**
 * Tipo inferido do schema de filtros de cliente
 */
export type ClienteFilters = z.infer<typeof clienteFiltersSchema>;
