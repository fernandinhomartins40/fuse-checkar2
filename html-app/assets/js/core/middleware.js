/**
 * FUSE CHECKAR2 - Route Middleware
 * Authentication and authorization middleware for routes
 */

/**
 * Admin authentication middleware
 * Requires user to be logged in as admin
 */
window.adminMiddleware = async (context, next) => {
  try {
    const user = window.auth.getUser();
    const isAuth = window.auth.isAuth();
    
    if (!isAuth || !user) {
      console.log('Admin middleware: User not authenticated');
      window.Toast.warning('Você precisa fazer login para acessar esta página');
      window.router.navigate('/admin/login');
      return;
    }
    
    // Check if user has admin role
    if (user.role !== 'admin' && user.tipo !== 'admin') {
      console.log('Admin middleware: User does not have admin role');
      window.Toast.error('Acesso negado. Apenas administradores podem acessar esta página.');
      window.router.navigate('/');
      return;
    }
    
    // User is authenticated and authorized, continue
    console.log('Admin middleware: Access granted');
    next();
    
  } catch (error) {
    console.error('Admin middleware error:', error);
    window.Toast.error('Erro de autenticação');
    window.router.navigate('/admin/login');
  }
};

/**
 * Client authentication middleware
 * Requires user to be logged in as client
 */
window.clientMiddleware = async (context, next) => {
  try {
    const user = window.auth.getUser();
    const isAuth = window.auth.isAuth();
    
    if (!isAuth || !user) {
      console.log('Client middleware: User not authenticated');
      window.Toast.warning('Você precisa fazer login para acessar esta página');
      window.router.navigate('/login');
      return;
    }
    
    // Check if user has client role
    if (user.role !== 'cliente' && user.tipo !== 'cliente') {
      console.log('Client middleware: User does not have client role');
      window.Toast.error('Acesso negado. Esta área é exclusiva para clientes.');
      window.router.navigate('/');
      return;
    }
    
    // User is authenticated and authorized, continue
    console.log('Client middleware: Access granted');
    next();
    
  } catch (error) {
    console.error('Client middleware error:', error);
    window.Toast.error('Erro de autenticação');
    window.router.navigate('/login');
  }
};

/**
 * Guest middleware
 * Redirects authenticated users away from guest-only pages (like login)
 */
window.guestMiddleware = async (context, next) => {
  try {
    const user = window.auth.getUser();
    const isAuth = window.auth.isAuth();
    
    if (isAuth && user) {
      // User is already authenticated, redirect to appropriate dashboard
      const redirectTo = window.auth.getDefaultRedirect();
      console.log('Guest middleware: User already authenticated, redirecting to', redirectTo);
      window.router.navigate(redirectTo);
      return;
    }
    
    // User is not authenticated, continue to guest page
    console.log('Guest middleware: User not authenticated, access granted');
    next();
    
  } catch (error) {
    console.error('Guest middleware error:', error);
    next(); // Continue on error for guest pages
  }
};

/**
 * Role-based middleware factory
 * Creates middleware for specific roles
 */
window.roleMiddleware = (allowedRoles) => {
  return async (context, next) => {
    try {
      const user = window.auth.getUser();
      const isAuth = window.auth.isAuth();
      
      if (!isAuth || !user) {
        console.log('Role middleware: User not authenticated');
        window.Toast.warning('Você precisa fazer login para acessar esta página');
        window.router.navigate('/login');
        return;
      }
      
      const userRole = user.role || user.tipo;
      
      if (!allowedRoles.includes(userRole)) {
        console.log(`Role middleware: User role '${userRole}' not in allowed roles:`, allowedRoles);
        window.Toast.error('Acesso negado. Você não tem permissão para acessar esta página.');
        window.router.navigate('/');
        return;
      }
      
      // User has required role, continue
      console.log(`Role middleware: User role '${userRole}' authorized`);
      next();
      
    } catch (error) {
      console.error('Role middleware error:', error);
      window.Toast.error('Erro de autenticação');
      window.router.navigate('/login');
    }
  };
};

