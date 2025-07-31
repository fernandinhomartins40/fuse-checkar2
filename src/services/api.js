// Service para comunicação com a API backend
// Usa paths relativos que funcionam tanto em desenvolvimento (via proxy) quanto em produção

const API_BASE_URL = '/api';

// Helper para fazer requisições HTTP
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Adicionar token de autenticação se disponível
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
    
    return response;
  } catch (error) {
    console.error(`Erro na requisição para ${url}:`, error);
    throw error;
  }
};

// API de Status/Health
export const apiHealth = {
  check: () => apiRequest('/health'),
};

// API de Clientes
export const apiClientes = {
  // Listar todos os clientes
  listar: () => apiRequest('/clientes'),
  
  // Buscar cliente por ID
  buscarPorId: (id) => apiRequest(`/clientes/${id}`),
  
  // Criar novo cliente
  criar: (dados) => apiRequest('/clientes', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),
  
  // Atualizar cliente
  atualizar: (id, dados) => apiRequest(`/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
  
  // Remover cliente
  remover: (id) => apiRequest(`/clientes/${id}`, {
    method: 'DELETE',
  }),
};

// API de Veículos
export const apiVeiculos = {
  // Listar veículos (com filtro opcional por cliente)
  listar: (clienteId = null) => {
    const params = clienteId ? `?clienteId=${clienteId}` : '';
    return apiRequest(`/veiculos${params}`);
  },
  
  // Buscar veículo por ID
  buscarPorId: (id) => apiRequest(`/veiculos/${id}`),
  
  // Criar novo veículo
  criar: (dados) => apiRequest('/veiculos', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),
  
  // Atualizar veículo
  atualizar: (id, dados) => apiRequest(`/veiculos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
  
  // Remover veículo
  remover: (id) => apiRequest(`/veiculos/${id}`, {
    method: 'DELETE',
  }),
};

// API de Revisões
export const apiRevisoes = {
  // Listar revisões (com filtros opcionais)
  listar: (filtros = {}) => {
    const params = new URLSearchParams();
    if (filtros.clienteId) params.append('clienteId', filtros.clienteId);
    if (filtros.veiculoId) params.append('veiculoId', filtros.veiculoId);
    
    const queryString = params.toString();
    return apiRequest(`/revisoes${queryString ? `?${queryString}` : ''}`);
  },
  
  // Buscar revisão por ID
  buscarPorId: (id) => apiRequest(`/revisoes/${id}`),
  
  // Criar nova revisão
  criar: (dados) => apiRequest('/revisoes', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),
  
  // Atualizar revisão
  atualizar: (id, dados) => apiRequest(`/revisoes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  }),
  
  // Finalizar revisão
  finalizar: (id, dados) => apiRequest(`/revisoes/${id}/finalizar`, {
    method: 'POST',
    body: JSON.stringify(dados),
  }),
  
  // Remover revisão
  remover: (id) => apiRequest(`/revisoes/${id}`, {
    method: 'DELETE',
  }),
};

// API de Relatórios
export const apiRelatorios = {
  // Gerar relatório
  gerar: (filtros = {}) => {
    const params = new URLSearchParams();
    if (filtros.periodo) params.append('periodo', filtros.periodo);
    if (filtros.tipo) params.append('tipo', filtros.tipo);
    
    const queryString = params.toString();
    return apiRequest(`/relatorios${queryString ? `?${queryString}` : ''}`);
  },
  
  // Exportar relatório
  exportar: (formato, filtros = {}) => {
    const params = new URLSearchParams({ formato, ...filtros });
    return apiRequest(`/relatorios/exportar?${params.toString()}`);
  },
};

// API de Upload
export const apiUpload = {
  // Upload de arquivo
  arquivo: (file, tipo = 'geral') => {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('tipo', tipo);
    
    return apiRequest('/upload', {
      method: 'POST',
      headers: {
        // Não definir Content-Type para FormData (o browser define automaticamente)
      },
      body: formData,
    });
  },
};

// Hooks personalizados para React Query (se estiver usando)
export const useApiQuery = {
  // Hook para listar clientes
  clientes: () => ({
    queryKey: ['clientes'],
    queryFn: apiClientes.listar,
  }),
  
  // Hook para buscar cliente específico
  cliente: (id) => ({
    queryKey: ['cliente', id],
    queryFn: () => apiClientes.buscarPorId(id),
    enabled: !!id,
  }),
  
  // Hook para listar veículos
  veiculos: (clienteId = null) => ({
    queryKey: ['veiculos', clienteId],
    queryFn: () => apiVeiculos.listar(clienteId),
  }),
  
  // Hook para listar revisões
  revisoes: (filtros = {}) => ({
    queryKey: ['revisoes', filtros],
    queryFn: () => apiRevisoes.listar(filtros),
  }),
};

// Exemplo de uso:
// 
// Em um componente React:
// import { apiClientes, useApiQuery } from '@/services/api';
// import { useQuery } from '@tanstack/react-query';
//
// function ClientesList() {
//   const { data, isLoading, error } = useQuery(useApiQuery.clientes());
//   
//   if (isLoading) return <div>Carregando...</div>;
//   if (error) return <div>Erro: {error.message}</div>;
//   
//   return (
//     <div>
//       {data?.data?.map(cliente => (
//         <div key={cliente.id}>{cliente.nome}</div>
//       ))}
//     </div>
//   );
// }
//
// Para criar um cliente:
// const criarCliente = async (dados) => {
//   try {
//     const resultado = await apiClientes.criar(dados);
//     console.log('Cliente criado:', resultado);
//   } catch (error) {
//     console.error('Erro ao criar cliente:', error);
//   }
// };

export default {
  health: apiHealth,
  clientes: apiClientes,
  veiculos: apiVeiculos,
  revisoes: apiRevisoes,
  relatorios: apiRelatorios,
  upload: apiUpload,
};