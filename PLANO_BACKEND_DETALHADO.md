# PLANO DETALHADO DE IMPLEMENTAÇÃO DO BACKEND
## Fuse Checkar2 - Arquitetura Completa com Docker + Nginx + Node.js + TypeScript + Prisma + PostgreSQL

---

## 1. ARQUITETURA GERAL

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
            │  Frontend Container │    │   Backend Container   │
            │   (Nginx Serve)     │    │  Node.js + TypeScript │
            │   Port: 3000        │    │      Port: 3005       │
            └─────────────────────┘    └──────────┬────────────┘
                                                   │
                                        ┌──────────▼────────────┐
                                        │ PostgreSQL Container  │
                                        │      Port: 5432       │
                                        └───────────────────────┘
```

---

## 2. ESTRUTURA DE DIRETÓRIOS COMPLETA

```
fuse-checkar2/
├── backend/                              # Backend isolado
│   ├── src/
│   │   ├── config/                       # Configurações
│   │   │   ├── database.ts               # Prisma Client singleton
│   │   │   ├── env.ts                    # Validação de env vars com Zod
│   │   │   ├── cors.ts                   # Configuração CORS
│   │   │   └── logger.ts                 # Winston logger
│   │   │
│   │   ├── types/                        # Tipos TypeScript
│   │   │   ├── index.ts                  # Barrel export
│   │   │   ├── auth.types.ts             # Tipos de autenticação
│   │   │   ├── cliente.types.ts          # Tipos de Cliente
│   │   │   ├── veiculo.types.ts          # Tipos de Veículo
│   │   │   ├── revisao.types.ts          # Tipos de Revisão
│   │   │   ├── recomendacao.types.ts     # Tipos de Recomendação
│   │   │   ├── mecanico.types.ts         # Tipos de Mecânico
│   │   │   ├── relatorio.types.ts        # Tipos de Relatório
│   │   │   ├── upload.types.ts           # Tipos de Upload
│   │   │   ├── pagination.types.ts       # Tipos de Paginação
│   │   │   └── api-response.types.ts     # Tipos de Response padrão
│   │   │
│   │   ├── schemas/                      # Schemas de validação Zod
│   │   │   ├── index.ts                  # Barrel export
│   │   │   ├── auth.schema.ts            # Validação de auth
│   │   │   ├── cliente.schema.ts         # Validação de Cliente
│   │   │   ├── veiculo.schema.ts         # Validação de Veículo
│   │   │   ├── revisao.schema.ts         # Validação de Revisão
│   │   │   ├── recomendacao.schema.ts    # Validação de Recomendação
│   │   │   ├── mecanico.schema.ts        # Validação de Mecânico
│   │   │   ├── common.schema.ts          # Schemas comuns (CPF, email, etc)
│   │   │   └── pagination.schema.ts      # Validação de paginação
│   │   │
│   │   ├── middleware/                   # Middlewares
│   │   │   ├── authenticate.ts           # Verifica JWT token
│   │   │   ├── authorize.ts              # Verifica roles/permissions
│   │   │   ├── validate.ts               # Validação com Zod
│   │   │   ├── error-handler.ts          # Error handler global
│   │   │   ├── rate-limit.ts             # Rate limiting
│   │   │   ├── async-handler.ts          # Wrapper para async routes
│   │   │   ├── request-logger.ts         # Log de requests
│   │   │   └── cors.ts                   # CORS middleware
│   │   │
│   │   ├── services/                     # Lógica de negócio
│   │   │   ├── auth.service.ts           # Serviço de autenticação
│   │   │   ├── cliente.service.ts        # Serviço de Cliente
│   │   │   ├── veiculo.service.ts        # Serviço de Veículo
│   │   │   ├── revisao.service.ts        # Serviço de Revisão
│   │   │   ├── recomendacao.service.ts   # Serviço de Recomendação
│   │   │   ├── mecanico.service.ts       # Serviço de Mecânico
│   │   │   ├── relatorio.service.ts      # Serviço de Relatório
│   │   │   ├── email.service.ts          # Serviço de Email
│   │   │   ├── upload.service.ts         # Serviço de Upload
│   │   │   ├── cep.service.ts            # Integração ViaCEP
│   │   │   └── token.service.ts          # Geração/validação JWT
│   │   │
│   │   ├── controllers/                  # Controllers
│   │   │   ├── auth.controller.ts        # Controller de autenticação
│   │   │   ├── cliente.controller.ts     # Controller de Cliente
│   │   │   ├── veiculo.controller.ts     # Controller de Veículo
│   │   │   ├── revisao.controller.ts     # Controller de Revisão
│   │   │   ├── recomendacao.controller.ts # Controller de Recomendação
│   │   │   ├── mecanico.controller.ts    # Controller de Mecânico
│   │   │   ├── relatorio.controller.ts   # Controller de Relatório
│   │   │   ├── upload.controller.ts      # Controller de Upload
│   │   │   └── health.controller.ts      # Controller de Health Check
│   │   │
│   │   ├── routes/                       # Rotas
│   │   │   ├── index.ts                  # Router principal
│   │   │   ├── auth.routes.ts            # Rotas de autenticação
│   │   │   ├── cliente.routes.ts         # Rotas de Cliente
│   │   │   ├── veiculo.routes.ts         # Rotas de Veículo
│   │   │   ├── revisao.routes.ts         # Rotas de Revisão
│   │   │   ├── recomendacao.routes.ts    # Rotas de Recomendação
│   │   │   ├── mecanico.routes.ts        # Rotas de Mecânico
│   │   │   ├── relatorio.routes.ts       # Rotas de Relatório
│   │   │   ├── upload.routes.ts          # Rotas de Upload
│   │   │   └── health.routes.ts          # Rotas de Health Check
│   │   │
│   │   ├── utils/                        # Utilitários
│   │   │   ├── bcrypt.ts                 # Hash de senha
│   │   │   ├── jwt.ts                    # JWT helpers
│   │   │   ├── validators.ts             # Validadores customizados (CPF, etc)
│   │   │   ├── formatters.ts             # Formatadores (CPF, telefone, etc)
│   │   │   ├── pagination.ts             # Helpers de paginação
│   │   │   ├── date.ts                   # Helpers de data
│   │   │   ├── errors.ts                 # Classes de erro customizadas
│   │   │   └── response.ts               # Response helpers
│   │   │
│   │   ├── app.ts                        # Express app setup
│   │   └── server.ts                     # Server entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma                 # Schema do Prisma
│   │   ├── migrations/                   # Migrations geradas
│   │   └── seed.ts                       # Seed data
│   │
│   ├── uploads/                          # Arquivos enviados
│   │   ├── documents/
│   │   ├── images/
│   │   └── temp/
│   │
│   ├── logs/                             # Logs da aplicação
│   │   ├── error.log
│   │   ├── combined.log
│   │   └── access.log
│   │
│   ├── tests/                            # Testes
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── .env                              # Variáveis de ambiente
│   ├── .env.example                      # Exemplo de .env
│   ├── package.json
│   ├── tsconfig.json                     # TypeScript config
│   ├── Dockerfile                        # Dockerfile do backend
│   └── .dockerignore
│
├── frontend/                             # Frontend isolado
│   ├── html-app/                         # Aplicação atual
│   ├── Dockerfile                        # Dockerfile do frontend
│   └── nginx.conf                        # Nginx config para frontend
│
├── nginx/                                # Nginx Reverse Proxy
│   ├── nginx.conf                        # Configuração principal
│   ├── conf.d/
│   │   ├── default.conf                  # Config padrão
│   │   └── ssl.conf                      # Config SSL
│   └── certs/                            # Certificados SSL
│       ├── cert.pem
│       └── key.pem
│
├── docker-compose.yml                    # Orquestração completa
├── docker-compose.dev.yml                # Desenvolvimento
├── docker-compose.prod.yml               # Produção
└── README.md

