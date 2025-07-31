# Backend Fuse Checkar2

Backend Node.js/Express unificado para a aplicação React+Vite Fuse Checkar2.

## Características

- ✅ Express server com middleware de segurança (helmet, cors)
- ✅ Roteamento modular para APIs
- ✅ Serve arquivos estáticos do React em produção
- ✅ Configuração de proxy para desenvolvimento
- ✅ SPA fallback para React Router
- ✅ Environment variables
- ✅ Logs estruturados
- ✅ Tratamento de erros

## Estrutura

```
backend/
├── src/
│   ├── server.js          # Servidor principal
│   ├── routes/
│   │   └── api.js         # Rotas da API
│   └── middleware/        # Middlewares customizados
├── package.json
├── .env                   # Configurações
└── README.md
```

## Instalação

```bash
# Na pasta backend
npm install
```

## Scripts

- `npm start` - Roda em produção
- `npm run dev` - Roda em desenvolvimento com nodemon

## Configuração

Copie e configure o arquivo `.env`:

```env
PORT=3080
NODE_ENV=development
FRONTEND_URL=https://seu-dominio.com
```

## APIs Disponíveis

Todas as APIs estão em `/api/*`:

### Status
- `GET /api/health` - Status do servidor

### Clientes
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente
- `GET /api/clientes/:id` - Buscar cliente
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Remover cliente

### Veículos
- `GET /api/veiculos` - Listar veículos
- `GET /api/veiculos?clienteId=1` - Veículos de um cliente
- `POST /api/veiculos` - Criar veículo
- `PUT /api/veiculos/:id` - Atualizar veículo
- `DELETE /api/veiculos/:id` - Remover veículo

### Revisões
- `GET /api/revisoes` - Listar revisões
- `GET /api/revisoes?clienteId=1&veiculoId=2` - Filtrar revisões
- `POST /api/revisoes` - Criar revisão
- `PUT /api/revisoes/:id` - Atualizar revisão
- `DELETE /api/revisoes/:id` - Remover revisão

### Relatórios
- `GET /api/relatorios` - Gerar relatório
- `GET /api/relatorios?periodo=mensal&tipo=geral` - Relatório com filtros

### Upload
- `POST /api/upload` - Upload de arquivos

## Desenvolvimento vs Produção

### Desenvolvimento
- Frontend: `http://localhost:8080` (Vite dev server)
- Backend: `http://localhost:3080` (APIs)
- Proxy configurado no Vite para `/api/*`

### Produção
- Tudo em: `http://localhost:3080`
- Backend serve arquivos estáticos do React
- SPA fallback para todas as rotas não-API

## Uso no Frontend

```javascript
// Sempre use paths relativos - funcionam em dev e produção
const response = await fetch('/api/clientes');
const data = await response.json();

// Ou use o service criado
import { apiClientes } from '@/services/api';
const clientes = await apiClientes.listar();
```

## Próximos Passos

1. Implementar banco de dados (PostgreSQL/MongoDB)
2. Adicionar autenticação JWT
3. Implementar validações com Joi/Zod
4. Adicionar testes (Jest/Vitest)
5. Configurar logs com Winston
6. Implementar upload de arquivos com multer
7. Adicionar rate limiting
8. Documentação da API com Swagger