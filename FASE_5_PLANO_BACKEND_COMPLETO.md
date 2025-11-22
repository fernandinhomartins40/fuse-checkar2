# FASE 5: PLANO COMPLETO DE IMPLEMENTAÇÃO DO BACKEND

## 📋 VISÃO GERAL

Implementação de backend profissional para o **Fuse Checkar2** usando:
- **Nginx** como reverse proxy
- **Docker** + **Docker Compose** para containerização
- **Node.js 18+** + **TypeScript 5** como runtime
- **Express** como framework web
- **Prisma ORM** para acesso ao banco de dados
- **PostgreSQL 15** como banco de dados relacional

---

## 🎯 OBJETIVOS

1. ✅ Backend 100% funcional com todos os 28 endpoints
2. ✅ Autenticação JWT segura
3. ✅ Validação de dados com Zod
4. ✅ Logs profissionais com Winston
5. ✅ Rate limiting e segurança
6. ✅ Docker Compose para desenvolvimento e produção
7. ✅ Nginx como reverse proxy
8. ✅ Migrações de banco de dados com Prisma
9. ✅ Seeds de desenvolvimento
10. ✅ TypeScript strict mode ativado

---

## 🏗️ ARQUITETURA GERAL

```
┌─────────────────┐
│   Navegador     │
└────────┬────────┘
         │ HTTP/HTTPS
         ↓
┌─────────────────┐
│   Nginx         │ (Porta 80/443)
│ Reverse Proxy   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Frontend      │ (Porta 8080)
│   Vite/React    │
└─────────────────┘
         │
         │ API Requests (/api/*)
         ↓
┌─────────────────┐
│   Backend       │ (Porta 3005)
│ Node.js/Express │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  PostgreSQL     │ (Porta 5432)
│   Database      │
└─────────────────┘
```

---

## 📦 ESTRUTURA DE DIRETÓRIOS COMPLETA

```
packages/backend/
├── src/
│   ├── app.ts                    # Configuração do Express
│   ├── server.ts                 # Entry point do servidor
│   │
│   ├── config/                   # Configurações
│   │   ├── env.ts                # Variáveis de ambiente
│   │   ├── database.ts           # Conexão Prisma
│   │   ├── cors.ts               # Configuração CORS
│   │   └── logger.ts             # Winston logger
│   │
│   ├── routes/                   # Definição de rotas
│   │   ├── index.ts              # Router principal
│   │   ├── auth.routes.ts        # Rotas de autenticação
│   │   ├── cliente.routes.ts     # Rotas de clientes
│   │   ├── veiculo.routes.ts     # Rotas de veículos
│   │   ├── revisao.routes.ts     # Rotas de revisões
│   │   ├── relatorio.routes.ts   # Rotas de relatórios
│   │   ├── upload.routes.ts      # Rotas de upload
│   │   └── health.routes.ts      # Health check
│   │
│   ├── controllers/              # Controllers (HTTP layer)
│   │   ├── auth.controller.ts
│   │   ├── cliente.controller.ts
│   │   ├── veiculo.controller.ts
│   │   ├── revisao.controller.ts
│   │   ├── relatorio.controller.ts
│   │   ├── upload.controller.ts
│   │   └── health.controller.ts
│   │
│   ├── services/                 # Business logic
│   │   ├── auth.service.ts
│   │   ├── cliente.service.ts
│   │   ├── veiculo.service.ts
│   │   ├── revisao.service.ts
│   │   ├── relatorio.service.ts
│   │   ├── upload.service.ts
│   │   └── email.service.ts
│   │
│   ├── middleware/               # Middlewares Express
│   │   ├── authenticate.ts       # Verificação JWT
│   │   ├── authorize.ts          # Verificação de permissões
│   │   ├── validate.ts           # Validação Zod
│   │   ├── error-handler.ts      # Error handler global
│   │   ├── async-handler.ts      # Wrapper async/await
│   │   ├── rate-limit.ts         # Rate limiting
│   │   └── request-logger.ts     # Logging de requests
│   │
│   ├── schemas/                  # Schemas de validação Zod
│   │   ├── auth.schema.ts
│   │   ├── cliente.schema.ts
│   │   ├── veiculo.schema.ts
│   │   ├── revisao.schema.ts
│   │   ├── common.schema.ts
│   │   └── pagination.schema.ts
│   │
│   ├── types/                    # Types TypeScript
│   │   ├── express.d.ts          # Extends Express Request
│   │   └── index.ts              # Barrel exports
│   │
│   └── utils/                    # Utilidades
│       ├── bcrypt.ts             # Hash de senhas
│       ├── jwt.ts                # Geração/verificação JWT
│       ├── validators.ts         # Validadores customizados
│       ├── formatters.ts         # Formatação de dados
│       ├── pagination.ts         # Paginação de queries
│       ├── errors.ts             # Classes de erro customizadas
│       └── response.ts           # Helpers de response
│
├── prisma/
│   ├── schema.prisma             # Schema do banco de dados
│   ├── migrations/               # Migrações do Prisma
│   └── seed.ts                   # Seed de desenvolvimento
│
├── docker/
│   ├── Dockerfile                # Dockerfile do backend
│   ├── Dockerfile.dev            # Dockerfile para dev
│   └── .dockerignore
│
├── uploads/                      # Arquivos uploadados
│   ├── images/
│   ├── documents/
│   └── temp/
│
├── tests/                        # Testes (futuro)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example                  # Template de variáveis
├── .env                          # Variáveis locais (git ignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── nodemon.json                  # Configuração nodemon
└── README.md
```

