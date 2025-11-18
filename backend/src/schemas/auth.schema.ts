/**
 * Schemas de validação para autenticação
 */

import { z } from 'zod';
import { emailSchema, senhaSchema, cpfSchema, telefoneSchema } from './common.schema';
import { Role } from '@prisma/client';

export const loginSchema = z.object({
  email: emailSchema,
  senha: senhaSchema,
});

export const registerClienteSchema = z.object({
  email: emailSchema,
  senha: senhaSchema,
  nome: z.string().min(2, 'Nome muito curto').max(100),
  sobrenome: z.string().min(2, 'Sobrenome muito curto').max(100),
  cpf: cpfSchema,
  telefone: telefoneSchema,
});

export const registerMecanicoSchema = registerClienteSchema.extend({
  especialidade: z.string().max(100).optional(),
  registro: z.string().max(50).optional(),
});

export const registerAdminSchema = registerClienteSchema.omit({
  sobrenome: true,
}).extend({
  nome: z.string().min(2).max(255),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Token de refresh é obrigatório'),
});

export const changePasswordSchema = z.object({
  senhaAtual: senhaSchema,
  senhaNova: senhaSchema,
}).refine((data) => data.senhaAtual !== data.senhaNova, {
  message: 'A nova senha deve ser diferente da senha atual',
  path: ['senhaNova'],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  senhaNova: senhaSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterClienteInput = z.infer<typeof registerClienteSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
