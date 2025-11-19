/**
 * Utilitários para respostas da API
 */

import { Response } from 'express';
import { ApiResponse, SuccessResponse, ErrorResponse, ValidationError } from '@types';

/**
 * Envia resposta de sucesso
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): Response {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    message,
  };

  return res.status(statusCode).json(response);
}

/**
 * Envia resposta de erro
 */
export function sendError(
  res: Response,
  error: string,
  message: string,
  statusCode: number = 500,
  errors?: ValidationError[]
): Response {
  const response: ErrorResponse = {
    success: false,
    error,
    message,
    statusCode,
    errors,
  };

  return res.status(statusCode).json(response);
}

/**
 * Envia resposta de criação
 */
export function sendCreated<T>(res: Response, data: T, message?: string): Response {
  return sendSuccess(res, data, message, 201);
}

/**
 * Envia resposta sem conteúdo
 */
export function sendNoContent(res: Response): Response {
  return res.status(204).send();
}
