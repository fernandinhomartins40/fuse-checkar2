import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import corsOptions from './config/cors';
import env from './config/env';
import logger from './config/logger';
import { requestLogger, generateRequestId } from './middleware/request-logger';
import { errorHandler } from './middleware/error-handler';
import routes from './routes';

/**
 * Cria e configura a aplicação Express
 *
 * @returns Express application configurada com todos os middlewares
 *
 * @example
 * ```ts
 * import createApp from './app';
 * const app = createApp();
 * app.listen(3000);
 * ```
 */
export function createApp(): Application {
  const app = express();

  // ============================================
  // Security Middleware
  // ============================================

  /**
   * Helmet - Define security headers
   * Protege contra várias vulnerabilidades conhecidas
   */
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  /**
   * CORS - Cross-Origin Resource Sharing
   * Permite requisições de origens específicas
   */
  app.use(cors(corsOptions));

  /**
   * Rate Limiting - Proteção contra DDoS e brute force
   * Limita o número de requisições por IP
   */
  const limiter = rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMaxRequests,
    message: {
      success: false,
      error: 'Muitas requisições deste IP. Tente novamente mais tarde.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting for health check
      return req.path === '/health';
    },
  });

  app.use('/api', limiter);

  // ============================================
  // Body Parsing Middleware
  // ============================================

  /**
   * Parse JSON bodies
   * Limite de 10mb
   */
  app.use(express.json({ limit: '10mb' }));

  /**
   * Parse URL-encoded bodies
   * Extended permite objetos aninhados
   */
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ============================================
  // Logging Middleware
  // ============================================

  /**
   * Generate unique request ID for tracking
   */
  app.use(generateRequestId);

  /**
   * Request logger
   * Logs all incoming requests and responses
   */
  if (env.nodeEnv !== 'test') {
    app.use(requestLogger);
  }

  // ============================================
  // Trust Proxy
  // ============================================

  /**
   * Trust proxy
   * Necessário quando atrás de proxy reverso (nginx, load balancer, etc)
   * Permite obter o IP real do cliente
   */
  app.set('trust proxy', 1);

  // ============================================
  // API Routes
  // ============================================

  /**
   * Health check endpoint
   * Útil para monitoramento e load balancers
   */
  app.get('/health', (req, res) => {
    res.json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.nodeEnv,
    });
  });

  /**
   * Root endpoint
   */
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: `${env.appName} API`,
      version: '1.0.0',
      environment: env.nodeEnv,
      documentation: '/api/docs',
    });
  });

  /**
   * Mount API routes at /api
   */
  app.use('/api', routes);

  // ============================================
  // Error Handling Middleware
  // ============================================

  /**
   * 404 handler
   * Captura todas as rotas não encontradas
   */
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Rota não encontrada',
      path: req.originalUrl,
      method: req.method,
    });
  });

  /**
   * Global error handler
   * Deve ser o último middleware
   */
  app.use(errorHandler);

  // ============================================
  // Log successful initialization
  // ============================================

  logger.info('Express app configured successfully', {
    environment: env.nodeEnv,
    cors: env.corsOrigins.length > 0 ? 'enabled' : 'disabled',
    rateLimit: `${env.rateLimitMaxRequests} requests per ${env.rateLimitWindowMs}ms`,
  });

  return app;
}

/**
 * Export configured app instance
 */
export default createApp();
