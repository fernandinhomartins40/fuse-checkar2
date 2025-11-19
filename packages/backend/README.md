# Fuse Checkar2 - Backend

Backend Node.js + TypeScript + Prisma + PostgreSQL para o sistema de gestão de revisões automotivas.

## 🚀 Stack Tecnológica

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5+
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL 15
- **Authentication**: JWT
- **Validation**: Zod
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

## 📦 Estrutura do Projeto

```
src/
├── config/         # Configurações (env, database, logger, cors)
├── routes/         # Definição de rotas
├── controllers/    # Controllers HTTP
├── services/       # Business logic
├── middleware/     # Middlewares Express
├── schemas/        # Schemas de validação Zod
├── types/          # Types TypeScript
├── utils/          # Utilidades
├── app.ts          # Configuração do Express
└── server.ts       # Entry point
```

## 🔧 Setup

### Pré-requisitos

- Node.js >= 18.0.0
- PostgreSQL >= 15
- npm >= 9.0.0

### Instalação

```bash
# Instalar dependências
npm install

# Copiar .env.example para .env
cp .env.example .env

# Configurar DATABASE_URL no .env
DATABASE_URL=postgresql://user:password@localhost:5432/fusecheckar2_db
```

### Database Setup

```bash
# Gerar Prisma Client
npm run db:generate

# Executar migrations
npm run db:migrate

# Seed database (dados de teste)
npm run db:seed

# Abrir Prisma Studio (UI do banco)
npm run db:studio
```

## 🏃 Executar

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Executar produção
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

## 🐳 Docker

```bash
# Build
docker build -f docker/Dockerfile -t fuse-checkar2-backend .

# Run
docker run -p 3005:3005 --env-file .env fuse-checkar2-backend

# Docker Compose (raiz do projeto)
cd ../..
docker-compose up -d
```

## 📚 API Endpoints

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Usuário autenticado

### Clientes
- `GET /clientes` - Listar (paginado)
- `GET /clientes/:id` - Buscar por ID
- `POST /clientes` - Criar
- `PUT /clientes/:id` - Atualizar
- `DELETE /clientes/:id` - Deletar

### Veículos
- `GET /veiculos` - Listar (paginado)
- `GET /veiculos/:id` - Buscar por ID
- `POST /veiculos` - Criar
- `PUT /veiculos/:id` - Atualizar
- `DELETE /veiculos/:id` - Deletar

### Revisões
- `GET /revisoes` - Listar (paginado)
- `GET /revisoes/:id` - Buscar por ID
- `POST /revisoes` - Criar
- `PUT /revisoes/:id` - Atualizar
- `DELETE /revisoes/:id` - Deletar
- `POST /revisoes/:id/iniciar` - Iniciar revisão
- `POST /revisoes/:id/finalizar` - Finalizar revisão
- `POST /revisoes/:id/cancelar` - Cancelar revisão

### Health Check
- `GET /health` - Status do servidor

## 🔐 Autenticação

Bearer token no header:
```
Authorization: Bearer <token>
```

## 🧪 Credenciais de Teste (após seed)

```
Admin: admin@fusecheckar.com / Admin@123
Mecânico: mecanico@fusecheckar.com / Mecanico@123
Cliente: cliente1@example.com / Cliente@123
```

## 📝 Environment Variables

Veja `.env.example` para lista completa de variáveis.

Principais:
- `NODE_ENV` - Ambiente (development/production)
- `PORT` - Porta do servidor (3005)
- `DATABASE_URL` - URL do PostgreSQL
- `JWT_SECRET` - Secret para JWT
- `CORS_ORIGINS` - Origins permitidas

## 🔒 Segurança

- JWT para autenticação
- Bcrypt para hash de senhas (10 rounds)
- Helmet para security headers
- CORS configurável
- Rate limiting (100 req/15min)
- Validação de entrada com Zod
- SQL injection protection (Prisma)

## 📊 Logging

Logs salvos em `logs/`:
- `error.log` - Apenas erros
- `combined.log` - Todos os logs

Níveis: error, warn, info, debug

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 License

Copyright © 2024 Fuse Checkar2
