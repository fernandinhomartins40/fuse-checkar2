/**
 * Service para comunicação com a API backend
 * Usa paths relativos que funcionam tanto em desenvolvimento quanto em produção
 */

import type {
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

// Configuração da API
const API_BASE_URL = '/api';

// Tipos para requisições
interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Helper para fazer requisições HTTP com autenticação automática
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Adicionar token de autenticação se disponível
  const token = localStorage.getItem('authToken');
  if (token) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
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

    return { success: true } as ApiResponse<T>;
  } catch (error) {
    console.error(`Erro na requisição para ${url}:`, error);
    throw error;
  }
}

// =============================================================================
// API de Status/Health
// =============================================================================

export const apiHealth = {
  check: (): Promise<ApiResponse<{ status: string; timestamp: string }>> =>
    apiRequest('/health'),
};

// =============================================================================
// API de Clientes
// =============================================================================

export const apiClientes = {
  /**
   * Listar todos os clientes
   */
  listar: (): Promise<PaginatedResponse<Cliente>> =>
    apiRequest('/clientes'),

  /**
   * Buscar cliente por ID
   */
  buscarPorId: (id: number): Promise<ApiResponse<Cliente>> =>
    apiRequest(`/clientes/${id}`),

  /**
   * Criar novo cliente
   */
  criar: (dados: CreateClienteData): Promise<ApiResponse<Cliente>> =>
    apiRequest('/clientes', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Atualizar cliente
   */
  atualizar: (id: number, dados: UpdateClienteData): Promise<ApiResponse<Cliente>> =>
    apiRequest(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  /**
   * Remover cliente
   */
  remover: (id: number): Promise<ApiResponse<void>> =>
    apiRequest(`/clientes/${id}`, {
      method: 'DELETE',
    }),
};

// =============================================================================
// API de Veículos
// =============================================================================

export const apiVeiculos = {
  /**
   * Listar veículos (com filtro opcional por cliente)
   */
  listar: (clienteId?: number | null): Promise<PaginatedResponse<Veiculo>> => {
    const params = clienteId ? `?clienteId=${clienteId}` : '';
    return apiRequest(`/veiculos${params}`);
  },

  /**
   * Buscar veículo por ID
   */
  buscarPorId: (id: number): Promise<ApiResponse<Veiculo>> =>
    apiRequest(`/veiculos/${id}`),

  /**
   * Criar novo veículo
   */
  criar: (dados: CreateVeiculoData): Promise<ApiResponse<Veiculo>> =>
    apiRequest('/veiculos', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Atualizar veículo
   */
  atualizar: (id: number, dados: UpdateVeiculoData): Promise<ApiResponse<Veiculo>> =>
    apiRequest(`/veiculos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  /**
   * Remover veículo
   */
  remover: (id: number): Promise<ApiResponse<void>> =>
    apiRequest(`/veiculos/${id}`, {
      method: 'DELETE',
    }),
};

// =============================================================================
// API de Revisões
// =============================================================================

interface RevisoesFilter {
  clienteId?: number;
  veiculoId?: number;
}

export const apiRevisoes = {
  /**
   * Listar revisões (com filtros opcionais)
   */
  listar: (filtros: RevisoesFilter = {}): Promise<PaginatedResponse<Revisao>> => {
    const params = new URLSearchParams();
    if (filtros.clienteId) params.append('clienteId', String(filtros.clienteId));
    if (filtros.veiculoId) params.append('veiculoId', String(filtros.veiculoId));

    const queryString = params.toString();
    return apiRequest(`/revisoes${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Buscar revisão por ID
   */
  buscarPorId: (id: number): Promise<ApiResponse<Revisao>> =>
    apiRequest(`/revisoes/${id}`),

  /**
   * Criar nova revisão
   */
  criar: (dados: CreateRevisaoData): Promise<ApiResponse<Revisao>> =>
    apiRequest('/revisoes', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Atualizar revisão
   */
  atualizar: (id: number, dados: UpdateRevisaoData): Promise<ApiResponse<Revisao>> =>
    apiRequest(`/revisoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  /**
   * Finalizar revisão
   */
  finalizar: (id: number, dados: UpdateRevisaoData): Promise<ApiResponse<Revisao>> =>
    apiRequest(`/revisoes/${id}/finalizar`, {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  /**
   * Remover revisão
   */
  remover: (id: number): Promise<ApiResponse<void>> =>
    apiRequest(`/revisoes/${id}`, {
      method: 'DELETE',
    }),
};

// =============================================================================
// API de Relatórios
// =============================================================================

interface RelatoriosFilter {
  periodo?: string;
  tipo?: string;
  [key: string]: any;
}

export const apiRelatorios = {
  /**
   * Gerar relatório
   */
  gerar: (filtros: RelatoriosFilter = {}): Promise<ApiResponse<any>> => {
    const params = new URLSearchParams();
    if (filtros.periodo) params.append('periodo', filtros.periodo);
    if (filtros.tipo) params.append('tipo', filtros.tipo);

    const queryString = params.toString();
    return apiRequest(`/relatorios${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Exportar relatório
   */
  exportar: (formato: string, filtros: RelatoriosFilter = {}): Promise<ApiResponse<any>> => {
    const params = new URLSearchParams({ formato, ...filtros });
    return apiRequest(`/relatorios/exportar?${params.toString()}`);
  },
};

// =============================================================================
// API de Upload
// =============================================================================

export const apiUpload = {
  /**
   * Upload de arquivo
   */
  arquivo: (file: File, tipo: string = 'geral'): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('tipo', tipo);

    return apiRequest('/upload', {
      method: 'POST',
      headers: {
        // Não definir Content-Type para FormData (o browser define automaticamente)
      },
      body: formData as any,
    });
  },
};

// =============================================================================
// React Query Helpers
// =============================================================================

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
  cliente: (id: number) => ({
    queryKey: ['cliente', id] as const,
    queryFn: () => apiClientes.buscarPorId(id),
    enabled: !!id,
  }),

  /**
   * Hook para listar veículos
   */
  veiculos: (clienteId?: number | null) => ({
    queryKey: ['veiculos', clienteId] as const,
    queryFn: () => apiVeiculos.listar(clienteId),
  }),

  /**
   * Hook para listar revisões
   */
  revisoes: (filtros: RevisoesFilter = {}) => ({
    queryKey: ['revisoes', filtros] as const,
    queryFn: () => apiRevisoes.listar(filtros),
  }),
};

// =============================================================================
// Exportação Default
// =============================================================================

export default {
  health: apiHealth,
  clientes: apiClientes,
  veiculos: apiVeiculos,
  revisoes: apiRevisoes,
  relatorios: apiRelatorios,
  upload: apiUpload,
};
