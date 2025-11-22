# Fuse Checkar2 - Sistema de Gestão de Revisões Automotivas

Sistema completo para gestão de oficinas mecânicas, clientes, veículos e revisões automotivas.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Desenvolvimento](#desenvolvimento)
- [Produção](#produção)
- [Documentação](#documentação)

## 🎯 Sobre o Projeto

O Fuse Checkar2 é uma aplicação full-stack construída em arquitetura monorepo que permite:

- Gestão de clientes e suas informações
- Controle de veículos e histórico de manutenções
- Agendamento e acompanhamento de revisões
- Diferentes níveis de acesso (Cliente, Mecânico, Admin)
- Validações brasileiras (CPF, CNPJ, CEP, telefone, placa)
- Sistema completo de autenticação com JWT

## 🛠 Tecnologias

### Frontend
- **React** 18 com **TypeScript**
- **Vite** para build e dev server
- **TanStack Query** para gerenciamento de estado
- **React Router** para navegação
- **Shadcn/ui** + **Tailwind CSS** para interface
- **Zod** para validação

### Backend
- **Node.js** + **Express.js**
- **TypeScript** em modo strict
- **Prisma ORM** com PostgreSQL
- **JWT** para autenticação
- **Zod** para validação de schemas
- **Winston** para logging
- **Bcrypt** para hash de senhas
- **Express Rate Limit** para proteção contra abuso

### Infraestrutura
- **Docker** + **Docker Compose**
- **Nginx** como reverse proxy
- **PostgreSQL 15** para banco de dados
- **Multi-stage builds** para otimização

## 🏗 Arquitetura

```
fuse-checkar2/
├── packages/
│   ├── frontend/          # Aplicação React
│   ├── backend/           # API Node.js + Express
│   └── shared/            # Tipos e utils compartilhados
├── docker/                # Configurações Docker
│   ├── nginx/             # Config Nginx
│   └── frontend/          # Docker frontend
├── docker-compose.yml     # Compose produção
├── docker-compose.dev.yml # Compose desenvolvimento
└── docs/                  # Documentação adicional
```

### Pacotes

#### `@fuse-checkar2/frontend`
Interface React para usuários finais, mecânicos e administradores.

**Principais recursos:**
- Dashboard responsivo
- Gestão de clientes, veículos e revisões
- Sistema de autenticação integrado
- Validações em tempo real

**Tecnologias:**
- React 18, TypeScript, Vite
- TanStack Query, React Router
- Shadcn/ui, Tailwind CSS

**Como rodar:**
```bash
cd packages/frontend
npm install
npm run dev
```

#### `@fuse-checkar2/backend`
API RESTful completa com autenticação, autorização e rate limiting.

**Principais recursos:**
- Autenticação JWT (access + refresh tokens)
- Rate limiting configurável
- Validação completa com Zod
- Logging estruturado
- Graceful shutdown

**Tecnologias:**
- Node.js, Express, TypeScript
- Prisma ORM, PostgreSQL
- Winston, Helmet, CORS

**Documentação:** Ver [packages/backend/README.md](packages/backend/README.md)

**Como rodar:**
```bash
cd packages/backend
npm install
cp .env.example .env
# Editar .env com suas configurações
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

#### `@fuse-checkar2/shared`
Tipos TypeScript, constantes e utilitários compartilhados entre frontend e backend.

**Exports:**
- Tipos: `Cliente`, `Veiculo`, `Revisao`, `ApiResponse`, etc.
- Enums: `Role`, `StatusCliente`, `StatusRevisao`, etc.
- Utils: `formatCPF`, `formatPhone`, `formatCEP`, etc.

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ ([instalar com nvm](https://github.com/nvm-sh/nvm))
- Docker e Docker Compose (opcional, para produção)
- PostgreSQL 15+ (se não usar Docker)

### Instalação Rápida

```bash
# 1. Clonar o repositório
git clone <YOUR_GIT_URL>
cd fuse-checkar2

# 2. Instalar dependências (workspace)
npm install

# 3. Configurar variáveis de ambiente
cd packages/backend
cp .env.example .env
# Editar .env com suas configurações

# 4. Gerar Prisma Client
npm run db:generate

# 5. Executar migrations
npm run db:migrate

# 6. Popular banco com dados de teste
npm run db:seed

# 7. Voltar para raiz
cd ../..
```

## 💻 Desenvolvimento

### Opção 1: Ambiente Local

```bash
# Terminal 1 - Backend
cd packages/backend
npm run dev

# Terminal 2 - Frontend
cd packages/frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173`
A API estará disponível em `http://localhost:3005`

### Opção 2: Docker Compose (Dev)

```bash
docker-compose -f docker-compose.dev.yml up
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3005`
- PostgreSQL: `localhost:5432`

**Recursos do modo dev:**
- Hot reload para backend (nodemon)
- Hot reload para frontend (Vite HMR)
- Volumes montados para edição em tempo real

### Credenciais de Teste

Após executar `npm run db:seed`:

- **Admin:** admin@fusecheckar.com / Admin@123
- **Mecânico:** mecanico@fusecheckar.com / Mecanico@123
- **Cliente:** cliente1@example.com / Cliente@123

## 🏭 Produção

### Com Docker Compose

```bash
# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

A aplicação estará disponível em `http://localhost` (porta 80).

### Build Manual

```bash
# Build shared package
cd packages/shared
npm run build

# Build backend
cd ../backend
npm run build

# Build frontend
cd ../frontend
npm run build

# Iniciar backend
cd ../backend
npm start
```

## 📚 Documentação

### Documentos Disponíveis

- [packages/backend/README.md](packages/backend/README.md) - Documentação completa do backend
- [ANALISE_TYPESCRIPT_PROFUNDA.md](ANALISE_TYPESCRIPT_PROFUNDA.md) - Análise TypeScript detalhada (2.568 linhas)
- [FASE_5_PLANO_BACKEND_COMPLETO.md](FASE_5_PLANO_BACKEND_COMPLETO.md) - Planejamento arquitetural completo
- [RELATORIO_ANALISE_COMPLETA.md](RELATORIO_ANALISE_COMPLETA.md) - Relatório de análise da aplicação
- [DOCUMENTACAO_API_ORIGINAL.md](DOCUMENTACAO_API_ORIGINAL.md) - Documentação dos 28 endpoints API

### Estrutura da API

A API REST está documentada com exemplos em `packages/backend/README.md`.

**Principais endpoints:**
- `POST /api/auth/register` - Registro de usuários
- `POST /api/auth/login` - Login
- `GET /api/clientes` - Listar clientes (paginado)
- `GET /api/veiculos` - Listar veículos
- `GET /api/revisoes` - Listar revisões
- `GET /api/health` - Health check

## 🔒 Segurança

- Autenticação JWT com access e refresh tokens
- Bcrypt para hash de senhas (10 rounds)
- Helmet para security headers
- Rate limiting (8 estratégias diferentes)
- Validação de entrada com Zod
- CORS configurável por ambiente
- Sanitização de logs (remove senhas, tokens)

## 🧪 Testes

```bash
# Frontend
cd packages/frontend
npm test

# Backend
cd packages/backend
npm test
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- Desenvolvido com Claude AI

## 📞 Suporte

Para suporte, abra uma issue no repositório do projeto.

---

**Projeto URL**: https://lovable.dev/projects/a4cd1c20-3931-42f5-b59d-669b68fd8a99
