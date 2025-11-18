/**
 * Middleware de rate limiting
 */

import rateLimit from 'express-rate-limit';
import env from '@config/env';

/**
 * Rate limiter geral
 */
export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    error: 'TooManyRequestsError',
    message: 'Muitas requisições. Tente novamente mais tarde.',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter para rotas de autenticação
 */
export const authLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_AUTH_MAX,
  message: {
    success: false,
    error: 'TooManyRequestsError',
    message: 'Muitas tentativas de login. Tente novamente em alguns minutos.',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Não conta requisições bem-sucedidas
});

/**
 * Rate limiter rigoroso para rotas sensíveis
 */
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: {
    success: false,
    error: 'TooManyRequestsError',
    message: 'Muitas tentativas. Tente novamente em 15 minutos.',
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});