```

---

## 3. SCHEMA PRISMA COMPLETO

### 3.1 Entidades e Relações

```prisma
// prisma/schema.prisma

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

// Tabela de Usuários (Autenticação)
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique @db.VarChar(255)
  senha     String   @db.VarChar(255)
  role      Role     @default(CLIENTE)
  isActive  Boolean  @default(true)

  // Tokens
  refreshToken String? @db.VarChar(500)
  resetToken   String? @db.VarChar(255)
  resetTokenExpiry DateTime?

  // Email verification
  emailVerified Boolean @default(false)
  verificationToken String? @db.VarChar(255)

  // Timestamps
  lastLogin DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Relações
  cliente   Cliente?
  mecanico  Mecanico?
  admin     Admin?

  @@index([email])
  @@index([role])
  @@map("users")
}

// Tabela de Administradores
model Admin {
  id        Int      @id @default(autoincrement())
  userId    Int      @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  nome      String   @db.VarChar(255)
  cpf       String   @unique @db.VarChar(14)
  telefone  String   @db.VarChar(20)

  // Permissões
  permissions Json?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([cpf])
  @@map("admins")
}

// Tabela de Clientes
model Cliente {
  id             Int      @id @default(autoincrement())
  userId         Int      @unique
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Informações Pessoais
  nome           String   @db.VarChar(100)
  sobrenome      String   @db.VarChar(100)
  cpf            String   @unique @db.VarChar(14)
  rg             String?  @db.VarChar(20)
  dataNascimento DateTime? @db.Date
  profissao      String?  @db.VarChar(100)

  // Informações de Contato
  email          String   @unique @db.VarChar(255)
  telefone       String   @db.VarChar(20)
  telefone2      String?  @db.VarChar(20)
  whatsapp       String?  @db.VarChar(20)

  // Endereço
  cep            String?  @db.VarChar(10)
  endereco       String?  @db.VarChar(255)
  numero         String?  @db.VarChar(20)
  complemento    String?  @db.VarChar(100)
  bairro         String?  @db.VarChar(100)
  cidade         String?  @db.VarChar(100)
  estado         String?  @db.VarChar(2)
  pais           String   @default("Brasil") @db.VarChar(50)

  // Status e Configurações
  status         StatusCliente @default(ATIVO)

  // Preferências
  notificacoesEmail Boolean @default(true)
  notificacoesSms   Boolean @default(false)
  newsletter        Boolean @default(true)

  // Metadados
  lastVisit      DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  // Relações
  veiculos       Veiculo[]
  revisoes       Revisao[]
  recomendacoes  Recomendacao[]

  @@index([cpf])
  @@index([email])
  @@index([status])
  @@index([createdAt])
  @@map("clientes")
}

