import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

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

// Logs básicos
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

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

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  res.status(err.status || 500).json({
    error: NODE_ENV === 'development' ? err.message : 'Erro interno do servidor',
    path: req.path,
    timestamp: new Date().toISOString(),
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Remover middleware de 404 pois agora temos SPA fallback

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
  console.log(`📦 Ambiente: ${NODE_ENV}`);
  console.log(`🕐 Iniciado em: ${new Date().toISOString()}`);
});

export default app;