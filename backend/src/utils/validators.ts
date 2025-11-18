/**
 * Validadores customizados
 */

/**
 * Valida CPF
 */
export function validarCPF(cpf: string): boolean {
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

/**
 * Valida email
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida placa de veículo (formato antigo e Mercosul)
 */
export function validarPlaca(placa: string): boolean {
  const regexAntigo = /^[A-Z]{3}-?\d{4}$/;
  const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;

  placa = placa.toUpperCase().replace(/[^\dA-Z]/g, '');

  return regexAntigo.test(placa) || regexMercosul.test(placa);
}

/**
 * Valida telefone brasileiro
 */
export function validarTelefone(telefone: string): boolean {
  const regex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
  return regex.test(telefone);
}

/**
 * Valida CEP
 */
export function validarCEP(cep: string): boolean {
  const regex = /^\d{5}-?\d{3}$/;
  return regex.test(cep);
}