/**
 * Permission-based middleware factory
 * Creates middleware for specific permissions
 */
window.permissionMiddleware = (requiredPermissions) => {
  return async (context, next) => {
    try {
      const user = window.auth.getUser();
      const isAuth = window.auth.isAuth();
      
      if (!isAuth || !user) {
        console.log('Permission middleware: User not authenticated');
        window.Toast.warning('Você precisa fazer login para acessar esta página');
        window.router.navigate('/login');
        return;
      }
      
      const userPermissions = user.permissions || [];
      
      // Check if user has all required permissions
      const hasAllPermissions = requiredPermissions.every(permission => 
        userPermissions.includes(permission)
      );
      
      if (!hasAllPermissions) {
        console.log('Permission middleware: User missing required permissions');
        window.Toast.error('Acesso negado. Você não tem as permissões necessárias.');
        window.router.navigate('/');
        return;
      }
      
      // User has required permissions, continue
      console.log('Permission middleware: User has required permissions');
      next();
      
    } catch (error) {
      console.error('Permission middleware error:', error);
      window.Toast.error('Erro de autenticação');
      window.router.navigate('/login');
    }
  };
};

/**
 * Throttle middleware
 * Limits the frequency of route access
 */
window.throttleMiddleware = (maxRequests = 10, windowMs = 60000) => {
  const requests = new Map();
  
  return async (context, next) => {
    try {
      const now = Date.now();
      const userKey = window.auth.getUser()?.id || 'anonymous';
      const userRequests = requests.get(userKey) || [];
      
      // Remove old requests outside the window
      const validRequests = userRequests.filter(timestamp => 
        now - timestamp < windowMs
      );
      
      if (validRequests.length >= maxRequests) {
        console.log('Throttle middleware: Rate limit exceeded');
        window.Toast.warning('Muitas tentativas. Tente novamente em alguns instantes.');
        return;
      }
      
      // Add current request
      validRequests.push(now);
      requests.set(userKey, validRequests);
      
      // Continue to next middleware
      next();
      
    } catch (error) {
      console.error('Throttle middleware error:', error);
      next(); // Continue on error
    }
  };
};

/**
 * Logging middleware
 * Logs route access for debugging and analytics
 */
window.loggingMiddleware = async (context, next) => {
  try {
    const user = window.auth.getUser();
    const timestamp = new Date().toISOString();
    const userInfo = user ? `${user.nome || user.email} (${user.role || user.tipo})` : 'Anonymous';
    
    console.log(`[${timestamp}] Route accessed: ${context.path} by ${userInfo}`);
    
    // Continue to next middleware
    next();
    
  } catch (error) {
    console.error('Logging middleware error:', error);
    next(); // Continue on error
  }
};

/**
 * CSRF protection middleware
 * Validates CSRF tokens for state-changing operations
 */
window.csrfMiddleware = async (context, next) => {
  try {
    const method = context.method || 'GET';
    
    // Only check CSRF for state-changing methods
    if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
      const token = context.headers?.['X-CSRF-Token'] || context.data?.csrfToken;
      const storedToken = sessionStorage.getItem('csrfToken');
      
      if (!token || token !== storedToken) {
        console.log('CSRF middleware: Invalid or missing CSRF token');
        window.Toast.error('Token de segurança inválido. Recarregue a página.');
        return;
      }
    }
    
    // Continue to next middleware
    next();
    
  } catch (error) {
    console.error('CSRF middleware error:', error);
    next(); // Continue on error for now
  }
};

// Export middleware functions
export {
  adminMiddleware: window.adminMiddleware,
  clientMiddleware: window.clientMiddleware,
  guestMiddleware: window.guestMiddleware,
  roleMiddleware: window.roleMiddleware,
  permissionMiddleware: window.permissionMiddleware,
  throttleMiddleware: window.throttleMiddleware,
  loggingMiddleware: window.loggingMiddleware,
  csrfMiddleware: window.csrfMiddleware
};