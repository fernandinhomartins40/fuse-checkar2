# PLANO COMPLETO: ESTRUTURA MONOREPO

## 📋 VISÃO GERAL

Conversão da estrutura atual para arquitetura **monorepo profissional** usando **npm workspaces**.

### Objetivos
1. ✅ Separação clara entre frontend e backend (futuro)
2. ✅ Escalabilidade para múltiplos pacotes
3. ✅ Compartilhamento de tipos e utilidades
4. ✅ Gerenciamento centralizado de dependências
5. ✅ Build e deploy independentes
6. ✅ Padrão profissional de organização

---

## 🏗️ ESTRUTURA PLANEJADA

```
/home/user/fuse-checkar2/
├── packages/
│   ├── frontend/                 # Aplicação React/Vite
│   │   ├── src/
│   │   │   ├── pages/           # 22 páginas
│   │   │   ├── components/      # 70+ componentes
│   │   │   ├── hooks/           # 7 hooks
│   │   │   ├── contexts/        # AuthContext
│   │   │   ├── services/        # api.js
│   │   │   ├── types/           # TypeScript types
│   │   │   ├── data/            # Mock data
│   │   │   ├── lib/             # Utilities
│   │   │   ├── App.tsx          # Main app
│   │   │   └── main.tsx         # Entry point
│   │   ├── public/              # Static assets
│   │   ├── index.html           # HTML template
│   │   ├── package.json         # Frontend deps
│   │   ├── vite.config.ts       # Vite config
│   │   ├── tailwind.config.ts   # Tailwind config
│   │   ├── tsconfig.json        # TS config
│   │   └── README.md            # Frontend docs
│   │
│   ├── backend/                  # Futuro: Backend Node.js
│   │   ├── src/
│   │   │   ├── routes/          # API routes
│   │   │   ├── controllers/     # Controllers
│   │   │   ├── services/        # Business logic
│   │   │   ├── middleware/      # Middlewares
│   │   │   ├── types/           # TypeScript types
│   │   │   ├── utils/           # Utilities
│   │   │   ├── config/          # Configuration
│   │   │   └── app.ts           # Express app
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   ├── migrations/      # Migrations
│   │   │   └── seed.ts          # Seed data
│   │   ├── docker/
│   │   │   ├── Dockerfile       # Backend container
│   │   │   └── nginx.conf       # Nginx config
│   │   ├── package.json         # Backend deps
│   │   ├── tsconfig.json        # TS config
│   │   └── README.md            # Backend docs
│   │
│   └── shared/                   # Código compartilhado
│       ├── types/               # TypeScript types compartilhados
│       │   ├── cliente.types.ts
│       │   ├── veiculo.types.ts
│       │   ├── revisao.types.ts
│       │   ├── api.types.ts
│       │   └── index.ts
│       ├── constants/           # Constantes compartilhadas
│       │   ├── enums.ts
│       │   ├── status.ts
│       │   └── index.ts
│       ├── utils/               # Utilidades compartilhadas
│       │   ├── formatters.ts
│       │   ├── validators.ts
│       │   └── index.ts
│       ├── package.json         # Shared package
│       └── tsconfig.json        # TS config
│
├── docker/                       # Docker configuration
│   ├── docker-compose.yml       # Compose file
│   ├── docker-compose.dev.yml   # Dev compose
│   ├── docker-compose.prod.yml  # Prod compose
│   └── nginx/
│       ├── nginx.conf           # Main config
│       ├── nginx.dev.conf       # Dev config
│       └── nginx.prod.conf      # Prod config
│
├── scripts/                      # Build/Deploy scripts
│   ├── build.sh                 # Build all
│   ├── dev.sh                   # Run dev
│   ├── deploy.sh                # Deploy
│   └── migrate.sh               # Run migrations
│
├── docs/                         # Documentação
│   ├── ARCHITECTURE.md          # Arquitetura
│   ├── API.md                   # API docs
│   ├── SETUP.md                 # Setup guide
│   └── DEPLOYMENT.md            # Deploy guide
│
├── .github/                      # GitHub Actions
│   └── workflows/
│       ├── ci.yml               # CI pipeline
│       └── deploy.yml           # Deploy pipeline
│
├── package.json                  # Root package.json (workspaces)
├── tsconfig.json                 # Root TS config
├── .gitignore                   # Git ignore
├── .env.example                 # Environment variables
├── README.md                    # Main README
└── CHANGELOG.md                 # Changelog

```

---

## 📦 PACKAGE.JSON ROOT (Workspaces)

