import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

/**
 * Authorization middleware factory
 * Creates middleware that checks if user has required role(s)
 *
 * @param allowedRoles - Array of roles or single role that can access the route
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * // Single role
 * router.delete('/users/:id', authenticate, authorize('ADMIN'), deleteUser);
 *
 * // Multiple roles
 * router.get('/reports', authenticate, authorize(['ADMIN', 'MANAGER']), getReports);
 * ```
 */
export function authorize(allowedRoles: string | string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      // Get user role
      const userRole = req.user.role;

      if (!userRole) {
        throw new ForbiddenError('Usuário sem permissão definida');
      }

      // Convert single role to array
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Check if user role is in allowed roles
      if (!roles.includes(userRole)) {
        throw new ForbiddenError(
          `Acesso negado. Esta operação requer permissão de: ${roles.join(' ou ')}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Check if authenticated user is an admin
 *
 * @example
 * ```ts
 * router.delete('/users/:id', authenticate, requireAdmin, deleteUser);
 * ```
 */
export const requireAdmin = authorize('ADMIN');

/**
 * Check if authenticated user is a manager or admin
 *
 * @example
 * ```ts
 * router.get('/reports', authenticate, requireManager, getReports);
 * ```
 */
export const requireManager = authorize(['ADMIN', 'MANAGER']);

/**
 * Check if authenticated user is accessing their own resource
 *
 * @param userIdParam - Name of the URL parameter containing user ID (default: 'userId')
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * // URL: /users/:userId/profile
 * router.get('/users/:userId/profile', authenticate, requireSelfOrAdmin(), getProfile);
 *
 * // URL: /profile/:id
 * router.put('/profile/:id', authenticate, requireSelfOrAdmin('id'), updateProfile);
 * ```
 */
export function requireSelfOrAdmin(userIdParam: string = 'userId') {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      const authenticatedUserId = req.user.userId;
      const targetUserId = req.params[userIdParam];
      const userRole = req.user.role;

      // Allow if user is admin or accessing their own resource
      if (userRole === 'ADMIN' || authenticatedUserId === targetUserId) {
        return next();
      }

      throw new ForbiddenError('Você não tem permissão para acessar este recurso');
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Check if authenticated user is a company owner or admin
 *
 * @param companyIdParam - Name of the URL parameter containing company ID (default: 'companyId')
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.put('/companies/:companyId', authenticate, requireCompanyOwnerOrAdmin(), updateCompany);
 * ```
 */
export function requireCompanyOwnerOrAdmin(companyIdParam: string = 'companyId') {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      const userRole = req.user.role;
      const userCompanyId = req.user.companyId;
      const targetCompanyId = req.params[companyIdParam];

      // Allow if user is admin or owner of the company
      if (userRole === 'ADMIN' || userCompanyId === targetCompanyId) {
        return next();
      }

      throw new ForbiddenError('Você não tem permissão para acessar recursos desta empresa');
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Custom authorization check using a callback function
 *
 * @param checkFn - Function that returns true if access is allowed
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.put('/posts/:postId', authenticate, authorizeCustom(async (req) => {
 *   const post = await prisma.post.findUnique({ where: { id: req.params.postId } });
 *   return post?.authorId === req.user?.userId || req.user?.role === 'ADMIN';
 * }), updatePost);
 * ```
 */
export function authorizeCustom(
  checkFn: (req: Request) => boolean | Promise<boolean>
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      // Run custom check
      const isAllowed = await checkFn(req);

      if (!isAllowed) {
        throw new ForbiddenError('Você não tem permissão para acessar este recurso');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Check if user has any of the required permissions
 *
 * @param permissions - Array of required permissions
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.post('/vehicles', authenticate, requirePermissions(['CREATE_VEHICLE', 'MANAGE_VEHICLES']), createVehicle);
 * ```
 */
export function requirePermissions(permissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      const userPermissions = req.user.permissions || [];

      // Check if user has any of the required permissions
      const hasPermission = permissions.some(permission =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        throw new ForbiddenError(
          `Esta operação requer uma das seguintes permissões: ${permissions.join(', ')}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Check if user has all of the required permissions
 *
 * @param permissions - Array of required permissions (all must be present)
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.delete('/critical-data', authenticate, requireAllPermissions(['DELETE_DATA', 'ADMIN_ACCESS']), deleteData);
 * ```
 */
export function requireAllPermissions(permissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        throw new UnauthorizedError('Usuário não autenticado');
      }

      const userPermissions = req.user.permissions || [];

      // Check if user has all required permissions
      const hasAllPermissions = permissions.every(permission =>
        userPermissions.includes(permission)
      );

      if (!hasAllPermissions) {
        throw new ForbiddenError(
          `Esta operação requer todas as seguintes permissões: ${permissions.join(', ')}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
