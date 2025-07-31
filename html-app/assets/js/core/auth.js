/**
 * FUSE CHECKAR2 - Authentication System
 * Handles user authentication and authorization
 */

class AuthManager {
  constructor() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    this.role = null;
    this.listeners = [];
    
    // Initialize from storage
    this.loadFromStorage();
    
    // Setup periodic token validation
    this.setupTokenValidation();
  }

  /**
   * Load authentication data from localStorage
   */
  loadFromStorage() {
    try {
      // Check for client authentication
      const clientAuth = localStorage.getItem('clienteAuth');
      if (clientAuth) {
        const authData = JSON.parse(clientAuth);
        if (authData.isAuthenticated && authData.user) {
          this.setUser(authData.user);
          this.token = authData.token || null;
          this.isAuthenticated = true;
          this.role = 'cliente';
          this.notifyListeners('login', this.user);
          return;
        }
      }

      // Check for admin authentication
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth) {
        const authData = JSON.parse(adminAuth);
        if (authData.isAuthenticated && authData.user) {
          this.setUser(authData.user);
          this.token = authData.token || null;
          this.isAuthenticated = true;
          this.role = authData.user.role || 'mecanico';
          this.notifyListeners('login', this.user);
          return;
        }
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error);
      this.clearStorage();
    }
  }

  /**
   * Save authentication data to localStorage
   */
  saveToStorage() {
    try {
      const authData = {
        isAuthenticated: this.isAuthenticated,
        user: this.user,
        token: this.token,
        timestamp: Date.now()
      };

      const storageKey = this.role === 'cliente' ? 'clienteAuth' : 'adminAuth';
      localStorage.setItem(storageKey, JSON.stringify(authData));
    } catch (error) {
      console.error('Error saving auth to storage:', error);
    }
  }

  /**
   * Clear authentication data from localStorage
   */
  clearStorage() {
    localStorage.removeItem('clienteAuth');
    localStorage.removeItem('adminAuth');
  }

  /**
   * Login user with credentials
   * @param {Object} credentials - Login credentials
   * @param {string} userType - 'cliente' or 'admin'
   * @returns {Promise} - Login promise
   */
  async login(credentials, userType = 'cliente') {
    try {
      const endpoint = userType === 'cliente' 
        ? '/api/auth/cliente/login' 
        : '/api/auth/admin/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.setUser(data.user);
        this.token = data.token || null;
        this.isAuthenticated = true;
        this.role = userType === 'cliente' ? 'cliente' : (data.user.role || 'mecanico');
        
        this.saveToStorage();
        this.notifyListeners('login', this.user);
        
        return {
          success: true,
          user: this.user,
          redirectTo: this.getDefaultRedirect()
        };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Erro ao fazer login'
      };
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @param {string} userType - 'cliente' or 'admin'
   * @returns {Promise} - Registration promise
   */
  async register(userData, userType = 'cliente') {
    try {
      const endpoint = userType === 'cliente' 
        ? '/api/auth/cliente/register' 
        : '/api/auth/admin/register';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success && data.user) {
        // Auto-login after successful registration
        this.setUser(data.user);
        this.token = data.token || null;
        this.isAuthenticated = true;
        this.role = userType === 'cliente' ? 'cliente' : 'mecanico';
        
        this.saveToStorage();
        this.notifyListeners('login', this.user);
        
        return {
          success: true,
          user: this.user,
          redirectTo: this.getDefaultRedirect()
        };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Erro ao fazer cadastro'
      };
    }
  }

  /**
   * Logout current user
   */
  logout() {
    const wasAuthenticated = this.isAuthenticated;
    
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    this.role = null;
    
    this.clearStorage();
    
    if (wasAuthenticated) {
      this.notifyListeners('logout');
    }
    
    // Redirect to login page
    if (window.router) {
      window.router.navigate('/login');
    }
  }

  /**
   * Set current user
   * @param {Object} user - User object
   */
  setUser(user) {
    this.user = user;
  }

  /**
   * Get current user
   * @returns {Object|null} - Current user or null
   */
  getUser() {
    return this.user;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - Authentication status
   */
  isAuth() {
    return this.isAuthenticated && this.user !== null;
  }

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean} - True if user has role
   */
  hasRole(role) {
    return this.isAuthenticated && this.role === role;
  }

  /**
   * Check if user is admin/mechanic
   * @returns {boolean} - True if user is admin/mechanic
   */
  isAdmin() {
    return this.hasRole('mecanico') || this.hasRole('admin');
  }

  /**
   * Check if user is client
   * @returns {boolean} - True if user is client
   */
  isClient() {
    return this.hasRole('cliente');
  }

  /**
   * Get authentication headers for API requests
   * @returns {Object} - Headers object
   */
  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Get default redirect path based on user role
   * @returns {string} - Default redirect path
   */
  getDefaultRedirect() {
    if (this.isClient()) {
      return '/cliente/dashboard';
    } else if (this.isAdmin()) {
      return '/admin/dashboard';
    }
    return '/';
  }

  /**
   * Add authentication state listener
   * @param {Function} callback - Callback function
   */
  addListener(callback) {
    this.listeners.push(callback);
  }

  /**
   * Remove authentication state listener
   * @param {Function} callback - Callback function to remove
   */
  removeListener(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  /**
   * Notify all listeners of auth state changes
   * @param {string} event - Event type ('login' or 'logout')
   * @param {*} data - Event data
   */
  notifyListeners(event, data = null) {
    this.listeners.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Auth listener error:', error);
      }
    });
  }

  /**
   * Setup periodic token validation
   */
  setupTokenValidation() {
    // Check token validity every 5 minutes
    setInterval(() => {
      this.validateToken();
    }, 5 * 60 * 1000);
  }

  /**
   * Validate current token
   */
  async validateToken() {
    if (!this.token || !this.isAuthenticated) {
      return;
    }

    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const data = await response.json();

      if (!data.success || !data.valid) {
        console.warn('Token validation failed, logging out');
        this.logout();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      // Don't auto-logout on network errors
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken() {
    if (!this.token) {
      return false;
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const data = await response.json();

      if (data.success && data.token) {
        this.token = data.token;
        this.saveToStorage();
        return true;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }

    return false;
  }

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} - Update promise
   */
  async updateProfile(profileData) {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.setUser(data.user);
        this.saveToStorage();
        this.notifyListeners('profile_updated', this.user);
        
        return {
          success: true,
          user: this.user
        };
      } else {
        throw new Error(data.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error.message || 'Erro ao atualizar perfil'
      };
    }
  }

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} - Change password promise
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          message: 'Senha alterada com sucesso'
        };
      } else {
        throw new Error(data.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        error: error.message || 'Erro ao alterar senha'
      };
    }
  }
}

