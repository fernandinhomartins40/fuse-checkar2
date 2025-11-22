import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
  nodeEnv: string;
  port: number;
  appName: string;
  appUrl: string;

  databaseUrl: string;

  jwtSecret: string;
  jwtRefreshSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;

  corsOrigins: string[];
  frontendUrl: string;

  uploadMaxSize: number;
  uploadAllowedTypes: string[];
  uploadDest: string;

  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  smtpFrom: string;

  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;

  logLevel: string;
  logFile: string;
}

const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  appName: process.env.APP_NAME || 'Fuse Checkar2',
  appUrl: process.env.APP_URL || 'http://localhost',

  databaseUrl: process.env.DATABASE_URL || '',

  jwtSecret: process.env.JWT_SECRET || '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  corsOrigins: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  uploadMaxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760', 10),
  uploadAllowedTypes: (process.env.UPLOAD_ALLOWED_TYPES || '').split(','),
  uploadDest: process.env.UPLOAD_DEST || './uploads',

  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpFrom: process.env.SMTP_FROM || '',

  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

  logLevel: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || './logs/app.log',
};

// Validate critical env vars
if (!env.databaseUrl) {
  throw new Error('DATABASE_URL must be defined');
}

if (!env.jwtSecret || !env.jwtRefreshSecret) {
  throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be defined');
}

export default env;
