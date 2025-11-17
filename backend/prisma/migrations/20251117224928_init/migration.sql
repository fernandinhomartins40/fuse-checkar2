-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "cpf" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "endereco" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "observacoes" TEXT,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clienteId" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "quilometragem" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Veiculo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Revisao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clienteId" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "tipoServico" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "quilometragem" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "tecnicos" TEXT NOT NULL,
    "observacoes" TEXT,
    "custoEstimado" REAL,
    "tempoEstimado" INTEGER,
    "dataAgendamento" DATETIME,
    "dataConclusao" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "observacoesGerais" TEXT,
    "problemasCriticos" TEXT,
    "recomendacoesPrioritarias" TEXT,
    "custoTotalEstimado" REAL,
    "tempoEstimadoReparo" INTEGER,
    "proximaRevisaoData" DATETIME,
    "proximaRevisaoKm" INTEGER,
    CONSTRAINT "Revisao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Revisao_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CategoriaChecklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "revisaoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CategoriaChecklist_revisaoId_fkey" FOREIGN KEY ("revisaoId") REFERENCES "Revisao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemChecklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoriaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "obrigatorio" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "observacoes" TEXT,
    "prioridade" TEXT NOT NULL,
    "detalheProblema" TEXT,
    "acaoRecomendada" TEXT,
    "custoEstimado" REAL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ItemChecklist_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaChecklist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PreDiagnosisQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoriaId" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "opcoes" TEXT,
    "resposta" TEXT,
    "obrigatoria" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PreDiagnosisQuestion_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaChecklist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recomendacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "revisaoId" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "custoEstimado" REAL,
    "prazoRecomendado" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Recomendacao_revisaoId_fkey" FOREIGN KEY ("revisaoId") REFERENCES "Revisao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChecklistTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipoVeiculo" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CategoriaTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "templateId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CategoriaTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ChecklistTemplate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoriaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "obrigatorio" BOOLEAN NOT NULL DEFAULT false,
    "prioridade" TEXT NOT NULL DEFAULT 'media',
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ItemTemplate_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaTemplate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_cpf_idx" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_token_idx" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_userId_key" ON "Cliente"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE INDEX "Cliente_email_idx" ON "Cliente"("email");

-- CreateIndex
CREATE INDEX "Cliente_cpf_idx" ON "Cliente"("cpf");

-- CreateIndex
CREATE INDEX "Cliente_ativo_idx" ON "Cliente"("ativo");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_chassi_key" ON "Veiculo"("chassi");

-- CreateIndex
CREATE INDEX "Veiculo_clienteId_idx" ON "Veiculo"("clienteId");

-- CreateIndex
CREATE INDEX "Veiculo_placa_idx" ON "Veiculo"("placa");

-- CreateIndex
CREATE INDEX "Veiculo_ativo_idx" ON "Veiculo"("ativo");

-- CreateIndex
CREATE INDEX "Revisao_clienteId_idx" ON "Revisao"("clienteId");

-- CreateIndex
CREATE INDEX "Revisao_veiculoId_idx" ON "Revisao"("veiculoId");

-- CreateIndex
CREATE INDEX "Revisao_status_idx" ON "Revisao"("status");

-- CreateIndex
CREATE INDEX "Revisao_data_idx" ON "Revisao"("data");

-- CreateIndex
CREATE INDEX "CategoriaChecklist_revisaoId_idx" ON "CategoriaChecklist"("revisaoId");

-- CreateIndex
CREATE INDEX "ItemChecklist_categoriaId_idx" ON "ItemChecklist"("categoriaId");

-- CreateIndex
CREATE INDEX "ItemChecklist_status_idx" ON "ItemChecklist"("status");

-- CreateIndex
CREATE INDEX "ItemChecklist_prioridade_idx" ON "ItemChecklist"("prioridade");

-- CreateIndex
CREATE INDEX "PreDiagnosisQuestion_categoriaId_idx" ON "PreDiagnosisQuestion"("categoriaId");

-- CreateIndex
CREATE INDEX "Recomendacao_revisaoId_idx" ON "Recomendacao"("revisaoId");

-- CreateIndex
CREATE INDEX "Recomendacao_status_idx" ON "Recomendacao"("status");

-- CreateIndex
CREATE INDEX "Recomendacao_prioridade_idx" ON "Recomendacao"("prioridade");

-- CreateIndex
CREATE INDEX "ChecklistTemplate_ativo_idx" ON "ChecklistTemplate"("ativo");

-- CreateIndex
CREATE INDEX "CategoriaTemplate_templateId_idx" ON "CategoriaTemplate"("templateId");

-- CreateIndex
CREATE INDEX "ItemTemplate_categoriaId_idx" ON "ItemTemplate"("categoriaId");
