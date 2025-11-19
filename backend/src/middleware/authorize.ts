/**
 * Middleware de autorização por roles
 */

import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { ForbiddenError, UnauthorizedError } from '@utils/errors';

/**
 * Middleware que verifica se o usuário tem uma das roles permitidas
 */
export function authorize(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError('Você não tem permissão para acessar este recurso');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Middleware que verifica se o usuário é admin
 */
export const authorizeAdmin = authorize(Role.ADMIN);

/**
 * Middleware que verifica se o usuário é cliente
 */
export const authorizeCliente = authorize(Role.CLIENTE);

/**
 * Middleware que verifica se o usuário é mecânico
 */
export const authorizeMecanico = authorize(Role.MECANICO);

/**
 * Middleware que verifica se o usuário é admin ou mecânico
 */
export const authorizeStaff = authorize(Role.ADMIN, Role.MECANICO);

/**
 * Middleware que verifica se o usuário é dono do recurso ou admin
 */
export function authorizeOwnerOrAdmin(getUserIdFromResource: (req: Request) => number) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      const resourceUserId = getUserIdFromResource(req);

      if (req.user.role === Role.ADMIN || req.user.id === resourceUserId) {
        return next();
      }

      throw new ForbiddenError('Você não tem permissão para acessar este recurso');
    } catch (error) {
      next(error);
    }
  };
}
