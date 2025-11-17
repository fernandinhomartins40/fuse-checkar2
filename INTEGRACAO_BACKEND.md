# 🔌 Guia de Integração do Backend

Este documento explica como integrar um novo backend com o frontend do Fuse Checkar2.

---

## 📋 Visão Geral

O backend foi **completamente removido** do projeto. O frontend está pronto para se conectar a uma nova API REST que você implementará com a stack de sua escolha.

### O que foi removido:
- ✅ Diretório `/backend/` completo (Node.js/Express)
- ✅ Scripts relacionados ao backend no `package.json`
- ✅ Dependências do backend
- ✅ Configurações Docker do backend

### O que foi mantido:
- ✅ Frontend completo em `/html-app/` (Vanilla HTML/CSS/JS)
- ✅ Frontend React legado em `/src/` (para referência)
- ✅ Estrutura de chamadas à API
- ✅ Sistema de autenticação (localStorage)
- ✅ Todos os componentes e páginas

---

## 🎯 Estrutura da API Esperada

O frontend está configurado para consumir uma API REST com os seguintes endpoints:

### 1. **Autenticação**

#### Login de Cliente
```http
POST /api/auth/cliente/login
Content-Type: application/json

{
  "email": "cliente@example.com",
  "senha": "senha123"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "123",
    "nome": "João Silva",
    "email": "cliente@example.com",
    "role": "cliente"
  }
}
```

#### Registro de Cliente
```http
POST /api/auth/cliente/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "cliente@example.com",
  "senha": "senha123",
  "telefone": "(11) 98765-4321"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "123",
    "nome": "João Silva",
    "email": "cliente@example.com",
    "role": "cliente"
  }
}
```

#### Login de Administrador
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "senha": "senha123"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "1",
    "nome": "Administrador",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### 2. **Clientes** (CRUD)

#### Listar Clientes
```http
GET /api/clientes
Authorization: Bearer {token}

Response:
[
  {
    "id": "123",
    "nome": "João Silva",
    "email": "cliente@example.com",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua Example, 123",
    "criadoEm": "2025-01-15T10:30:00Z"
  }
]
```

#### Buscar Cliente por ID
```http
GET /api/clientes/{id}
Authorization: Bearer {token}

Response:
{
  "id": "123",
  "nome": "João Silva",
  "email": "cliente@example.com",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua Example, 123",
  "criadoEm": "2025-01-15T10:30:00Z"
}
```

#### Criar Cliente
```http
POST /api/clientes
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "cliente@example.com",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua Example, 123"
}

Response: (mesmo formato do GET)
```

#### Atualizar Cliente
```http
PUT /api/clientes/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva Atualizado",
  "telefone": "(11) 98765-0000"
}

Response: (mesmo formato do GET)
```

#### Deletar Cliente
```http
DELETE /api/clientes/{id}
Authorization: Bearer {token}

Response:
{
  "message": "Cliente deletado com sucesso"
}
```

---

### 3. **Veículos** (CRUD)

#### Listar Veículos
```http
GET /api/veiculos?clienteId={clienteId}
Authorization: Bearer {token}

Response:
[
  {
    "id": "456",
    "clienteId": "123",
    "marca": "Toyota",
    "modelo": "Corolla",
    "ano": 2022,
    "placa": "ABC-1234",
    "criadoEm": "2025-01-15T11:00:00Z"
  }
]
```

#### Buscar Veículo por ID
```http
GET /api/veiculos/{id}
Authorization: Bearer {token}

Response: (mesmo formato do item da lista)
```

#### Criar Veículo
```http
POST /api/veiculos
Authorization: Bearer {token}
Content-Type: application/json

{
  "clienteId": "123",
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2022,
  "placa": "ABC-1234"
}

Response: (mesmo formato do GET)
```

#### Atualizar Veículo
```http
PUT /api/veiculos/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "ano": 2023
}

Response: (mesmo formato do GET)
```

