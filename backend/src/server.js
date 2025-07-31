import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
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
    ? ['http://localhost:8080', 'http://localhost:5173']
    : process.env.FRONTEND_URL || false,
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logs básicos
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
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
    const fs = require('fs');
    
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

// SPA fallback - todas as rotas não-API retornam o index.html da aplicação HTML
app.get('*', (req, res) => {
  const htmlIndexPath = path.join(htmlAppPath, 'index.html');
  res.sendFile(htmlIndexPath);
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  
  res.status(err.status || 500).json({
    error: NODE_ENV === 'development' ? err.message : 'Erro interno do servidor',
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Remover middleware de 404 pois agora temos SPA fallback

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📦 Ambiente: ${NODE_ENV}`);
  console.log(`🕐 Iniciado em: ${new Date().toISOString()}`);
});

export default app;