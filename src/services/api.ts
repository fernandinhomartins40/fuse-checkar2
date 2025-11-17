/**
 * Service para comunicação com a API backend
 * Usa paths relativos que funcionam tanto em desenvolvimento (via proxy) quanto em produção
 */

import type {
  ApiResponse,
  Cliente,
  NovoCliente,
  AtualizarCliente,
  Veiculo,
  NovoVeiculo,
  AtualizarVeiculo,
  Revisao,
  NovaRevisao,
  AtualizarRevisao,
  FinalizationData,
  FiltrosRelatorio,
  DadosRelatorio,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from '@/types/entities';

// ============================================================================
// TYPES
// ============================================================================

interface ApiRequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  service: string;
}

interface UploadResponse {
  success: boolean;
  fileUrl?: string;
  fileName?: string;
  error?: string;
}

interface FiltrosRevisao {
  clienteId?: string;
  veiculoId?: string;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}

interface FiltrosRelatorioExportar extends FiltrosRelatorio {
  formato?: 'pdf' | 'excel' | 'csv';
}

// ============================================================================
// API BASE
// ============================================================================

const API_BASE_URL = '/api';

/**
 * Helper para fazer requisições HTTP com tipos
 */
const apiRequest = async <T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: ApiRequestOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Adicionar token de autenticação se disponível
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);

    // Verificar se a resposta é OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }

    // Retornar JSON se houver conteúdo
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return response as unknown as ApiResponse<T>;
  } catch (error) {
    console.error(`Erro na requisição para ${url}:`, error);
    throw error;
  }
};

// ============================================================================
// API DE STATUS/HEALTH
// ============================================================================

export const apiHealth = {
  /**
   * Verifica status da API
   */
  check: (): Promise<ApiResponse<HealthCheckResponse>> =>
    apiRequest<HealthCheckResponse>('/health'),
};

// ============================================================================
// API DE AUTENTICAÇÃO
// ============================================================================