---

## 🐘 SCHEMA PRISMA COMPLETO

Baseado no backup do backend original (`BACKUP_BACKEND_ORIGINAL/prisma/schema.prisma`):

```prisma
// packages/backend/prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

// ============================================================================
// ENUMS
// ============================================================================

enum Role {
  CLIENTE
  MECANICO
  ADMIN
}

enum StatusCliente {
  ATIVO
  INATIVO
  BLOQUEADO
  PENDENTE
}

enum StatusRevisao {
  AGENDADA
  EM_ANDAMENTO
  CONCLUIDA
  CANCELADA
}

enum Prioridade {
  ALTA
  MEDIA
  BAIXA
}

enum StatusRecomendacao {
  PENDENTE
  ACEITA
  RECUSADA
  IMPLEMENTADA
}

enum TipoRevisao {
  PREVENTIVA
  CORRETIVA
  PERIODICA
  EMERGENCIAL
}

enum StatusVeiculo {
  ATIVO
  INATIVO
  EM_MANUTENCAO
  VENDIDO
}

// ============================================================================
// MODELS
// ============================================================================

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique @db.VarChar(255)
  senha     String   @db.VarChar(255)
  role      Role     @default(CLIENTE)
  isActive  Boolean  @default(true)

  refreshToken String? @db.VarChar(500)
  resetToken   String? @db.VarChar(255)
  resetTokenExpiry DateTime?

  emailVerified Boolean @default(false)
  verificationToken String? @db.VarChar(255)

  lastLogin DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  cliente   Cliente?
  mecanico  Mecanico?
  admin     Admin?

  @@index([email])
  @@index([role])
  @@map("users")
}

model Admin {
  id        Int      @id @default(autoincrement())
  userId    Int      @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  nome      String   @db.VarChar(255)
  cpf       String   @unique @db.VarChar(14)
  telefone  String   @db.VarChar(20)

  permissions Json?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([cpf])
  @@map("admins")
}

model Cliente {
  id             Int      @id @default(autoincrement())
  userId         Int      @unique
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  nome           String   @db.VarChar(100)
  sobrenome      String   @db.VarChar(100)
  cpf            String   @unique @db.VarChar(14)
  rg             String?  @db.VarChar(20)
  dataNascimento DateTime? @db.Date
  profissao      String?  @db.VarChar(100)

  email          String   @unique @db.VarChar(255)
  telefone       String   @db.VarChar(20)
  telefone2      String?  @db.VarChar(20)
  whatsapp       String?  @db.VarChar(20)

  cep            String?  @db.VarChar(10)
  endereco       String?  @db.VarChar(255)
  numero         String?  @db.VarChar(20)
  complemento    String?  @db.VarChar(100)
  bairro         String?  @db.VarChar(100)
  cidade         String?  @db.VarChar(100)
  estado         String?  @db.VarChar(2)
  pais           String   @default("Brasil") @db.VarChar(50)

  status         StatusCliente @default(ATIVO)

  notificacoesEmail Boolean @default(true)
  notificacoesSms   Boolean @default(false)
  newsletter        Boolean @default(true)

  lastVisit      DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  veiculos       Veiculo[]
  revisoes       Revisao[]
  recomendacoes  Recomendacao[]

  @@index([cpf])
  @@index([email])
  @@index([status])
  @@index([createdAt])
  @@map("clientes")
}

model Mecanico {
  id             Int      @id @default(autoincrement())
  userId         Int      @unique
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  nome           String   @db.VarChar(100)
  sobrenome      String   @db.VarChar(100)
  cpf            String   @unique @db.VarChar(14)
  telefone       String   @db.VarChar(20)

  especialidade  String?  @db.VarChar(100)
  registro       String?  @db.VarChar(50)

  isActive       Boolean  @default(true)

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  revisoes       Revisao[]

  @@index([cpf])
  @@index([isActive])
  @@map("mecanicos")
}

model Veiculo {
  id             Int      @id @default(autoincrement())
  clienteId      Int
  cliente        Cliente  @relation(fields: [clienteId], references: [id], onDelete: Cascade)

  marca          String   @db.VarChar(50)
  modelo         String   @db.VarChar(100)
  ano            Int
  anoModelo      Int?
  placa          String   @unique @db.VarChar(10)
  cor            String?  @db.VarChar(30)
  chassi         String?  @unique @db.VarChar(30)
  renavam        String?  @unique @db.VarChar(20)

  motor          String?  @db.VarChar(50)
  combustivel    String?  @db.VarChar(20)
  cambio         String?  @db.VarChar(20)

  kmAtual        Int?
  kmUltimaRevisao Int?

  status         StatusVeiculo @default(ATIVO)

  observacoes    String?  @db.Text

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  revisoes       Revisao[]
  recomendacoes  Recomendacao[]

  @@index([clienteId])
  @@index([placa])
  @@index([status])
  @@map("veiculos")
}

model Revisao {
  id             Int      @id @default(autoincrement())

  clienteId      Int
  cliente        Cliente  @relation(fields: [clienteId], references: [id])

  veiculoId      Int
  veiculo        Veiculo  @relation(fields: [veiculoId], references: [id])

  mecanicoId     Int?
  mecanico       Mecanico? @relation(fields: [mecanicoId], references: [id], onDelete: SetNull)

  tipo           TipoRevisao
  status         StatusRevisao @default(AGENDADA)

  dataAgendamento DateTime
  dataRevisao    DateTime
  dataInicio     DateTime?
  dataConclusao  DateTime?

  kmAtual        Int?
  kmProxima      Int?

  checklist      Json?
  servicosRealizados Json?
  pecasSubstituidas Json?

  valorServico   Decimal?  @db.Decimal(10, 2)
  valorPecas     Decimal?  @db.Decimal(10, 2)
  valorTotal     Decimal?  @db.Decimal(10, 2)

  observacoes    String?   @db.Text
  diagnostico    String?   @db.Text

  garantiaDias   Int?
  garantiaKm     Int?

  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@index([clienteId])
  @@index([veiculoId])
  @@index([mecanicoId])
  @@index([status])
  @@index([dataRevisao])
  @@map("revisoes")
}

model Recomendacao {
  id             Int      @id @default(autoincrement())

  clienteId      Int
  cliente        Cliente  @relation(fields: [clienteId], references: [id])

  veiculoId      Int
  veiculo        Veiculo  @relation(fields: [veiculoId], references: [id])

  titulo         String   @db.VarChar(200)
  descricao      String   @db.Text
  prioridade     Prioridade @default(MEDIA)
  status         StatusRecomendacao @default(PENDENTE)

  valorEstimado  Decimal? @db.Decimal(10, 2)
  prazoEstimado  Int?

  categoria      String?  @db.VarChar(50)

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([clienteId])
  @@index([veiculoId])
  @@index([status])
  @@index([prioridade])
  @@map("recomendacoes")
}

model Upload {
  id             Int      @id @default(autoincrement())

  filename       String   @db.VarChar(255)
  originalName   String   @db.VarChar(255)
  path           String   @db.VarChar(500)
  mimetype       String   @db.VarChar(100)
  size           Int

  type           String   @db.VarChar(50)

  relatedTo      String?  @db.VarChar(50)
  relatedId      Int?

  uploadedBy     Int?

  createdAt      DateTime @default(now())

  @@index([relatedTo, relatedId])
  @@map("uploads")
}

model AuditLog {
  id             Int      @id @default(autoincrement())

  userId         Int?
  userEmail      String?  @db.VarChar(255)
  userRole       Role?

  action         String   @db.VarChar(50)
  entity         String   @db.VarChar(50)
  entityId       Int?

  oldData        Json?
  newData        Json?

  ip             String?  @db.VarChar(45)
  userAgent      String?  @db.VarChar(500)

  createdAt      DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([entity, entityId])
  @@index([createdAt])
  @@map("audit_logs")
}
```

