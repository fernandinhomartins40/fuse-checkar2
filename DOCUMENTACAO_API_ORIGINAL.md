# DOCUMENTAÇÃO COMPLETA DA API ORIGINAL

## Visão Geral
- **Arquivo Principal**: `/src/services/api.js` (248 linhas)
- **Base URL**: `/api` (proxy Vite → `http://localhost:3005`)
- **Autenticação**: Bearer Token (localStorage: `authToken`)
- **Formato**: REST API, JSON responses

---

## 📋 ENDPOINTS COMPLETOS

### 1. HEALTH CHECK
```
GET /api/health
```
**Descrição**: Verificar status do servidor

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. CLIENTES (5 endpoints)

#### 2.1 Listar Clientes
```
GET /api/clientes
```
**Descrição**: Lista todos os clientes com paginação

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "João",
      "sobrenome": "Silva",
      "email": "joao@example.com",
      "cpf": "000.000.000-00",
      "telefone": "(11) 99999-9999",
      "status": "ATIVO",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "veiculos": []
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

#### 2.2 Buscar Cliente por ID
```
GET /api/clientes/:id
```
**Params**: `id` (number)

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João",
    "sobrenome": "Silva",
    "email": "joao@example.com",
    "cpf": "000.000.000-00",
    "rg": "00.000.000-0",
    "dataNascimento": "1990-01-01",
    "profissao": "Engenheiro",
    "telefone": "(11) 99999-9999",
    "telefone2": "(11) 88888-8888",
    "whatsapp": "(11) 99999-9999",
    "cep": "00000-000",
    "endereco": "Rua Exemplo",
    "numero": "123",
    "complemento": "Apto 45",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "pais": "Brasil",
    "status": "ATIVO",
    "notificacoesEmail": true,
    "notificacoesSms": false,
    "newsletter": true,
    "veiculos": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2.3 Criar Cliente
```
POST /api/clientes
```
**Body**:
```json
{
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao@example.com",
  "cpf": "000.000.000-00",
  "rg": "00.000.000-0",
  "dataNascimento": "1990-01-01",
  "profissao": "Engenheiro",
  "telefone": "(11) 99999-9999",
  "telefone2": "(11) 88888-8888",
  "whatsapp": "(11) 99999-9999",
  "cep": "00000-000",
  "endereco": "Rua Exemplo",
  "numero": "123",
  "complemento": "Apto 45",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "notificacoesEmail": true,
  "notificacoesSms": false,
  "newsletter": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João",
    "email": "joao@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Cliente criado com sucesso"
}
```

#### 2.4 Atualizar Cliente
```
PUT /api/clientes/:id
```
**Params**: `id` (number)