// Tabela de Mecânicos
model Mecanico {
  id             Int      @id @default(autoincrement())
  userId         Int      @unique
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  nome           String   @db.VarChar(100)
  sobrenome      String   @db.VarChar(100)
  cpf            String   @unique @db.VarChar(14)
  telefone       String   @db.VarChar(20)

  // Informações Profissionais
  especialidade  String?  @db.VarChar(100)
  registro       String?  @db.VarChar(50) // Registro profissional

  isActive       Boolean  @default(true)

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relações
  revisoes       Revisao[]

  @@index([cpf])
  @@index([isActive])
  @@map("mecanicos")
}

// Tabela de Veículos
model Veiculo {
  id             Int      @id @default(autoincrement())
  clienteId      Int
  cliente        Cliente  @relation(fields: [clienteId], references: [id], onDelete: Cascade)

  // Informações do Veículo
  marca          String   @db.VarChar(50)
  modelo         String   @db.VarChar(100)
  ano            Int
  anoModelo      Int?
  placa          String   @unique @db.VarChar(10)
  cor            String?  @db.VarChar(30)
  chassi         String?  @unique @db.VarChar(30)
  renavam        String?  @unique @db.VarChar(20)

  // Dados Técnicos
  motor          String?  @db.VarChar(50)
  combustivel    String?  @db.VarChar(20) // Gasolina, Etanol, Diesel, Flex, GNV
  cambio         String?  @db.VarChar(20) // Manual, Automático, CVT

  // Quilometragem
  kmAtual        Int?
  kmUltimaRevisao Int?

  // Status
  status         StatusVeiculo @default(ATIVO)

  // Observações
  observacoes    String?  @db.Text

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relações
  revisoes       Revisao[]
  recomendacoes  Recomendacao[]

  @@index([clienteId])
  @@index([placa])
  @@index([status])
  @@map("veiculos")
}

// Tabela de Revisões
model Revisao {
  id             Int      @id @default(autoincrement())

  // Relações
  clienteId      Int
  cliente        Cliente  @relation(fields: [clienteId], references: [id])

  veiculoId      Int
  veiculo        Veiculo  @relation(fields: [veiculoId], references: [id])

  mecanicoId     Int?
  mecanico       Mecanico? @relation(fields: [mecanicoId], references: [id], onDelete: SetNull)

  // Informações da Revisão
  tipo           TipoRevisao
  status         StatusRevisao @default(AGENDADA)

  // Datas
  dataAgendamento DateTime
  dataRevisao    DateTime
  dataInicio     DateTime?
  dataConclusao  DateTime?

  // Quilometragem
  kmAtual        Int?
  kmProxima      Int? // Próxima revisão recomendada

  // Checklist (JSON com itens verificados)
  checklist      Json?

  // Serviços Realizados
  servicosRealizados Json? // Array de serviços

  // Peças Substituídas
  pecasSubstituidas Json? // Array de peças

  // Valores
  valorServico   Decimal?  @db.Decimal(10, 2)
  valorPecas     Decimal?  @db.Decimal(10, 2)
  valorTotal     Decimal?  @db.Decimal(10, 2)

  // Observações
  observacoes    String?   @db.Text
  diagnostico    String?   @db.Text

  // Garantia
  garantiaDias   Int?      // Dias de garantia
  garantiaKm     Int?      // Km de garantia

  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@index([clienteId])
  @@index([veiculoId])
  @@index([mecanicoId])
  @@index([status])
  @@index([dataRevisao])
  @@map("revisoes")
}