```json
{
  "name": "fuse-checkar2-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "Sistema de Gestão de Revisões Automotivas - Monorepo",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=frontend",
    "dev:frontend": "npm run dev --workspace=frontend",
    "dev:backend": "npm run dev --workspace=backend",
    "dev:all": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",

    "build": "npm run build --workspaces",
    "build:frontend": "npm run build --workspace=frontend",
    "build:backend": "npm run build --workspace=backend",

    "lint": "npm run lint --workspaces",
    "lint:fix": "npm run lint:fix --workspaces",

    "test": "npm run test --workspaces",
    "test:watch": "npm run test:watch --workspaces",

    "type-check": "npm run type-check --workspaces",

    "clean": "rm -rf packages/*/node_modules packages/*/dist node_modules",
    "clean:build": "rm -rf packages/*/dist",

    "docker:build": "docker-compose build",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f",

    "migrate": "npm run migrate --workspace=backend",
    "migrate:dev": "npm run migrate:dev --workspace=backend",
    "db:seed": "npm run db:seed --workspace=backend",
    "db:studio": "npm run db:studio --workspace=backend",

    "prepare": "husky install"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "prettier": "^3.1.0",
    "turbo": "^1.11.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

---

## 📦 PACKAGES/FRONTEND/PACKAGE.JSON

```json
{
  "name": "@fuse-checkar2/frontend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@fuse-checkar2/shared": "*",
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.3.0",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-resizable-panels": "^2.1.3",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.3",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@tailwindcss/typography": "^0.5.15",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "lovable-tagger": "^1.1.7",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.4.1"
  }
}
```

---

## 📦 PACKAGES/SHARED/PACKAGE.JSON

```json
{
  "name": "@fuse-checkar2/shared",
  "version": "1.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./types": {
      "import": "./dist/types/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./constants": {
      "import": "./dist/constants/index.js",
      "types": "./dist/constants/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils/index.js",
      "types": "./dist/utils/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "type-check": "tsc --noEmit",
    "lint": "eslint . --ext ts",
    "lint:fix": "eslint . --ext ts --fix"
  },
  "dependencies": {
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.5.5",
    "tsup": "^8.0.1",
    "typescript": "^5.5.3"
  }
}
```

---

## 📝 TSCONFIG ROOT

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@fuse-checkar2/frontend/*": ["packages/frontend/src/*"],
      "@fuse-checkar2/backend/*": ["packages/backend/src/*"],
      "@fuse-checkar2/shared/*": ["packages/shared/*"]
    }
  },
  "files": [],
  "references": [
    { "path": "./packages/frontend" },
    { "path": "./packages/backend" },
    { "path": "./packages/shared" }
  ]
}
```

---

## 🔄 MIGRAÇÃO PASSO A PASSO

### Passo 1: Criar Estrutura de Diretórios
```bash
mkdir -p packages/frontend
mkdir -p packages/backend
mkdir -p packages/shared/{types,constants,utils}
mkdir -p docker/nginx
mkdir -p scripts
mkdir -p docs
```

### Passo 2: Mover Frontend
```bash
# Mover todo o código atual para packages/frontend
mv src packages/frontend/
mv public packages/frontend/
mv index.html packages/frontend/
mv vite.config.ts packages/frontend/
mv tailwind.config.ts packages/frontend/
mv postcss.config.js packages/frontend/
mv tsconfig.json packages/frontend/
mv tsconfig.app.json packages/frontend/
mv tsconfig.node.json packages/frontend/
mv components.json packages/frontend/
```

### Passo 3: Criar package.json para Frontend
```bash
# Copiar dependências do package.json root para frontend
# Adicionar @fuse-checkar2/shared como dependência
```

### Passo 4: Criar Shared Package
```bash
# Criar estrutura de tipos compartilhados
# Extrair enums e constantes
# Criar utilities compartilhadas
```

### Passo 5: Atualizar Imports
```bash
# Atualizar todos os imports em packages/frontend
# Substituir imports de tipos locais por @fuse-checkar2/shared
```

### Passo 6: Configurar Workspaces
```bash
# Criar package.json root com workspaces
# Remover node_modules atuais
# npm install (instala tudo)
```

---

## 🎯 BENEFÍCIOS DA ESTRUTURA MONOREPO

### 1. **Separação Clara**
- Frontend e backend completamente isolados
- Código compartilhado centralizado
- Fácil manutenção

### 2. **Reuso de Código**
- Tipos compartilhados entre frontend/backend
- Utilities reutilizáveis
- Constantes centralizadas

### 3. **Escalabilidade**
- Fácil adicionar novos pacotes (mobile, admin, etc.)
- Build independente por pacote
- Deploy independente

### 4. **Gerenciamento de Dependências**
- Dependências comuns no root
- Dependências específicas por pacote
- Atualização centralizada

### 5. **Desenvolvimento**
- npm workspaces para gerenciamento
- Scripts centralizados
- Dev experience melhorada

### 6. **CI/CD**
- Build paralelo por pacote
- Deploy seletivo (só o que mudou)
- Testes isolados

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Criar estrutura de diretórios `packages/`
- [ ] Mover código frontend para `packages/frontend/`
- [ ] Criar package `packages/shared/`
- [ ] Extrair tipos compartilhados
- [ ] Extrair constantes e enums
- [ ] Criar utilities compartilhadas
- [ ] Criar package.json root com workspaces
- [ ] Criar package.json para cada package
- [ ] Configurar tsconfig em cada package
- [ ] Atualizar todos os imports
- [ ] Configurar path aliases
- [ ] Testar build do frontend
- [ ] Documentar estrutura
- [ ] Atualizar README

---

## 🚀 PRÓXIMOS PASSOS APÓS MONOREPO

1. **Fase 3**: Corrigir imports e rotas
2. **Fase 4**: Análise TypeScript profunda
3. **Fase 5**: Planejar backend completo
4. **Fase 6**: Implementar backend (Nginx + Docker + Prisma + Node.js)
