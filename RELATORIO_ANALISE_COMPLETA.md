# RELATÓRIO COMPLETO DE ANÁLISE - FUSE CHECKAR2
**Data**: 19 de Novembro de 2025  
**Projeto**: /home/user/fuse-checkar2  
**Status**: Análise Completa e Detalhada

---

## ÍNDICE
1. Estrutura de Diretórios Completa
2. Integrações com Supabase
3. Chamadas de API
4. Dependências do Projeto
5. Estrutura do Frontend
6. Estrutura do Backend
7. Arquivos de Configuração
8. Análise de Tipos TypeScript
9. Diagrama de Fluxo de Dados
10. Observações Críticas para Migração

---

## 1. ESTRUTURA DE DIRETÓRIOS COMPLETA

### Raiz do Projeto
```
/home/user/fuse-checkar2/
├── src/                           # Frontend React
├── backend/                        # Backend Node.js/Express
├── public/                         # Arquivos públicos (favicon, robots.txt)
├── nginx/                          # Configuração Nginx
├── html-app/                       # Aplicação HTML alternativa
├── .github/workflows/              # CI/CD (deploy.yml)
├── package.json                    # Dependências Frontend
├── tsconfig.json                   # Configuração TypeScript
├── vite.config.ts                  # Configuração Vite
├── tailwind.config.ts              # Configuração Tailwind
├── postcss.config.js               # Configuração PostCSS
├── index.html                      # Entrypoint HTML
├── components.json                 # Configuração shadcn-ui
└── Dockerfile                      # Dockerfile para containerização
```

### Estrutura Frontend - /src (127 arquivos TypeScript/TSX, 4.058 linhas)

#### Diretórios Principais:
```
src/
├── pages/                          # Páginas principais da aplicação
│   ├── Landing.tsx                 # Página inicial
│   ├── Index.tsx                   # Página index
│   ├── Login.tsx                   # Login do cliente
│   ├── AdminLogin.tsx              # Login do admin/mecânico
│   ├── AdminDashboard.tsx          # Dashboard admin
│   ├── Registro.tsx                # Registro de novo cliente
│   ├── Clientes.tsx                # Lista de clientes
│   ├── ClienteNovo.tsx             # Criar novo cliente
│   ├── ClienteDetalhe.tsx          # Detalhes do cliente
│   ├── ClienteEditar.tsx           # Editar cliente
│   ├── Veiculos.tsx                # Lista de veículos
│   ├── VeiculoNovo.tsx             # Criar novo veículo
│   ├── VeiculoDetalhe.tsx          # Detalhes do veículo
│   ├── VeiculoEditar.tsx           # Editar veículo
│   ├── Revisoes.tsx                # Lista de revisões
│   ├── RevisaoNova.tsx             # Criar nova revisão
│   ├── RevisaoDetalhe.tsx          # Detalhes da revisão
│   ├── Relatorios.tsx              # Relatórios e análises
│   ├── NotFound.tsx                # Página 404
│   └── cliente/                    # Páginas do cliente
│       ├── Dashboard.tsx           # Dashboard cliente
│       ├── Veiculos.tsx            # Veículos do cliente
│       ├── VeiculoDetalhe.tsx      # Detalhes veículo cliente
│       ├── Revisoes.tsx            # Revisões do cliente
│       ├── RevisaoDetalhe.tsx      # Detalhes revisão cliente
│       ├── Recomendacoes.tsx       # Recomendações para cliente
│       ├── RecomendacaoDetalhe.tsx # Detalhes recomendação
│       └── Perfil.tsx              # Perfil do cliente
│
├── components/                     # Componentes React reutilizáveis
│   ├── ui/                         # Componentes shadcn-ui (67 componentes)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── popover.tsx
│   │   ├── toast.tsx
│   │   ├── sonner.tsx
│   │   └── (outros componentes de UI)
│   │
│   ├── Layout.tsx                  # Componente layout principal
│   ├── Header.tsx                  # Header/Navegação
│   ├── ClienteHeader.tsx           # Header para cliente
│   ├── ProtectedRoute.tsx          # Rota protegida (autenticação)
│   ├── Dashboard.tsx               # Dashboard mecânico
│   ├── QuickStats.tsx              # Estatísticas rápidas
│   ├── QuickActions.tsx            # Ações rápidas
│   ├── AlertsPanel.tsx             # Painel de alertas
│   ├── RecentActivities.tsx        # Atividades recentes
│   ├── MonthlySummary.tsx          # Resumo mensal
│   │
│   ├── clientes/                   # Componentes de clientes
│   │   ├── ClientesList.tsx        # Lista de clientes
│   │   └── ClienteForm.tsx         # Formulário de cliente
│   │
│   ├── veiculos/                   # Componentes de veículos
│   │   ├── VeiculosList.tsx        # Lista de veículos
│   │   └── VeiculoForm.tsx         # Formulário de veículo
│   │
│   ├── cliente/                    # Componentes específicos cliente
│   │   ├── ClienteSidebar.tsx      # Sidebar do cliente
│   │   ├── ModernVehicleCard.tsx   # Card veículo moderno
│   │   ├── ModernStatsCard.tsx     # Card stats moderno
│   │   ├── StatsCard.tsx           # Card stats
│   │   ├── QuickActionCard.tsx     # Card ação rápida
│   │   └── ModernQuickAction.tsx   # Ação rápida moderna
│   │
│   ├── revisoes/                   # Componentes de revisões
│   │   ├── RevisaoForm.tsx         # Formulário revisão
│   │   ├── ChecklistItem.tsx       # Item do checklist
│   │   ├── ChecklistCategory.tsx   # Categoria checklist
│   │   ├── PreDiagnosisSection.tsx # Seção pré-diagnóstico
│   │   └── FinalizationSection.tsx # Seção finalização
│   │
│   ├── relatorios/                 # Componentes de relatórios
│   │   ├── RelatorioTable.tsx      # Tabela de relatório
│   │   ├── RelatorioCharts.tsx     # Gráficos relatório
│   │   ├── RelatorioFilters.tsx    # Filtros relatório
│   │   └── StatsCards.tsx          # Cards estatísticas
│   │
│   └── landing/                    # Componentes landing page
│       ├── Hero.tsx                # Hero section
│       ├── Features.tsx            # Features
│       ├── Benefits.tsx            # Benefícios
│       ├── Testimonials.tsx        # Depoimentos
│       ├── CallToAction.tsx        # CTA
│       └── LandingHeader.tsx       # Header landing
│
├── hooks/                          # Hooks customizados (7 arquivos)
│   ├── useClientesData.tsx         # Gerencia dados clientes (localStorage)
│   ├── useClientesApi.tsx          # Chamadas API clientes (React Query)
│   ├── useVeiculosData.tsx         # Gerencia dados veículos
│   ├── useRevisoesData.tsx         # Gerencia dados revisões
│   ├── useRelatoriosData.tsx       # Gerencia dados relatórios
│   ├── use-toast.ts                # Hook de toast/notificação
│   └── use-mobile.tsx              # Hook responsividade mobile
│
├── contexts/                       # Context API
│   └── AuthContext.tsx             # Contexto de autenticação
│
├── services/                       # Serviços de chamadas API
│   └── api.js                      # Serviço centralizado de API (fetch)
│
├── types/                          # Tipos TypeScript
│   └── revisoes.ts                 # Tipos para revisões
│
├── data/                           # Dados mock/templates
│   ├── checklistTemplate.ts        # Template de checklist
│   └── newChecklistTemplate.ts     # Template novo de checklist
│
├── lib/                            # Utilitários
│   └── utils.ts                    # Funções utilitárias (cn do clsx)
│
├── App.tsx                         # Componente raiz da aplicação
├── main.tsx                        # Entrypoint React
├── index.css                       # Estilos globais
├── App.css                         # Estilos App
└── vite-env.d.ts                   # Tipos Vite

```

