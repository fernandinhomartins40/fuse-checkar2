# ÍNDICE DE ARQUIVOS CRÍTICOS - FUSE CHECKAR2

## Arquivos Gerados nesta Análise

1. **RELATORIO_ANALISE_COMPLETA.md** (1.278 linhas)
   - Análise extremamente detalhada de TUDO
   - 12 seções principais
   - Estrutura de diretórios completa
   - Análise de tipos TypeScript
   - Diagramas de fluxo

2. **SUMARIO_EXECUTIVO_ANALISE.md** (Você está lendo!)
   - Visão rápida da análise
   - Pontos críticos
   - Recomendações
   - Checklist de migração

3. **INDICE_ARQUIVOS_CRITICOS.md** (Este arquivo)
   - Referência rápida de arquivos
   - Caminhos absolutos
   - Descrição de cada arquivo

---

## ARQUIVOS CRÍTICOS DO FRONTEND

### Serviço de API (PRINCIPAL)
```
Arquivo: /home/user/fuse-checkar2/src/services/api.js
Tamanho: 248 linhas
Importância: 🔴 CRÍTICO
Descrição:
  - Arquivo JavaScript (não TypeScript!)
  - Contém TODOS os endpoints API
  - Helper apiRequest() com autorização
  - Deve ser migrado para TypeScript
  - Define: apiClientes, apiVeiculos, apiRevisoes, apiRelatorios, apiUpload
```

### Hooks de API
```
Arquivo: /home/user/fuse-checkar2/src/hooks/useClientesApi.tsx
Tamanho: 108 linhas
Importância: 🟡 ALTO
Descrição:
  - React Query hooks para clientes
  - Implementa: useClientes, useCliente, useCreateCliente, useUpdateCliente, useDeleteCliente
  - Gerencia cache automático
  - Invalida cache após mutações
```

### Contexto de Autenticação
```
Arquivo: /home/user/fuse-checkar2/src/contexts/AuthContext.tsx
Tamanho: 76 linhas
Importância: 🟡 ALTO
Descrição:
  - Gerencia estado global de autenticação
  - Armazena em localStorage (clienteAuth, adminAuth)
  - Função login() e logout()
  - Hook useAuth() para acesso
```

### Configuração TypeScript
```
Arquivo: /home/user/fuse-checkar2/tsconfig.json
Tamanho: 19 linhas
Importância: 🟡 AVISO
Descrição:
  - ⚠️ STRICT: false (PROBLEMA!)
  - noImplicitAny: false (PROBLEMA!)
  - strictNullChecks: false (PROBLEMA!)
  - Deve ser ativado após limpar código
```

### Configuração Vite
```
Arquivo: /home/user/fuse-checkar2/vite.config.ts
Tamanho: 35 linhas
Importância: 🟡 ALTO
Descrição:
  - Proxy /api → http://localhost:3005
  - Deve ser atualizado se backend mudar de porta
  - Build configuration para dist/
  - React SWC plugin
```

### Arquivo Principal da Aplicação
```
Arquivo: /home/user/fuse-checkar2/src/App.tsx
Tamanho: 110 linhas
Importância: 🟡 ALTO
Descrição:
  - Router principal com React Router v6
  - Todos os routes definidos aqui
  - Providers: QueryClientProvider, AuthProvider, TooltipProvider
  - Defines routes para admin, cliente, landing
```

### Entrypoint
```
Arquivo: /home/user/fuse-checkar2/src/main.tsx
Tamanho: 6 linhas
Importância: 🔵 BAIXO
Descrição:
  - Monta aplicação React no DOM
  - Importa App.tsx
  - Importa index.css
```

---

## ARQUIVOS CRÍTICOS DO BACKEND

### Aplicação Express
```
Arquivo: /home/user/fuse-checkar2/backend/src/app.ts
Tamanho: 66 linhas
Importância: 🔴 CRÍTICO
Descrição:
  - Configuração Express principal
  - Middlewares: Helmet, CORS, Body Parser, Logger, Rate Limit
  - Routes mounting
  - Error handler
```

### Router Principal
```
Arquivo: /home/user/fuse-checkar2/backend/src/routes/index.ts
Tamanho: 32 linhas
Importância: 🔴 CRÍTICO
Descrição:
  - Monta todos os routers
  - /api/auth
  - /api/clientes
  - /api/veiculos
  - /api/revisoes
  - /api/health
```

