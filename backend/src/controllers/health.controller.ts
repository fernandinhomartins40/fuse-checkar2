/**
 * Controller de Health Check
 */

import { Request, Response } from 'express';
import prisma from '@config/database';
import { asyncHandler } from '@middleware/async-handler';
import env from '@config/env';

class HealthController {
  /**
   * Health check básico
   */
  health = asyncHandler(async (req: Request, res: Response) => {
    return res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * Health check detalhado
   */
  detailed = asyncHandler(async (req: Request, res: Response) => {
    let dbStatus = 'OK';
    let dbLatency = 0;

    try {
      const start = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      dbLatency = Date.now() - start;
    } catch (error) {
      dbStatus = 'ERROR';
    }

    return res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      version: env.APP_VERSION,
      services: {
        database: {
          status: dbStatus,
          latency: `${dbLatency}ms`,
        },
      },
    });
  });
}

export default new HealthController();