#### Deletar Veículo
```http
DELETE /api/veiculos/{id}
Authorization: Bearer {token}

Response:
{
  "message": "Veículo deletado com sucesso"
}
```

---

### 4. **Revisões** (CRUD)

#### Listar Revisões
```http
GET /api/revisoes?clienteId={clienteId}&veiculoId={veiculoId}
Authorization: Bearer {token}

Response:
[
  {
    "id": "789",
    "veiculoId": "456",
    "clienteId": "123",
    "tipo": "Revisão 10.000km",
    "status": "concluida",
    "checklist": {
      "oleo": "ok",
      "filtros": "substituido",
      "pneus": "ok"
    },
    "dataRevisao": "2025-01-10T14:00:00Z",
    "criadoEm": "2025-01-10T10:00:00Z"
  }
]
```

#### Buscar Revisão por ID
```http
GET /api/revisoes/{id}
Authorization: Bearer {token}

Response: (mesmo formato do item da lista)
```

#### Criar Revisão
```http
POST /api/revisoes
Authorization: Bearer {token}
Content-Type: application/json

{
  "veiculoId": "456",
  "clienteId": "123",
  "tipo": "Revisão 10.000km",
  "status": "pendente",
  "checklist": {},
  "dataRevisao": "2025-01-20T14:00:00Z"
}

Response: (mesmo formato do GET)
```

#### Atualizar Revisão
```http
PUT /api/revisoes/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "concluida",
  "checklist": {
    "oleo": "ok",
    "filtros": "substituido"
  }
}

Response: (mesmo formato do GET)
```

#### Deletar Revisão
```http
DELETE /api/revisoes/{id}
Authorization: Bearer {token}

Response:
{
  "message": "Revisão deletada com sucesso"
}
```

---

### 5. **Relatórios**

#### Gerar Relatórios
```http
GET /api/relatorios?periodo={periodo}&tipo={tipo}
Authorization: Bearer {token}

Response:
{
  "totalClientes": 150,
  "totalVeiculos": 200,
  "totalRevisoes": 450,
  "revisoesPorMes": {
    "janeiro": 50,
    "fevereiro": 45
  },
  "clientesAtivos": 120
}
```

---

### 6. **Upload**

#### Upload de Arquivo
```http
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary data]

Response:
{
  "url": "https://storage.example.com/files/abc123.jpg",
  "filename": "documento.jpg",
  "size": 1024000
}
```

---

## ⚙️ Configuração do Frontend

### 1. **Arquivo de Configuração**

O arquivo `/html-app/assets/js/config.js` centraliza todas as configurações da API:

```javascript
const API_CONFIG = {
  // Atualize esta URL para a URL do seu backend
  baseURL: '/api',  // ou 'http://localhost:5000/api'

  // Timeout
  timeout: 30000,

  // Headers padrão
  defaultHeaders: {
    'Content-Type': 'application/json',
  },

  // Endpoints
  // ... (veja o arquivo completo)
};
```

### 2. **Como Atualizar**

Quando seu backend estiver pronto:

1. Abra `/html-app/assets/js/config.js`
2. Atualize o `baseURL` com a URL do seu backend:
   ```javascript
   baseURL: 'https://api.seu-dominio.com/api'
   ```
3. Se necessário, ajuste os endpoints específicos
4. Defina `useMockData: false` para desabilitar dados mock

---

## 🔐 Autenticação

### Sistema Atual

O frontend usa **localStorage** para gerenciar autenticação:

- **Token**: Armazenado em `auth_token`
- **Usuário**: Armazenado em `auth_user`
- **Roles**: Suporta `cliente` e `admin`

### Implementação Esperada no Backend

1. **JWT (JSON Web Tokens)** recomendado
2. Token deve conter:
   - `id` do usuário
   - `role` (cliente/admin)
   - `exp` (expiração)
3. Validação do token em todas as rotas protegidas

Exemplo de middleware (Node.js):
```javascript
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}
```

