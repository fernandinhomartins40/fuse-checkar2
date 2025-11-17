import { verifyAccessToken } from '../config/jwt.js';
import logger from '../config/logger.js';

/**
 * Middleware de autenticação JWT
 * Verifica se o token está presente e válido no header Authorization
 */
export const authenticate = (req, res, next) => {
  try {
    // Extrair token do header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token de autenticação não fornecido',
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer "

    // Verificar e decodificar token
    const decoded = verifyAccessToken(token);

    // Anexar dados do usuário à requisição
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    logger.debug(`Usuário autenticado: ${decoded.email} (${decoded.role})`);

    next();
  } catch (error) {
    logger.warn('Erro na autenticação:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expirado',
        code: 'TOKEN_EXPIRED',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Token inválido',
        code: 'INVALID_TOKEN',
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Falha na autenticação',
    });
  }
};

/**
 * Middleware para verificar se o usuário tem uma role específica
 * @param {string|string[]} allowedRoles - Role(s) permitida(s)
 */
export const authorize = (allowedRoles) => {
  // Normalizar para array
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Usuário não autenticado',
      });
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`Acesso negado: usuário ${req.user.email} tentou acessar recurso de ${roles.join(',')}`);
      return res.status(403).json({
        success: false,
        error: 'Acesso negado - permissões insuficientes',
      });
    }

    next();
  };
};

/**
 * Middleware opcional de autenticação
 * Tenta autenticar, mas não bloqueia se falhar
 */
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyAccessToken(token);

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    }
  } catch (error) {
    // Ignora erros silenciosamente
    logger.debug('Auth opcional falhou:', error.message);
  }

  next();
};

export default {
  authenticate,
  authorize,
  optionalAuth,
};
