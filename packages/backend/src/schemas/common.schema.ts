import { z } from 'zod';

/**
 * Schemas comuns de validação
 * Incluem validações brasileiras (CPF, telefone, CEP, placa)
 */

/**
 * Valida se um CPF é válido
 */
function validarCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/[^\d]/g, '');

  // Verifica se tem 11 dígitos
  if (cpfLimpo.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  const digito1 = resto >= 10 ? 0 : resto;

  if (digito1 !== parseInt(cpfLimpo.charAt(9))) return false;

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  const digito2 = resto >= 10 ? 0 : resto;

  return digito2 === parseInt(cpfLimpo.charAt(10));
}

/**
 * Schema para validação de ID (número positivo)
 */
export const idSchema = z.coerce.number().int().positive({
  message: 'ID deve ser um número inteiro positivo',
});

/**
 * Schema para validação de CPF
 */
export const cpfSchema = z
  .string()
  .min(11, 'CPF deve ter no mínimo 11 caracteres')
  .max(14, 'CPF deve ter no máximo 14 caracteres')
  .refine(validarCPF, {
    message: 'CPF inválido',
  });

/**
 * Schema para validação de email
 */
export const emailSchema = z
  .string()
  .email('Email inválido')
  .toLowerCase()
  .trim();

/**
 * Schema para validação de telefone brasileiro
 * Aceita: (11) 98765-4321, 11987654321, +5511987654321
 */
export const telefoneSchema = z
  .string()
  .regex(
    /^(\+55\s?)?(\(?\d{2}\)?\s?)?9?\d{4}-?\d{4}$/,
    'Telefone inválido. Use o formato: (11) 98765-4321'
  );

/**
 * Schema para validação de CEP brasileiro
 * Aceita: 12345-678 ou 12345678
 */
export const cepSchema = z
  .string()
  .regex(/^\d{5}-?\d{3}$/, 'CEP inválido. Use o formato: 12345-678');

/**
 * Schema para validação de placa de veículo (Mercosul e antiga)
 * Aceita: ABC1234 (antiga) ou ABC1D23 (Mercosul)
 */
export const placaSchema = z
  .string()
  .regex(
    /^[A-Z]{3}\d{1}[A-Z\d]{1}\d{2}$/,
    'Placa inválida. Use o formato: ABC1234 ou ABC1D23'
  )
  .toUpperCase();

/**
 * Schema para validação de data no formato ISO 8601
 */
export const isoDateSchema = z.string().datetime({
  message: 'Data inválida. Use o formato ISO 8601',
});

/**
 * Schema para validação de data simples (YYYY-MM-DD)
 */
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida. Use o formato: YYYY-MM-DD');

/**
 * Schema para validação de URL
 */
export const urlSchema = z.string().url('URL inválida');

/**
 * Schema para validação de senha forte
 * Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número
 */
export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número');

/**
 * Schema para validação de ano
 */
export const yearSchema = z.coerce
  .number()
  .int()
  .min(1900, 'Ano deve ser maior que 1900')
  .max(new Date().getFullYear() + 1, `Ano deve ser menor que ${new Date().getFullYear() + 2}`);

/**
 * Schema para validação de quilometragem
 */
export const kmSchema = z.coerce
  .number()
  .int()
  .nonnegative('Quilometragem não pode ser negativa')
  .max(9999999, 'Quilometragem máxima é 9.999.999 km');

/**
 * Schema para validação de valor monetário
 */
export const moneySchema = z.coerce
  .number()
  .nonnegative('Valor não pode ser negativo')
  .finite('Valor deve ser finito');
