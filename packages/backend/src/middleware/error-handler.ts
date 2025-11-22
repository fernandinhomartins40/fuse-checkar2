import { Request, Response, NextFunction } from 'express';
import { AppError, isOperationalError } from '../utils/errors';
import { errorResponse } from '../utils/response';
import logger from '../config/logger';
import env from '../config/env';

/**
 * Global error handler middleware
 * Must be the last middleware in the chain
 *
 * @example
 * ```ts
 * // In app.ts or server.ts
 * app.use(errorHandler);
 * ```
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error
  logError(err, req);

  // Handle operational errors (errors we expect and can handle)
  if (err instanceof AppError) {
    errorResponse(
      res,
      err.message,
      err.statusCode,
      err instanceof Error && 'errors' in err ? (err as any).errors : undefined,
      env.nodeEnv !== 'production' ? err.stack : undefined
    );
    return;
  }

  // Handle Prisma errors
  if (isPrismaError(err)) {
    const { message, statusCode } = handlePrismaError(err);
    errorResponse(res, message, statusCode);
    return;
  }

  // Handle JWT errors
  if (isJWTError(err)) {
    const { message, statusCode } = handleJWTError(err);
    errorResponse(res, message, statusCode);
    return;
  }

  // Handle Multer errors (file upload)
  if (isMulterError(err)) {
    const { message, statusCode } = handleMulterError(err);
    errorResponse(res, message, statusCode);
    return;
  }

  // Handle unknown errors (500 Internal Server Error)
  const message = env.nodeEnv === 'production'
    ? 'Erro interno do servidor'
    : err.message || 'Erro desconhecido';

  errorResponse(
    res,
    message,
    500,
    undefined,
    env.nodeEnv !== 'production' ? err.stack : undefined
  );
}

/**
 * Log error details
 */
function logError(err: Error, req: Request): void {
  const errorLog = {
    message: err.message,
    stack: err.stack,
    name: err.name,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userId: (req as any).user?.userId,
  };

  if (err instanceof AppError && err.isOperational) {
    logger.warn('Operational error:', errorLog);
  } else {
    logger.error('Unexpected error:', errorLog);
  }
}

/**
 * Check if error is a Prisma error
 */
function isPrismaError(err: any): boolean {
  return err.name === 'PrismaClientKnownRequestError' ||
         err.name === 'PrismaClientValidationError' ||
         err.name === 'PrismaClientUnknownRequestError';
}

/**
 * Handle Prisma errors
 */
function handlePrismaError(err: any): { message: string; statusCode: number } {
  // P2002: Unique constraint violation
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'campo';
    return {
      message: `Já existe um registro com este ${field}`,
      statusCode: 409,
    };
  }

  // P2025: Record not found
  if (err.code === 'P2025') {
    return {
      message: 'Registro não encontrado',
      statusCode: 404,
    };
  }

  // P2003: Foreign key constraint violation
  if (err.code === 'P2003') {
    return {
      message: 'Operação inválida: registro relacionado não existe',
      statusCode: 400,
    };
  }

  // P2014: Invalid relation
  if (err.code === 'P2014') {
    return {
      message: 'Operação inválida: relação entre registros é inválida',
      statusCode: 400,
    };
  }

  // Default Prisma error
  return {
    message: 'Erro ao acessar banco de dados',
    statusCode: 500,
  };
}

/**
 * Check if error is a JWT error
 */
function isJWTError(err: any): boolean {
  return err.name === 'JsonWebTokenError' ||
         err.name === 'TokenExpiredError' ||
         err.name === 'NotBeforeError';
}

/**
 * Handle JWT errors
 */
function handleJWTError(err: any): { message: string; statusCode: number } {
  if (err.name === 'TokenExpiredError') {
    return {
      message: 'Token expirado',
      statusCode: 401,
    };
  }

  if (err.name === 'JsonWebTokenError') {
    return {
      message: 'Token inválido',
      statusCode: 401,
    };
  }

  if (err.name === 'NotBeforeError') {
    return {
      message: 'Token ainda não é válido',
      statusCode: 401,
    };
  }

  return {
    message: 'Erro de autenticação',
    statusCode: 401,
  };
}

/**
 * Check if error is a Multer error
 */
function isMulterError(err: any): boolean {
  return err.name === 'MulterError';
}

/**
 * Handle Multer errors (file upload)
 */
function handleMulterError(err: any): { message: string; statusCode: number } {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return {
      message: 'Arquivo muito grande',
      statusCode: 400,
    };
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    return {
      message: 'Muitos arquivos',
      statusCode: 400,
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return {
      message: 'Campo de arquivo inesperado',
      statusCode: 400,
    };
  }

  return {
    message: 'Erro ao fazer upload do arquivo',
    statusCode: 400,
  };
}

/**
 * Handle 404 errors (route not found)
 *
 * @example
 * ```ts
 * // In app.ts or server.ts (before errorHandler)
 * app.use(notFoundHandler);
 * app.use(errorHandler);
 * ```
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  errorResponse(
    res,
    `Rota não encontrada: ${req.method} ${req.url}`,
    404
  );
}

/**
 * Handle unhandled promise rejections
 */
export function handleUnhandledRejection(): void {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);

    // In production, you might want to exit the process
    if (env.nodeEnv === 'production') {
      process.exit(1);
    }
  });
}

/**
 * Handle uncaught exceptions
 */
export function handleUncaughtException(): void {
  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error);

    // Always exit on uncaught exception
    process.exit(1);
  });
}

/**
 * Initialize global error handlers
 *
 * @example
 * ```ts
 * // In server.ts
 * initializeErrorHandlers();
 * ```
 */
export function initializeErrorHandlers(): void {
  handleUnhandledRejection();
  handleUncaughtException();
}