### Schema Prisma (DATABASE)
```
Arquivo: /home/user/fuse-checkar2/backend/prisma/schema.prisma
Tamanho: 419 linhas
Importância: 🔴 CRÍTICO
Descrição:
  - Define 9 modelos de banco dados
  - 7 enums
  - Relações entre entidades
  - ⚠️ COPIAR para novo backend!
  - Já contém indices otimizados
```

### Environment Variables
```
Arquivo: /home/user/fuse-checkar2/backend/.env
Tamanho: 79 linhas
Importância: 🔴 CRÍTICO
Descrição:
  - DATABASE_URL para PostgreSQL
  - JWT_SECRET, JWT_REFRESH_SECRET
  - CORS_ORIGINS, FRONTEND_URL
  - SMTP config, Upload config
  - ⚠️ NUNCA fazer commit de .env real!
```

### Package Backend
```
Arquivo: /home/user/fuse-checkar2/backend/package.json
Tamanho: 68 linhas
Importância: 🟡 ALTO
Descrição:
  - 16 dependências principais
  - Scripts: dev, build, start
  - Prisma: migrate, studio, seed
  - Dev: nodemon, ts-node, typescript
```

### Services (Business Logic)
```
Arquivo: /home/user/fuse-checkar2/backend/src/services/
Importância: 🔴 CRÍTICO
Arquivos:
  - auth.service.ts (JWT, autenticação)
  - cliente.service.ts (CRUD com paginação)
  - veiculo.service.ts (CRUD veículos)
  - revisao.service.ts (CRUD revisões)
  - cep.service.ts (Integração ViaCEP)
```

### Controllers
```
Arquivo: /home/user/fuse-checkar2/backend/src/controllers/
Importância: 🟡 ALTO
Arquivos:
  - auth.controller.ts
  - cliente.controller.ts
  - veiculo.controller.ts
  - revisao.controller.ts
  - health.controller.ts
```

### Types Definidos
```
Arquivo: /home/user/fuse-checkar2/backend/src/types/
Importância: 🟡 ALTO
Arquivos:
  - cliente.types.ts (CreateClienteData, UpdateClienteData)
  - veiculo.types.ts
  - revisao.types.ts
  - auth.types.ts
  - api-response.types.ts
  - pagination.types.ts
  - mecanico.types.ts
  - recomendacao.types.ts
  - index.ts (barrel export)
```

---

## PÁGINAS DO FRONTEND (Pages)

### Autenticação
```
/home/user/fuse-checkar2/src/pages/Login.tsx (60 linhas)
  - Login para cliente
  - Form validação Zod

/home/user/fuse-checkar2/src/pages/AdminLogin.tsx (77 linhas)
  - Login para admin/mecânico

/home/user/fuse-checkar2/src/pages/Registro.tsx (142 linhas)
  - Registro novo cliente
```

### Dashboard & Admin
```
/home/user/fuse-checkar2/src/pages/AdminDashboard.tsx (10 linhas)
  - Dashboard principal admin
  
/home/user/fuse-checkar2/src/pages/Landing.tsx (28 linhas)
  - Landing page pública
```

### Clientes
```
/home/user/fuse-checkar2/src/pages/Clientes.tsx (38 linhas)
  - Lista clientes (admin)

/home/user/fuse-checkar2/src/pages/ClienteNovo.tsx (45 linhas)
  - Criar novo cliente

/home/user/fuse-checkar2/src/pages/ClienteDetalhe.tsx (185 linhas)
  - Detalhes cliente com veículos

/home/user/fuse-checkar2/src/pages/ClienteEditar.tsx (154 linhas)
  - Editar cliente
```

### Veículos
```
/home/user/fuse-checkar2/src/pages/Veiculos.tsx (70 linhas)
  - Lista veículos

/home/user/fuse-checkar2/src/pages/VeiculoNovo.tsx (50 linhas)
  - Criar veículo

/home/user/fuse-checkar2/src/pages/VeiculoDetalhe.tsx (265 linhas)
  - Detalhes veículo com revisões

/home/user/fuse-checkar2/src/pages/VeiculoEditar.tsx (105 linhas)
  - Editar veículo
```

### Revisões
```
/home/user/fuse-checkar2/src/pages/Revisoes.tsx (265 linhas)
  - Lista revisões

/home/user/fuse-checkar2/src/pages/RevisaoNova.tsx (45 linhas)
  - Criar revisão

/home/user/fuse-checkar2/src/pages/RevisaoDetalhe.tsx (330 linhas)
  - Detalhes completos revisão com checklist
```

