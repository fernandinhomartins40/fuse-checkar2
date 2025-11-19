import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JwtPayload } from '../utils/jwt';
import { UnauthorizedError } from '../utils/errors';

/**
 * Extend Express Request to include user data
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header and attaches user data to request
 *
 * @example
 * ```ts
 * router.get('/profile', authenticate, (req, res) => {
 *   res.json({ user: req.user });
 * });
 * ```
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Token de autenticação não fornecido');
    }

    // Extract token from "Bearer <token>" format
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedError('Formato de token inválido');
    }

    const token = parts[1];

    // Verify token
    const payload = verifyAccessToken(token);

    // Attach user data to request
    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      next(error);
    } else if (error instanceof Error) {
      // JWT verification errors
      if (error.name === 'TokenExpiredError') {
        next(new UnauthorizedError('Token expirado'));
      } else if (error.name === 'JsonWebTokenError') {
        next(new UnauthorizedError('Token inválido'));
      } else {
        next(new UnauthorizedError('Erro ao verificar token'));
      }
    } else {
      next(new UnauthorizedError('Erro ao autenticar'));
    }
  }
}

/**
 * Optional authentication middleware
 * Similar to authenticate but doesn't throw error if no token is provided
 * Useful for endpoints that work with or without authentication
 *
 * @example
 * ```ts
 * router.get('/posts', optionalAuthenticate, (req, res) => {
 *   // req.user will be defined if token is valid, undefined otherwise
 *   const userId = req.user?.userId;
 * });
 * ```
 */
export function optionalAuthenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // No token provided, continue without authentication
      return next();
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      // Invalid format, continue without authentication
      return next();
    }

    const token = parts[1];

    try {
      const payload = verifyAccessToken(token);
      req.user = payload;
    } catch {
      // Invalid token, continue without authentication
    }

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Extract user ID from authenticated request
 *
 * @param req - Express request with user data
 * @returns User ID
 * @throws UnauthorizedError if user is not authenticated
 *
 * @example
 * ```ts
 * router.get('/profile', authenticate, (req, res) => {
 *   const userId = getUserId(req);
 *   // Use userId...
 * });
 * ```
 */
export function getUserId(req: Request): string {
  if (!req.user || !req.user.userId) {
    throw new UnauthorizedError('Usuário não autenticado');
  }
  return req.user.userId;
}

/**
 * Extract user email from authenticated request
 *
 * @param req - Express request with user data
 * @returns User email
 * @throws UnauthorizedError if user is not authenticated
 */
export function getUserEmail(req: Request): string {
  if (!req.user || !req.user.email) {
    throw new UnauthorizedError('Usuário não autenticado');
  }
  return req.user.email;
}

/**
 * Extract user role from authenticated request
 *
 * @param req - Express request with user data
 * @returns User role
 * @throws UnauthorizedError if user is not authenticated
 */
export function getUserRole(req: Request): string {
  if (!req.user || !req.user.role) {
    throw new UnauthorizedError('Usuário não autenticado');
  }
  return req.user.role;
}
