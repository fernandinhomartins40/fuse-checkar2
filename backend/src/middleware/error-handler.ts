/**
 * Middleware de tratamento de erros global
 */

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '@utils/errors';
import { ErrorResponse, ValidationError as ValidationErrorType } from '@types';
import logger from '@config/logger';
import env from '@config/env';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error('Error:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
  });

  // Erro de validação Zod
  if (error instanceof ZodError) {
    const errors: ValidationErrorType[] = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));

    const response: ErrorResponse = {
      success: false,
      error: 'ValidationError',
      message: 'Erro de validação',
      statusCode: 422,
      errors,
    };

    res.status(422).json(response);
    return;
  }

  // Erro do Prisma - Violação de unique constraint
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const field = (error.meta?.target as string[])?.join(', ') || 'campo';
      const response: ErrorResponse = {
        success: false,
        error: 'ConflictError',
        message: `${field} já está em uso`,
        statusCode: 409,
      };

      res.status(409).json(response);
      return;
    }

    if (error.code === 'P2025') {
      const response: ErrorResponse = {
        success: false,
        error: 'NotFoundError',
        message: 'Registro não encontrado',
        statusCode: 404,
      };

      res.status(404).json(response);
      return;
    }
  }

  // Erro customizado da aplicação
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      error: error.constructor.name,
      message: error.message,
      statusCode: error.statusCode,
      stack: env.NODE_ENV === 'development' ? error.stack : undefined,
    };

    res.status(error.statusCode).json(response);
    return;
  }

  // Erro desconhecido
  const response: ErrorResponse = {
    success: false,
    error: 'InternalServerError',
    message: env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor',
    statusCode: 500,
    stack: env.NODE_ENV === 'development' ? error.stack : undefined,
  };

  res.status(500).json(response);
}