### Relatórios
```
/home/user/fuse-checkar2/src/pages/Relatorios.tsx (65 linhas)
  - Página de relatórios e análises
```

### Cliente (Páginas específicas)
```
/home/user/fuse-checkar2/src/pages/cliente/Dashboard.tsx
  - Dashboard do cliente
  
/home/user/fuse-checkar2/src/pages/cliente/Veiculos.tsx
  - Veículos do cliente
  
/home/user/fuse-checkar2/src/pages/cliente/Revisoes.tsx
  - Revisões do cliente
  
/home/user/fuse-checkar2/src/pages/cliente/Recomendacoes.tsx
  - Recomendações para cliente
  
/home/user/fuse-checkar2/src/pages/cliente/Perfil.tsx
  - Perfil do cliente
```

---

## COMPONENTES PRINCIPAIS (Components)

### Containers/Layout
```
/home/user/fuse-checkar2/src/components/Layout.tsx (22 linhas)
  - Wrapper com Header
  
/home/user/fuse-checkar2/src/components/Header.tsx
  - Navegação principal
  
/home/user/fuse-checkar2/src/components/ProtectedRoute.tsx
  - Proteção de rotas por autenticação
```

### Dashboard Components
```
/home/user/fuse-checkar2/src/components/Dashboard.tsx (50 linhas)
/home/user/fuse-checkar2/src/components/QuickStats.tsx
/home/user/fuse-checkar2/src/components/QuickActions.tsx
/home/user/fuse-checkar2/src/components/AlertsPanel.tsx
/home/user/fuse-checkar2/src/components/RecentActivities.tsx
/home/user/fuse-checkar2/src/components/MonthlySummary.tsx
```

### Cliente Components
```
/home/user/fuse-checkar2/src/components/cliente/
  - ClienteSidebar.tsx
  - ModernVehicleCard.tsx
  - ModernStatsCard.tsx
  - StatsCard.tsx
  - QuickActionCard.tsx
  - ModernQuickAction.tsx
```

### Revisões Components
```
/home/user/fuse-checkar2/src/components/revisoes/
  - RevisaoForm.tsx
  - ChecklistItem.tsx
  - ChecklistCategory.tsx
  - PreDiagnosisSection.tsx
  - FinalizationSection.tsx
```

### Relatórios Components
```
/home/user/fuse-checkar2/src/components/relatorios/
  - RelatorioTable.tsx
  - RelatorioCharts.tsx
  - RelatorioFilters.tsx
  - StatsCards.tsx
```

### UI Components (shadcn-ui)
```
/home/user/fuse-checkar2/src/components/ui/
  - 67 componentes primitivos Radix UI
  - button, input, form, dialog, table, card, tabs, etc
```

---

## TIPOS & DATA

### Tipos TypeScript
```
/home/user/fuse-checkar2/src/types/revisoes.ts (93 linhas)
  - PreDiagnosisQuestion
  - ItemChecklist
  - CategoriaChecklist
  - Revisao
  - Recomendacao
  - Cliente
  - Veiculo
  - FinalizationData
```

### Data/Mocks
```
/home/user/fuse-checkar2/src/data/checklistTemplate.ts
  - Template de checklist para revisões

/home/user/fuse-checkar2/src/data/newChecklistTemplate.ts
  - Template novo de checklist
```

### Hooks de Data (PROBLEMA - Mock Data)
```
/home/user/fuse-checkar2/src/hooks/useClientesData.tsx (272 linhas)
  - ⚠️ MOCK DATA: 9 clientes hardcoded
  - Armazena em localStorage: 'checar_clientes'
  - Conflita com API real!

/home/user/fuse-checkar2/src/hooks/useVeiculosData.tsx (153 linhas)
  - ⚠️ MOCK DATA derivado de clientes
  
/home/user/fuse-checkar2/src/hooks/useRevisoesData.tsx (180 linhas)
  - ⚠️ MOCK DATA com checklistTemplate
  
/home/user/fuse-checkar2/src/hooks/useRelatoriosData.tsx
  - ⚠️ MOCK DATA de relatórios
```

---

## CONFIGURAÇÃO

