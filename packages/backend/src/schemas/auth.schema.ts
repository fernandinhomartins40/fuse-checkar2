import { z } from 'zod';
import { Role } from '@fuse-checkar2/shared';
import { emailSchema, passwordSchema, cpfSchema } from './common.schema';

/**
 * Schemas de autenticação
 * Login, registro, recuperação de senha, alteração de senha
 */

/**
 * Schema para login
 */
export const loginSchema = z.object({
  /**
   * Email do usuário
   */
  email: emailSchema,

  /**
   * Senha do usuário
   */
  password: z.string().min(1, 'Senha é obrigatória'),
});

/**
 * Tipo inferido do schema de login
 */
export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Schema para registro de novo usuário
 */
export const registerSchema = z.object({
  /**
   * Nome do usuário
   */
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').trim(),

  /**
   * Sobrenome do usuário
   */
  sobrenome: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres').trim(),

  /**
   * Email do usuário
   */
  email: emailSchema,

  /**
   * CPF do usuário
   */
  cpf: cpfSchema,

  /**
   * Senha do usuário
   */
  password: passwordSchema,

  /**
   * Confirmação de senha
   */
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),

  /**
   * Role do usuário (opcional, padrão CLIENTE)
   */
  role: z.nativeEnum(Role).default(Role.CLIENTE).optional(),

  /**
   * Telefone do usuário
   */
  telefone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
});

/**
 * Tipo inferido do schema de registro
 */
export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Schema para recuperação de senha (envio de email)
 */
export const forgotPasswordSchema = z.object({
  /**
   * Email do usuário
   */
  email: emailSchema,
});

/**
 * Tipo inferido do schema de recuperação de senha
 */
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/**
 * Schema para reset de senha (com token)
 */
export const resetPasswordSchema = z.object({
  /**
   * Token de reset recebido por email
   */
  token: z.string().min(1, 'Token é obrigatório'),

  /**
   * Nova senha
   */
  password: passwordSchema,

  /**
   * Confirmação da nova senha
   */
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
});

/**
 * Tipo inferido do schema de reset de senha
 */
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/**
 * Schema para alteração de senha (usuário autenticado)
 */
export const changePasswordSchema = z.object({
  /**
   * Senha atual
   */
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),

  /**
   * Nova senha
   */
  newPassword: passwordSchema,

  /**
   * Confirmação da nova senha
   */
  confirmNewPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'As senhas não conferem',
  path: ['confirmNewPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'A nova senha deve ser diferente da senha atual',
  path: ['newPassword'],
});

/**
 * Tipo inferido do schema de alteração de senha
 */
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

/**
 * Schema para refresh token
 */
export const refreshTokenSchema = z.object({
  /**
   * Refresh token
   */
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
});

/**
 * Tipo inferido do schema de refresh token
 */
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

/**
 * Schema para atualização de perfil do usuário autenticado
 */
export const updateProfileSchema = z.object({
  /**
   * Nome do usuário
   */
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').trim().optional(),

  /**
   * Sobrenome do usuário
   */
  sobrenome: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres').trim().optional(),

  /**
   * Telefone do usuário
   */
  telefone: z.string().optional(),

  /**
   * Avatar URL
   */
  avatar: z.string().url('URL de avatar inválida').optional(),
});

/**
 * Tipo inferido do schema de atualização de perfil
 */
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
