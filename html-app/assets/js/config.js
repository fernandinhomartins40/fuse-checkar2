/**
 * Configuração da API
 *
 * Este arquivo centraliza todas as configurações relacionadas à API backend.
 * Quando o novo backend estiver pronto, atualize apenas este arquivo com as URLs corretas.
 */

const API_CONFIG = {
  // URL base da API - Atualize esta URL quando o backend estiver disponível
  baseURL: '/api', // Pode ser alterado para 'http://localhost:5000/api' ou 'https://api.example.com/api'

  // Timeout para requisições (em milissegundos)
  timeout: 30000,

  // Headers padrão
  defaultHeaders: {
    'Content-Type': 'application/json',
  },

  // Configurações de autenticação
  auth: {
    tokenKey: 'auth_token', // Chave usada no localStorage
    userKey: 'auth_user',   // Chave do usuário no localStorage

    // Endpoints de autenticação - Atualize conforme seu novo backend
    endpoints: {
      clienteLogin: '/auth/cliente/login',
      clienteRegister: '/auth/cliente/register',
      adminLogin: '/auth/admin/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      me: '/auth/me',
    }
  },

  // Endpoints da API - Atualize conforme as rotas do novo backend
  endpoints: {
    // Clientes
    clientes: {
      list: '/clientes',
      create: '/clientes',
      get: (id) => `/clientes/${id}`,
      update: (id) => `/clientes/${id}`,
      delete: (id) => `/clientes/${id}`,
    },

    // Veículos
    veiculos: {
      list: '/veiculos',
      create: '/veiculos',
      get: (id) => `/veiculos/${id}`,
      update: (id) => `/veiculos/${id}`,
      delete: (id) => `/veiculos/${id}`,
    },

    // Revisões
    revisoes: {
      list: '/revisoes',
      create: '/revisoes',
      get: (id) => `/revisoes/${id}`,
      update: (id) => `/revisoes/${id}`,
      delete: (id) => `/revisoes/${id}`,
    },

    // Relatórios
    relatorios: {
      get: '/relatorios',
    },

    // Upload
    upload: {
      file: '/upload',
    },
  },

  // Modo de desenvolvimento
  // Em produção, defina como false
  isDevelopment: true,

  // Mock de dados (quando backend não estiver disponível)
  useMockData: true,
};

// Exportar configuração
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
