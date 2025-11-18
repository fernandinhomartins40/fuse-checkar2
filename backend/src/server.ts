/**
 * Server entry point
 */

import app from './app';
import env from '@config/env';
import logger from '@config/logger';
import { connectDatabase, disconnectDatabase } from '@config/database';

const PORT = env.PORT || 3005;

/**
 * Inicia o servidor
 */
async function startServer(): Promise<void> {
  try {
    // Conecta ao banco de dados
    await connectDatabase();

    // Inicia o servidor HTTP
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT}`);
      logger.info(`📝 Ambiente: ${env.NODE_ENV}`);
      logger.info(`🔗 API: http://localhost:${PORT}/api`);
      logger.info(`❤️  Health: http://localhost:${PORT}/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`\n${signal} recebido. Encerrando gracefully...`);

      server.close(async () => {
        logger.info('✅ Servidor HTTP encerrado');

        try {
          await disconnectDatabase();
          logger.info('✅ Banco de dados desconectado');
          process.exit(0);
        } catch (error) {
          logger.error('❌ Erro ao desconectar do banco:', error);
          process.exit(1);
        }
      });

      // Force shutdown após 30s
      setTimeout(() => {
        logger.error('❌ Forçando encerramento após timeout');
        process.exit(1);
      }, 30000);
    };

    // Handle signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('❌ Uncaught Exception:', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('UNHANDLED_REJECTION');
    });

  } catch (error) {
    logger.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();
