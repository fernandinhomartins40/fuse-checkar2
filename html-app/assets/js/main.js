/**
 * FUSE CHECKAR2 - Main Application Entry Point
 * Initializes the SPA and sets up routing
 */

import router from './core/router.js';
import auth from './core/auth.js';
import apiClient from './core/api.js';
import './core/middleware.js';

/**
 * Application class
 */
class App {
  constructor() {
    this.initialized = false;
    this.currentPage = null;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('🚀 Initializing CHECAR application...');
      
      // Setup global error handling
      this.setupErrorHandling();
      
      // Setup authentication listeners
      this.setupAuthListeners();
      
      // Setup routes
      this.setupRoutes();
      
      // Initialize authentication
      await this.initAuth();
      
      // Mark as initialized
      this.initialized = true;
      
      console.log('✅ CHECAR application initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
      this.showErrorPage(error);
    }
  }

  /**
   * Setup global error handling
   */
  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.handleError(event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason);
    });
  }

  /**
   * Setup authentication state listeners
   */
  setupAuthListeners() {
    auth.addListener((event, data) => {
      console.log(`Auth event: ${event}`, data);
      
      if (event === 'login') {
        // User logged in, might need to redirect
        this.handleAuthChange();
      } else if (event === 'logout') {
        // User logged out, redirect to home
        router.navigate('/');
      }
    });
  }

  /**
   * Handle authentication state changes
   */
  handleAuthChange() {
    const currentPath = window.location.pathname;
    
    // If user is on login page and authenticated, redirect to dashboard
    if (currentPath === '/login' || currentPath === '/registro') {
      const redirectTo = auth.getDefaultRedirect();
      router.navigate(redirectTo);
    }
  }

  /**
   * Initialize authentication
   */
  async initAuth() {
    // Auth is automatically initialized from localStorage
    // Just need to validate if needed
    if (auth.isAuth()) {
      console.log('✅ User is authenticated:', auth.getUser());
    } else {
      console.log('ℹ️ User is not authenticated');
    }
  }

  /**
   * Setup application routes
   */
  setupRoutes() {
    // Landing page
    router.addRoute('/', () => this.loadPage('landing'));
    
    // Authentication routes
    router.addRoute('/login', () => this.loadPage('login'));
    router.addRoute('/registro', () => this.loadPage('registro'));
    router.addRoute('/admin/login', () => this.loadPage('admin-login'));
    
    // Protected admin routes
    router.addRoute('/admin/dashboard', () => this.loadPage('admin-dashboard'), [window.adminMiddleware]);
    router.addRoute('/clientes', () => this.loadPage('clientes'), [window.adminMiddleware]);
    router.addRoute('/clientes/novo', () => this.loadPage('cliente-novo'), [window.adminMiddleware]);
    router.addRoute('/clientes/:id', ({ params }) => this.loadPage('cliente-detalhe', { clienteId: params.id }), [window.adminMiddleware]);
    router.addRoute('/clientes/:id/editar', ({ params }) => this.loadPage('cliente-editar', { clienteId: params.id }), [window.adminMiddleware]);
    
    router.addRoute('/veiculos', () => this.loadPage('veiculos'), [window.adminMiddleware]);
    router.addRoute('/veiculos/novo', () => this.loadPage('veiculo-novo'), [window.adminMiddleware]);
    router.addRoute('/veiculos/:id', ({ params }) => this.loadPage('veiculo-detalhe', { veiculoId: params.id }), [window.adminMiddleware]);
    router.addRoute('/veiculos/:id/editar', ({ params }) => this.loadPage('veiculo-editar', { veiculoId: params.id }), [window.adminMiddleware]);
    
    router.addRoute('/revisoes', () => this.loadPage('revisoes'), [window.adminMiddleware]);
    router.addRoute('/revisoes/nova', () => this.loadPage('revisao-nova'), [window.adminMiddleware]);
    router.addRoute('/revisoes/:id', ({ params }) => this.loadPage('revisao-detalhe', { revisaoId: params.id }), [window.adminMiddleware]);
    
    router.addRoute('/relatorios', () => this.loadPage('relatorios'), [window.adminMiddleware]);
    
    // Protected client routes
    router.addRoute('/cliente/dashboard', () => this.loadPage('cliente-dashboard'), [window.clientMiddleware]);
    router.addRoute('/cliente/perfil', () => this.loadPage('cliente-perfil'), [window.clientMiddleware]);
    router.addRoute('/cliente/veiculos', () => this.loadPage('cliente-veiculos'), [window.clientMiddleware]);
    router.addRoute('/cliente/veiculos/:id', ({ params }) => this.loadPage('cliente-veiculo-detalhe', { veiculoId: params.id }), [window.clientMiddleware]);
    router.addRoute('/cliente/revisoes', () => this.loadPage('cliente-revisoes'), [window.clientMiddleware]);
    router.addRoute('/cliente/revisoes/:id', ({ params }) => this.loadPage('cliente-revisao-detalhe', { revisaoId: params.id }), [window.clientMiddleware]);
    router.addRoute('/cliente/recomendacoes', () => this.loadPage('cliente-recomendacoes'), [window.clientMiddleware]);
    router.addRoute('/cliente/recomendacoes/:id', ({ params }) => this.loadPage('cliente-recomendacao-detalhe', { recomendacaoId: params.id }), [window.clientMiddleware]);
    
    // Error routes
    router.addRoute('/404', () => this.loadPage('404'));
    router.addRoute('*', () => this.loadPage('404')); // Catch-all route
  }

  /**
   * Load a page
   * @param {string} pageName - Name of the page to load
   * @param {Object} data - Data to pass to the page
   */
  async loadPage(pageName, data = {}) {
    try {
      console.log(`📄 Loading page: ${pageName}`, data);
      
      // Show loading indicator
      this.showLoading();
      
      // Clean up current page
      if (this.currentPage && typeof this.currentPage.destroy === 'function') {
        this.currentPage.destroy();
      }
      
      // Special case for landing page (already loaded)
      if (pageName === 'landing' && window.location.pathname === '/') {
        this.hideLoading();
        return;
      }
      
      // Load page module
      const pageModule = await this.loadPageModule(pageName);
      
      if (pageModule && pageModule.default) {
        // Initialize page
        this.currentPage = new pageModule.default(data);
        
        // Set page title
        this.setPageTitle(this.currentPage.title || 'CHECAR');
        
      } else {
        throw new Error(`Page module not found: ${pageName}`);
      }
      
    } catch (error) {
      console.error(`Failed to load page ${pageName}:`, error);
      this.showErrorPage(error);
    } finally {
      this.hideLoading();
    }
  }

  /**
   * Load page module dynamically
   * @param {string} pageName - Name of the page module
   * @returns {Promise} - Page module
   */
  async loadPageModule(pageName) {
    const moduleMap = {
      // Auth pages
      'login': () => import('./pages/login.js'),
      'registro': () => import('./pages/registro.js'),
      'admin-login': () => import('./pages/admin-login.js'),
      
      // Admin pages
      'admin-dashboard': () => import('./pages/admin/dashboard.js'),
      'clientes': () => import('./pages/admin/clientes.js'),
      'cliente-novo': () => import('./pages/admin/cliente-novo.js'),
      'cliente-detalhe': () => import('./pages/admin/cliente-detalhe.js'),
      'cliente-editar': () => import('./pages/admin/cliente-editar.js'),
      'veiculos': () => import('./pages/admin/veiculos.js'),
      'veiculo-novo': () => import('./pages/admin/veiculo-novo.js'),
      'veiculo-detalhe': () => import('./pages/admin/veiculo-detalhe.js'),
      'veiculo-editar': () => import('./pages/admin/veiculo-editar.js'),
      'revisoes': () => import('./pages/admin/revisoes.js'),
      'revisao-nova': () => import('./pages/admin/revisao-nova.js'),
      'revisao-detalhe': () => import('./pages/admin/revisao-detalhe.js'),
      'relatorios': () => import('./pages/admin/relatorios.js'),
      
      // Client pages
      'cliente-dashboard': () => import('./pages/cliente/dashboard.js'),
      'cliente-perfil': () => import('./pages/cliente/perfil.js'),
      'cliente-veiculos': () => import('./pages/cliente/veiculos.js'),
      'cliente-veiculo-detalhe': () => import('./pages/cliente/veiculo-detalhe.js'),
      'cliente-revisoes': () => import('./pages/cliente/revisoes.js'),
      'cliente-revisao-detalhe': () => import('./pages/cliente/revisao-detalhe.js'),
      'cliente-recomendacoes': () => import('./pages/cliente/recomendacoes.js'),
      'cliente-recomendacao-detalhe': () => import('./pages/cliente/recomendacao-detalhe.js'),
      
      // Error pages
      '404': () => import('./pages/404.js')
    };

    const moduleLoader = moduleMap[pageName];
    
    if (moduleLoader) {
      return await moduleLoader();
    }
    
    throw new Error(`Unknown page: ${pageName}`);
  }

  /**
   * Show loading indicator
   */
  showLoading() {
    document.body.classList.add('loading');
    
    let loading = document.getElementById('loading');
    if (!loading) {
      loading = document.createElement('div');
      loading.id = 'loading';
      loading.className = 'fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center';
      loading.innerHTML = '<div class="spinner-lg"></div>';
      document.body.appendChild(loading);
    }
    
    loading.style.display = 'flex';
  }

  /**
   * Hide loading indicator
   */
  hideLoading() {
    document.body.classList.remove('loading');
    
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }

  /**
   * Set page title
   * @param {string} title - Page title
   */
  setPageTitle(title) {
    document.title = title + ' - CHECAR';
  }

  /**
   * Handle application errors
   * @param {Error} error - Error object
   */
  handleError(error) {
    console.error('Application error:', error);
    
    // Show user-friendly error message
    if (window.Toast) {
      Toast.error('Ocorreu um erro inesperado. Tente novamente.');
    }
  }

  /**
   * Show error page
   * @param {Error} error - Error object
   */
  showErrorPage(error) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
          <div class="text-center max-w-md mx-auto p-6">
            <div class="mb-4">
              <span class="material-symbols-outlined text-6xl text-red-500">error</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Oops! Algo deu errado</h1>
            <p class="text-gray-600 mb-6">
              ${error.message || 'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'}
            </p>
            <div class="space-y-2">
              <button onclick="window.location.reload()" class="btn btn-primary w-full">
                Recarregar Página
              </button>
              <a href="/" class="btn btn-outline w-full">
                Voltar ao Início
              </a>
            </div>
          </div>
        </div>
      `;
    }
  }

  /**
   * Get application info
   * @returns {Object} - Application information
   */
  getInfo() {
    return {
      name: 'CHECAR',
      version: '1.0.0',
      initialized: this.initialized,
      currentPage: this.currentPage?.constructor.name || null,
      currentPath: window.location.pathname,
      authenticated: auth.isAuth(),
      user: auth.getUser()
    };
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Create global app instance
    window.app = new App();
    
    // Initialize the application
    await window.app.init();
    
    console.log('🎉 CHECAR application ready!');
    
  } catch (error) {
    console.error('💥 Failed to start application:', error);
  }
});

// Export for potential external use
export default App;