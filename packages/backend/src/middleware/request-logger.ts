import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import env from '../config/env';

/**
 * Request logger middleware
 * Logs all incoming requests with method, URL, status, and response time
 *
 * @example
 * ```ts
 * // In app.ts or server.ts
 * app.use(requestLogger);
 * ```
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();

  // Log request
  logger.info(`→ ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Capture response
  const originalSend = res.send;
  res.send = function (data): Response {
    res.send = originalSend; // Restore original send

    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Log response
    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    logger[logLevel](`← ${req.method} ${req.url} ${statusCode} ${responseTime}ms`, {
      method: req.method,
      url: req.url,
      statusCode,
      responseTime,
      ip: req.ip,
    });

    return originalSend.call(this, data);
  };

  next();
}

/**
 * Detailed request logger with body and headers
 * Only use in development - don't log sensitive data in production
 *
 * @example
 * ```ts
 * if (env.nodeEnv === 'development') {
 *   app.use(detailedRequestLogger);
 * }
 * ```
 */
export function detailedRequestLogger(req: Request, res: Response, next: NextFunction): void {
  if (env.nodeEnv === 'production') {
    return next();
  }

  const startTime = Date.now();

  logger.info(`→ ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    query: req.query,
    params: req.params,
    body: sanitizeBody(req.body),
    headers: sanitizeHeaders(req.headers),
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  const originalSend = res.send;
  res.send = function (data): Response {
    res.send = originalSend;

    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;

    logger.info(`← ${req.method} ${req.url} ${statusCode} ${responseTime}ms`, {
      method: req.method,
      url: req.url,
      statusCode,
      responseTime,
      responseBody: sanitizeBody(typeof data === 'string' ? JSON.parse(data) : data),
    });

    return originalSend.call(this, data);
  };

  next();
}

/**
 * Simple request logger (minimal output)
 * Just logs method, URL, and status code
 *
 * @example
 * ```ts
 * app.use(simpleRequestLogger);
 * ```
 */
export function simpleRequestLogger(req: Request, res: Response, next: NextFunction): void {
  const originalSend = res.send;
  res.send = function (data): Response {
    res.send = originalSend;
    logger.info(`${req.method} ${req.url} ${res.statusCode}`);
    return originalSend.call(this, data);
  };

  next();
}

/**
 * Log only failed requests (4xx and 5xx)
 *
 * @example
 * ```ts
 * app.use(errorRequestLogger);
 * ```
 */
export function errorRequestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();

  const originalSend = res.send;
  res.send = function (data): Response {
    res.send = originalSend;

    const statusCode = res.statusCode;
    const responseTime = Date.now() - startTime;

    // Only log errors
    if (statusCode >= 400) {
      const logLevel = statusCode >= 500 ? 'error' : 'warn';
      logger[logLevel](`${req.method} ${req.url} ${statusCode} ${responseTime}ms`, {
        method: req.method,
        url: req.url,
        statusCode,
        responseTime,
        ip: req.ip,
        body: sanitizeBody(req.body),
        query: req.query,
      });
    }

    return originalSend.call(this, data);
  };

  next();
}

/**
 * Log slow requests (above threshold)
 *
 * @param thresholdMs - Threshold in milliseconds (default: 1000)
 * @returns Express middleware
 *
 * @example
 * ```ts
 * app.use(slowRequestLogger(2000)); // Log requests taking more than 2 seconds
 * ```
 */
export function slowRequestLogger(thresholdMs: number = 1000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now();

    const originalSend = res.send;
    res.send = function (data): Response {
      res.send = originalSend;

      const responseTime = Date.now() - startTime;

      if (responseTime > thresholdMs) {
        logger.warn(`SLOW REQUEST: ${req.method} ${req.url} ${responseTime}ms`, {
          method: req.method,
          url: req.url,
          responseTime,
          statusCode: res.statusCode,
          ip: req.ip,
        });
      }

      return originalSend.call(this, data);
    };

    next();
  };
}

/**
 * Skip logging for specific paths
 *
 * @param paths - Array of paths to skip (exact match or regex)
 * @param loggerMiddleware - Logger middleware to wrap
 * @returns Express middleware
 *
 * @example
 * ```ts
 * const logger = skipLoggingFor(['/health', '/metrics'], requestLogger);
 * app.use(logger);
 * ```
 */
export function skipLoggingFor(paths: (string | RegExp)[], loggerMiddleware: any) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const shouldSkip = paths.some(path => {
      if (typeof path === 'string') {
        return req.url === path;
      }
      return path.test(req.url);
    });

    if (shouldSkip) {
      return next();
    }

    return loggerMiddleware(req, res, next);
  };
}

/**
 * Log requests with user information (requires authentication)
 *
 * @example
 * ```ts
 * router.use('/api', authenticate, userRequestLogger, apiRoutes);
 * ```
 */
export function userRequestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  const user = (req as any).user;

  logger.info(`→ ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    userId: user?.userId,
    userEmail: user?.email,
    userRole: user?.role,
    ip: req.ip,
  });

  const originalSend = res.send;
  res.send = function (data): Response {
    res.send = originalSend;

    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;
    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';

    logger[logLevel](`← ${req.method} ${req.url} ${statusCode} ${responseTime}ms`, {
      method: req.method,
      url: req.url,
      statusCode,
      responseTime,
      userId: user?.userId,
      userEmail: user?.email,
    });

    return originalSend.call(this, data);
  };

  next();
}

/**
 * Sanitize request/response body by removing sensitive fields
 */
function sanitizeBody(body: any): any {
  if (!body || typeof body !== 'object') {
    return body;
  }

  const sensitiveFields = ['password', 'token', 'accessToken', 'refreshToken', 'secret'];
  const sanitized = { ...body };

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '***REDACTED***';
    }
  }

  return sanitized;
}

/**
 * Sanitize headers by removing sensitive information
 */
function sanitizeHeaders(headers: any): any {
  const sanitized = { ...headers };
  const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];

  for (const header of sensitiveHeaders) {
    if (header in sanitized) {
      sanitized[header] = '***REDACTED***';
    }
  }

  return sanitized;
}

/**
 * Generate request ID and attach to request
 * Useful for tracking requests across logs
 *
 * @example
 * ```ts
 * app.use(generateRequestId);
 * app.use(requestLogger);
 * ```
 */
export function generateRequestId(req: Request, res: Response, next: NextFunction): void {
  // Check if request ID already exists in header
  const existingId = req.get('x-request-id');
  const requestId = existingId || generateId();

  // Attach to request
  (req as any).requestId = requestId;

  // Add to response header
  res.setHeader('x-request-id', requestId);

  next();
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
