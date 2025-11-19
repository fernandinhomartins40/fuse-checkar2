import { Server } from 'http';
import app from './app';
import env from './config/env';
import logger from './config/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import { initializeErrorHandlers } from './middleware/error-handler';

/**
 * Server instance
 */
let server: Server | null = null;

/**
 * Inicia o servidor HTTP
 *
 * @returns Promise<Server> Instância do servidor HTTP
 */
async function startServer(): Promise<Server> {
  try {
    // ============================================
    // Initialize global error handlers
    // ============================================
    initializeErrorHandlers();

    // ============================================
    // Connect to database
    // ============================================
    logger.info('Connecting to database...');
    await connectDatabase();

    // ============================================
    // Start HTTP server
    // ============================================
    server = app.listen(env.port, () => {
      logger.info(`🚀 Server started successfully`, {
        port: env.port,
        environment: env.nodeEnv,
        appName: env.appName,
        appUrl: `${env.appUrl}:${env.port}`,
        apiUrl: `${env.appUrl}:${env.port}/api`,
        healthCheck: `${env.appUrl}:${env.port}/health`,
      });

      // Log ASCII art in development
      if (env.nodeEnv === 'development') {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║           🔧  ${env.appName}  🔧                      ║
║                                                       ║
║   Server running on: ${env.appUrl}:${env.port}               ║
║   Environment: ${env.nodeEnv}                         ║
║                                                       ║
║   API:          ${env.appUrl}:${env.port}/api                 ║
║   Health Check: ${env.appUrl}:${env.port}/health              ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
        `);
      }
    });

    // ============================================
    // Handle server errors
    // ============================================
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${env.port} is already in use`);
      } else if (error.code === 'EACCES') {
        logger.error(`Port ${env.port} requires elevated privileges`);
      } else {
        logger.error('Server error:', error);
      }
      process.exit(1);
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

/**
 * Graceful shutdown
 * Fecha conexões e desliga o servidor de forma elegante
 */
async function gracefulShutdown(signal: string): Promise<void> {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  try {
    // ============================================
    // Stop accepting new connections
    // ============================================
    if (server) {
      server.close(() => {
        logger.info('HTTP server closed');
      });
    }

    // ============================================
    // Close database connections
    // ============================================
    await disconnectDatabase();

    // ============================================
    // Exit process
    // ============================================
    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
}

/**
 * Setup graceful shutdown handlers
 */
function setupGracefulShutdown(): void {
  // Handle SIGTERM (sent by process managers like PM2, Docker, Kubernetes)
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  // Handle SIGINT (sent by Ctrl+C)
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle SIGUSR2 (sent by nodemon)
  process.once('SIGUSR2', () => gracefulShutdown('SIGUSR2'));
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  try {
    // Setup graceful shutdown
    setupGracefulShutdown();

    // Start server
    await startServer();
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

// ============================================
// Start the server
// ============================================
if (require.main === module) {
  // Only start server if this file is run directly
  main();
}

// ============================================
// Exports
// ============================================
export { startServer, gracefulShutdown };
export default app;
