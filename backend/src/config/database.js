import { PrismaClient } from '@prisma/client';
import logger from './logger.js';

/**
 * Singleton do Prisma Client
 * Evita criar múltiplas instâncias em desenvolvimento (hot reload)
 */

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'warn', emit: 'event' },
  ],
});

// Logging de queries (apenas em development)
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Duration: ${e.duration}ms`);
  });
}

prisma.$on('error', (e) => {
  logger.error(`Prisma Error: ${e.message}`);
});

prisma.$on('warn', (e) => {
  logger.warn(`Prisma Warning: ${e.message}`);
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Função para desconectar do banco (usar em graceful shutdown)
 */
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
  logger.info('Desconectado do banco de dados');
};

/**
 * Função para verificar conexão com o banco
 */
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    logger.info('✅ Conexão com banco de dados estabelecida');
    return true;
  } catch (error) {
    logger.error('❌ Erro ao conectar com banco de dados:', error);
    return false;
  }
};

export default prisma;
