/**
 * Middleware de autenticação JWT
 */

import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@utils/errors';
import { verifyToken } from '@utils/jwt';
import { UserPayload } from '@types';

// Estende o tipo Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

/**
 * Middleware que verifica se o usuário está autenticado
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Token não fornecido');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new UnauthorizedError('Formato de token inválido');
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new UnauthorizedError('Token mal formatado');
    }

    const payload = verifyToken(token);

    // Adiciona o usuário ao request
    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      nome: '', // Será preenchido pelo service se necessário
    };

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware opcional de autenticação (não lança erro se não autenticado)
 */
export function optionalAuthenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return next();
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return next();
    }

    const payload = verifyToken(token);

    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      nome: '',
    };

    next();
  } catch (error) {
    // Ignora erros de autenticação opcional
    next();
  }
}
