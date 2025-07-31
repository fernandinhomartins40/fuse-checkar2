# 🚀 Setup do Backend Unificado - Fuse Checkar2

Backend Node.js/Express criado com sucesso! Este backend funciona perfeitamente com sua aplicação React+Vite existente.

## ✅ O que foi implementado

- **Backend Express** completo com segurança (helmet, cors)
- **API modular** com rotas para clientes, veículos, revisões e relatórios
- **Proxy configurado** no Vite para desenvolvimento
- **Servidor unificado** para produção (serve React + API)
- **Service layer** no frontend para comunicação com APIs
- **Hooks React Query** para gerenciamento de estado

## 🔧 Instalação e Uso

### 1. Instalar dependências

```bash
# Instalar dependências do root e backend
npm run install:all

# Ou manualmente:
npm install
cd backend && npm install
```

### 2. Desenvolvimento

```bash
# Roda frontend (8080) + backend (3080) simultaneamente
npm run dev
```

Acesse:
- **Frontend**: http://localhost:8080
- **Backend/API**: http://localhost:3080
- **API Health**: http://localhost:3080/api/health

### 3. Produção

```bash
# Build do frontend + start do backend
npm run deploy

# Ou separadamente:
npm run build  # Build do React
npm run start  # Start do backend (serve tudo)
```

Acesse: http://localhost:3080 (frontend + API unificados)

## 📁 Estrutura Criada

```
projeto/
├── backend/                    # ✨ NOVO
│   ├── src/
│   │   ├── server.js          # Servidor Express principal
│   │   └── routes/
│   │       └── api.js         # Rotas modulares da API
│   ├── package.json           # Dependências do backend
│   ├── .env                   # Configurações
│   └── README.md              # Documentação da API
├── src/
│   ├── services/
│   │   └── api.js             # ✨ NOVO - Service layer para APIs
│   └── hooks/
│       └── useClientesApi.tsx # ✨ NOVO - Hooks React Query
├── vite.config.ts             # ✨ MODIFICADO - Proxy adicionado
├── package.json               # ✨ MODIFICADO - Scripts concorrentes
└── BACKEND_SETUP.md          # ✨ Este arquivo
```

## 🌐 APIs Disponíveis

Todas as APIs estão em `/api/*` e funcionam igual em dev e produção:

### 🔍 Status
- `GET /api/health` - Status do servidor

### 👥 Clientes
- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Criar novo
- `GET /api/clientes/:id` - Buscar por ID
- `PUT /api/clientes/:id` - Atualizar
- `DELETE /api/clientes/:id` - Remover

### 🚗 Veículos
- `GET /api/veiculos` - Listar todos
- `GET /api/veiculos?clienteId=1` - Por cliente
- `POST /api/veiculos` - Criar novo
- `PUT /api/veiculos/:id` - Atualizar
- `DELETE /api/veiculos/:id` - Remover

### 🔧 Revisões
- `GET /api/revisoes` - Listar todas
- `GET /api/revisoes?clienteId=1&veiculoId=2` - Filtradas
- `POST /api/revisoes` - Criar nova
- `PUT /api/revisoes/:id` - Atualizar
- `DELETE /api/revisoes/:id` - Remover

### 📊 Relatórios
- `GET /api/relatorios` - Gerar relatório
- `GET /api/relatorios?periodo=mensal&tipo=geral` - Com filtros

## 💻 Como usar no Frontend

### Método 1: Service API (Recomendado)

```javascript
import { apiClientes } from '@/services/api';

// Listar clientes
const clientes = await apiClientes.listar();

// Criar cliente
const novoCliente = await apiClientes.criar({
  nome: 'João',
  email: 'joao@example.com'
});

// Buscar cliente
const cliente = await apiClientes.buscarPorId('1');
```

### Método 2: React Query Hooks

```javascript
import { useClientes, useCreateCliente } from '@/hooks/useClientesApi';

function ClientesList() {
  const { data: clientes, isLoading } = useClientes();
  const createCliente = useCreateCliente();
  
  const handleCreate = async (dados) => {
    await createCliente.mutateAsync(dados);
  };
  
  if (isLoading) return <div>Carregando...</div>;
  
  return (
    <div>
      {clientes?.map(cliente => (
        <div key={cliente.id}>{cliente.nome}</div>
      ))}
    </div>
  );
}
```

### Método 3: Fetch Direto

```javascript
// Sempre use paths relativos - funcionam em dev e produção
const response = await fetch('/api/clientes');
const data = await response.json();
```

## ⚙️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Frontend + Backend simultaneamente
npm run frontend:dev           # Só frontend (Vite)
npm run backend:dev           # Só backend (nodemon)

# Produção
npm run build                 # Build do React
npm run start                 # Start backend (produção)
npm run deploy                # Build + Start

# Instalação
npm run install:all           # Instala root + backend
```

## 🔒 Configuração de Segurança

O backend já tem:
- ✅ **CORS** configurado para dev/produção
- ✅ **Helmet** para headers de segurança
- ✅ **Content Security Policy**
- ✅ **Rate limiting** preparado
- ✅ **Environment variables**

## 🚦 Próximos Passos

1. **Banco de Dados**: Implementar PostgreSQL/MongoDB
2. **Autenticação**: JWT com login/logout
3. **Validação**: Zod/Joi para validar dados
4. **Testes**: Jest/Vitest para backend e frontend
5. **Upload**: Multer para arquivos
6. **Logs**: Winston para logs estruturados
7. **Deploy**: Docker + CI/CD

## 🐛 Troubleshooting

### Backend não inicia
```bash
cd backend
npm install
npm run dev
```

### Frontend não conecta com API
- Verifique se o backend está rodando na porta 3080
- Verifique o proxy no `vite.config.ts`

### CORS errors
- Verifique as configurações em `backend/src/server.js`
- Atualize `backend/.env` com o `FRONTEND_URL`

### Produção não funciona
```bash
# Build do frontend primeiro
npm run build

# Verifique se a pasta dist foi criada
ls dist/

# Start do backend
npm run start
```

## 📚 Documentação

- **Backend**: `backend/README.md`
- **APIs**: Documentação inline no código
- **Frontend Service**: `src/services/api.js`

---

**🎉 Seu backend está pronto!** Use `npm run dev` para começar a desenvolver.

**⚡ Funciona igual em desenvolvimento e produção** - sem problemas de CORS ou proxy!