### TypeScript
```
/home/user/fuse-checkar2/tsconfig.json (19 linhas)
  - ⚠️ STRICT: false
  
/home/user/fuse-checkar2/tsconfig.app.json (31 linhas)
  - ⚠️ STRICT: false
  
/home/user/fuse-checkar2/tsconfig.node.json (existe)
  - Configuração para build tools
```

### Build & Runtime
```
/home/user/fuse-checkar2/vite.config.ts (35 linhas)
  - Proxy /api → localhost:3005
  - React SWC plugin
  - Path alias @/

/home/user/fuse-checkar2/tailwind.config.ts (102 linhas)
  - Cores customizadas (0F3460, FF5722)
  - Fonts: Open Sans, Lato, Inter
  
/home/user/fuse-checkar2/postcss.config.js
  - Tailwind + Autoprefixer
  
/home/user/fuse-checkar2/components.json
  - Configuração shadcn-ui
```

### Package.json
```
/home/user/fuse-checkar2/package.json (89 linhas)
  - 67 dependências frontend
  - Scripts: dev (concorrente frontend+backend), build, lint
  - ⚠️ Contém script backend que precisa ser removido
```

---

## BACKEND - ARQUIVOS CRÍTICOS

### Config
```
/home/user/fuse-checkar2/backend/src/config/env.ts
  - Carrega variáveis de ambiente
  
/home/user/fuse-checkar2/backend/src/config/database.ts (41 linhas)
  - Singleton Prisma Client
  - conectDatabase() e disconnectDatabase()
  
/home/user/fuse-checkar2/backend/src/config/cors.ts
  - Configuração CORS
  
/home/user/fuse-checkar2/backend/src/config/logger.ts
  - Winston logger
```

### Routes
```
/home/user/fuse-checkar2/backend/src/routes/auth.routes.ts
/home/user/fuse-checkar2/backend/src/routes/cliente.routes.ts
/home/user/fuse-checkar2/backend/src/routes/veiculo.routes.ts
/home/user/fuse-checkar2/backend/src/routes/revisao.routes.ts
/home/user/fuse-checkar2/backend/src/routes/health.routes.ts
```

### Middleware
```
/home/user/fuse-checkar2/backend/src/middleware/
  - authenticate.ts (JWT verification)
  - authorize.ts (Role-based)
  - error-handler.ts (Global error handling)
  - async-handler.ts (Try-catch wrapper)
  - request-logger.ts (Winston logging)
  - rate-limit.ts (Express rate-limit)
  - validate.ts (Zod validation)
```

### Utils
```
/home/user/fuse-checkar2/backend/src/utils/
  - bcrypt.ts (Hash/Compare)
  - jwt.ts (generateToken/verifyToken)
  - formatters.ts
  - validators.ts
  - pagination.ts
  - date.ts
  - errors.ts (Custom error classes)
  - response.ts (Response formatters)
```

---

## PADRÃO DE ACESSO ABS OLUTÉ

Todos os caminhos devem ser ABSOLUTOS:

```bash
# ✅ CORRETO
/home/user/fuse-checkar2/src/services/api.js

# ❌ INCORRETO
./src/services/api.js
```

---

## RESUMO RÁPIDO

### Arquivos para Backup Antes de Migração
```bash
/home/user/fuse-checkar2/backend/prisma/schema.prisma
/home/user/fuse-checkar2/backend/src/types/
/home/user/fuse-checkar2/backend/src/schemas/
/home/user/fuse-checkar2/backend/.env
```

### Arquivo para Não Tocar (Vai Quebrar Tudo)
```bash
/home/user/fuse-checkar2/src/services/api.js  # Sem este, nada funciona!
```

### Arquivos para Deletar Após Migração
```bash
/home/user/fuse-checkar2/backend/  # TODO DIRETÓRIO
/home/user/fuse-checkar2/src/hooks/useClientesData.tsx
/home/user/fuse-checkar2/src/hooks/useVeiculosData.tsx
/home/user/fuse-checkar2/src/hooks/useRevisoesData.tsx
/home/user/fuse-checkar2/src/hooks/useRelatoriosData.tsx
```

### Arquivos para Refatorar Após Migração
```bash
/home/user/fuse-checkar2/src/services/api.js  # JS → TS com tipos
/home/user/fuse-checkar2/tsconfig.json  # Ativar strict mode
/home/user/fuse-checkar2/src/contexts/AuthContext.tsx  # Consolidar auth
```