// Tabela de Recomendações
model Recomendacao {
  id             Int      @id @default(autoincrement())

  // Relações
  clienteId      Int
  cliente        Cliente  @relation(fields: [clienteId], references: [id])

  veiculoId      Int
  veiculo        Veiculo  @relation(fields: [veiculoId], references: [id])

  // Informações da Recomendação
  titulo         String   @db.VarChar(200)
  descricao      String   @db.Text
  prioridade     Prioridade @default(MEDIA)
  status         StatusRecomendacao @default(PENDENTE)

  // Estimativas
  valorEstimado  Decimal? @db.Decimal(10, 2)
  prazoEstimado  Int?     // Dias estimados

  // Categoria
  categoria      String?  @db.VarChar(50) // Freios, Motor, Suspensão, etc

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([clienteId])
  @@index([veiculoId])
  @@index([status])
  @@index([prioridade])
  @@map("recomendacoes")
}

// Tabela de Uploads/Documentos
model Upload {
  id             Int      @id @default(autoincrement())

  // Arquivo
  filename       String   @db.VarChar(255)
  originalName   String   @db.VarChar(255)
  path           String   @db.VarChar(500)
  mimetype       String   @db.VarChar(100)
  size           Int      // bytes

  // Tipo
  type           String   @db.VarChar(50) // documento, imagem, nota_fiscal, etc

  // Relações polimórficas (usando JSON)
  relatedTo      String?  @db.VarChar(50) // cliente, veiculo, revisao
  relatedId      Int?

  // Upload info
  uploadedBy     Int?     // userId

  createdAt      DateTime @default(now())

  @@index([relatedTo, relatedId])
  @@map("uploads")
}

