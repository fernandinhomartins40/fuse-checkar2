/**
 * FUSE CHECKAR2 - SPA Router
 * Single Page Application routing system
 */

class Router {
  constructor() {
    this.routes = new Map();
    this.middlewares = [];
    this.currentRoute = null;
    this.params = {};
    this.query = {};
    this.isNavigating = false;
    
    // Initialize router
    this.init();
  }

  /**
   * Initialize the router
   */
  init() {
    // Listen for browser navigation
    window.addEventListener('popstate', this.handlePopState.bind(this));
    
    // Handle initial load
    window.addEventListener('DOMContentLoaded', () => {
      this.handleRoute();
    });

    // Intercept link clicks
    document.addEventListener('click', this.handleLinkClick.bind(this));
  }

  /**
   * Add a route to the router
   * @param {string} path - Route path (can include parameters like /users/:id)
   * @param {Function} handler - Route handler function
   * @param {Array} middleware - Middleware functions to run before handler
   */
  addRoute(path, handler, middleware = []) {
    const routeRegex = this.pathToRegex(path);
    const paramNames = this.getParamNames(path);
    
    this.routes.set(path, {
      regex: routeRegex,
      handler,
      middleware: [...this.middlewares, ...middleware],
      paramNames,
      originalPath: path
    });
  }

  /**
   * Add global middleware
   * @param {Function} middleware - Middleware function
   */
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Navigate to a route
   * @param {string} path - Path to navigate to
   * @param {boolean} replace - Replace current history entry
   */
  navigate(path, replace = false) {
    if (this.isNavigating) return;
    
    if (replace) {
      history.replaceState(null, '', path);
    } else {
      history.pushState(null, '', path);
    }
    
    this.handleRoute();
  }

  /**
   * Go back in history
   */
  back() {
    history.back();
  }

  /**
   * Go forward in history
   */
  forward() {
    history.forward();
  }

  /**
   * Handle browser back/forward navigation
   */
  handlePopState(event) {
    this.handleRoute();
  }

  /**
   * Handle link clicks for SPA navigation
   */
  handleLinkClick(event) {
    const link = event.target.closest('a');
    
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Skip external links, mailto, tel, etc.
    if (!href || 
        href.startsWith('http') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        link.hasAttribute('download') ||
        link.getAttribute('target') === '_blank') {
      return;
    }

    // Skip if ctrl/cmd/shift key is pressed
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    event.preventDefault();
    this.navigate(href);
  }

  /**
   * Handle current route
   */
  async handleRoute() {
    if (this.isNavigating) return;
    this.isNavigating = true;

    const path = window.location.pathname;
    const search = window.location.search;
    
    // Parse query parameters
    this.query = this.parseQuery(search);
    
    // Find matching route
    const route = this.findRoute(path);
    
    if (route) {
      // Extract parameters
      this.params = this.extractParams(path, route);
      this.currentRoute = route;
      
      try {
        // Run middleware
        await this.runMiddleware(route.middleware, { path, params: this.params, query: this.query });
        
        // Run route handler
        await route.handler({
          path,
          params: this.params,
          query: this.query,
          router: this
        });
        
      } catch (error) {
        console.error('Route error:', error);
        this.handleError(error);
      }
    } else {
      // Handle 404
      this.handle404(path);
    }
    
    this.isNavigating = false;
  }

  /**
   * Find matching route for path
   * @param {string} path - Current path
   * @returns {Object|null} - Matching route or null
   */
  findRoute(path) {
    for (const [routePath, route] of this.routes) {
      if (route.regex.test(path)) {
        return route;
      }
    }
    return null;
  }

  /**
   * Convert path pattern to regex
   * @param {string} path - Path pattern
   * @returns {RegExp} - Regular expression
   */
  pathToRegex(path) {
    // Escape special regex characters except for parameter patterns
    const escapedPath = path
      .replace(/[.+*?^${}()|[\]\\]/g, '\\$&')  // Escape regex special chars
      .replace(/\\:\w+/g, '([^/]+)')           // Replace :param with capture group
      .replace(/\\\*/g, '.*');                 // Replace * with wildcard
    
    return new RegExp(`^${escapedPath}$`);
  }