### Estrutura Backend - /backend/src (52 arquivos TypeScript)

```
backend/
├── src/
│   ├── app.ts                      # Configuração Express principal
│   ├── server.ts                   # Entrypoint do servidor
│   ├── server.js                   # Fallback JS
│   │
│   ├── config/                     # Configurações
│   │   ├── env.ts                  # Variáveis de ambiente
│   │   ├── database.ts             # Conexão Prisma
│   │   ├── cors.ts                 # CORS configuration
│   │   └── logger.ts               # Winston logger
│   │
│   ├── routes/                     # Rotas/Endpoints
│   │   ├── index.ts                # Router principal
│   │   ├── auth.routes.ts          # Rotas autenticação
│   │   ├── cliente.routes.ts       # Rotas clientes
│   │   ├── veiculo.routes.ts       # Rotas veículos
│   │   ├── revisao.routes.ts       # Rotas revisões
│   │   └── health.routes.ts        # Rotas health check
│   │
│   ├── controllers/                # Controladores (MVC)
│   │   ├── auth.controller.ts      # Auth controller
│   │   ├── cliente.controller.ts   # Cliente controller
│   │   ├── veiculo.controller.ts   # Veiculo controller
│   │   ├── revisao.controller.ts   # Revisao controller
│   │   └── health.controller.ts    # Health controller
│   │
│   ├── services/                   # Business logic
│   │   ├── auth.service.ts         # Autenticação service
│   │   ├── cliente.service.ts      # Clientes service
│   │   ├── veiculo.service.ts      # Veículos service
│   │   ├── revisao.service.ts      # Revisões service
│   │   └── cep.service.ts          # CEP lookup service (ViaCEP)
│   │
│   ├── middleware/                 # Middlewares Express
│   │   ├── authenticate.ts         # Autenticação
│   │   ├── authorize.ts            # Autorização (roles)
│   │   ├── error-handler.ts        # Tratamento de erros
│   │   ├── async-handler.ts        # Wrapper de try-catch
│   │   ├── request-logger.ts       # Logging de requisições
│   │   ├── rate-limit.ts           # Rate limiting
│   │   └── validate.ts             # Validação Zod
│   │
│   ├── schemas/                    # Validação Zod
│   │   ├── index.ts                # Export principal
│   │   ├── common.schema.ts        # Schemas comuns
│   │   ├── auth.schema.ts          # Auth schemas
│   │   ├── cliente.schema.ts       # Cliente schemas
│   │   ├── veiculo.schema.ts       # Veiculo schemas
│   │   └── pagination.schema.ts    # Pagination schemas
│   │
│   ├── types/                      # Tipos TypeScript
│   │   ├── index.ts                # Barrel export
│   │   ├── api-response.types.ts   # Tipos response API
│   │   ├── auth.types.ts           # Tipos auth
│   │   ├── cliente.types.ts        # Tipos cliente
│   │   ├── veiculo.types.ts        # Tipos veículo
│   │   ├── revisao.types.ts        # Tipos revisão
│   │   ├── recomendacao.types.ts   # Tipos recomendação
│   │   ├── mecanico.types.ts       # Tipos mecânico
│   │   └── pagination.types.ts     # Tipos pagination
│   │
│   └── utils/                      # Utilitários
│       ├── bcrypt.ts               # Hash de senha
│       ├── jwt.ts                  # JWT tokens
│       ├── formatters.ts           # Formatadores
│       ├── validators.ts           # Validadores
│       ├── pagination.ts           # Pagination helpers
│       ├── date.ts                 # Date helpers
│       ├── errors.ts               # Custom errors
│       └── response.ts             # Response formatters
│
├── prisma/
│   └── schema.prisma               # Schema Prisma (419 linhas)
│
├── package.json                    # Dependências Backend
├── tsconfig.json                   # TypeScript config
└── .env                            # Variáveis de ambiente

```