**Body**: Mesmos campos do POST (todos opcionais)

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Atualizado",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Cliente atualizado com sucesso"
}
```

#### 2.5 Remover Cliente
```
DELETE /api/clientes/:id
```
**Params**: `id` (number)

**Response**:
```json
{
  "success": true,
  "message": "Cliente removido com sucesso"
}
```

---

### 3. VEÍCULOS (5 endpoints)

#### 3.1 Listar Veículos
```
GET /api/veiculos
GET /api/veiculos?clienteId=1
```
**Query Params**:
- `clienteId` (opcional): Filtrar por cliente

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "clienteId": 1,
      "marca": "Toyota",
      "modelo": "Corolla",
      "ano": 2022,
      "anoModelo": 2023,
      "placa": "ABC-1234",
      "cor": "Prata",
      "chassi": "9BWZZZ377VT004251",
      "renavam": "12345678901",
      "motor": "2.0",
      "combustivel": "Flex",
      "cambio": "Automático",
      "kmAtual": 15000,
      "kmUltimaRevisao": 10000,
      "status": "ATIVO",
      "observacoes": "Veículo em bom estado",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 3.2 Buscar Veículo por ID
```
GET /api/veiculos/:id
```
**Params**: `id` (number)

**Response**: Mesmo formato do item em listar

#### 3.3 Criar Veículo
```
POST /api/veiculos
```
**Body**:
```json
{
  "clienteId": 1,
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2022,
  "anoModelo": 2023,
  "placa": "ABC-1234",
  "cor": "Prata",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "motor": "2.0",
  "combustivel": "Flex",
  "cambio": "Automático",
  "kmAtual": 15000,
  "observacoes": "Veículo em bom estado"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "placa": "ABC-1234",
    "marca": "Toyota",
    "modelo": "Corolla"
  },
  "message": "Veículo criado com sucesso"
}
```

#### 3.4 Atualizar Veículo
```
PUT /api/veiculos/:id
```
**Params**: `id` (number)

**Body**: Mesmos campos do POST (exceto clienteId)

#### 3.5 Remover Veículo
```
DELETE /api/veiculos/:id
```
**Params**: `id` (number)

---

### 4. REVISÕES (6 endpoints)

#### 4.1 Listar Revisões
```
GET /api/revisoes
GET /api/revisoes?clienteId=1
GET /api/revisoes?veiculoId=1
GET /api/revisoes?clienteId=1&veiculoId=1
```
**Query Params**:
- `clienteId` (opcional): Filtrar por cliente
- `veiculoId` (opcional): Filtrar por veículo

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "clienteId": 1,
      "veiculoId": 1,
      "mecanicoId": 1,
      "tipo": "PREVENTIVA",
      "status": "AGENDADA",
      "dataAgendamento": "2024-01-01T00:00:00.000Z",
      "dataRevisao": "2024-01-05T00:00:00.000Z",
      "dataInicio": null,
      "dataConclusao": null,
      "kmAtual": 15000,
      "kmProxima": 20000,
      "checklist": [],
      "servicosRealizados": [],
      "pecasSubstituidas": [],
      "valorServico": 500.00,
      "valorPecas": 200.00,
      "valorTotal": 700.00,
      "observacoes": "Revisão dos 15.000 km",
      "diagnostico": null,
      "garantiaDias": 90,
      "garantiaKm": 5000,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 4.2 Buscar Revisão por ID
```
GET /api/revisoes/:id
```
**Params**: `id` (number)

#### 4.3 Criar Revisão
```
POST /api/revisoes
```
**Body**:
```json
{
  "clienteId": 1,
  "veiculoId": 1,
  "mecanicoId": 1,
  "tipo": "PREVENTIVA",
  "dataAgendamento": "2024-01-01T00:00:00.000Z",
  "dataRevisao": "2024-01-05T00:00:00.000Z",
  "kmAtual": 15000,
  "observacoes": "Revisão dos 15.000 km"
}
```

#### 4.4 Atualizar Revisão
```
PUT /api/revisoes/:id
```
**Params**: `id` (number)

**Body**: Campos da revisão

#### 4.5 Finalizar Revisão
```
POST /api/revisoes/:id/finalizar
```
**Params**: `id` (number)

**Body**:
```json
{
  "checklist": [
    {
      "categoria": "Motor",
      "item": "Óleo do motor",
      "status": "ok",
      "observacao": "Óleo trocado"
    }
  ],
  "servicosRealizados": [
    {
      "descricao": "Troca de óleo",
      "valor": 200.00
    }
  ],
  "pecasSubstituidas": [
    {
      "descricao": "Óleo Mobil 5W30",
      "quantidade": 4,
      "valorUnitario": 50.00
    }
  ],
  "diagnostico": "Veículo em bom estado geral",
  "valorServico": 200.00,
  "valorPecas": 200.00,
  "valorTotal": 400.00,
  "garantiaDias": 90,
  "garantiaKm": 5000
}
```

#### 4.6 Remover Revisão
```
DELETE /api/revisoes/:id
```
**Params**: `id` (number)

---

### 5. RELATÓRIOS (2 endpoints)

#### 5.1 Gerar Relatório
```
GET /api/relatorios
GET /api/relatorios?periodo=mensal&tipo=receita
```
**Query Params**:
- `periodo` (opcional): "diario", "semanal", "mensal", "anual"
- `tipo` (opcional): "receita", "servicos", "clientes"

**Response**:
```json
{
  "success": true,
  "data": {
    "periodo": "mensal",
    "dataInicio": "2024-01-01",
    "dataFim": "2024-01-31",
    "totalReceita": 15000.00,
    "totalServicos": 50,
    "totalClientes": 30,
    "detalhes": []
  }
}
```

#### 5.2 Exportar Relatório
```
GET /api/relatorios/exportar?formato=pdf&periodo=mensal
```
**Query Params**:
- `formato` (obrigatório): "pdf", "excel", "csv"
- Outros filtros opcionais

**Response**: Arquivo para download

---

### 6. UPLOAD (1 endpoint)

#### 6.1 Upload de Arquivo
```
POST /api/upload
```
**Body** (FormData):
- `arquivo`: File
- `tipo`: String ("geral", "documento", "foto")

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "filename": "abc123.jpg",
    "originalName": "foto.jpg",
    "path": "/uploads/abc123.jpg",
    "url": "http://localhost:3005/uploads/abc123.jpg",
    "mimetype": "image/jpeg",
    "size": 102400
  },
  "message": "Arquivo enviado com sucesso"
}
```