  /**
   * Get parameter names from path
   * @param {string} path - Path pattern
   * @returns {Array} - Parameter names
   */
  getParamNames(path) {
    const matches = path.match(/:(\w+)/g);
    return matches ? matches.map(match => match.slice(1)) : [];
  }

  /**
   * Extract parameters from path
   * @param {string} path - Current path
   * @param {Object} route - Route object
   * @returns {Object} - Parameters object
   */
  extractParams(path, route) {
    const matches = path.match(route.regex);
    const params = {};
    
    if (matches && route.paramNames) {
      route.paramNames.forEach((name, index) => {
        params[name] = matches[index + 1];
      });
    }
    
    return params;
  }

  /**
   * Parse query string
   * @param {string} search - Query string
   * @returns {Object} - Query parameters object
   */
  parseQuery(search) {
    const query = {};
    if (search) {
      const params = new URLSearchParams(search);
      for (const [key, value] of params) {
        query[key] = value;
      }
    }
    return query;
  }

  /**
   * Run middleware functions
   * @param {Array} middleware - Array of middleware functions
   * @param {Object} context - Route context
   */
  async runMiddleware(middleware, context) {
    for (const mw of middleware) {
      if (typeof mw === 'function') {
        await mw(context);
      }
    }
  }

  /**
   * Handle 404 error
   * @param {string} path - Current path
   */
  handle404(path) {
    console.warn(`404: Route not found for ${path}`);
    
    // Try to show 404 page
    const notFoundHandler = this.routes.get('*')?.handler || this.routes.get('/404')?.handler;
    
    if (notFoundHandler) {
      notFoundHandler({
        path,
        params: {},
        query: this.query,
        router: this,
        error: 'Page not found'
      });
    } else {
      // Fallback 404 handling
      this.showDefaultNotFound(path);
    }
  }

  /**
   * Handle route errors
   * @param {Error} error - Error object
   */
  handleError(error) {
    console.error('Router error:', error);
    
    // Try to show error page
    const errorHandler = this.routes.get('/error')?.handler;
    
    if (errorHandler) {
      errorHandler({
        path: window.location.pathname,
        params: this.params,
        query: this.query,
        router: this,
        error
      });
    } else {
      // Fallback error handling
      this.showDefaultError(error);
    }
  }

  /**
   * Show default 404 page
   * @param {string} path - Current path
   */
  showDefaultNotFound(path) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4 text-gray-800">404</h1>
            <p class="text-xl text-gray-600 mb-4">Página não encontrada</p>
            <p class="text-gray-500 mb-6">A página "${path}" não existe.</p>
            <a href="/" class="btn btn-primary">Voltar ao Início</a>
          </div>
        </div>
      `;
    }
  }

  /**
   * Show default error page
   * @param {Error} error - Error object
   */
  showDefaultError(error) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4 text-red-600">Erro</h1>
            <p class="text-xl text-gray-600 mb-4">Algo deu errado</p>
            <p class="text-gray-500 mb-6">${error.message}</p>
            <div class="flex gap-4 justify-center">
              <button onclick="window.location.reload()" class="btn btn-primary">
                Recarregar Página
              </button>
              <a href="/" class="btn btn-outline">Voltar ao Início</a>
            </div>
          </div>
        </div>
      `;
    }
  }

  /**
   * Get current route information
   * @returns {Object} - Current route info
   */
  getCurrentRoute() {
    return {
      path: window.location.pathname,
      params: this.params,
      query: this.query,
      route: this.currentRoute
    };
  }

  /**
   * Check if current path matches pattern
   * @param {string} pattern - Path pattern to check
   * @returns {boolean} - True if matches
   */
  matches(pattern) {
    const regex = this.pathToRegex(pattern);
    return regex.test(window.location.pathname);
  }

  /**
   * Redirect to another route
   * @param {string} path - Path to redirect to
   * @param {boolean} replace - Replace current history entry
   */
  redirect(path, replace = true) {
    this.navigate(path, replace);
  }
}

// Create global router instance
const router = new Router();

// Export for use in other modules
window.Router = Router;
window.router = router;

export default router;