// Tabela de Logs de Auditoria
model AuditLog {
  id             Int      @id @default(autoincrement())

  // Usuário que fez a ação
  userId         Int?
  userEmail      String?  @db.VarChar(255)
  userRole       Role?

  // Ação
  action         String   @db.VarChar(50) // CREATE, UPDATE, DELETE, LOGIN, LOGOUT
  entity         String   @db.VarChar(50) // cliente, veiculo, revisao, etc
  entityId       Int?

  // Dados
  oldData        Json?
  newData        Json?

  // Request info
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

## 4. TIPOS TYPESCRIPT COMPLETOS

### 4.1 auth.types.ts

```typescript
import { Role } from '@prisma/client';

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  email: string;
  senha: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;
  role?: Role;
}

export interface AuthResponse {
  success: boolean;
  user: UserPayload;
  token: string;
  refreshToken: string;
}

export interface UserPayload {
  id: number;
  email: string;
  role: Role;
  nome: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  senhaAtual: string;
  senhaNova: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  senhaNova: string;
}
```

### 4.2 cliente.types.ts

```typescript
import { StatusCliente, Prisma } from '@prisma/client';

export interface CreateClienteData {
  // User
  email: string;
  senha: string;

  // Informações Pessoais
  nome: string;
  sobrenome: string;
  cpf: string;
  rg?: string;
  dataNascimento?: Date | string;
  profissao?: string;

  // Contato
  telefone: string;
  telefone2?: string;
  whatsapp?: string;

  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pais?: string;

  // Preferências
  notificacoesEmail?: boolean;
  notificacoesSms?: boolean;
  newsletter?: boolean;
}

export interface UpdateClienteData {
  // Informações Pessoais
  nome?: string;
  sobrenome?: string;
  rg?: string;
  dataNascimento?: Date | string;
  profissao?: string;

  // Contato
  telefone?: string;
  telefone2?: string;
  whatsapp?: string;

  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;

  // Status
  status?: StatusCliente;

  // Preferências
  notificacoesEmail?: boolean;
  notificacoesSms?: boolean;
  newsletter?: boolean;
}

export interface ClienteFilters {
  search?: string; // Busca por nome, email, CPF
  status?: StatusCliente;
  cidade?: string;
  estado?: string;
  createdAfter?: Date | string;
  createdBefore?: Date | string;
}

export type ClienteWithRelations = Prisma.ClienteGetPayload<{
  include: {
    user: true;
    veiculos: true;
    revisoes: true;
    recomendacoes: true;
  };
}>;

export type ClienteWithCounts = Prisma.ClienteGetPayload<{
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

### 4.3 veiculo.types.ts

```typescript
import { StatusVeiculo, Prisma } from '@prisma/client';

export interface CreateVeiculoData {
  clienteId: number;
  marca: string;
  modelo: string;
  ano: number;
  anoModelo?: number;
  placa: string;
  cor?: string;
  chassi?: string;
  renavam?: string;
  motor?: string;
  combustivel?: string;
  cambio?: string;
  kmAtual?: number;
  observacoes?: string;
}

export interface UpdateVeiculoData {
  marca?: string;
  modelo?: string;
  ano?: number;
  anoModelo?: number;
  cor?: string;
  motor?: string;
  combustivel?: string;
  cambio?: string;
  kmAtual?: number;
  kmUltimaRevisao?: number;
  status?: StatusVeiculo;
  observacoes?: string;
}

export interface VeiculoFilters {
  clienteId?: number;
  marca?: string;
  modelo?: string;
  ano?: number;
  placa?: string;
  status?: StatusVeiculo;
  combustivel?: string;
}

export type VeiculoWithRelations = Prisma.VeiculoGetPayload<{
  include: {
    cliente: true;
    revisoes: true;
    recomendacoes: true;
  };
}>;
```

### 4.4 revisao.types.ts

```typescript
import { StatusRevisao, TipoRevisao, Prisma } from '@prisma/client';

export interface CreateRevisaoData {
  clienteId: number;
  veiculoId: number;
  mecanicoId?: number;
  tipo: TipoRevisao;
  dataAgendamento: Date | string;
  dataRevisao: Date | string;
  kmAtual?: number;
  kmProxima?: number;
  checklist?: Record<string, unknown>;
  observacoes?: string;
}

export interface UpdateRevisaoData {
  mecanicoId?: number;
  tipo?: TipoRevisao;
  status?: StatusRevisao;
  dataRevisao?: Date | string;
  dataInicio?: Date | string;
  dataConclusao?: Date | string;
  kmAtual?: number;
  kmProxima?: number;
  checklist?: Record<string, unknown>;
  servicosRealizados?: Array<ServicoRealizado>;
  pecasSubstituidas?: Array<PecaSubstituida>;
  valorServico?: number;
  valorPecas?: number;
  valorTotal?: number;
  observacoes?: string;
  diagnostico?: string;
  garantiaDias?: number;
  garantiaKm?: number;
}

export interface ServicoRealizado {
  id: string;
  descricao: string;
  valor: number;
  tempo?: number; // minutos
}

export interface PecaSubstituida {
  id: string;
  nome: string;
  marca?: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface RevisaoFilters {
  clienteId?: number;
  veiculoId?: number;
  mecanicoId?: number;
  tipo?: TipoRevisao;
  status?: StatusRevisao;
  dataInicio?: Date | string;
  dataFim?: Date | string;
}

export type RevisaoWithRelations = Prisma.RevisaoGetPayload<{
  include: {
    cliente: true;
    veiculo: true;
    mecanico: true;
  };
}>;
```

### 4.5 pagination.types.ts

```typescript
export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### 4.6 api-response.types.ts

```typescript
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  errors?: ValidationError[];
  stack?: string; // apenas em dev
}
```

---

## 5. ROTAS DA API COMPLETAS

### 5.1 Autenticação (`/api/auth`)

```
POST   /api/auth/cliente/register       # Registro de cliente
POST   /api/auth/cliente/login          # Login de cliente
POST   /api/auth/admin/login            # Login de admin
POST   /api/auth/mecanico/login         # Login de mecânico
POST   /api/auth/logout                 # Logout (auth)
POST   /api/auth/refresh                # Refresh token (auth)
POST   /api/auth/validate               # Validar token (auth)
POST   /api/auth/change-password        # Mudar senha (auth)
POST   /api/auth/forgot-password        # Esqueci a senha
POST   /api/auth/reset-password         # Reset senha
GET    /api/auth/me                     # Dados do usuário logado (auth)
```

### 5.2 Clientes (`/api/clientes`)

```
GET    /api/clientes                    # Listar clientes (admin)
POST   /api/clientes                    # Criar cliente (admin)
GET    /api/clientes/:id                # Buscar cliente (admin/owner)
PUT    /api/clientes/:id                # Atualizar cliente (admin/owner)
DELETE /api/clientes/:id                # Deletar cliente (admin)
PATCH  /api/clientes/:id/status         # Mudar status (admin)
GET    /api/clientes/:id/veiculos       # Veículos do cliente (admin/owner)
GET    /api/clientes/:id/revisoes       # Revisões do cliente (admin/owner)
GET    /api/clientes/:id/recomendacoes  # Recomendações do cliente (admin/owner)
GET    /api/clientes/:id/estatisticas   # Estatísticas do cliente (admin/owner)
```

### 5.3 Veículos (`/api/veiculos`)

```
GET    /api/veiculos                    # Listar veículos (admin)
POST   /api/veiculos                    # Criar veículo (admin)
GET    /api/veiculos/:id                # Buscar veículo (admin/owner)
PUT    /api/veiculos/:id                # Atualizar veículo (admin/owner)
DELETE /api/veiculos/:id                # Deletar veículo (admin)
PATCH  /api/veiculos/:id/status         # Mudar status (admin)
GET    /api/veiculos/:id/revisoes       # Revisões do veículo (admin/owner)
GET    /api/veiculos/:id/recomendacoes  # Recomendações do veículo (admin/owner)
GET    /api/veiculos/:id/historico      # Histórico completo (admin/owner)
```

### 5.4 Revisões (`/api/revisoes`)

```
GET    /api/revisoes                    # Listar revisões (admin/mecanico)
POST   /api/revisoes                    # Criar revisão (admin)
GET    /api/revisoes/:id                # Buscar revisão (admin/mecanico/owner)
PUT    /api/revisoes/:id                # Atualizar revisão (admin/mecanico)
DELETE /api/revisoes/:id                # Deletar revisão (admin)
PATCH  /api/revisoes/:id/status         # Mudar status (admin/mecanico)
PATCH  /api/revisoes/:id/iniciar        # Iniciar revisão (mecanico)
PATCH  /api/revisoes/:id/concluir       # Concluir revisão (mecanico)
PATCH  /api/revisoes/:id/cancelar       # Cancelar revisão (admin)
POST   /api/revisoes/:id/servicos       # Adicionar serviço (mecanico)
POST   /api/revisoes/:id/pecas          # Adicionar peça (mecanico)
GET    /api/revisoes/:id/pdf            # Gerar PDF da revisão (admin/owner)
```

### 5.5 Recomendações (`/api/recomendacoes`)

```
GET    /api/recomendacoes               # Listar recomendações (admin)
POST   /api/recomendacoes               # Criar recomendação (admin/mecanico)
GET    /api/recomendacoes/:id           # Buscar recomendação (admin/owner)
PUT    /api/recomendacoes/:id           # Atualizar recomendação (admin/mecanico)
DELETE /api/recomendacoes/:id           # Deletar recomendação (admin)
PATCH  /api/recomendacoes/:id/aceitar   # Aceitar recomendação (owner)
PATCH  /api/recomendacoes/:id/recusar   # Recusar recomendação (owner)
```

### 5.6 Mecânicos (`/api/mecanicos`)

```
GET    /api/mecanicos                   # Listar mecânicos (admin)
POST   /api/mecanicos                   # Criar mecânico (admin)
GET    /api/mecanicos/:id               # Buscar mecânico (admin)
PUT    /api/mecanicos/:id               # Atualizar mecânico (admin)
DELETE /api/mecanicos/:id               # Deletar mecânico (admin)
GET    /api/mecanicos/:id/revisoes      # Revisões do mecânico (admin)
GET    /api/mecanicos/:id/estatisticas  # Estatísticas do mecânico (admin)
```

### 5.7 Relatórios (`/api/relatorios`)

```
GET    /api/relatorios/geral            # Relatório geral (admin)
GET    /api/relatorios/faturamento      # Relatório de faturamento (admin)
GET    /api/relatorios/revisoes         # Relatório de revisões (admin)
GET    /api/relatorios/clientes         # Relatório de clientes (admin)
GET    /api/relatorios/mecanicos        # Relatório de mecânicos (admin)
GET    /api/relatorios/veiculos         # Relatório de veículos (admin)
```

### 5.8 Upload (`/api/upload`)

```
POST   /api/upload                      # Upload de arquivo (auth)
DELETE /api/upload/:id                  # Deletar arquivo (auth)
GET    /api/upload/:id                  # Download de arquivo (auth)
```

### 5.9 Health Check (`/api/health`)

```
GET    /api/health                      # Health check básico
GET    /api/health/detailed             # Health check detalhado (admin)
```

---

## 6. VALIDAÇÕES ZOD COMPLETAS

### 6.1 Common Schemas (common.schema.ts)

```typescript
import { z } from 'zod';

// CPF
export const cpfSchema = z.string()
  .min(11, 'CPF deve ter 11 dígitos')
  .max(14, 'CPF inválido')
  .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido')
  .refine(validarCPF, 'CPF inválido');

// Email
export const emailSchema = z.string()
  .email('Email inválido')
  .min(5, 'Email muito curto')
  .max(255, 'Email muito longo')
  .toLowerCase();

// Senha
export const senhaSchema = z.string()
  .min(6, 'Senha deve ter no mínimo 6 caracteres')
  .max(100, 'Senha muito longa');

// Telefone
export const telefoneSchema = z.string()
  .regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, 'Telefone inválido');

// CEP
export const cepSchema = z.string()
  .regex(/^\d{5}-?\d{3}$/, 'CEP inválido');

// Placa
export const placaSchema = z.string()
  .regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, 'Placa inválida');

// Data
export const dateSchema = z.union([
  z.string().datetime(),
  z.date()
]);
```

### 6.2 Cliente Schema (cliente.schema.ts)

```typescript
import { z } from 'zod';
import { StatusCliente } from '@prisma/client';
import { cpfSchema, emailSchema, senhaSchema, telefoneSchema, cepSchema } from './common.schema';

export const createClienteSchema = z.object({
  // User
  email: emailSchema,
  senha: senhaSchema,

  // Pessoal
  nome: z.string().min(2).max(100),
  sobrenome: z.string().min(2).max(100),
  cpf: cpfSchema,
  rg: z.string().max(20).optional(),
  dataNascimento: z.string().date().optional(),
  profissao: z.string().max(100).optional(),

  // Contato
  telefone: telefoneSchema,
  telefone2: telefoneSchema.optional(),
  whatsapp: telefoneSchema.optional(),

  // Endereço
  cep: cepSchema.optional(),
  endereco: z.string().max(255).optional(),
  numero: z.string().max(20).optional(),
  complemento: z.string().max(100).optional(),
  bairro: z.string().max(100).optional(),
  cidade: z.string().max(100).optional(),
  estado: z.string().length(2).toUpperCase().optional(),

  // Preferências
  notificacoesEmail: z.boolean().optional(),
  notificacoesSms: z.boolean().optional(),
  newsletter: z.boolean().optional(),
});

export const updateClienteSchema = createClienteSchema.partial().omit({
  email: true,
  senha: true,
  cpf: true,
}).extend({
  status: z.nativeEnum(StatusCliente).optional(),
});

export const clienteFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(StatusCliente).optional(),
  cidade: z.string().optional(),
  estado: z.string().length(2).toUpperCase().optional(),
  createdAfter: z.string().date().optional(),
  createdBefore: z.string().date().optional(),
});
```

---

## 7. CONFIGURAÇÃO DOCKER COMPLETA

### 7.1 docker-compose.yml (Produção)

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: fuse-checkar2-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-checkar2}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-checkar2_secure_pass}
      POSTGRES_DB: ${DB_NAME:-checkar2_db}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - fuse-checkar2-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-checkar2}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: production
    container_name: fuse-checkar2-backend
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      NODE_ENV: production
      PORT: 3005
      DATABASE_URL: postgresql://${DB_USER:-checkar2}:${DB_PASSWORD:-checkar2_secure_pass}@postgres:5432/${DB_NAME:-checkar2_db}?schema=public
      JWT_SECRET: ${JWT_SECRET}
      JWT_EXPIRES_IN: ${JWT_EXPIRES_IN:-24h}
      JWT_REFRESH_EXPIRES_IN: ${JWT_REFRESH_EXPIRES_IN:-7d}
      FRONTEND_URL: ${FRONTEND_URL:-http://localhost}
      CORS_ORIGINS: ${CORS_ORIGINS:-http://localhost,http://localhost:3000}
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT:-587}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASS: ${SMTP_PASS}
      UPLOAD_MAX_SIZE: ${UPLOAD_MAX_SIZE:-10485760}
      LOG_LEVEL: ${LOG_LEVEL:-info}
    volumes:
      - ./backend/uploads:/app/uploads
      - ./backend/logs:/app/logs
    ports:
      - "3005:3005"
    networks:
      - fuse-checkar2-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3005/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: fuse-checkar2-frontend
    restart: unless-stopped
    volumes:
      - ./frontend/html-app:/usr/share/nginx/html:ro
    networks:
      - fuse-checkar2-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 30s
      timeout: 5s
      retries: 3
    deploy:
      resources:
        limits:
          memory: 128M
          cpus: '0.1'

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: fuse-checkar2-nginx
    restart: unless-stopped
    depends_on:
      - backend
      - frontend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/certs:/etc/nginx/certs:ro
      - ./nginx/logs:/var/log/nginx
    networks:
      - fuse-checkar2-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3
    deploy:
      resources:
        limits:
          memory: 128M
          cpus: '0.1'

volumes:
  postgres_data:
    driver: local

networks:
  fuse-checkar2-network:
    driver: bridge
    name: fuse-checkar2-net
```

### 7.2 Nginx Configuration (nginx/nginx.conf)

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

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
               application/json application/javascript application/xml+rss
               application/rss+xml font/truetype font/opentype
               application/vnd.ms-fontobject image/svg+xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Upstream Backend
    upstream backend {
        least_conn;
        server backend:3005 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    # Upstream Frontend
    upstream frontend {
        server frontend:80;
        keepalive 16;
    }

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=5r/m;

    # Include configurations
    include /etc/nginx/conf.d/*.conf;
}
```

### 7.3 Nginx Default Configuration (nginx/conf.d/default.conf)

```nginx
server {
    listen 80;
    server_name _;

    # Security
    server_tokens off;

    # Logs
    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # API Routes (Backend)
    location /api/ {
        # Rate limiting
        limit_req zone=api_limit burst=20 nodelay;
        limit_req_status 429;

        # Proxy settings
        proxy_pass http://backend;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;

        # Error handling
        proxy_intercept_errors on;
        error_page 502 503 504 /50x.html;
    }

    # Auth Routes (Stricter rate limiting)
    location /api/auth/ {
        limit_req zone=auth_limit burst=5 nodelay;
        limit_req_status 429;

        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend (Static Files)
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Cache static assets
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://frontend;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Health check
    location /health {
        access_log off;
        return 200 "OK\n";
        add_header Content-Type text/plain;
    }

    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;

    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

---

## 8. CONFIGURAÇÃO TYPESCRIPT

### 8.1 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowJs": false,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "pretty": true,
    "removeComments": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@types/*": ["src/types/*"],
      "@schemas/*": ["src/schemas/*"],
      "@middleware/*": ["src/middleware/*"],
      "@services/*": ["src/services/*"],
      "@controllers/*": ["src/controllers/*"],
      "@routes/*": ["src/routes/*"],
      "@utils/*": ["src/utils/*"]
    },
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "types": ["node"]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.spec.ts",
    "**/*.test.ts"
  ],
  "ts-node": {
    "require": ["tsconfig-paths/register"],
    "transpileOnly": true,
    "files": true
  }
}
```

---

## 9. VARIÁVEIS DE AMBIENTE COMPLETAS

### 9.1 .env.example

```bash
# ===========================================
# APPLICATION
# ===========================================
NODE_ENV=production
PORT=3005
APP_NAME="Fuse Checkar2"
APP_VERSION=1.0.0

# ===========================================
# DATABASE
# ===========================================
DB_HOST=postgres
DB_PORT=5432
DB_NAME=checkar2_db
DB_USER=checkar2
DB_PASSWORD=checkar2_secure_pass_change_me

# Prisma Database URL
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public

# ===========================================
# JWT
# ===========================================
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_change_me
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars_change_me
JWT_REFRESH_EXPIRES_IN=7d

# ===========================================
# CORS
# ===========================================
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://localhost

# ===========================================
# EMAIL (SMTP)
# ===========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM="Fuse Checkar2 <noreply@fusecheckar2.com>"

# ===========================================
# UPLOAD
# ===========================================
UPLOAD_MAX_SIZE=10485760
UPLOAD_PATH=./uploads
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,application/pdf

# ===========================================
# LOGGING
# ===========================================
LOG_LEVEL=info
LOG_FILE=./logs/app.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=10

# ===========================================
# RATE LIMITING
# ===========================================
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_AUTH_MAX=5

# ===========================================
# SECURITY
# ===========================================
BCRYPT_ROUNDS=10
SESSION_SECRET=your_session_secret_min_32_chars_change_me

# ===========================================
# EXTERNAL APIS
# ===========================================
VIACEP_API_URL=https://viacep.com.br/ws
```

---

## 10. IMPLEMENTAÇÃO - ORDEM DE EXECUÇÃO

### Fase 1: Setup Inicial (Dias 1-2)
1. Criar estrutura de diretórios completa
2. Configurar TypeScript (tsconfig.json)
3. Instalar dependências
4. Configurar Prisma Schema
5. Criar tipos TypeScript base

### Fase 2: Database & Migrations (Dia 3)
6. Configurar conexão com PostgreSQL
7. Criar migrations do Prisma
8. Criar seeds iniciais
9. Testar conexão

### Fase 3: Core Infrastructure (Dias 4-5)
10. Configurar logger (Winston)
11. Criar error classes
12. Criar middlewares base (error-handler, async-handler)
13. Configurar validação de env vars

### Fase 4: Authentication (Dias 6-7)
14. Implementar JWT service
15. Implementar bcrypt service
16. Criar auth middleware
17. Criar authorize middleware
18. Implementar auth service
19. Implementar auth controller
20. Criar auth routes

### Fase 5: Business Logic (Dias 8-12)
21. Implementar validação Zod schemas
22. Implementar services (Cliente, Veículo, Revisão, etc)
23. Implementar controllers
24. Criar routes
25. Implementar pagination
26. Implementar filtros e buscas

### Fase 6: Additional Features (Dias 13-14)
27. Implementar upload service
28. Implementar email service
29. Implementar relatórios
30. Implementar audit logs

### Fase 7: Docker & Nginx (Dias 15-16)
31. Criar Dockerfile do backend
32. Criar Dockerfile do frontend
33. Configurar docker-compose completo
34. Configurar Nginx reverse proxy
35. Testar comunicação entre containers

### Fase 8: Testing & Deploy (Dias 17-18)
36. Testes de integração
37. Testes E2E
38. Otimizações de performance
39. Deploy final
40. Documentação

---

## 11. DEPENDÊNCIAS NPM NECESSÁRIAS

```json
{
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "winston": "^3.11.0",
    "winston-daily-rotate-file": "^4.7.1",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.10.5",
    "@types/nodemailer": "^6.4.14",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint": "^8.56.0",
    "nodemon": "^3.0.2",
    "prisma": "^5.7.0",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  }
}
```

---

**FIM DO PLANO DETALHADO**

Este plano cobre 100% da implementação necessária para o backend isolado com Docker, Nginx, Node.js, TypeScript, Prisma e PostgreSQL.