---

## 2. INTEGRAÇÕES COM SUPABASE

### Resumo
**Status**: Supabase NÃO ESTÁ integrado atualmente na aplicação.

### Arquivo com Referência a Supabase:
- **Arquivo**: `/home/user/fuse-checkar2/src/hooks/useClientesApi.tsx`
- **Tipo**: Hook customizado que NÃO usa Supabase
- **Descrição**: O arquivo apenas importa `useQuery` e `useMutation` do React Query, não utiliza nenhum cliente Supabase

### Análise de Autenticação Atual:
1. **Autenticação Frontend**:
   - Salva no localStorage em `/src/contexts/AuthContext.tsx`
   - Armazena em `clienteAuth` e `adminAuth`
   - Não usa Supabase Auth

2. **Autenticação Backend**:
   - JWT-based (`@types/jsonwebtoken`)
   - Bcrypt para hash de senha
   - Gerenciado em `/backend/src/services/auth.service.ts`

### Conclusão
Não há dependências de Supabase no projeto. A migração para um novo backend não precisa lidar com remoção de Supabase.

---

## 3. CHAMADAS DE API

### Serviço Central de API
**Arquivo**: `/home/user/fuse-checkar2/src/services/api.js`

Este é o serviço centralizado que faz TODAS as chamadas API da aplicação frontend.

#### Helper Principal: `apiRequest(endpoint, options)`
```javascript
- Usa fetch nativo
- Adiciona Authorization header com token de localStorage
- Trata erros automaticamente
- Retorna JSON
```

#### Endpoints Implementados:

**1. Health Check**
```
GET /health
- Função: apiHealth.check()
```

**2. Clientes**
```
GET    /clientes                    - Listar todos
GET    /clientes/{id}               - Buscar por ID
POST   /clientes                    - Criar novo
PUT    /clientes/{id}               - Atualizar
DELETE /clientes/{id}               - Remover
```

**3. Veículos**
```
GET    /veiculos                    - Listar (com filtro opcional clienteId)
GET    /veiculos/{id}               - Buscar por ID
POST   /veiculos                    - Criar novo
PUT    /veiculos/{id}               - Atualizar
DELETE /veiculos/{id}               - Remover
```

**4. Revisões**
```
GET    /revisoes                    - Listar (com filtros clienteId, veiculoId)
GET    /revisoes/{id}               - Buscar por ID
POST   /revisoes                    - Criar nova
PUT    /revisoes/{id}               - Atualizar
POST   /revisoes/{id}/finalizar     - Finalizar revisão
DELETE /revisoes/{id}               - Remover
```

**5. Relatórios**
```
GET    /relatorios                  - Gerar relatório (com filtros)
GET    /relatorios/exportar         - Exportar (com formato)
```

**6. Upload**
```
POST   /upload                      - Upload de arquivo (FormData)
```

### React Query Integration

**Arquivo**: `/home/user/fuse-checkar2/src/hooks/useClientesApi.tsx`

Implementa hooks React Query:
- `useClientes()` - Lista clientes com cache 5 min
- `useCliente(id)` - Busca cliente específico
- `useCreateCliente()` - Criar cliente (mutation)
- `useUpdateCliente()` - Atualizar cliente (mutation)
- `useDeleteCliente()` - Deletar cliente (mutation)

Cache invalidation automática após operações.

