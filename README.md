# Fuse Checkar2 - Sistema Completo de Gestão de Revisões Automotivas

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema profissional de gestão de revisões automotivas com backend em TypeScript + Prisma + PostgreSQL e frontend em Vanilla JavaScript.

---

## 📚 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Stack Tecnológica](#-stack-tecnológica)
- [Instalação](#-instalação)
- [Desenvolvimento](#-desenvolvimento)
- [Produção](#-produção)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API](#-api)
- [Docker](#-docker)
- [Documentação](#-documentação)
- [Contribuindo](#-contribuindo)

---

## 🎯 Visão Geral

**Fuse Checkar2** é uma plataforma completa para gestão de oficinas mecânicas, oferecendo:

✅ **Gestão Completa de Clientes** - Cadastro, perfis detalhados, histórico
✅ **Controle de Veículos** - Múltiplos veículos por cliente, dados técnicos
✅ **Revisões Detalhadas** - Agendamento, execução, histórico completo
✅ **Recomendações Inteligentes** - Sugestões baseadas em quilometragem e tempo
✅ **Portal do Cliente** - Acesso para clientes consultarem seus veículos
✅ **Autenticação Completa** - JWT com refresh tokens, múltiplas roles
✅ **API RESTful** - 40+ endpoints documentados
✅ **Docker + Nginx** - Deploy simplificado com reverse proxy

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    NGINX (Reverse Proxy)                     │
│                         Port: 80/443                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├─── /api/* ──────────────────────┐
                       │                                  │
                       ├─── /* (static) ─────────┐      │
                       │                          │      │
            ┌──────────▼──────────┐    ┌─────────▼──────▼─────┐
            │  Frontend (Static)  │    │   Backend (Node.js)   │
            │   Vanilla JS + CSS  │    │   TypeScript + Prisma │
            │   Material Symbols  │    │   Express + Zod       │
            │      SPA Router     │    │      Port: 3005       │
            └─────────────────────┘    └──────────┬────────────┘
                                                   │
                                        ┌──────────▼────────────┐
                                        │ PostgreSQL Database   │
                                        │      Port: 5432       │
                                        │   8 Tables + Indexes  │
                                        └───────────────────────┘
```

---

## 🚀 Stack Tecnológica

### Backend
- **Node.js** 18+ - Runtime JavaScript
- **TypeScript** 5.3+ - Tipagem estática (0% uso de `any`)
- **Express.js** 4.18+ - Framework web
- **Prisma ORM** 5.7+ - ORM type-safe para PostgreSQL
- **PostgreSQL** 15+ - Banco de dados relacional
- **Zod** 3.22+ - Validação de schemas
- **JWT** - Autenticação com tokens
- **Bcrypt** - Hash de senhas
- **Winston** - Logging profissional

### Frontend
- **Vanilla JavaScript** (ES6 Modules) - Sem frameworks
- **HTML5 + CSS3** - Interface moderna
- **Material Symbols** - Ícones do Google
- **SPA Router** - Roteamento client-side customizado

### DevOps
- **Docker** + **Docker Compose** - Containerização
- **Nginx** - Reverse proxy e servidor estático
- **Multi-stage Build** - Otimização de imagens Docker

---

## 📦 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/) 15+ (ou Docker)
- [Docker](https://www.docker.com/) (opcional, para produção)
- npm ou yarn

### Clone o repositório

```bash
git clone https://github.com/fernandinhomartins40/fuse-checkar2.git
cd fuse-checkar2
```

### Instalar dependências

```bash
# Backend
cd backend
npm install

# Gerar Prisma Client
npm run prisma:generate
```

### Configurar variáveis de ambiente

```bash
# Copiar exemplo
cp backend/.env.example backend/.env

# Editar com suas configurações
nano backend/.env
```

**Variáveis obrigatórias:**
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/checkar2_db
JWT_SECRET=sua_chave_secreta_min_32_caracteres
JWT_REFRESH_SECRET=sua_refresh_key_min_32_caracteres
SESSION_SECRET=sua_session_secret_min_32_caracteres
```

### Executar migrations

```bash
cd backend
npm run prisma:migrate
```

---

## 💻 Desenvolvimento

### Opção 1: Desenvolvimento Local

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (servidor simples)
cd html-app
python3 -m http.server 8080
```

Acesse:
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3005/api
- **Health Check:** http://localhost:3005/health

### Opção 2: Docker Compose (Desenvolvimento)

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

---

## 🚢 Produção

### Deploy com Docker Compose

```bash
# 1. Build e deploy
docker-compose -f docker-compose.prod.yml up -d --build

# 2. Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# 3. Parar
docker-compose -f docker-compose.prod.yml down
```

**Serviços incluídos:**
- ✅ PostgreSQL (banco de dados)
- ✅ Backend (Node.js + TypeScript)
- ✅ Nginx (reverse proxy + frontend)

**Acessar:**
- **Aplicação:** http://localhost
- **API:** http://localhost/api
- **Health:** http://localhost/health

### Configuração de Produção

1. **Editar variáveis de ambiente**
   ```bash
   nano backend/.env
   ```

2. **Gerar secrets seguros**
   ```bash
   # JWT Secret
   openssl rand -base64 32

   # Refresh Secret
   openssl rand -base64 32

   # Session Secret
   openssl rand -base64 32
   ```

3. **Configurar PostgreSQL**
   - Alterar senha padrão no `docker-compose.prod.yml`
   - Configurar backup automático

4. **SSL/HTTPS (Recomendado)**
   - Configurar certificados em `nginx/certs/`
   - Habilitar SSL no `nginx/conf.d/default.conf`

---

## 📁 Estrutura do Projeto

```
fuse-checkar2/
├── backend/                          # Backend TypeScript
│   ├── src/
│   │   ├── config/                   # Configurações
│   │   ├── types/                    # Tipos TypeScript
│   │   ├── schemas/                  # Validação Zod
│   │   ├── middleware/               # Middlewares
│   │   ├── utils/                    # Utilitários
│   │   ├── services/                 # Lógica de negócio
│   │   ├── controllers/              # Controllers
│   │   ├── routes/                   # Rotas da API
│   │   ├── app.ts                    # Express app
│   │   └── server.ts                 # Entry point
│   ├── prisma/
│   │   └── schema.prisma             # Schema do banco
│   ├── uploads/                      # Arquivos enviados
│   ├── logs/                         # Logs da aplicação
│   ├── Dockerfile                    # Docker do backend
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md                     # Docs do backend
│
├── html-app/                         # Frontend Vanilla JS
│   ├── assets/
│   │   ├── css/                      # Estilos
│   │   ├── js/                       # JavaScript
│   │   │   ├── core/                 # Router, Auth, API
│   │   │   ├── pages/                # Páginas
│   │   │   └── components/           # Componentes
│   │   └── images/                   # Imagens
│   └── index.html                    # Entry point
│
├── nginx/                            # Configurações Nginx
│   ├── nginx.conf                    # Config principal
│   └── conf.d/
│       └── default.conf              # Reverse proxy
│
├── docker-compose.yml                # Docker dev
├── docker-compose.prod.yml           # Docker prod
├── PLANO_BACKEND_DETALHADO.md        # Plano de implementação
├── ANALISE_BRANCHES_E_PLANO_MERGE.md # Análise de branches
└── README.md                         # Este arquivo
```

---

## 🔌 API

### Documentação Completa

Ver [`backend/README.md`](backend/README.md) para documentação completa da API.

### Principais Endpoints

#### Autenticação
```
POST   /api/auth/cliente/register     # Registro de cliente
POST   /api/auth/cliente/login        # Login de cliente
POST   /api/auth/admin/login          # Login de admin
POST   /api/auth/refresh              # Refresh token
POST   /api/auth/logout               # Logout
GET    /api/auth/me                   # Usuário logado
```

#### Clientes
```
GET    /api/clientes                  # Listar clientes
POST   /api/clientes                  # Criar cliente
GET    /api/clientes/:id              # Buscar cliente
PUT    /api/clientes/:id              # Atualizar cliente
DELETE /api/clientes/:id              # Deletar cliente
```

#### Veículos
```
GET    /api/veiculos                  # Listar veículos
POST   /api/veiculos                  # Criar veículo
GET    /api/veiculos/:id              # Buscar veículo
PUT    /api/veiculos/:id              # Atualizar veículo
DELETE /api/veiculos/:id              # Deletar veículo
```

#### Revisões
```
GET    /api/revisoes                  # Listar revisões
POST   /api/revisoes                  # Criar revisão
GET    /api/revisoes/:id              # Buscar revisão
PUT    /api/revisoes/:id              # Atualizar revisão
PATCH  /api/revisoes/:id/status       # Mudar status
```

### Autenticação

Todas as rotas protegidas requerem header:
```http
Authorization: Bearer SEU_TOKEN_JWT
```

### Exemplo de Uso

```bash
# Login
curl -X POST http://localhost:3005/api/auth/cliente/login \
  -H "Content-Type: application/json" \
  -d '{"email": "cliente@example.com", "senha": "senha123"}'

# Listar clientes (autenticado)
curl http://localhost:3005/api/clientes \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🐳 Docker

### Comandos Úteis

```bash
# Build
docker-compose -f docker-compose.prod.yml build

# Up (detached)
docker-compose -f docker-compose.prod.yml up -d

# Logs
docker-compose -f docker-compose.prod.yml logs -f backend

# Down
docker-compose -f docker-compose.prod.yml down

# Restart
docker-compose -f docker-compose.prod.yml restart backend

# Executar comando no container
docker-compose -f docker-compose.prod.yml exec backend npm run prisma:studio
```

### Health Checks

Todos os serviços possuem health checks configurados:
- **Backend:** `wget http://localhost:3005/health`
- **PostgreSQL:** `pg_isready`
- **Nginx:** `wget http://localhost/health`

---

## 📚 Documentação

### Documentos Principais

1. **[backend/README.md](backend/README.md)** - Documentação completa do backend
   - Instalação e configuração
   - Todos os endpoints da API
   - Exemplos de uso
   - Comandos Prisma

2. **[PLANO_BACKEND_DETALHADO.md](PLANO_BACKEND_DETALHADO.md)** - Plano de implementação
   - Arquitetura detalhada
   - Estrutura de diretórios
   - Schema Prisma completo
   - Tipos TypeScript

3. **[ANALISE_BRANCHES_E_PLANO_MERGE.md](ANALISE_BRANCHES_E_PLANO_MERGE.md)** - Análise de branches
   - Estado das branches
   - Plano de merge
   - Estratégias de alinhamento

### Prisma Studio

Visualize e edite o banco graficamente:

```bash
cd backend
npm run prisma:studio
```

Acesse: http://localhost:5555

---

## 🔒 Segurança

### Implementado

- ✅ **Helmet** - Security headers
- ✅ **CORS** - Configurável por ambiente
- ✅ **Rate Limiting** - 3 níveis (geral, auth, strict)
- ✅ **Bcrypt** - Hash de senhas (10 rounds)
- ✅ **JWT** - Tokens com expiração
- ✅ **Refresh Tokens** - Renovação segura
- ✅ **Zod Validation** - Validação rigorosa de inputs
- ✅ **SQL Injection Protection** - Via Prisma ORM
- ✅ **XSS Protection** - Headers e sanitização

### Boas Práticas

- Usuário não-root no Docker
- Secrets em variáveis de ambiente
- HTTPS recomendado em produção
- Logs de auditoria
- Validação de CPF com dígitos verificadores

---

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Lint
npm run lint
npm run lint:fix
```

---

## 📊 Database Schema

**8 Tabelas principais:**

1. **users** - Autenticação
2. **admins** - Administradores
3. **clientes** - Clientes
4. **mecanicos** - Mecânicos
5. **veiculos** - Veículos
6. **revisoes** - Revisões
7. **recomendacoes** - Recomendações
8. **audit_logs** - Logs de auditoria

Ver schema completo em [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)

---

## 🛠️ Scripts NPM

### Raiz
```bash
npm run dev            # Dev (backend + frontend)
npm run build          # Build completo
npm run start:prod     # Docker prod up
npm run stop:prod      # Docker prod down
```

### Backend
```bash
npm run dev              # Desenvolvimento
npm run build            # Build TypeScript
npm start                # Produção
npm run prisma:generate  # Gerar Client
npm run prisma:migrate   # Migrations
npm run prisma:studio    # Interface gráfica
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Minha feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenção de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

---

## 📝 Licença

MIT License - ver arquivo [LICENSE](LICENSE)

---

## 👥 Equipe

**Fuse Checkar2 Team**

---

## 📞 Suporte

- **Issues:** https://github.com/fernandinhomartins40/fuse-checkar2/issues
- **Documentação:** Ver [`backend/README.md`](backend/README.md)

---

## 🎯 Roadmap

### ✅ Implementado (v1.0)
- [x] Backend TypeScript completo
- [x] Prisma + PostgreSQL
- [x] Autenticação JWT
- [x] 40+ endpoints da API
- [x] Frontend Vanilla JS
- [x] Docker + Nginx
- [x] Documentação completa

### 🚧 Próximas Versões
- [ ] Testes automatizados (Jest)
- [ ] CI/CD (GitHub Actions)
- [ ] Upload de arquivos
- [ ] Geração de PDFs (relatórios)
- [ ] Notificações por email
- [ ] Dashboard com gráficos
- [ ] App mobile (React Native)
- [ ] Internacionalização (i18n)

---

## 📈 Estatísticas do Projeto

- **Backend:** ~10,000 linhas de TypeScript
- **Arquivos:** 70+ arquivos criados
- **API Endpoints:** 40+
- **Tabelas DB:** 8
- **0%** uso de `any` no TypeScript
- **100%** tipado profissionalmente

---

**Desenvolvido com ❤️ pela equipe Fuse Checkar2**
