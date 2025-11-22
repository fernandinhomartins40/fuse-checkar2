/**
 * Tipos centralizados da aplicação
 * Todos os tipos compartilhados entre componentes devem estar aqui
 */

// Re-export tipos do shared package
export type {
  Cliente,
  CreateClienteData,
  UpdateClienteData,
  Veiculo,
  CreateVeiculoData,
  UpdateVeiculoData,
  Revisao,
  CreateRevisaoData,
  UpdateRevisaoData,
  ApiResponse,
  PaginatedResponse,
} from '@fuse-checkar2/shared/types';

export {
  Role,
  StatusCliente,
  StatusRevisao,
  StatusVeiculo,
  TipoRevisao,
  Prioridade,
  StatusRecomendacao,
} from '@fuse-checkar2/shared/constants';

// ============================================================================
// Tipos de Autenticação
// ============================================================================

export interface User {
  id: number;
  email: string;
  role: 'CLIENTE' | 'MECANICO' | 'ADMIN';
  nome?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

// ============================================================================
// Tipos de Checklist e Revisão (frontend específico)
// ============================================================================

export interface ItemChecklist {
  id: string;
  item: string;
  status: 'ok' | 'nao_ok' | 'nao_aplicavel';
  observacao?: string;
}

export interface CategoriaChecklist {
  id: string;
  categoria: string;
  itens: ItemChecklist[];
}

export interface PreDiagnosisQuestion {
  id: string;
  pergunta: string;
  resposta?: string;
}

export interface FinalizationData {
  diagnostico: string;
  servicosRealizados: Array<{
    descricao: string;
    valor: number;
  }>;
  pecasSubstituidas: Array<{
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  }>;
  valorServico: number;
  valorPecas: number;
  valorTotal: number;
  garantiaDias: number;
  garantiaKm: number;
}

// ============================================================================
// Tipos de Relatórios
// ============================================================================

export interface RelatorioItem {
  id: number;
  tipo: string;
  data: string;
  cliente: string;
  veiculo: string;
  valor: number;
  status: string;
}

export interface RelatorioFilter {
  periodo: 'hoje' | 'semana' | 'mes' | 'ano' | 'personalizado';
  dataInicio?: string;
  dataFim?: string;
  tipo?: 'todos' | 'preventiva' | 'corretiva' | 'periodica';
  status?: 'todos' | 'agendada' | 'em_andamento' | 'concluida';
}

export interface RelatorioStats {
  totalRevisoes: number;
  receitaTotal: number;
  ticketMedio: number;
  veiculosAtendidos: number;
}

// ============================================================================
// Tipos de Componentes UI
// ============================================================================

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
}

export interface AlertItem {
  id: string;
  tipo: 'urgente' | 'aviso' | 'info';
  mensagem: string;
  data: string;
  link?: string;
}

// ============================================================================
// Tipos de Props de Páginas
// ============================================================================

export interface RouteParams {
  id?: string;
  clienteId?: string;
  veiculoId?: string;
  revisaoId?: string;
}

// ============================================================================
// Tipos de Forms
// ============================================================================

export interface ClienteFormData {
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

export interface VeiculoFormData {
  clienteId: number;
  marca: string;
  modelo: string;
  ano: number;
  anoModelo?: number;
  placa: string;
  cor?: string;
  chassi?: string;
  renavam?: string;
  motor?: string;
  combustivel?: string;
  cambio?: string;
  kmAtual?: number;
  observacoes?: string;
}

export interface RevisaoFormData {
  clienteId: number;
  veiculoId: number;
  mecanicoId?: number;
  tipo: 'PREVENTIVA' | 'CORRETIVA' | 'PERIODICA' | 'EMERGENCIAL';
  dataAgendamento: string;
  dataRevisao: string;
  kmAtual?: number;
  observacoes?: string;
}

// ============================================================================
// Tipos de Hooks
// ============================================================================

export interface UseClientesDataReturn {
  clientes: Cliente[];
  loading: boolean;
  addCliente: (cliente: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCliente: (id: number, cliente: Partial<Cliente>) => void;
  deleteCliente: (id: number) => void;
  getClienteById: (id: number) => Cliente | undefined;
}

export interface UseVeiculosDataReturn {
  veiculos: Veiculo[];
  loading: boolean;
  getVeiculosByCliente: (clienteId: number) => Veiculo[];
  getVeiculoById: (id: number) => Veiculo | undefined;
}

export interface UseRevisoesDataReturn {
  revisoes: Revisao[];
  loading: boolean;
  getRevisoesByVeiculo: (veiculoId: number) => Revisao[];
  getRevisaoById: (id: number) => Revisao | undefined;
}