---

## 🐳 DOCKER CONFIGURATION

### `docker-compose.yml` (Raiz do projeto)

```yaml
version: '3.9'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: fuse-checkar2-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DATABASE_USER:-fusecheckar}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD:-fusecheckar_password}
      POSTGRES_DB: ${DATABASE_NAME:-fusecheckar2_db}
    ports:
      - "${DATABASE_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - fuse-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DATABASE_USER:-fusecheckar}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend Node.js
  backend:
    build:
      context: ./packages/backend
      dockerfile: docker/Dockerfile
      args:
        NODE_ENV: production
    container_name: fuse-checkar2-backend
    restart: unless-stopped
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${DATABASE_USER:-fusecheckar}:${DATABASE_PASSWORD:-fusecheckar_password}@postgres:5432/${DATABASE_NAME:-fusecheckar2_db}
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      PORT: 3005
    ports:
      - "${BACKEND_PORT:-3005}:3005"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./packages/backend/uploads:/app/uploads
      - backend_logs:/app/logs
    networks:
      - fuse-network
    command: npm start

  # Frontend Vite (dev mode)
  frontend:
    build:
      context: ./packages/frontend
      dockerfile: ../../docker/frontend/Dockerfile.dev
    container_name: fuse-checkar2-frontend
    restart: unless-stopped
    ports:
      - "${FRONTEND_PORT:-8080}:8080"
    volumes:
      - ./packages/frontend:/app
      - /app/node_modules
    networks:
      - fuse-network
    command: npm run dev

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: fuse-checkar2-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./docker/nginx/conf.d:/etc/nginx/conf.d
      - ./docker/nginx/ssl:/etc/nginx/ssl
      - nginx_logs:/var/log/nginx
    depends_on:
      - backend
      - frontend
    networks:
      - fuse-network

volumes:
  postgres_data:
    driver: local
  backend_logs:
    driver: local
  nginx_logs:
    driver: local

networks:
  fuse-network:
    driver: bridge
```

