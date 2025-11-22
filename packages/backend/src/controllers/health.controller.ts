import { Request, Response } from 'express';
import prisma from '@/config/database';
import logger from '@/config/logger';

/**
 * Controller de health check
 * Verifica o status da aplicação e dependências
 */
class HealthController {
  /**
   * Health check básico
   * GET /health
   *
   * @example
   * GET /health
   * Response: {
   *   "status": "ok",
   *   "timestamp": "2024-12-20T10:00:00.000Z",
   *   "uptime": 12345,
   *   "environment": "development"
   * }
   */
  async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      // Verificar conexão com banco de dados
      await prisma.$queryRaw`SELECT 1`;

      const healthStatus = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: 'connected',
        memory: {
          used: process.memoryUsage().heapUsed / 1024 / 1024,
          total: process.memoryUsage().heapTotal / 1024 / 1024,
          unit: 'MB',
        },
        version: process.env.npm_package_version || '1.0.0',
      };

      logger.info('Health check passed');

      res.status(200).json(healthStatus);
    } catch (error) {
      logger.error('Health check failed:', error);

      res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Service unavailable',
        database: 'disconnected',
      });
    }
  }

  /**
   * Health check detalhado
   * GET /health/detailed
   *
   * @example
   * GET /health/detailed
   */
  async detailedHealthCheck(req: Request, res: Response): Promise<void> {
    const checks: any = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      checks: {},
    };

    // Check database
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.checks.database = {
        status: 'ok',
        message: 'Connected',
      };
    } catch (error) {
      checks.status = 'degraded';
      checks.checks.database = {
        status: 'error',
        message: 'Disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Check memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsedPercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

    checks.checks.memory = {
      status: memoryUsedPercent < 90 ? 'ok' : 'warning',
      used: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      percentage: `${memoryUsedPercent.toFixed(2)}%`,
    };

    // Check uptime
    const uptime = process.uptime();
    checks.checks.uptime = {
      status: 'ok',
      seconds: uptime,
      formatted: formatUptime(uptime),
    };

    // Overall status
    const hasErrors = Object.values(checks.checks).some(
      (check: any) => check.status === 'error'
    );
    const hasWarnings = Object.values(checks.checks).some(
      (check: any) => check.status === 'warning'
    );

    if (hasErrors) {
      checks.status = 'error';
    } else if (hasWarnings) {
      checks.status = 'warning';
    }

    const statusCode = checks.status === 'error' ? 503 : 200;

    logger.info('Detailed health check completed', { status: checks.status });

    res.status(statusCode).json(checks);
  }

  /**
   * Liveness probe para Kubernetes
   * GET /health/live
   *
   * @example
   * GET /health/live
   */
  async liveness(req: Request, res: Response): Promise<void> {
    // Verifica se a aplicação está viva (não travada)
    res.status(200).json({
      status: 'alive',
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Readiness probe para Kubernetes
   * GET /health/ready
   *
   * @example
   * GET /health/ready
   */
  async readiness(req: Request, res: Response): Promise<void> {
    try {
      // Verifica se a aplicação está pronta para receber tráfego
      await prisma.$queryRaw`SELECT 1`;

      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString(),
        database: 'connected',
      });
    } catch (error) {
      logger.error('Readiness check failed:', error);

      res.status(503).json({
        status: 'not ready',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
      });
    }
  }
}

/**
 * Formata uptime em formato legível
 *
 * @param seconds - Tempo em segundos
 * @returns String formatada
 */
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join(' ') || '0s';
}

export default new HealthController();
