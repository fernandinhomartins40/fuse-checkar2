/**
 * Configuração do Prisma Client (Singleton)
 */

import { PrismaClient } from '@prisma/client';
import env from './env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Função para conectar ao banco
export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Banco de dados conectado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

// Função para desconectar do banco
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  console.log('✅ Banco de dados desconectado');
}

export default prisma;