---

## 🔐 AUTENTICAÇÃO

### Token Storage
```javascript
localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
```

### Header Authorization
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Endpoints de Autenticação (NÃO implementados em api.js)
Precisam ser adicionados:
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

---

## 📦 ESTRUTURA DE RESPONSE PADRÃO

### Sucesso
```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso"
}
```

### Erro
```json
{
  "success": false,
  "error": "Mensagem de erro",
  "code": "ERROR_CODE"
}
```

---

## 🎯 ENUMS E TIPOS

### Role
- `CLIENTE`
- `MECANICO`
- `ADMIN`

### StatusCliente
- `ATIVO`
- `INATIVO`
- `BLOQUEADO`
- `PENDENTE`

### StatusRevisao
- `AGENDADA`
- `EM_ANDAMENTO`
- `CONCLUIDA`
- `CANCELADA`

### StatusVeiculo
- `ATIVO`
- `INATIVO`
- `EM_MANUTENCAO`
- `VENDIDO`

### TipoRevisao
- `PREVENTIVA`
- `CORRETIVA`
- `PERIODICA`
- `EMERGENCIAL`

### Prioridade
- `ALTA`
- `MEDIA`
- `BAIXA`

### StatusRecomendacao
- `PENDENTE`
- `ACEITA`
- `RECUSADA`
- `IMPLEMENTADA`

---

## 📝 OBSERVAÇÕES IMPORTANTES

1. **Arquivo em JavaScript**: `api.js` está em JavaScript puro, sem tipos TypeScript
2. **Proxy Vite**: `/api` → `http://localhost:3005` (configurado em `vite.config.ts`)
3. **AuthToken**: Armazenado em `localStorage` com chave `authToken`
4. **Error Handling**: Try-catch em `apiRequest()` helper
5. **Content-Type**: Automático para JSON, manual para FormData
6. **React Query Hooks**: Helpers exportados em `useApiQuery`

---

## 🔄 MIGRAÇÃO FUTURA

Para o novo backend, manter a mesma estrutura de endpoints e responses para compatibilidade com o frontend existente.

**Endpoints que devem ser mantidos**:
- ✅ Todos os endpoints documentados acima
- ✅ Mesma estrutura de request/response
- ✅ Mesma autenticação Bearer Token
- ✅ Mesmos enums e status codes

**Melhorias sugeridas para novo backend**:
- 🔄 Adicionar paginação em todos os endpoints de listagem
- 🔄 Adicionar filtros avançados (busca, ordenação)
- 🔄 Adicionar versionamento de API (`/api/v1`)
- 🔄 Adicionar rate limiting por usuário
- 🔄 Adicionar WebSocket para notificações em tempo real
- 🔄 Adicionar cache com Redis
