/**
 * Formatadores de dados
 */

/**
 * Formata CPF: 12345678900 -> 123.456.789-00
 */
export function formatarCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Remove formatação do CPF: 123.456.789-00 -> 12345678900
 */
export function limparCPF(cpf: string): string {
  return cpf.replace(/[^\d]/g, '');
}

/**
 * Formata telefone: 11999887766 -> (11) 99988-7766
 */
export function formatarTelefone(telefone: string): string {
  telefone = telefone.replace(/[^\d]/g, '');

  if (telefone.length === 11) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  if (telefone.length === 10) {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  return telefone;
}

/**
 * Remove formatação do telefone
 */
export function limparTelefone(telefone: string): string {
  return telefone.replace(/[^\d]/g, '');
}

/**
 * Formata CEP: 01310100 -> 01310-100
 */
export function formatarCEP(cep: string): string {
  cep = cep.replace(/[^\d]/g, '');
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Remove formatação do CEP
 */
export function limparCEP(cep: string): string {
  return cep.replace(/[^\d]/g, '');
}

/**
 * Formata placa de veículo
 */
export function formatarPlaca(placa: string): string {
  placa = placa.toUpperCase().replace(/[^\dA-Z]/g, '');

  // Formato antigo: ABC1234 -> ABC-1234
  if (/^[A-Z]{3}\d{4}$/.test(placa)) {
    return placa.replace(/([A-Z]{3})(\d{4})/, '$1-$2');
  }

  // Formato Mercosul: ABC1D23 (sem hífen)
  return placa;
}

/**
 * Formata valor monetário
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

/**
 * Formata data para padrão brasileiro
 */
export function formatarData(data: Date | string): string {
  const d = typeof data === 'string' ? new Date(data) : data;
  return new Intl.DateTimeFormat('pt-BR').format(d);
}

/**
 * Formata data e hora
 */
export function formatarDataHora(data: Date | string): string {
  const d = typeof data === 'string' ? new Date(data) : data;
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(d);
}
