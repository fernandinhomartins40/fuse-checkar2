import logger from '../config/logger.js';

/**
 * Middleware global de tratamento de erros
 * Deve ser o último middleware registrado
 */
export const errorHandler = (err, req, res, next) => {
  // Log do erro
  logger.error('Erro capturado pelo error handler:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Erro de validação do Joi
  if (err.isJoi) {
    const errors = err.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      error: 'Dados inválidos',
      details: errors,
    });
  }

  // Erro de sintaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'JSON inválido no corpo da requisição',
    });
  }

  // Erro customizado com statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message || 'Erro no servidor',
      code: err.code,
    });
  }

  // Erro padrão (500)
  const statusCode = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Erro interno do servidor'
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Middleware para capturar rotas não encontradas (404)
 */
export const notFoundHandler = (req, res) => {
  logger.warn(`Rota não encontrada: ${req.method} ${req.url}`);

  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    path: req.url,
  });
};

/**
 * Classe de erro customizado para facilitar o lançamento de erros com status code
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Indica que é um erro esperado

    Error.captureStackTrace(this, this.constructor);
  }
}

export default {
  errorHandler,
  notFoundHandler,
  AppError,
};
