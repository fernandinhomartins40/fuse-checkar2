import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import logger from './config/logger.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Configuração para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "https://cdn.gpteng.co"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
      upgradeInsecureRequests: null, // Desabilita upgrade automático para HTTPS
    },
  },
}));

// Configuração CORS
const corsOptions = {
  origin: NODE_ENV === 'development' 
    ? ['http://localhost:8080', 'http://localhost:5173', 'http://31.97.85.98:3005', 'http://localhost:3005', 'http://127.0.0.1:3005']
    : process.env.FRONTEND_URL || false,
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logs de requisições
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Rate limiting geral
app.use('/api', generalLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'fuse-checkar2-server',
    nodeEnv: NODE_ENV
  });
});

// Rotas da API sempre em /api/*
app.use('/api', apiRoutes);

// Servir arquivos estáticos da aplicação HTML
const htmlAppPath = path.join(__dirname, '../../html-app');
app.use(express.static(htmlAppPath));

// Em produção, também servir arquivos do build React como fallback
if (NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../dist');
  
  // Middleware para detectar se o arquivo existe na pasta html-app
  app.use((req, res, next) => {
    // Se for uma rota da API, pular
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    // Verificar se o arquivo existe na pasta html-app
    const htmlFilePath = path.join(htmlAppPath, req.path);
    
    if (fs.existsSync(htmlFilePath) && fs.statSync(htmlFilePath).isFile()) {
      // Arquivo existe na pasta html-app, servir dali
      return res.sendFile(htmlFilePath);
    }
    
    // Arquivo não existe, continuar para o próximo middleware
    next();
  });
  
  // Servir arquivos estáticos do build React como fallback
  app.use(express.static(buildPath));
}

// Handle favicon.ico specifically
app.get('/favicon.ico', (req, res) => {
  const faviconPath = path.join(htmlAppPath, 'assets', 'images', 'favicon.ico');
  res.sendFile(faviconPath, (err) => {
    if (err) {
      res.status(404).end();
    }
  });
});

// SPA fallback - todas as rotas não-API retornam o index.html da aplicação HTML
app.get('*', (req, res) => {
  const htmlIndexPath = path.join(htmlAppPath, 'index.html');
  res.sendFile(htmlIndexPath);
});

// Middleware global de tratamento de erros (deve ser o último)
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
  logger.info(`📦 Ambiente: ${NODE_ENV}`);
  logger.info(`🕐 Iniciado em: ${new Date().toISOString()}`);
});

export default app;