### Configuração Proxy Vite
**Arquivo**: `/home/user/fuse-checkar2/vite.config.ts`

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3005',  // Backend porta
      changeOrigin: true,
    }
  }
}
```

### Token de Autenticação
Armazenado em localStorage em `authToken`:
```javascript
const token = localStorage.getItem('authToken');
config.headers.Authorization = `Bearer ${token}`;
```

---

## 4. DEPENDÊNCIAS DO PROJETO

### Frontend Dependencies (package.json - 67 dependências)

#### UI/Component Library
- `@radix-ui/*` (25 pacotes) - Componentes acessíveis
- `shadcn-ui` - Integrado via componentes
- `tailwindcss` - Styling
- `tailwind-merge` - Merge classes Tailwind
- `tailwindcss-animate` - Animações Tailwind

#### React & Forms
- `react` - ^18.3.1
- `react-dom` - ^18.3.1
- `react-router-dom` - ^6.26.2 (Roteamento)
- `react-hook-form` - ^7.53.0 (Formulários)
- `@hookform/resolvers` - ^3.9.0 (Validação)

#### Data & State
- `@tanstack/react-query` - ^5.56.2 (Caching/API)
- `zod` - ^3.23.8 (Validação schemas)

#### UI Elements
- `lucide-react` - ^0.462.0 (Ícones)
- `recharts` - ^2.12.7 (Gráficos)
- `sonner` - ^1.5.0 (Toast notifications)
- `embla-carousel-react` - ^8.3.0 (Carousel)
- `react-resizable-panels` - ^2.1.3 (Resizable panels)
- `react-day-picker` - ^8.10.1 (Date picker)
- `input-otp` - ^1.2.4 (OTP input)
- `date-fns` - ^3.6.0 (Date utilities)
- `next-themes` - ^0.3.0 (Theme management)
- `vaul` - ^0.9.3 (Drawer)
- `class-variance-authority` - ^0.7.1 (CVA)
- `clsx` - ^2.1.1 (Classname utility)
- `cmdk` - ^1.0.0 (Command menu)

#### Dev Dependencies
- `vite` - ^5.4.1
- `@vitejs/plugin-react-swc` - ^3.5.0
- `typescript` - ^5.5.3
- `eslint` & plugins
- `tailwindcss` & config
- `postcss` & `autoprefixer`
- `concurrently` - Para rodar dev (frontend + backend)

### Backend Dependencies (backend/package.json - 16 dependências)

#### Core Framework
- `express` - ^4.18.2 (Web framework)
- `typescript` - ^5.3.3

#### Database
- `@prisma/client` - ^5.7.0 (ORM)
- `prisma` - ^5.7.0 (CLI)

#### Authentication & Security
- `bcryptjs` - ^2.4.3 (Password hashing)
- `jsonwebtoken` - ^9.0.2 (JWT)
- `helmet` - ^7.1.0 (Security headers)
- `cors` - ^2.8.5 (CORS)

#### Utilities
- `dotenv` - ^16.3.1 (Environment variables)
- `zod` - ^3.22.4 (Schema validation)
- `nodemailer` - ^6.9.7 (Email)
- `multer` - ^1.4.5-lts.1 (File upload)
- `express-rate-limit` - ^7.1.5 (Rate limiting)

#### Logging
- `winston` - ^3.11.0 (Logger)
- `winston-daily-rotate-file` - ^4.7.1 (Log rotation)

#### Dev Dependencies
- `nodemon` - ^3.0.2 (Auto reload)
- `ts-node` - ^10.9.2 (TypeScript runner)
- `tsconfig-paths` - ^4.2.0 (Path aliases)
- TypeScript types para pacotes

### Dependências Não Presentes (Comparado ao que estava em um Supabase tradicional):
- Nenhuma dependência Supabase
- Nenhuma dependência Firebase
- O backend usa PostgreSQL direto com Prisma

---

## 5. ESTRUTURA DO FRONTEND

### Padrão de Arquitetura
- **UI Framework**: React 18.3
- **Roteamento**: React Router v6
- **State Management**: React Context API + React Query
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn-ui
- **Form Validation**: React Hook Form + Zod
- **API Communication**: Fetch API + React Query

### Páginas (Routes)

#### Routes Públicas:
```
/                    - Landing page
/admin/login         - Login admin/mecânico
/login               - Login cliente
/debug               - Debug route (teste)
```

#### Routes Admin/Mecânico:
```
/admin/dashboard     - Dashboard principal
/clientes            - Lista de clientes
/clientes/novo       - Criar cliente
/clientes/:id        - Detalhes cliente
/clientes/:id/editar - Editar cliente
/veiculos            - Lista veículos
/veiculos/novo       - Criar veículo
/veiculos/:id        - Detalhes veículo
/veiculos/:id/editar - Editar veículo
/revisoes            - Lista revisões
/revisoes/nova       - Criar revisão
/revisoes/:id        - Detalhes revisão
/relatorios          - Relatórios
```

#### Routes Cliente:
```
/cliente/dashboard               - Dashboard cliente
/cliente/veiculos               - Veículos do cliente
/cliente/veiculos/:id           - Detalhes veículo
/cliente/revisoes               - Revisões do cliente
/cliente/revisoes/:id           - Detalhes revisão
/cliente/recomendacoes          - Recomendações
/cliente/recomendacoes/:id      - Detalhes recomendação
/cliente/perfil                 - Perfil do cliente
```

#### Error Routes:
```
*                    - 404 Not Found
```

### Componentes Estrutura

#### Containers (Componentes com Lógica)
```
Layout              - Wrapper com Header
Header              - Navegação principal
ClienteHeader       - Header específico cliente
ProtectedRoute      - Rota protegida por autenticação
Dashboard           - Dashboard mecânico
ClienteSidebar      - Sidebar cliente
```

#### Componentes de Seções
```
QuickStats          - Estatísticas rápidas
QuickActions        - Ações rápidas
AlertsPanel         - Alertas
RecentActivities    - Atividades recentes
MonthlySummary      - Resumo mensal
```

#### Componentes de Domínio
```
clientes/
  - ClientesList.tsx
  - ClienteForm.tsx

veiculos/
  - VeiculosList.tsx
  - VeiculoForm.tsx

revisoes/
  - RevisaoForm.tsx
  - ChecklistItem.tsx
  - ChecklistCategory.tsx
  - PreDiagnosisSection.tsx
  - FinalizationSection.tsx

relatorios/
  - RelatorioTable.tsx
  - RelatorioCharts.tsx
  - RelatorioFilters.tsx
  - StatsCards.tsx

landing/
  - Hero.tsx
  - Features.tsx
  - Benefits.tsx
  - Testimonials.tsx
  - CallToAction.tsx
  - LandingHeader.tsx
```

#### UI Components (shadcn-ui)
67 componentes primitivos baseados em Radix UI:
- Form, Input, Button, Card, Dialog, Dropdown, Select
- Table, Tabs, Toast, Tooltip, Popover, Sidebar
- Accordion, Alert, Badge, Breadcrumb, Calendar
- Carousel, Checkbox, Collapsible, Command, Context Menu
- Drawer, Hover Card, Input OTP, Label, Menubar
- Mobile Table, Navigation Menu, Pagination, Progress
- Radio Group, Resizable, Scroll Area, Separator
- Sheet, Skeleton, Switch, Toggle, Toggle Group

### Hooks Customizados (7 arquivos)

```typescript
// Gerenciamento de dados com localStorage
useClientesData()        // Mock data clientes
useVeiculosData()        // Mock data veículos
useRevisoesData()        // Mock data revisões
useRelatoriosData()      // Mock data relatórios

// Chamadas API com React Query
useClientesApi()         // Mutations/Queries clientes

// Utilitários
use-toast()              // Hook notificações
use-mobile()             // Hook para detectar mobile
```

### Context/Providers

```typescript
// AuthContext.tsx
- Gerencia autenticação global
- Armazena user state
- Login/logout logic
- Persiste em localStorage
```

### Data & Constants

```
data/
  ├── checklistTemplate.ts       // Template checklist
  └── newChecklistTemplate.ts    // Template novo
```

### Type Definitions

```
types/
  └── revisoes.ts                // Tipos revisões (93 linhas)
     - PreDiagnosisQuestion
     - ItemChecklist
     - CategoriaChecklist
     - FinalizationData
     - Revisao
     - Recomendacao
     - Cliente
     - Veiculo
```

---

## 6. ESTRUTURA DO BACKEND

### Arquitetura: MVC + Services

```
Routes → Controllers → Services → Database (Prisma)
```

### Configuração Express

**Arquivo**: `/backend/src/app.ts` (66 linhas)

Middlewares implementados (ordem):
1. Helmet - Security headers
2. CORS - Cross-origin
3. Body Parser (JSON, URL-encoded)
4. Request Logger - Winston logging
5. Rate Limiting - Express rate limit
6. Routes
7. Health check endpoint
8. 404 handler
9. Error handler

### Rotas (Routes) - 6 grupos

```
/api/auth/         - Autenticação
/api/clientes/     - Clientes
/api/veiculos/     - Veículos
/api/revisoes/     - Revisões
/api/health/       - Health checks
/                  - Root API info
```

### Controllers (5 arquivos)

```typescript
auth.controller.ts       // Login, registro, refresh token
cliente.controller.ts    // CRUD clientes
veiculo.controller.ts    // CRUD veículos
revisao.controller.ts    // CRUD revisões
health.controller.ts     // Health check
```

### Services (5 arquivos)

```typescript
auth.service.ts          // JWT, autenticação
cliente.service.ts       // Lógica clientes (com paginação)
veiculo.service.ts       // Lógica veículos
revisao.service.ts       // Lógica revisões
cep.service.ts           // Integração ViaCEP
```

### Middlewares (7 arquivos)

```typescript
authenticate.ts          // Verificar JWT
authorize.ts             // Verificar roles
error-handler.ts         // Tratamento de erros global
async-handler.ts         // Try-catch wrapper
request-logger.ts        // Winston logger
rate-limit.ts            // Rate limiting
validate.ts              // Validação Zod
```

### Schemas Validação Zod (6 arquivos)

```typescript
common.schema.ts         // Schemas comuns (pagination, etc)
auth.schema.ts           // Login, registro schemas
cliente.schema.ts        // CRUD cliente schemas
veiculo.schema.ts        // CRUD veículo schemas
pagination.schema.ts     // Pagination schemas
```

### Types TypeScript (9 arquivos)

```typescript
api-response.types.ts    // Resposta padrão API
auth.types.ts            // Login, JWT types
cliente.types.ts         // Cliente input/output types
veiculo.types.ts         // Veiculo types
revisao.types.ts         // Revisao types
recomendacao.types.ts    // Recomendacao types
mecanico.types.ts        // Mecanico types
pagination.types.ts      // Pagination types
```

### Utilities (7 arquivos)

```typescript
bcrypt.ts                // hashPassword, comparePassword
jwt.ts                   // generateToken, verifyToken
formatters.ts            // Formatação de dados
validators.ts            // Validadores customizados
pagination.ts            // Helpers pagination
date.ts                  // Helpers data
errors.ts                // Custom error classes
response.ts              // Response formatters
```

### Database - Prisma

**Schema**: `/backend/prisma/schema.prisma` (419 linhas)

#### Enums:
- Role (CLIENTE, MECANICO, ADMIN)
- StatusCliente (ATIVO, INATIVO, BLOQUEADO, PENDENTE)
- StatusRevisao (AGENDADA, EM_ANDAMENTO, CONCLUIDA, CANCELADA)
- Prioridade (ALTA, MEDIA, BAIXA)
- StatusRecomendacao (PENDENTE, ACEITA, RECUSADA, IMPLEMENTADA)
- TipoRevisao (PREVENTIVA, CORRETIVA, PERIODICA, EMERGENCIAL)
- StatusVeiculo (ATIVO, INATIVO, EM_MANUTENCAO, VENDIDO)

#### Models (9 tabelas):

1. **User** (Autenticação)
   - id, email (unique), senha, role
   - Tokens: refreshToken, resetToken, verificationToken
   - Relações: cliente, mecanico, admin

2. **Admin** (Administrador)
   - id, userId, nome, cpf, telefone
   - permissions (JSON)

3. **Cliente** (Customer)
   - Dados pessoais: nome, sobrenome, cpf, rg, dataNascimento, profissao
   - Contato: email, telefone, whatsapp
   - Endereço completo
   - Status, preferências, timestamps
   - Relações: veiculos, revisoes, recomendacoes

4. **Mecanico** (Mechanic)
   - Dados: nome, cpf, telefone
   - Profissional: especialidade, registro, isActive

5. **Veiculo** (Vehicle)
   - Informações: marca, modelo, ano, placa, cor, chassi, renavam
   - Técnicos: motor, combustivel, cambio
   - Quilometragem: kmAtual, kmUltimaRevisao
   - Status (ATIVO, INATIVO, EM_MANUTENCAO, VENDIDO)

6. **Revisao** (Service Review)
   - Relações: cliente, veiculo, mecanico
   - Tipo, status, datas (agendamento, revisão, conclusão)
   - Checklist (JSON), servicosRealizados (JSON), pecasSubstituidas (JSON)
   - Valores: valorServico, valorPecas, valorTotal
   - Garantia: garantiaDias, garantiaKm

7. **Recomendacao** (Recommendation)
   - Relações: cliente, veiculo
   - titulo, descricao, prioridade, status
   - valorEstimado, prazoEstimado, categoria

8. **Upload** (File Storage)
   - filename, path, mimetype, size, type
   - Polimórfico: relatedTo, relatedId
   - uploadedBy

9. **AuditLog** (Auditoria)
   - userId, userEmail, userRole
   - action, entity, entityId
   - oldData, newData (JSON)
   - ip, userAgent, timestamp

---

## 7. ARQUIVOS DE CONFIGURAÇÃO

### TypeScript

**tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "strictNullChecks": false
  }
}
```

**tsconfig.app.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitAny": false
  }
}
```

Nota: Strict mode desativado em toda a aplicação.

### Vite

**vite.config.ts**
```typescript
- React SWC plugin
- Path alias: @ → ./src
- Dev server: localhost:8080
- Proxy /api → http://localhost:3005
- Build outDir: dist
```

### Tailwind CSS

**tailwind.config.ts** (102 linhas)
- Dark mode: class-based
- Custom colors:
  - primary: #0F3460
  - secondary: #FF5722
  - success: #4CAF50
  - warning: #FFC107
  - danger: #F44336
- Font families: Open Sans, Lato, Inter
- Animations: accordion-down, accordion-up

### PostCSS

**postcss.config.js**
```javascript
{
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Environment Variables

**Frontend**: Não há .env (usa proxy Vite)

**Backend**: /.env (múltiplas variáveis)
```
NODE_ENV, PORT, DATABASE_URL
JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET
FRONTEND_URL, CORS_ORIGINS
SMTP_* (Email)
UPLOAD_* (File uploads)
LOG_* (Logging)
RATE_LIMIT_* (Segurança)
BCRYPT_ROUNDS, SESSION_SECRET
VIACEP_API_URL
```

### Build Scripts

**Frontend (package.json)**:
```json
"dev": "vite",
"build": "vite build",
"preview": "vite preview",
"lint": "eslint ."
```

**Backend (backend/package.json)**:
```json
"dev": "nodemon --exec ts-node ...",
"build": "tsc",
"start": "node dist/server.js",
"prisma:migrate": "prisma migrate dev",
"prisma:studio": "prisma studio",
"prisma:seed": "ts-node prisma/seed.ts"
```

---

## 8. ANÁLISE DE TIPOS TYPESCRIPT

### Problemas de Type Safety Encontrados

#### 1. Strict Mode Desativado
```typescript
// tsconfig.json
"noImplicitAny": false,
"strictNullChecks": false,
"strict": false
```

Implicações:
- Parâmetros podem ser `any` implicitamente
- Valores null/undefined não verificados
- Menos segurança em tempo de compilação

#### 2. Uso de `any` na Aplicação

Encontrados em 8 arquivos:
- `/src/pages/RevisaoDetalhe.tsx`
- `/src/hooks/useRevisoesData.tsx`
- `/src/components/revisoes/ChecklistItem.tsx`
- `/src/components/revisoes/ChecklistCategory.tsx`
- `/src/components/relatorios/RelatorioTable.tsx`
- `/src/components/relatorios/RelatorioCharts.tsx`
- `/src/components/relatorios/RelatorioFilters.tsx`
- `/src/components/relatorios/StatsCards.tsx`

Exemplo:
```typescript
// useRevisoesData.tsx
status: Math.random() > 0.1 ? 'ok' : 'nao_ok' as any
// ^^^ Força type casting com any
```

#### 3. Backend: Uso de `where: any`

```typescript
// cliente.service.ts, linha 30
const where: any = {};
// Construção dinâmica de filtros sem type safety
```

### Tipos Bem Definidos

#### Frontend Revisoes Types (`/src/types/revisoes.ts`)
```typescript
interface PreDiagnosisQuestion {
  id: string;
  pergunta: string;
  tipo: 'sim_nao' | 'texto' | 'multipla_escolha';
  opcoes?: string[];
  resposta?: string | boolean;
  obrigatoria: boolean;
}

interface ItemChecklist {
  id: string;
  nome: string;
  categoria: string;
  obrigatorio: boolean;
  status: 'ok' | 'nao_ok' | 'nao_aplicavel' | 'pendente';
  // ... mais propriedades
}

interface CategoriaChecklist {
  id: string;
  nome: string;
  descricao: string;
  preDiagnostico?: PreDiagnosisQuestion[];
  itens: ItemChecklist[];
}

interface Revisao {
  id: string;
  clienteId: string;
  veiculoId: string;
  tipoServico: string;
  status: 'agendado' | 'em_andamento' | 'concluido' | 'cancelado';
  // ... 20+ propriedades
}
```

#### Backend Cliente Types (`/backend/src/types/cliente.types.ts`)
```typescript
interface CreateClienteData {
  email: string;
  senha: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  // ... mais campos
}

type ClienteWithRelations = Prisma.ClienteGetPayload<{
  include: {
    user: true;
    veiculos: true;
    revisoes: true;
    recomendacoes: true;
  };
}>;

type ClienteWithCounts = Prisma.ClienteGetPayload<{
  include: {
    _count: {
      select: {
        veiculos: true;
        revisoes: true;
        recomendacoes: true;
      };
    };
  };
}>;
```

#### Hook Types (`/src/hooks/useClientesData.tsx`)
```typescript
export type Veiculo = {
  id: string;
  modelo: string;
  placa: string;
  ano: number;
  cor: string;
};

export type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  dataCadastro: string;
  ativo: boolean;
  veiculos: Veiculo[];
  observacoes: string;
};

export type NovoCliente = Omit<Cliente, 'id'>;
```

### Inferência de Tipos

```typescript
// React Hook Form + Zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const form = useForm<z.infer<typeof loginSchema>>({...});

// React Query
const { data: clientes, isLoading, error } = useClientes();
// Tipos inferidos de useQuery genérico
```

---

## 9. DIAGRAMA DE FLUXO DE DADOS

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Pages (Login, Dashboard, Clientes, etc)                       │
│       ↓                                                          │
│  Components (Layout, Headers, Forms)                           │
│       ↓                                                          │
│  Hooks (useClientesApi, useClientesData, etc)                 │
│       ↓                                                          │
│  Services/API (/src/services/api.js)                          │
│       │                                                         │
│       ├─→ Auth Context (localStorage: clienteAuth/adminAuth)   │
│       │                                                         │
│       └─→ React Query (Caching, Mutations)                    │
│              ↓                                                  │
│              localStorage: authToken                           │
│                                                                │
└──────────────────────────────────────────────────────────────┐
                                                               │
                          HTTP FETCH                           │
                          (Vite Proxy)                         │
                          /api → :3005                         │
                                                               │
┌──────────────────────────────────────────────────────────────┐
│                    BACKEND (Express)                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Express App (app.ts)                                       │
│    ├─ Middleware: Helmet, CORS, Body Parser                │
│    ├─ Middleware: Request Logger, Rate Limit              │
│    └─ Middleware: Error Handler                           │
│         ↓                                                   │
│  Routes (auth, clientes, veiculos, revisoes)             │
│         ↓                                                   │
│  Controllers (auth.controller, cliente.controller, etc)   │
│         ↓                                                   │
│  Services (auth.service, cliente.service, etc)            │
│         ↓                                                   │
│  Prisma Client                                             │
│         ↓                                                   │
│  PostgreSQL Database                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Authentication Flow:
──────────────────
1. User login → POST /api/auth/login
2. Backend valida credenciais (bcrypt)
3. Gera JWT token
4. Frontend armazena em localStorage
5. Próximas requisições incluem: Authorization: Bearer <token>
6. Middleware authenticate valida JWT
7. Middleware authorize valida role
```

---

## 10. OBSERVAÇÕES CRÍTICAS PARA MIGRAÇÃO

### 1. Backend Desacoplado
✅ O backend está 100% pronto para ser removido/migrado
- Express + Prisma + PostgreSQL
- Endpoints REST bem definidos
- Sem dependência de Supabase

### 2. Frontend está Parcialmente Desacoplado
⚠️ Frontend tem dados de DOIS lugares:
```javascript
// Uso de localStorage (Mock data)
useClientesData()      // localStorage: 'checar_clientes'
useVeiculosData()      // Derivado de clientes
useRevisoesData()      // Mock data
useRelatoriosData()    // Mock data

// Versus API real
useClientesApi()       // React Query + API
```

Conflito: Frontend precisa decidir:
- Remover hooks de mock data
- Ou integrar apenas com API

### 3. Autenticação Múltipla
Frontend suporta:
- `/login` (cliente)
- `/admin/login` (mecânico/admin)

Armazenamento:
- localStorage: `clienteAuth`
- localStorage: `adminAuth`
- localStorage: `authToken`

Inconsistência potencial entre contexto local e token JWT.

### 4. TypeScript Não-Strict
Adicionar type safety:
```typescript
"noImplicitAny": true,
"strictNullChecks": true,
"strict": true,
```

Vai encontrar muitos problemas em:
- Components
- Hooks
- Api.js (arquivo JavaScript!)

### 5. api.js em JavaScript Puro
Arquivo `/src/services/api.js` está em JavaScript, não TypeScript.
Deve ser migrado para `api.ts` com tipos.

### 6. Componentes Sem Props Tipadas
Muitos componentes não têm interface de props:
```typescript
// Exemplo ruim
const MyComponent = ({ data, onClose }) => {
  // Sem tipos para data, onClose
}

// Deveria ser
interface MyComponentProps {
  data: SomeType;
  onClose: () => void;
}
const MyComponent: React.FC<MyComponentProps> = ({ data, onClose }) => {
```

### 7. Estrutura Monolítica
Backend e Frontend no mesmo repositório.
Recomendação: Considerar separar em monorepo se escalar:
```
fuse-checkar2/
├── apps/frontend/
├── apps/backend/
├── packages/shared/
└── package.json (root)
```

### 8. Dados de Mock Endurecidos
Mock data está hardcoded em hooks:
```typescript
const clientesMock: Cliente[] = [
  { id: '1', nome: 'João Silva', ... },
  // 8 clientes mock hardcoded
]
```

Deveria usar fixtures/factories para testes.

### 9. Sem Testes
Não há testes unitários/integração configurados:
```json
"test": "echo \"Testes não configurados ainda\" && exit 0"
```

### 10. Variáveis de Ambiente Frontend
Frontend não usa .env (deveria ter):
```
VITE_API_BASE_URL=http://localhost:3005/api
VITE_APP_NAME=Fuse Checkar2
```

---

## RESUMO EXECUTIVO

### Métricas
- **Linhas Frontend**: ~4.058 linhas (127 arquivos TSX/TS)
- **Linhas Backend**: ~52 arquivos TS
- **Componentes UI**: 67 componentes shadcn-ui
- **Endpoints API**: 28+ endpoints
- **Modelos Database**: 9 tabelas Prisma
- **Enums Database**: 7 enums

### Prontidão para Migração
- ✅ Backend completo e standalone
- ✅ API REST bem estruturada
- ✅ Database schema definido (Prisma)
- ⚠️ Frontend parcialmente desacoplado (mock data)
- ⚠️ TypeScript não-strict
- ⚠️ Autenticação duplicada

### Recomendações
1. Consolidar autenticação (remover clienteAuth/adminAuth)
2. Remover/refatorar hooks de mock data
3. Habilitar strict mode TypeScript
4. Migrar api.js para api.ts
5. Adicionar testes unitários
6. Considerar estrutura monorepo

---

