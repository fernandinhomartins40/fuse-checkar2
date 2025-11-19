/**
 * Configuração do Express App
 */

import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from '@config/cors';
import { errorHandler } from '@middleware/error-handler';
import { requestLogger } from '@middleware/request-logger';
import { apiLimiter } from '@middleware/rate-limit';
import routes from '@routes/index';
import env from '@config/env';

const app: Application = express();

// Security middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
if (env.NODE_ENV !== 'test') {
  app.use(requestLogger);
}

// Rate limiting
app.use('/api', apiLimiter);

// Routes
app.use('/api', routes);

// Health check (fora do /api para monitoramento)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'NotFoundError',
    message: 'Rota não encontrada',
    statusCode: 404,
  });
});

// Error handler (deve ser o último middleware)
app.use(errorHandler);

export default app;