export const apiAuth = {
  /**
   * Login de cliente
   */
  loginCliente: (credentials: LoginCredentials): Promise<AuthResponse> =>
    apiRequest<AuthResponse>('/auth/cliente/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }).then((res) => res.data || res) as Promise<AuthResponse>,

  /**
   * Login de admin
   */
  loginAdmin: (credentials: LoginCredentials): Promise<AuthResponse> =>
    apiRequest<AuthResponse>('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }).then((res) => res.data || res) as Promise<AuthResponse>,

  /**
   * Registro de cliente
   */
  registerCliente: (data: RegisterData): Promise<AuthResponse> =>
    apiRequest<AuthResponse>('/auth/cliente/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.data || res) as Promise<AuthResponse>,

  /**
   * Registro de admin
   */
  registerAdmin: (data: RegisterData): Promise<AuthResponse> =>
    apiRequest<AuthResponse>('/auth/admin/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.data || res) as Promise<AuthResponse>,

  /**
   * Validar token
   */
  validate: (): Promise<ApiResponse<User>> =>
    apiRequest<User>('/auth/validate'),

  /**
   * Refresh token
   */
  refresh: (refreshToken: string): Promise<AuthResponse> =>
    apiRequest<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }).then((res) => res.data || res) as Promise<AuthResponse>,

  /**
   * Logout
   */
  logout: (): Promise<ApiResponse<void>> =>
    apiRequest<void>('/auth/logout', {
      method: 'POST',
    }),
};

// ============================================================================
// API DE CLIENTES
// ============================================================================

export const apiClientes = {
  /**
   * Listar todos os clientes
   */
  listar: (): Promise<ApiResponse<Cliente[]>> =>
    apiRequest<Cliente[]>('/clientes'),

  /**
   * Buscar cliente por ID
   */
  buscarPorId: (id: string): Promise<ApiResponse<Cliente>> =>
    apiRequest<Cliente>(`/clientes/${id}`),

  /**
   * Criar novo cliente
   */
  criar: (dados: NovoCliente): Promise<ApiResponse<Cliente>> =>
    apiRequest<Cliente>('/clientes', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Atualizar cliente
   */
  atualizar: (
    id: string,
    dados: AtualizarCliente
  ): Promise<ApiResponse<Cliente>> =>
    apiRequest<Cliente>(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  /**
   * Remover cliente
   */
  remover: (id: string): Promise<ApiResponse<void>> =>
    apiRequest<void>(`/clientes/${id}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// API DE VEÍCULOS
// ============================================================================

export const apiVeiculos = {
  /**
   * Listar veículos (com filtro opcional por cliente)
   */
  listar: (clienteId: string | null = null): Promise<ApiResponse<Veiculo[]>> => {
    const params = clienteId ? `?clienteId=${clienteId}` : '';
    return apiRequest<Veiculo[]>(`/veiculos${params}`);
  },

  /**
   * Buscar veículo por ID
   */
  buscarPorId: (id: string): Promise<ApiResponse<Veiculo>> =>
    apiRequest<Veiculo>(`/veiculos/${id}`),

  /**
   * Criar novo veículo
   */
  criar: (dados: NovoVeiculo): Promise<ApiResponse<Veiculo>> =>
    apiRequest<Veiculo>('/veiculos', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Atualizar veículo
   */
  atualizar: (
    id: string,
    dados: AtualizarVeiculo
  ): Promise<ApiResponse<Veiculo>> =>
    apiRequest<Veiculo>(`/veiculos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  /**
   * Remover veículo
   */
  remover: (id: string): Promise<ApiResponse<void>> =>
    apiRequest<void>(`/veiculos/${id}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// API DE REVISÕES
// ============================================================================

export const apiRevisoes = {
  /**
   * Listar revisões (com filtros opcionais)
   */
  listar: (filtros: FiltrosRevisao = {}): Promise<ApiResponse<Revisao[]>> => {
    const params = new URLSearchParams();
    if (filtros.clienteId) params.append('clienteId', filtros.clienteId);
    if (filtros.veiculoId) params.append('veiculoId', filtros.veiculoId);
    if (filtros.status) params.append('status', filtros.status);
    if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio);
    if (filtros.dataFim) params.append('dataFim', filtros.dataFim);

    const queryString = params.toString();
    return apiRequest<Revisao[]>(`/revisoes${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Buscar revisão por ID
   */
  buscarPorId: (id: string): Promise<ApiResponse<Revisao>> =>
    apiRequest<Revisao>(`/revisoes/${id}`),

  /**
   * Criar nova revisão
   */
  criar: (dados: NovaRevisao): Promise<ApiResponse<Revisao>> =>
    apiRequest<Revisao>('/revisoes', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Atualizar revisão
   */
  atualizar: (
    id: string,
    dados: AtualizarRevisao
  ): Promise<ApiResponse<Revisao>> =>
    apiRequest<Revisao>(`/revisoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  /**
   * Finalizar revisão
   */
  finalizar: (
    id: string,
    dados: FinalizationData
  ): Promise<ApiResponse<Revisao>> =>
    apiRequest<Revisao>(`/revisoes/${id}/finalizar`, {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Remover revisão
   */
  remover: (id: string): Promise<ApiResponse<void>> =>
    apiRequest<void>(`/revisoes/${id}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// API DE RELATÓRIOS
// ============================================================================

export const apiRelatorios = {
  /**
   * Gerar relatório
   */
  gerar: (filtros: FiltrosRelatorio = {}): Promise<ApiResponse<DadosRelatorio>> => {
    const params = new URLSearchParams();
    if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio);
    if (filtros.dataFim) params.append('dataFim', filtros.dataFim);
    if (filtros.clienteId) params.append('clienteId', filtros.clienteId);
    if (filtros.veiculoId) params.append('veiculoId', filtros.veiculoId);
    if (filtros.status) params.append('status', filtros.status);
    if (filtros.tipoServico) params.append('tipoServico', filtros.tipoServico);

    const queryString = params.toString();
    return apiRequest<DadosRelatorio>(
      `/relatorios${queryString ? `?${queryString}` : ''}`
    );
  },

  /**
   * Exportar relatório
   */
  exportar: (
    filtros: FiltrosRelatorioExportar = {}
  ): Promise<ApiResponse<Blob>> => {
    const params = new URLSearchParams();
    if (filtros.formato) params.append('formato', filtros.formato);
    if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio);
    if (filtros.dataFim) params.append('dataFim', filtros.dataFim);
    if (filtros.clienteId) params.append('clienteId', filtros.clienteId);
    if (filtros.veiculoId) params.append('veiculoId', filtros.veiculoId);
    if (filtros.status) params.append('status', filtros.status);
    if (filtros.tipoServico) params.append('tipoServico', filtros.tipoServico);

    return apiRequest<Blob>(`/relatorios/exportar?${params.toString()}`);
  },
};

// ============================================================================
// API DE UPLOAD
// ============================================================================

export const apiUpload = {
  /**
   * Upload de arquivo
   */
  arquivo: (file: File, tipo: string = 'geral'): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('tipo', tipo);

    return apiRequest<UploadResponse>('/upload', {
      method: 'POST',
      headers: {
        // Não definir Content-Type para FormData (o browser define automaticamente)
      },
      body: formData as unknown as BodyInit,
    });
  },
};

// ============================================================================
// HOOKS PERSONALIZADOS PARA REACT QUERY
// ============================================================================

export const useApiQuery = {
  /**
   * Hook para listar clientes
   */
  clientes: () => ({
    queryKey: ['clientes'] as const,
    queryFn: apiClientes.listar,
  }),

  /**
   * Hook para buscar cliente específico
   */
  cliente: (id: string) => ({
    queryKey: ['cliente', id] as const,
    queryFn: () => apiClientes.buscarPorId(id),
    enabled: !!id,
  }),

  /**
   * Hook para listar veículos
   */
  veiculos: (clienteId: string | null = null) => ({
    queryKey: ['veiculos', clienteId] as const,
    queryFn: () => apiVeiculos.listar(clienteId),
  }),

  /**
   * Hook para buscar veículo específico
   */
  veiculo: (id: string) => ({
    queryKey: ['veiculo', id] as const,
    queryFn: () => apiVeiculos.buscarPorId(id),
    enabled: !!id,
  }),

  /**
   * Hook para listar revisões
   */
  revisoes: (filtros: FiltrosRevisao = {}) => ({
    queryKey: ['revisoes', filtros] as const,
    queryFn: () => apiRevisoes.listar(filtros),
  }),

  /**
   * Hook para buscar revisão específica
   */
  revisao: (id: string) => ({
    queryKey: ['revisao', id] as const,
    queryFn: () => apiRevisoes.buscarPorId(id),
    enabled: !!id,
  }),
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {
  health: apiHealth,
  auth: apiAuth,
  clientes: apiClientes,
  veiculos: apiVeiculos,
  revisoes: apiRevisoes,
  relatorios: apiRelatorios,
  upload: apiUpload,
};
