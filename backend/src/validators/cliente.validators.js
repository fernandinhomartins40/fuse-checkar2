import Joi from 'joi';

export const createClienteSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().pattern(/^[\d\s\(\)\-\+]+$/).min(10).max(20).required(),
  cpf: Joi.string().pattern(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/).required(),
  endereco: Joi.string().max(200).optional(),
  observacoes: Joi.string().max(500).optional(),
});

export const updateClienteSchema = Joi.object({
  nome: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(),
  telefone: Joi.string().pattern(/^[\d\s\(\)\-\+]+$/).min(10).max(20).optional(),
  endereco: Joi.string().max(200).optional(),
  ativo: Joi.boolean().optional(),
  observacoes: Joi.string().max(500).optional(),
}).min(1); // Pelo menos um campo deve ser fornecido

export const clienteIdSchema = Joi.object({
  id: Joi.string().required(),
});

export default {
  createClienteSchema,
  updateClienteSchema,
  clienteIdSchema,
};
