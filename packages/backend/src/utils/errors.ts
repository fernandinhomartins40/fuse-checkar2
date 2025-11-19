/**
 * Base class for custom application errors
 */
export abstract class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly to maintain instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 400 Bad Request - Client sent invalid data
 *
 * @example
 * ```ts
 * throw new BadRequestError('CPF inválido');
 * ```
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Requisição inválida') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

/**
 * 401 Unauthorized - Authentication is required
 *
 * @example
 * ```ts
 * throw new UnauthorizedError('Token inválido ou expirado');
 * ```
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Não autorizado') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * 403 Forbidden - Client doesn't have permission
 *
 * @example
 * ```ts
 * throw new ForbiddenError('Você não tem permissão para acessar este recurso');
 * ```
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Acesso negado') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * 404 Not Found - Resource not found
 *
 * @example
 * ```ts
 * throw new NotFoundError('Usuário não encontrado');
 * ```
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso não encontrado') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * 409 Conflict - Resource already exists or conflict
 *
 * @example
 * ```ts
 * throw new ConflictError('Email já cadastrado');
 * ```
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Conflito de dados') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

/**
 * 422 Unprocessable Entity - Validation failed
 *
 * @example
 * ```ts
 * throw new ValidationError('Dados de entrada inválidos', errors);
 * ```
 */
export class ValidationError extends AppError {
  public readonly errors?: any;

  constructor(message: string = 'Erro de validação', errors?: any) {
    super(message, 422);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * 429 Too Many Requests - Rate limit exceeded
 *
 * @example
 * ```ts
 * throw new TooManyRequestsError('Muitas tentativas, tente novamente mais tarde');
 * ```
 */
export class TooManyRequestsError extends AppError {
  constructor(message: string = 'Muitas requisições') {
    super(message, 429);
    this.name = 'TooManyRequestsError';
  }
}

/**
 * 500 Internal Server Error - Unexpected server error
 *
 * @example
 * ```ts
 * throw new InternalServerError('Erro ao processar requisição');
 * ```
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Erro interno do servidor', isOperational: boolean = true) {
    super(message, 500, isOperational);
    this.name = 'InternalServerError';
  }
}

/**
 * 503 Service Unavailable - Service temporarily unavailable
 *
 * @example
 * ```ts
 * throw new ServiceUnavailableError('Banco de dados temporariamente indisponível');
 * ```
 */
export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Serviço temporariamente indisponível') {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
  }
}

/**
 * Check if an error is an operational error (expected error that we can handle)
 *
 * @param error - Error to check
 * @returns True if error is operational
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}
