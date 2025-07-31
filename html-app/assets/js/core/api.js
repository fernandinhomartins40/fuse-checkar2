/**
 * FUSE CHECKAR2 - API Client
 * HTTP client for API communication
 */

class ApiClient {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
    this.interceptors = {
      request: [],
      response: []
    };
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes default cache
  }

  /**
   * Add request interceptor
   * @param {Function} interceptor - Request interceptor function
   */
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  /**
   * Add response interceptor
   * @param {Function} interceptor - Response interceptor function
   */
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  /**
   * Get full URL for endpoint
   * @param {string} endpoint - API endpoint
   * @returns {string} - Full URL
   */
  getURL(endpoint) {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return `${this.baseURL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  }

  /**
   * Get request headers with authentication
   * @param {Object} customHeaders - Custom headers to merge
   * @returns {Object} - Headers object
   */
  getHeaders(customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    // Add authentication headers if available
    if (window.auth && window.auth.isAuth()) {
      const authHeaders = window.auth.getAuthHeaders();
      Object.assign(headers, authHeaders);
    }
    
    return headers;
  }

  /**
   * Apply request interceptors
   * @param {Object} config - Request configuration
   * @returns {Object} - Modified request configuration
   */
  async applyRequestInterceptors(config) {
    let modifiedConfig = { ...config };
    
    for (const interceptor of this.interceptors.request) {
      try {
        modifiedConfig = await interceptor(modifiedConfig);
      } catch (error) {
        console.error('Request interceptor error:', error);
        throw error;
      }
    }
    
    return modifiedConfig;
  }

  /**
   * Apply response interceptors
   * @param {Response} response - Fetch response
   * @param {Object} config - Request configuration
   * @returns {Response} - Modified response
   */
  async applyResponseInterceptors(response, config) {
    let modifiedResponse = response;
    
    for (const interceptor of this.interceptors.response) {
      try {
        modifiedResponse = await interceptor(modifiedResponse, config);
      } catch (error) {
        console.error('Response interceptor error:', error);
        throw error;
      }
    }
    
    return modifiedResponse;
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} - Request promise
   */
  async request(endpoint, options = {}) {
    const url = this.getURL(endpoint);
    
    const config = {
      method: 'GET',
      headers: this.getHeaders(options.headers),
      ...options
    };

    // Apply request interceptors
    const modifiedConfig = await this.applyRequestInterceptors(config);

    // Check cache for GET requests
    if (modifiedConfig.method === 'GET' && !options.skipCache) {
      const cached = this.getFromCache(url);
      if (cached) {
        return cached;
      }
    }

    try {
      // Make request
      const response = await fetch(url, modifiedConfig);
      
      // Apply response interceptors
      const modifiedResponse = await this.applyResponseInterceptors(response, modifiedConfig);
      
      // Handle non-200 responses
      if (!modifiedResponse.ok) {
        await this.handleErrorResponse(modifiedResponse);
      }

      // Parse response
      const data = await this.parseResponse(modifiedResponse);
      
      // Cache GET requests
      if (modifiedConfig.method === 'GET' && !options.skipCache) {
        this.setCache(url, data);
      }

      return data;
      
    } catch (error) {
      console.error('API request error:', error);
      throw this.createApiError(error, url, modifiedConfig);
    }
  }

  /**
   * Handle error response
   * @param {Response} response - Error response
   */
  async handleErrorResponse(response) {
    let errorData;
    
    try {
      errorData = await response.json();
    } catch {
      errorData = { 
        error: response.statusText || 'Unknown error',
        status: response.status 
      };
    }

    // Handle specific error codes
    switch (response.status) {
      case 401:
        // Unauthorized - redirect to login
        if (window.auth) {
          window.auth.logout();
        }
        break;
      case 403:
        // Forbidden - show access denied
        console.warn('Access denied:', errorData);
        break;
      case 404:
        // Not found
        console.warn('Resource not found:', errorData);
        break;
      case 500:
        // Server error
        console.error('Server error:', errorData);
        break;
    }

    const error = new Error(errorData.error || errorData.message || 'API request failed');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  /**
   * Parse response based on content type
   * @param {Response} response - Fetch response
   * @returns {*} - Parsed response data
   */
  async parseResponse(response) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType && contentType.includes('text/')) {
      return await response.text();
    } else {
      return await response.blob();
    }
  }

  /**
   * Create API error with context
   * @param {Error} error - Original error
   * @param {string} url - Request URL
   * @param {Object} config - Request config
   * @returns {Error} - API error
   */
  createApiError(error, url, config) {
    const apiError = new Error(error.message);
    apiError.originalError = error;
    apiError.url = url;
    apiError.config = config;
    apiError.status = error.status;
    apiError.data = error.data;
    return apiError;
  }

  /**
   * Get from cache
   * @param {string} key - Cache key
   * @returns {*} - Cached data or null
   */
  getFromCache(key) {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    
    if (cached) {
      this.cache.delete(key);
    }
    
    return null;
  }

  /**
   * Set cache
   * @param {string} key - Cache key
   * @param {*} data - Data to cache
   */
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear cache
   * @param {string} pattern - Optional pattern to match keys
   */
  clearCache(pattern = null) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // HTTP method shortcuts

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} - Request promise
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {*} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} - Request promise
   */
  post(endpoint, data = null, options = {}) {
    const requestOptions = {
      ...options,
      method: 'POST'
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    return this.request(endpoint, requestOptions);
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {*} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} - Request promise
   */
  put(endpoint, data = null, options = {}) {
    const requestOptions = {
      ...options,
      method: 'PUT'
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    return this.request(endpoint, requestOptions);
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {*} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} - Request promise
   */
  patch(endpoint, data = null, options = {}) {
    const requestOptions = {
      ...options,
      method: 'PATCH'
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    return this.request(endpoint, requestOptions);
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} - Request promise
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Upload file
   * @param {string} endpoint - Upload endpoint
   * @param {File|FormData} file - File or FormData to upload
   * @param {Object} options - Request options
   * @returns {Promise} - Upload promise
   */
  upload(endpoint, file, options = {}) {
    const formData = file instanceof FormData ? file : new FormData();
    
    if (!(file instanceof FormData)) {
      formData.append('file', file);
    }

    const requestOptions = {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...this.getHeaders(options.headers)
      }
    };

    // Remove Content-Type header for file uploads
    delete requestOptions.headers['Content-Type'];

    return this.request(endpoint, requestOptions);
  }
}

// API service classes for different endpoints

/**
 * Authentication API service
 */
class AuthAPI {
  constructor(client) {
    this.client = client;
  }

  login(credentials, userType = 'cliente') {
    const endpoint = userType === 'cliente' ? '/auth/cliente/login' : '/auth/admin/login';
    return this.client.post(endpoint, credentials);
  }

  register(userData, userType = 'cliente') {
    const endpoint = userType === 'cliente' ? '/auth/cliente/register' : '/auth/admin/register';
    return this.client.post(endpoint, userData);
  }

  logout() {
    return this.client.post('/auth/logout');
  }

  validateToken() {
    return this.client.post('/auth/validate');
  }

  refreshToken() {
    return this.client.post('/auth/refresh');
  }

  updateProfile(profileData) {
    return this.client.put('/auth/profile', profileData);
  }

  changePassword(passwordData) {
    return this.client.post('/auth/change-password', passwordData);
  }
}

/**
 * Clients API service
 */
class ClientesAPI {
  constructor(client) {
    this.client = client;
  }

  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.client.get(`/clientes${query ? '?' + query : ''}`);
  }

  getById(id) {
    return this.client.get(`/clientes/${id}`);
  }

  create(clienteData) {
    return this.client.post('/clientes', clienteData);
  }

  update(id, clienteData) {
    return this.client.put(`/clientes/${id}`, clienteData);
  }

  delete(id) {
    return this.client.delete(`/clientes/${id}`);
  }
}

/**
 * Vehicles API service
 */
class VeiculosAPI {
  constructor(client) {
    this.client = client;
  }

  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.client.get(`/veiculos${query ? '?' + query : ''}`);
  }

  getById(id) {
    return this.client.get(`/veiculos/${id}`);
  }

  create(veiculoData) {
    return this.client.post('/veiculos', veiculoData);
  }

  update(id, veiculoData) {
    return this.client.put(`/veiculos/${id}`, veiculoData);
  }

  delete(id) {
    return this.client.delete(`/veiculos/${id}`);
  }
}

/**
 * Revisions API service
 */
class RevisoesAPI {
  constructor(client) {
    this.client = client;
  }

  getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.client.get(`/revisoes${query ? '?' + query : ''}`);
  }

  getById(id) {
    return this.client.get(`/revisoes/${id}`);
  }

  create(revisaoData) {
    return this.client.post('/revisoes', revisaoData);
  }

  update(id, revisaoData) {
    return this.client.put(`/revisoes/${id}`, revisaoData);
  }

  delete(id) {
    return this.client.delete(`/revisoes/${id}`);
  }
}

/**
 * Reports API service
 */
class RelatoriosAPI {
  constructor(client) {
    this.client = client;
  }

  get(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.client.get(`/relatorios${query ? '?' + query : ''}`);
  }
}

/**
 * Upload API service
 */
class UploadAPI {
  constructor(client) {
    this.client = client;
  }

  uploadFile(file, type = 'general') {
    return this.client.upload('/upload', file, { 
      headers: { 'X-Upload-Type': type } 
    });
  }
}

// Create global API client instance
const apiClient = new ApiClient();

// Setup request interceptor to add loading state
apiClient.addRequestInterceptor((config) => {
  // Show loading indicator
  document.body.classList.add('api-loading');
  return config;
});

// Setup response interceptor to remove loading state
apiClient.addResponseInterceptor((response, config) => {
  // Hide loading indicator
  document.body.classList.remove('api-loading');
  return response;
});

// Create API service instances
const authAPI = new AuthAPI(apiClient);
const clientesAPI = new ClientesAPI(apiClient);
const veiculosAPI = new VeiculosAPI(apiClient);
const revisoesAPI = new RevisoesAPI(apiClient);
const relatoriosAPI = new RelatoriosAPI(apiClient);
const uploadAPI = new UploadAPI(apiClient);

// Export for use in other modules
window.ApiClient = ApiClient;
window.apiClient = apiClient;
window.authAPI = authAPI;
window.clientesAPI = clientesAPI;
window.veiculosAPI = veiculosAPI;
window.revisoesAPI = revisoesAPI;
window.relatoriosAPI = relatoriosAPI;
window.uploadAPI = uploadAPI;

export default apiClient;
export { 
  authAPI, 
  clientesAPI, 
  veiculosAPI, 
  revisoesAPI, 
  relatoriosAPI, 
  uploadAPI 
};