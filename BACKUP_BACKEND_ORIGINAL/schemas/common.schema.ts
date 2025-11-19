/**
 * Schemas comuns de validação
 */

import { z } from 'zod';

// Validador de CPF
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

// CPF
export const cpfSchema = z
  .string()
  .min(11, 'CPF deve ter 11 dígitos')
  .max(14, 'CPF inválido')
  .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido')
  .refine(validarCPF, 'CPF inválido')
  .transform((cpf) => cpf.replace(/[^\d]/g, ''));

// Email
export const emailSchema = z
  .string()
  .email('Email inválido')
  .min(5, 'Email muito curto')
  .max(255, 'Email muito longo')
  .toLowerCase()
  .trim();

// Senha
export const senhaSchema = z
  .string()
  .min(6, 'Senha deve ter no mínimo 6 caracteres')
  .max(100, 'Senha muito longa');

// Telefone
export const telefoneSchema = z
  .string()
  .regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, 'Telefone inválido')
  .transform((tel) => tel.replace(/[^\d]/g, ''));

// CEP
export const cepSchema = z
  .string()
  .regex(/^\d{5}-?\d{3}$/, 'CEP inválido')
  .transform((cep) => cep.replace(/[^\d]/g, ''));

// Placa (formato antigo e Mercosul)
export const placaSchema = z
  .string()
  .regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, 'Placa inválida')
  .toUpperCase()
  .transform((placa) => placa.replace(/[^\dA-Z]/g, ''));

// Data (ISO string ou Date)
export const dateSchema = z.union([
  z.string().datetime(),
  z.date(),
]).transform((val) => {
  if (typeof val === 'string') {
    return new Date(val);
  }
  return val;
});

// Data simples (YYYY-MM-DD)
export const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')
  .transform((val) => new Date(val));
