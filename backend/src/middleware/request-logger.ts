/**
 * Middleware de logging de requisições
 */

import { Request, Response, NextFunction } from 'express';
import logger from '@config/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  // Log quando a resposta é finalizada
  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info('Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  });

  next();
}
