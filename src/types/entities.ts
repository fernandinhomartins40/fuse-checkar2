/**
 * Tipos centralizados para todas as entidades do sistema Fuse Checkar2
 * Este é o arquivo de referência para todos os tipos usados no frontend e backend
 */

// ============================================================================
// AUTENTICAÇÃO E USUÁRIOS
// ============================================================================

export type UserRole = 'admin' | 'cliente';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  nome: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  user?: User;
  error?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  nome: string;
  telefone: string;
  cpf: string;
}

// ============================================================================
// CLIENTES
// ============================================================================

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  dataCadastro: string;
  ativo: boolean;
  observacoes?: string;
}

export interface ClienteComVeiculos extends Cliente {
  veiculos: Veiculo[];
}

export type NovoCliente = Omit<Cliente, 'id' | 'dataCadastro' | 'ativo'>;

export type AtualizarCliente = Partial<Omit<Cliente, 'id' | 'dataCadastro'>>;

// ============================================================================
// VEÍCULOS
// ============================================================================

export interface Veiculo {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  chassi: string;
  cor: string;
  quilometragem: number;
}

export interface VeiculoCompleto extends Veiculo {
  clienteNome: string;
  clienteEmail: string;
  clienteTelefone: string;
  clienteAtivo: boolean;
}

export type NovoVeiculo = Omit<Veiculo, 'id'>;

export type AtualizarVeiculo = Partial<Omit<Veiculo, 'id' | 'clienteId'>>;

// ============================================================================
// REVISÕES
// ============================================================================

export type RevisaoStatus = 'agendado' | 'em_andamento' | 'concluido' | 'cancelado';

export type ItemChecklistStatus = 'ok' | 'nao_ok' | 'nao_aplicavel' | 'pendente';

export type Prioridade = 'baixa' | 'media' | 'alta' | 'critica';

export type RecomendacaoStatus = 'pendente' | 'aprovado' | 'rejeitado' | 'concluido';

export interface PreDiagnosisQuestion {
  id: string;
  pergunta: string;
  tipo: 'sim_nao' | 'texto' | 'multipla_escolha';
  opcoes?: string[];
  resposta?: string | boolean;
  obrigatoria: boolean;
}

export interface ItemChecklist {
  id: string;
  nome: string;
  categoria: string;
  obrigatorio: boolean;
  status: ItemChecklistStatus;
  observacoes?: string;
  prioridade: Prioridade;
  detalheProblema?: string;
  acaoRecomendada?: string;
  custoEstimado?: number;
}

export interface CategoriaChecklist {
  id: string;
  nome: string;
  descricao: string;
  preDiagnostico?: PreDiagnosisQuestion[];
  itens: ItemChecklist[];
}

export interface FinalizationData {
  observacoesGerais: string;
  problemasCriticos: string[];
  recomendacoesPrioritarias: string[];
  custoTotalEstimado: number;
  tempoEstimadoReparo: number;
  proximaRevisaoData: string;
  proximaRevisaoKm: number;
}

export interface Recomendacao {
  id: string;
  item: string;
  descricao: string;
  prioridade: Prioridade;
  custoEstimado?: number;
  prazoRecomendado?: string;
  status: RecomendacaoStatus;
}

export interface Revisao {
  id: string;
  clienteId: string;
  veiculoId: string;
  tipoServico: string;
  data: string;
  quilometragem: number;
  status: RevisaoStatus;
  tecnicos: string[];
  checklist: CategoriaChecklist[];
  observacoes?: string;
  recomendacoes: Recomendacao[];
  custoEstimado?: number;
  tempoEstimado?: number;
  proximaRevisao?: {
    data: string;
    quilometragem: number;
    tipo: string;
  };
  finalizacao?: FinalizationData;
}

export interface RevisaoCompleta extends Revisao {
  clienteNome: string;
  clienteEmail: string;
  veiculoModelo: string;
  veiculoPlaca: string;
}

export type NovaRevisao = Omit<Revisao, 'id' | 'recomendacoes' | 'finalizacao'>;

export type AtualizarRevisao = Partial<Omit<Revisao, 'id' | 'clienteId' | 'veiculoId'>>;

// ============================================================================
// RELATÓRIOS E ESTATÍSTICAS
// ============================================================================

export interface ChartDataRevisoesPorMes {
  mes: string;
  revisoes: number;
  faturamento: number;
}

export interface ChartDataStatusRevisoes {
  status: string;
  quantidade: number;
  color: string;
}

export interface StatsRevisoes {
  total: number;
  agendadas: number;
  emAndamento: number;
  concluidas: number;
  canceladas: number;
  faturamentoTotal: number;
  faturamentoMedio: number;
  tempoMedioReparo: number;
}

export interface StatsClientes {
  total: number;
  ativos: number;
  inativos: number;
  novosNoMes: number;
  clientesComVeiculos: number;
}

export interface StatsVeiculos {
  total: number;
  ativos: number;
  inativos: number;
  quilometragemMedia: number;
  porMarca: Array<{ marca: string; quantidade: number }>;
  porAno: Array<{ ano: number; quantidade: number }>;
}

export interface StatsRecomendacoes {
  total: number;
  pendentes: number;
  aprovadas: number;
  rejeitadas: number;
  concluidas: number;
  valorTotal: number;
}

export interface FiltrosRelatorio {
  dataInicio?: string;
  dataFim?: string;
  clienteId?: string;
  veiculoId?: string;
  status?: RevisaoStatus;
  tipoServico?: string;
}

export interface DadosRelatorio {
  revisoes: RevisaoCompleta[];
  stats: {
    revisoes: StatsRevisoes;
    clientes: StatsClientes;
    veiculos: StatsVeiculos;
    recomendacoes: StatsRecomendacoes;
  };
  charts: {
    revisoesPorMes: ChartDataRevisoesPorMes[];
    statusRevisoes: ChartDataStatusRevisoes[];
  };
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
}

// ============================================================================
// HELPERS E UTILITÁRIOS
// ============================================================================

export type ID = string;

export type Timestamp = string;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