---

## 🗄️ Banco de Dados

### Esquema Sugerido

O frontend espera os seguintes modelos de dados:

#### **Usuários/Clientes**
```sql
CREATE TABLE clientes (
  id UUID PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT,
  role VARCHAR(20) DEFAULT 'cliente',
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);
```

#### **Veículos**
```sql
CREATE TABLE veiculos (
  id UUID PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano INTEGER NOT NULL,
  placa VARCHAR(10) UNIQUE NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);
```

#### **Revisões**
```sql
CREATE TABLE revisoes (
  id UUID PRIMARY KEY,
  veiculo_id UUID REFERENCES veiculos(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  tipo VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  checklist JSONB,
  data_revisao TIMESTAMP NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Stacks Recomendadas

### Opção 1: Node.js + Express + PostgreSQL
- **Backend**: Express.js
- **ORM**: Prisma ou Sequelize
- **Banco**: PostgreSQL
- **Auth**: jsonwebtoken + bcrypt

### Opção 2: Python + FastAPI + PostgreSQL
- **Backend**: FastAPI
- **ORM**: SQLAlchemy
- **Banco**: PostgreSQL
- **Auth**: python-jose + passlib

### Opção 3: Java + Spring Boot + MySQL
- **Backend**: Spring Boot
- **ORM**: JPA/Hibernate
- **Banco**: MySQL
- **Auth**: Spring Security + JWT

### Opção 4: Go + Gin + PostgreSQL
- **Backend**: Gin framework
- **ORM**: GORM
- **Banco**: PostgreSQL
- **Auth**: jwt-go + bcrypt

---

## 🧪 Testando a Integração

### 1. **Configurar CORS**

Seu backend deve permitir requisições do frontend:

```javascript
// Node.js/Express exemplo
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3005', // URL do frontend
  credentials: true
}));
```

### 2. **Testar Endpoints**

Use ferramentas como:
- **Postman**
- **Insomnia**
- **Thunder Client** (VS Code)
- **curl**

### 3. **Verificar Logs**

O frontend loga todas as requisições no console do navegador:
```
✅ GET /api/clientes - 200 OK
```

---

## 📁 Estrutura de Arquivos Relevantes

```
/html-app/
├── assets/
│   └── js/
│       ├── config.js              ← Configuração da API
│       ├── core/
│       │   ├── api.js             ← HTTP Client
│       │   ├── auth.js            ← Sistema de autenticação
│       │   ├── router.js          ← Router SPA
│       │   └── middleware.js      ← Proteção de rotas
│       ├── pages/                 ← Todas as páginas
│       └── main.js                ← Entry point
└── index.html                     ← HTML principal
```

---

## 🐛 Troubleshooting

### Problema: CORS Error
**Solução**: Configure CORS no backend para aceitar requisições do frontend

### Problema: 401 Unauthorized
**Solução**: Verifique se o token JWT está sendo enviado corretamente no header

### Problema: Dados não aparecem
**Solução**: Verifique se os endpoints retornam o formato JSON esperado

### Problema: Login não funciona
**Solução**: Verifique se o endpoint `/api/auth/cliente/login` retorna `token` e `user`

---

## 📞 Próximos Passos

1. ✅ Escolher stack do backend
2. ✅ Configurar banco de dados
3. ✅ Implementar endpoints de autenticação
4. ✅ Implementar CRUD de clientes
5. ✅ Implementar CRUD de veículos
6. ✅ Implementar CRUD de revisões
7. ✅ Testar integração com frontend
8. ✅ Deploy do backend

---

## 💡 Dicas

- Use **variáveis de ambiente** para configurações sensíveis
- Implemente **rate limiting** para segurança
- Use **migrations** para gerenciar o schema do banco
- Documente sua API com **Swagger/OpenAPI**
- Implemente **logs** adequados
- Configure **health checks** (`/health`)

---

**Boa sorte com a implementação do backend!** 🚀
