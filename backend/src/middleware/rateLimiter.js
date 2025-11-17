import rateLimit from 'express-rate-limit';
import logger from '../config/logger.js';

/**
 * Rate limiter padrão para todas as rotas
 * 100 requisições por 15 minutos
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por windowMs
  message: {
    success: false,
    error: 'Muitas requisições deste IP, tente novamente mais tarde',
  },
  standardHeaders: true, // Retornar info de rate limit nos headers `RateLimit-*`
  legacyHeaders: false, // Desabilitar headers `X-RateLimit-*`
  handler: (req, res) => {
    logger.warn(`Rate limit excedido: ${req.ip} - ${req.method} ${req.url}`);
    res.status(429).json({
      success: false,
      error: 'Muitas requisições, tente novamente mais tarde',
    });
  },
});

/**
 * Rate limiter mais restritivo para rotas de autenticação
 * 5 tentativas por 15 minutos
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas por windowMs
  skipSuccessfulRequests: true, // Não contar requisições bem-sucedidas
  message: {
    success: false,
    error: 'Muitas tentativas de login, tente novamente em 15 minutos',
  },
  handler: (req, res) => {
    logger.warn(`Auth rate limit excedido: ${req.ip} - ${req.body?.email || 'unknown'}`);
    res.status(429).json({
      success: false,
      error: 'Muitas tentativas de autenticação, tente novamente em 15 minutos',
    });
  },
});

/**
 * Rate limiter mais flexível para criação de recursos
 * 20 requisições por hora
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20, // 20 criações por hora
  message: {
    success: false,
    error: 'Limite de criações excedido, tente novamente mais tarde',
  },
  handler: (req, res) => {
    logger.warn(`Create rate limit excedido: ${req.ip} - ${req.method} ${req.url}`);
    res.status(429).json({
      success: false,
      error: 'Limite de criações excedido para este IP',
    });
  },
});

export default {
  generalLimiter,
  authLimiter,
  createLimiter,
};
