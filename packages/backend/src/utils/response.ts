import { Response } from 'express';

export interface SuccessResponse<T = any> {
  success: true;
  message?: string;
  data?: T;
  meta?: Record<string, any>;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: any;
  stack?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Send a success response
 *
 * @param res - Express response object
 * @param data - Response data
 * @param message - Success message
 * @param statusCode - HTTP status code (default: 200)
 * @param meta - Additional metadata
 *
 * @example
 * ```ts
 * successResponse(res, { id: 1, name: 'John' }, 'Usuário criado com sucesso', 201);
 * ```
 */
export function successResponse<T = any>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = 200,
  meta?: Record<string, any>
): Response<SuccessResponse<T>> {
  const response: SuccessResponse<T> = {
    success: true,
    ...(message && { message }),
    ...(data !== undefined && { data }),
    ...(meta && { meta }),
  };

  return res.status(statusCode).json(response);
}

/**
 * Send an error response
 *
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 500)
 * @param errors - Detailed error information
 * @param stack - Error stack trace (only in development)
 *
 * @example
 * ```ts
 * errorResponse(res, 'Usuário não encontrado', 404);
 * ```
 */
export function errorResponse(
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: any,
  stack?: string
): Response<ErrorResponse> {
  const response: ErrorResponse = {
    success: false,
    message,
    ...(errors && { errors }),
    ...(stack && process.env.NODE_ENV !== 'production' && { stack }),
  };

  return res.status(statusCode).json(response);
}

/**
 * Send a paginated success response
 *
 * @param res - Express response object
 * @param data - Array of items
 * @param pagination - Pagination metadata
 * @param message - Success message
 *
 * @example
 * ```ts
 * paginatedResponse(res, users, {
 *   page: 1,
 *   limit: 10,
 *   total: 100,
 *   totalPages: 10,
 *   hasNextPage: true,
 *   hasPreviousPage: false
 * });
 * ```
 */
export function paginatedResponse<T = any>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message?: string
): Response<SuccessResponse<T[]>> {
  return successResponse(
    res,
    data,
    message,
    200,
    { pagination }
  );
}

/**
 * Send a 201 Created response
 *
 * @param res - Express response object
 * @param data - Created resource data
 * @param message - Success message
 *
 * @example
 * ```ts
 * createdResponse(res, newUser, 'Usuário criado com sucesso');
 * ```
 */
export function createdResponse<T = any>(
  res: Response,
  data: T,
  message?: string
): Response<SuccessResponse<T>> {
  return successResponse(res, data, message, 201);
}

/**
 * Send a 204 No Content response
 *
 * @param res - Express response object
 *
 * @example
 * ```ts
 * noContentResponse(res);
 * ```
 */
export function noContentResponse(res: Response): Response {
  return res.status(204).send();
}

/**
 * Send a 400 Bad Request response
 *
 * @param res - Express response object
 * @param message - Error message
 * @param errors - Validation errors
 *
 * @example
 * ```ts
 * badRequestResponse(res, 'Dados inválidos', validationErrors);
 * ```
 */
export function badRequestResponse(
  res: Response,
  message: string = 'Requisição inválida',
  errors?: any
): Response<ErrorResponse> {
  return errorResponse(res, message, 400, errors);
}

/**
 * Send a 401 Unauthorized response
 *
 * @param res - Express response object
 * @param message - Error message
 *
 * @example
 * ```ts
 * unauthorizedResponse(res, 'Token inválido');
 * ```
 */
export function unauthorizedResponse(
  res: Response,
  message: string = 'Não autorizado'
): Response<ErrorResponse> {
  return errorResponse(res, message, 401);
}

/**
 * Send a 403 Forbidden response
 *
 * @param res - Express response object
 * @param message - Error message
 *
 * @example
 * ```ts
 * forbiddenResponse(res, 'Acesso negado');
 * ```
 */
export function forbiddenResponse(
  res: Response,
  message: string = 'Acesso negado'
): Response<ErrorResponse> {
  return errorResponse(res, message, 403);
}

/**
 * Send a 404 Not Found response
 *
 * @param res - Express response object
 * @param message - Error message
 *
 * @example
 * ```ts
 * notFoundResponse(res, 'Usuário não encontrado');
 * ```
 */
export function notFoundResponse(
  res: Response,
  message: string = 'Recurso não encontrado'
): Response<ErrorResponse> {
  return errorResponse(res, message, 404);
}

/**
 * Send a 409 Conflict response
 *
 * @param res - Express response object
 * @param message - Error message
 *
 * @example
 * ```ts
 * conflictResponse(res, 'Email já cadastrado');
 * ```
 */
export function conflictResponse(
  res: Response,
  message: string = 'Conflito de dados'
): Response<ErrorResponse> {
  return errorResponse(res, message, 409);
}

/**
 * Send a 500 Internal Server Error response
 *
 * @param res - Express response object
 * @param message - Error message
 * @param error - Error object
 *
 * @example
 * ```ts
 * internalServerErrorResponse(res, 'Erro ao processar requisição', error);
 * ```
 */
export function internalServerErrorResponse(
  res: Response,
  message: string = 'Erro interno do servidor',
  error?: Error
): Response<ErrorResponse> {
  return errorResponse(
    res,
    message,
    500,
    undefined,
    error?.stack
  );
}
