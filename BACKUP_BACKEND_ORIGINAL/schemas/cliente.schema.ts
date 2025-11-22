/**
 * Schemas de validação para Cliente
 */

import { z } from 'zod';
import { StatusCliente } from '@prisma/client';
import { cpfSchema, emailSchema, senhaSchema, telefoneSchema, cepSchema, dateStringSchema } from './common.schema';

export const createClienteSchema = z.object({
  // User
  email: emailSchema,
  senha: senhaSchema,

  // Pessoal
  nome: z.string().min(2).max(100),
  sobrenome: z.string().min(2).max(100),
  cpf: cpfSchema,
  rg: z.string().max(20).optional(),
  dataNascimento: dateStringSchema.optional(),
  profissao: z.string().max(100).optional(),

  // Contato
  telefone: telefoneSchema,
  telefone2: telefoneSchema.optional(),
  whatsapp: telefoneSchema.optional(),

  // Endereço
  cep: cepSchema.optional(),
  endereco: z.string().max(255).optional(),
  numero: z.string().max(20).optional(),
  complemento: z.string().max(100).optional(),
  bairro: z.string().max(100).optional(),
  cidade: z.string().max(100).optional(),
  estado: z.string().length(2).toUpperCase().optional(),
  pais: z.string().max(50).optional(),

  // Preferências
  notificacoesEmail: z.boolean().optional(),
  notificacoesSms: z.boolean().optional(),
  newsletter: z.boolean().optional(),
});

export const updateClienteSchema = createClienteSchema
  .partial()
  .omit({
    email: true,
    senha: true,
    cpf: true,
  })
  .extend({
    status: z.nativeEnum(StatusCliente).optional(),
  });

export const clienteFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(StatusCliente).optional(),
  cidade: z.string().optional(),
  estado: z.string().length(2).toUpperCase().optional(),
  createdAfter: dateStringSchema.optional(),
  createdBefore: dateStringSchema.optional(),
});

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;
export type ClienteFiltersInput = z.infer<typeof clienteFiltersSchema>;
