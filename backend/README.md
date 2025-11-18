# Fuse Checkar2 - Backend API

Backend completo em Node.js + TypeScript + Prisma + PostgreSQL para sistema de gestão de revisões automotivas.

## 🚀 Stack Tecnológica

- **Node.js** 18+
- **TypeScript** 5.3+
- **Express.js** 4.18+
- **Prisma ORM** 5.7+
- **PostgreSQL** 15+
- **Zod** (validação de dados)
- **JWT** (autenticação)
- **Bcrypt** (hash de senhas)
- **Winston** (logging)
- **Docker** + **Docker Compose**

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/          # Configurações (env, database, logger, cors)
│   ├── types/           # Tipos TypeScript
│   ├── schemas/         # Schemas de validação Zod
│   ├── middleware/      # Middlewares (auth, validate, error-handler)
│   ├── utils/           # Utilitários (jwt, bcrypt, validators, formatters)
│   ├── services/        # Lógica de negócio
│   ├── controllers/     # Controllers
│   ├── routes/          # Rotas da API
│   ├── app.ts           # Configuração do Express
│   └── server.ts        # Entry point
├── prisma/
│   └── schema.prisma    # Schema do Prisma
├── uploads/             # Arquivos enviados
├── logs/                # Logs da aplicação
├── Dockerfile           # Docker multi-stage build
├── .env                 # Variáveis de ambiente
└── package.json
```

## 🔧 Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+ (ou Docker)
- npm ou yarn

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/checkar2_db
JWT_SECRET=sua_chave_secreta_min_32_caracteres
JWT_REFRESH_SECRET=sua_refresh_key_min_32_caracteres
SESSION_SECRET=sua_session_secret_min_32_caracteres
```

### 3. Configurar banco de dados

```bash
# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# (Opcional) Seed inicial
npm run prisma:seed
```

### 4. Iniciar servidor

#### Desenvolvimento

```bash
npm run dev
```

#### Produção

```bash
npm run build
npm start
```

## 🐳 Docker

### Desenvolvimento com Docker Compose

```bash
# Subir todos os serviços (PostgreSQL + Backend)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### Produção com Docker Compose

```bash
# Usar docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

## 📡 API Endpoints

### Autenticação

```
POST   /api/auth/cliente/register     # Registro de cliente
POST   /api/auth/cliente/login        # Login de cliente
POST   /api/auth/admin/login          # Login de admin
POST   /api/auth/mecanico/login       # Login de mecânico
POST   /api/auth/refresh              # Refresh token
POST   /api/auth/logout               # Logout (auth)
POST   /api/auth/change-password      # Mudar senha (auth)
GET    /api/auth/me                   # Dados do usuário (auth)
POST   /api/auth/validate             # Validar token (auth)
```

### Clientes

```
GET    /api/clientes                  # Listar clientes (admin)
POST   /api/clientes                  # Criar cliente (admin)
GET    /api/clientes/:id              # Buscar cliente (admin/owner)
PUT    /api/clientes/:id              # Atualizar cliente (admin/owner)
DELETE /api/clientes/:id              # Deletar cliente (admin)
PATCH  /api/clientes/:id/status       # Mudar status (admin)
GET    /api/clientes/:id/estatisticas # Estatísticas (admin/owner)
```

### Veículos

```
GET    /api/veiculos                  # Listar veículos (auth)
POST   /api/veiculos                  # Criar veículo (auth)
GET    /api/veiculos/:id              # Buscar veículo (auth)
PUT    /api/veiculos/:id              # Atualizar veículo (auth)
DELETE /api/veiculos/:id              # Deletar veículo (auth)
```

### Revisões

```
GET    /api/revisoes                  # Listar revisões (auth)
POST   /api/revisoes                  # Criar revisão (auth)
GET    /api/revisoes/:id              # Buscar revisão (auth)
PUT    /api/revisoes/:id              # Atualizar revisão (auth)
DELETE /api/revisoes/:id              # Deletar revisão (auth)
PATCH  /api/revisoes/:id/status       # Mudar status (auth/mecanico)
```

### Health Check

```
GET    /health                        # Health check básico
GET    /api/health/detailed           # Health check detalhado (admin)
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação.

### Como autenticar

1. Faça login em um dos endpoints de autenticação
2. Receba o `token` e `refreshToken` na resposta
3. Inclua o token nas requisições:

```http
Authorization: Bearer seu_token_aqui
```

### Roles disponíveis

- `CLIENTE` - Cliente da oficina
- `MECANICO` - Mecânico
- `ADMIN` - Administrador

## 📝 Exemplos de Uso

### Registro de Cliente

```bash
curl -X POST http://localhost:3005/api/auth/cliente/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@example.com",
    "senha": "senha123",
    "nome": "João",
    "sobrenome": "Silva",
    "cpf": "12345678900",
    "telefone": "11999887766"
  }'
```

### Login

```bash
curl -X POST http://localhost:3005/api/auth/cliente/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@example.com",
    "senha": "senha123"
  }'
```

### Criar Veículo

```bash
curl -X POST http://localhost:3005/api/veiculos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token" \
  -d '{
    "clienteId": 1,
    "marca": "Toyota",
    "modelo": "Corolla",
    "ano": 2023,
    "placa": "ABC1234",
    "combustivel": "FLEX"
  }'
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev              # Desenvolvimento com nodemon
npm run build            # Build TypeScript
npm start                # Produção
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Executar migrations
npm run prisma:studio    # Abrir Prisma Studio
npm run prisma:seed      # Seed do banco
npm run lint             # Linter
npm run lint:fix         # Fix linter
```

## 🧪 Validações

Todas as rotas possuem validação de dados usando Zod:

- CPF (validação com dígitos verificadores)
- Email (formato válido)
- Telefone (formato brasileiro)
- CEP (formato válido)
- Placa (formatos antigo e Mercosul)
- Senhas (mínimo 6 caracteres)

## 🔒 Segurança

- Helmet (security headers)
- CORS configurável
- Rate limiting (100 req/min geral, 5 req/min para auth)
- Bcrypt para hash de senhas (10 rounds)
- JWT com refresh tokens
- Validação rigorosa de inputs
- Sanitização de dados

## 📊 Logging

Logs são salvos em `logs/` usando Winston:

- `error.log` - Apenas erros
- `combined.log` - Todos os logs
- Rotação diária de arquivos
- Máximo 10 dias de logs

## 🚨 Tratamento de Erros

Todos os erros são tratados centralizadamente e retornam:

```json
{
  "success": false,
  "error": "ErrorType",
  "message": "Mensagem descritiva",
  "statusCode": 400,
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

## 📦 Prisma

### Comandos úteis

```bash
# Ver banco de dados graficamente
npx prisma studio

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Resetar banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Deploy migrations em produção
npx prisma migrate deploy
```

## 🌐 Variáveis de Ambiente

Variáveis obrigatórias:

```env
DATABASE_URL              # URL do PostgreSQL
JWT_SECRET                # Chave JWT (min 32 chars)
JWT_REFRESH_SECRET        # Chave refresh (min 32 chars)
SESSION_SECRET            # Chave de sessão (min 32 chars)
```

Variáveis opcionais (com defaults):

```env
NODE_ENV=development
PORT=3005
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://localhost
BCRYPT_ROUNDS=10
LOG_LEVEL=info
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_AUTH_MAX=5
```

## 📄 Licença

MIT

## 👥 Equipe

Fuse Checkar2 Team

---

**Documentação da API:** http://localhost:3005/api

**Health Check:** http://localhost:3005/health
