import { StatusCliente } from '../constants/enums';

export interface Cliente {
  id: number;
  userId: number;

  // Informações Pessoais
  nome: string;
  sobrenome: string;
  cpf: string;
  rg?: string;
  dataNascimento?: string;
  profissao?: string;

  // Informações de Contato
  email: string;
  telefone: string;
  telefone2?: string;
  whatsapp?: string;

  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pais: string;

  // Status e Configurações
  status: StatusCliente;

  // Preferências
  notificacoesEmail: boolean;
  notificacoesSms: boolean;
  newsletter: boolean;

  // Metadados
  lastVisit?: string;
  createdAt: string;
  updatedAt: string;

  // Relações
  veiculos?: any[];
  revisoes?: any[];
  recomendacoes?: any[];
}

export interface CreateClienteData {
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;
  rg?: string;
  dataNascimento?: string;
  profissao?: string;
  telefone: string;
  telefone2?: string;
  whatsapp?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  notificacoesEmail?: boolean;
  notificacoesSms?: boolean;
  newsletter?: boolean;
}

export interface UpdateClienteData extends Partial<CreateClienteData> {
  status?: StatusCliente;
}
