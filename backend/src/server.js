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
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
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

// Em produção, servir arquivos estáticos do build React
if (NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../dist');
  app.use(express.static(buildPath));
  
  // SPA fallback - todas as rotas não-API retornam o index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // Em desenvolvimento, rota simples de status
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Backend funcionando!', 
      environment: NODE_ENV,
      timestamp: new Date().toISOString()
    });
  });
}

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  
  res.status(err.status || 500).json({
    error: NODE_ENV === 'development' ? err.message : 'Erro interno do servidor',
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📦 Ambiente: ${NODE_ENV}`);
  console.log(`🕐 Iniciado em: ${new Date().toISOString()}`);
});

export default app;