// Authentication middleware for router
const authMiddleware = (context) => {
  if (!auth.isAuth()) {
    console.warn('Authentication required, redirecting to login');
    window.router.navigate('/login');
    throw new Error('Authentication required');
  }
};

// Admin middleware for router
const adminMiddleware = (context) => {
  if (!auth.isAuth() || !auth.isAdmin()) {
    console.warn('Admin access required, redirecting');
    if (auth.isAuth()) {
      window.router.navigate('/cliente/dashboard');
    } else {
      window.router.navigate('/admin/login');
    }
    throw new Error('Admin access required');
  }
};

// Client middleware for router
const clientMiddleware = (context) => {
  if (!auth.isAuth() || !auth.isClient()) {
    console.warn('Client access required, redirecting');
    if (auth.isAuth()) {
      window.router.navigate('/admin/dashboard');
    } else {
      window.router.navigate('/login');
    }
    throw new Error('Client access required');
  }
};

// Create global auth instance
const auth = new AuthManager();

// Export for use in other modules
window.AuthManager = AuthManager;
window.auth = auth;
window.authMiddleware = authMiddleware;
window.adminMiddleware = adminMiddleware;
window.clientMiddleware = clientMiddleware;

export default auth;
export { authMiddleware, adminMiddleware, clientMiddleware };