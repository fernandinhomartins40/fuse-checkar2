import Joi from 'joi';

/**
 * Schema de validação para login
 */
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter no mínimo {#limit} caracteres',
      'any.required': 'Senha é obrigatória',
    }),
});

/**
 * Schema de validação para registro de cliente
 */
export const registerClienteSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Nome deve ter no mínimo {#limit} caracteres',
      'string.max': 'Nome deve ter no máximo {#limit} caracteres',
      'any.required': 'Nome é obrigatório',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório',
    }),

  telefone: Joi.string()
    .pattern(/^[\d\s\(\)\-\+]+$/)
    .min(10)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': 'Telefone inválido',
      'string.min': 'Telefone deve ter no mínimo {#limit} caracteres',
      'any.required': 'Telefone é obrigatório',
    }),

  cpf: Joi.string()
    .pattern(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'CPF inválido',
      'any.required': 'CPF é obrigatório',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter no mínimo {#limit} caracteres',
      'any.required': 'Senha é obrigatória',
    }),
});

/**
 * Schema de validação para refresh token
 */
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'any.required': 'Refresh token é obrigatório',
    }),
});

export default {
  loginSchema,
  registerClienteSchema,
  refreshTokenSchema,
};