### `docker/nginx/nginx.conf`

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Upstream servers
    upstream frontend {
        server frontend:8080;
    }

    upstream backend {
        server backend:3005;
    }

    # Main server
    server {
        listen 80;
        server_name localhost;

        # Frontend (root)
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Backend API
        location /api/ {
            proxy_pass http://backend/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # Timeouts para APIs
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

---

## 🔐 ENVIRONMENT VARIABLES

### `.env.example`

```bash
# =============================================================================
# APPLICATION
# =============================================================================
NODE_ENV=development
PORT=3005
APP_NAME="Fuse Checkar2"
APP_URL=http://localhost

# =============================================================================
# DATABASE
# =============================================================================
DATABASE_URL=postgresql://fusecheckar:fusecheckar_password@localhost:5432/fusecheckar2_db
DATABASE_USER=fusecheckar
DATABASE_PASSWORD=fusecheckar_password
DATABASE_NAME=fusecheckar2_db
DATABASE_PORT=5432

# =============================================================================
# JWT
# =============================================================================
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# =============================================================================
# CORS
# =============================================================================
CORS_ORIGINS=http://localhost:8080,http://localhost:5173
FRONTEND_URL=http://localhost:8080

# =============================================================================
# UPLOADS
# =============================================================================
UPLOAD_MAX_SIZE=10485760
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,application/pdf
UPLOAD_DEST=./uploads

# =============================================================================
# EMAIL (SMTP)
# =============================================================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@fusecheckar2.com

# =============================================================================
# RATE LIMITING
# =============================================================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# =============================================================================
# LOGGING
# =============================================================================
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# =============================================================================
# FRONTEND (para referência)
# =============================================================================
FRONTEND_PORT=8080
BACKEND_PORT=3005
```

---

## 📝 CONTINUAÇÃO NO PRÓXIMO DOCUMENTO

Este documento ficou muito extenso. Vou continuar com:

**Próximo**: `FASE_5_IMPLEMENTACAO_DETALHADA.md` contendo:
- Implementação de cada endpoint
- Código completo de controllers
- Código completo de services
- Middlewares
- Validações
- Testes

**Status**: Planejamento 60% completo
