/**
 * Configuração e validação de variáveis de ambiente
 */

import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).pipe(z.number().int().min(1).max(65535)).default('3005'),
  APP_NAME: z.string().default('Fuse Checkar2'),
  APP_VERSION: z.string().default('1.0.0'),

  // Database
  DATABASE_URL: z.string().url(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().transform(Number).pipe(z.number().int()).default('5432'),
  DB_NAME: z.string().default('checkar2_db'),
  DB_USER: z.string().default('checkar2'),
  DB_PASSWORD: z.string().min(8),

  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('24h'),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // CORS
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost'),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).pipe(z.number().int()).optional().default('587'),
  SMTP_SECURE: z.string().transform((v) => v === 'true').pipe(z.boolean()).optional().default('false'),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default('Fuse Checkar2 <noreply@fusecheckar2.com>'),

  // Upload
  UPLOAD_MAX_SIZE: z.string().transform(Number).pipe(z.number().int()).default('10485760'),
  UPLOAD_PATH: z.string().default('./uploads'),
  UPLOAD_ALLOWED_TYPES: z.string().default('image/jpeg,image/png,image/gif,application/pdf'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FILE: z.string().default('./logs/app.log'),
  LOG_MAX_SIZE: z.string().default('10m'),
  LOG_MAX_FILES: z.string().default('10'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).pipe(z.number().int()).default('60000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).pipe(z.number().int()).default('100'),
  RATE_LIMIT_AUTH_MAX: z.string().transform(Number).pipe(z.number().int()).default('5'),

  // Security
  BCRYPT_ROUNDS: z.string().transform(Number).pipe(z.number().int().min(8).max(15)).default('10'),
  SESSION_SECRET: z.string().min(32),

  // External APIs
  VIACEP_API_URL: z.string().url().default('https://viacep.com.br/ws'),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Erro na validação das variáveis de ambiente:');
    console.error(error.errors);
    process.exit(1);
  }
  throw error;
}

export default env;
