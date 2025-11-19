import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request, Response } from 'express';
import env from '../config/env';
import logger from '../config/logger';

/**
 * Rate limit configuration options
 */
export interface RateLimitOptions {
  windowMs?: number;
  max?: number;
  message?: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

/**
 * Default rate limit configuration
 * 100 requests per 15 minutes
 */
export const defaultRateLimit: RateLimitRequestHandler = rateLimit({
  windowMs: env.rateLimitWindowMs, // 15 minutes by default
  max: env.rateLimitMaxRequests,   // 100 requests by default
  message: 'Muitas requisições deste IP, tente novamente mais tarde',
  standardHeaders: true,  // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,   // Disable `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas requisições deste IP, tente novamente mais tarde',
    });
  },
});

/**
 * Strict rate limit for sensitive operations (e.g., authentication)
 * 5 requests per 15 minutes
 *
 * @example
 * ```ts
 * router.post('/auth/login', strictRateLimit, login);
 * router.post('/auth/register', strictRateLimit, register);
 * ```
 */
export const strictRateLimit: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Muitas tentativas de autenticação, tente novamente em 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Strict rate limit exceeded for IP: ${req.ip} on ${req.path}`);
    res.status(429).json({
      success: false,
      message: 'Muitas tentativas, tente novamente em 15 minutos',
    });
  },
});

/**
 * Rate limit for authentication endpoints
 * 10 attempts per hour
 *
 * @example
 * ```ts
 * router.post('/auth/login', authRateLimit, login);
 * ```
 */
export const authRateLimit: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Muitas tentativas de login, tente novamente em 1 hora',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
  handler: (req: Request, res: Response) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas tentativas de login, tente novamente em 1 hora',
    });
  },
});

/**
 * Rate limit for password reset
 * 3 attempts per hour
 *
 * @example
 * ```ts
 * router.post('/auth/forgot-password', passwordResetRateLimit, forgotPassword);
 * ```
 */
export const passwordResetRateLimit: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Muitas solicitações de recuperação de senha, tente novamente em 1 hora',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Password reset rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas solicitações de recuperação de senha, tente novamente em 1 hora',
    });
  },
});

/**
 * Rate limit for account creation
 * 3 accounts per hour per IP
 *
 * @example
 * ```ts
 * router.post('/auth/register', createAccountRateLimit, register);
 * ```
 */
export const createAccountRateLimit: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Muitas contas criadas deste IP, tente novamente em 1 hora',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Account creation rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitas contas criadas deste IP, tente novamente em 1 hora',
    });
  },
});

/**
 * Relaxed rate limit for general API usage
 * 200 requests per 15 minutes
 *
 * @example
 * ```ts
 * router.get('/api/public-data', relaxedRateLimit, getPublicData);
 * ```
 */
export const relaxedRateLimit: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Muitas requisições, tente novamente mais tarde',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'Muitas requisições, tente novamente mais tarde',
    });
  },
});

/**
 * Rate limit for file uploads
 * 10 uploads per hour
 *
 * @example
 * ```ts
 * router.post('/upload', uploadRateLimit, upload.single('file'), uploadFile);
 * ```
 */
export const uploadRateLimit: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Muitos uploads, tente novamente em 1 hora',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Upload rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Muitos uploads, tente novamente em 1 hora',
    });
  },
});

/**
 * Create a custom rate limiter
 *
 * @param options - Rate limit options
 * @returns Rate limit middleware
 *
 * @example
 * ```ts
 * const customLimit = createRateLimit({
 *   windowMs: 10 * 60 * 1000, // 10 minutes
 *   max: 50,
 *   message: 'Limite customizado excedido'
 * });
 *
 * router.get('/custom-endpoint', customLimit, handler);
 * ```
 */
export function createRateLimit(options: RateLimitOptions): RateLimitRequestHandler {
  return rateLimit({
    windowMs: options.windowMs || env.rateLimitWindowMs,
    max: options.max || env.rateLimitMaxRequests,
    message: options.message || 'Muitas requisições, tente novamente mais tarde',
    standardHeaders: options.standardHeaders ?? true,
    legacyHeaders: options.legacyHeaders ?? false,
    skipSuccessfulRequests: options.skipSuccessfulRequests ?? false,
    skipFailedRequests: options.skipFailedRequests ?? false,
    handler: (req: Request, res: Response) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip} on ${req.path}`);
      res.status(429).json({
        success: false,
        message: options.message || 'Muitas requisições, tente novamente mais tarde',
      });
    },
  });
}

/**
 * Rate limit by user ID instead of IP
 * Useful for authenticated endpoints
 *
 * @param options - Rate limit options
 * @returns Rate limit middleware
 *
 * @example
 * ```ts
 * router.post('/api/resource', authenticate, rateLimitByUser({ max: 10 }), createResource);
 * ```
 */
export function rateLimitByUser(options: RateLimitOptions = {}): RateLimitRequestHandler {
  return rateLimit({
    windowMs: options.windowMs || env.rateLimitWindowMs,
    max: options.max || env.rateLimitMaxRequests,
    message: options.message || 'Muitas requisições, tente novamente mais tarde',
    standardHeaders: options.standardHeaders ?? true,
    legacyHeaders: options.legacyHeaders ?? false,
    keyGenerator: (req: Request) => {
      // Use user ID if authenticated, otherwise use IP
      return (req as any).user?.userId || req.ip;
    },
    handler: (req: Request, res: Response) => {
      const identifier = (req as any).user?.userId || req.ip;
      logger.warn(`Rate limit exceeded for user: ${identifier} on ${req.path}`);
      res.status(429).json({
        success: false,
        message: options.message || 'Muitas requisições, tente novamente mais tarde',
      });
    },
  });
}

/**
 * Skip rate limiting for specific IPs (e.g., admin IPs, monitoring)
 *
 * @param allowedIPs - Array of IP addresses to skip rate limiting
 * @param rateLimiter - Rate limit middleware to wrap
 * @returns Rate limit middleware with IP skip
 *
 * @example
 * ```ts
 * const limiter = skipForIPs(['127.0.0.1', '192.168.1.100'], defaultRateLimit);
 * router.get('/api/data', limiter, getData);
 * ```
 */
export function skipForIPs(
  allowedIPs: string[],
  rateLimiter: RateLimitRequestHandler
): RateLimitRequestHandler {
  return (req: Request, res: Response, next) => {
    if (allowedIPs.includes(req.ip || '')) {
      return next();
    }
    return rateLimiter(req, res, next);
  };
}
