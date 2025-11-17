# 🚗 Fuse Checkar2 - Sistema de Revisão para Auto Centers

Sistema completo de gestão de revisões automotivas para Auto Centers, desenvolvido com frontend em Vanilla HTML/CSS/JavaScript.

---

## 📋 Sobre o Projeto

O **Fuse Checkar2** é um sistema web moderno para gerenciamento de revisões automotivas, oferecendo:

- ✅ **Portal do Cliente**: Acompanhamento de veículos e histórico de revisões
- ✅ **Painel Administrativo**: Gestão completa de clientes, veículos e revisões
- ✅ **Sistema de Checklist**: Verificação detalhada de componentes automotivos
- ✅ **Relatórios**: Análise de dados e métricas do negócio
- ✅ **Responsivo**: Interface adaptada para desktop e mobile

---

## 🏗️ Arquitetura

### Frontend (Ativo)
- **Localização**: `/html-app/`
- **Tecnologia**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Arquitetura**: SPA (Single Page Application)
- **Router**: Sistema customizado com suporte a parâmetros dinâmicos
- **Autenticação**: localStorage com suporte a múltiplos papéis (cliente/admin)

### Frontend React (Legado)
- **Localização**: `/src/`
- **Tecnologia**: React 18 + TypeScript + Tailwind CSS
- **Mantido para referência**: Não está em uso ativo

### Backend
⚠️ **Backend removido** - O projeto está preparado para integração com um novo backend.

📖 **[Guia de Integração do Backend](./INTEGRACAO_BACKEND.md)**

---

## 🚀 Começando

### Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn
- Docker (opcional, para deploy)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/fernandinhomartins40/fuse-checkar2.git

# Entre no diretório
cd fuse-checkar2

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento (React)
npm run dev

# Ou sirva apenas o frontend HTML estático
npm run serve
```

O frontend estará disponível em `http://localhost:3005`

### Build de Produção

```bash
# Build do React (se estiver usando)
npm run build

# Para servir o frontend estático, use o Docker
docker-compose up -d
```

---

## 🐳 Docker

### Build e Deploy

```bash
# Build da imagem
docker build -t fuse-checkar2 .

# Executar com Docker Compose
docker-compose up -d
```

### Configuração Docker

O projeto usa **nginx** para servir os arquivos estáticos do frontend:

- **Porta**: 3005 (mapeada para 80 do container)
- **Health Check**: Verificação automática a cada 30s
- **Recursos**: Limitados a 128M RAM e 0.2 CPU

---

## 📁 Estrutura do Projeto

```
fuse-checkar2/
├── html-app/                    # Frontend ativo (Vanilla JS)
│   ├── assets/
│   │   ├── css/                 # Estilos
│   │   ├── js/
│   │   │   ├── config.js        # ⚙️ Configuração da API
│   │   │   ├── core/            # Sistema core
│   │   │   │   ├── api.js       # HTTP Client
│   │   │   │   ├── auth.js      # Autenticação
│   │   │   │   ├── router.js    # Router SPA
│   │   │   │   └── middleware.js
│   │   │   ├── pages/           # Páginas da aplicação
│   │   │   └── main.js          # Entry point
│   │   └── images/
│   └── index.html               # HTML principal
│
├── src/                         # Frontend React (legado)
│   ├── components/              # Componentes React
│   ├── pages/                   # Páginas React
│   └── ...
│
├── Dockerfile                   # Configuração Docker
├── docker-compose.yml           # Orquestração Docker
├── package.json                 # Dependências
├── INTEGRACAO_BACKEND.md        # 📖 Guia de integração
└── README.md                    # Este arquivo
```

---

## ⚙️ Configuração da API

Para integrar com seu backend:

1. Abra o arquivo `/html-app/assets/js/config.js`
2. Atualize a URL base da API:

```javascript
const API_CONFIG = {
  baseURL: 'https://api.seu-dominio.com/api',
  // ... outras configurações
};
```

3. Consulte o **[Guia de Integração](./INTEGRACAO_BACKEND.md)** para detalhes completos

---

## 🔐 Autenticação

O sistema suporta dois tipos de usuários:

### Cliente
- **Acesso**: Portal do Cliente
- **Permissões**: Visualizar próprios veículos e revisões
- **Login**: `/cliente/login`

### Administrador
- **Acesso**: Painel Administrativo
- **Permissões**: Gestão completa do sistema
- **Login**: `/admin/login`

---

## 📱 Páginas Disponíveis

### Portal do Cliente
- `/cliente/dashboard` - Dashboard pessoal
- `/cliente/perfil` - Perfil do usuário
- `/cliente/veiculos` - Lista de veículos
- `/cliente/veiculo/:id` - Detalhes do veículo
- `/cliente/revisoes` - Histórico de revisões
- `/cliente/revisao/:id` - Detalhes da revisão

### Painel Administrativo
- `/admin/dashboard` - Dashboard administrativo
- `/admin/clientes` - Gestão de clientes
- `/admin/cliente/:id` - Detalhes do cliente
- `/admin/veiculos` - Gestão de veículos
- `/admin/revisoes` - Gestão de revisões

---

## 🛠️ Tecnologias Utilizadas

### Frontend Ativo (Vanilla)
- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript ES6+
- Material Symbols (ícones)
- Google Fonts (Open Sans)

### Frontend React (Legado)
- React 18.3.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.11
- shadcn/ui
- React Query 5.56.2
- React Hook Form 7.53.0
- Recharts 2.12.7

### DevOps
- Docker
- Docker Compose
- Nginx
- GitHub Actions (CI/CD)

---

## 📊 API Endpoints Esperados

O frontend espera os seguintes endpoints REST:

### Autenticação
- `POST /api/auth/cliente/login` - Login de cliente
- `POST /api/auth/cliente/register` - Registro de cliente
- `POST /api/auth/admin/login` - Login de administrador

### Clientes (CRUD)
- `GET /api/clientes` - Listar
- `POST /api/clientes` - Criar
- `GET /api/clientes/:id` - Buscar
- `PUT /api/clientes/:id` - Atualizar
- `DELETE /api/clientes/:id` - Deletar

### Veículos (CRUD)
- `GET /api/veiculos` - Listar
- `POST /api/veiculos` - Criar
- `GET /api/veiculos/:id` - Buscar
- `PUT /api/veiculos/:id` - Atualizar
- `DELETE /api/veiculos/:id` - Deletar

### Revisões (CRUD)
- `GET /api/revisoes` - Listar
- `POST /api/revisoes` - Criar
- `GET /api/revisoes/:id` - Buscar
- `PUT /api/revisoes/:id` - Atualizar
- `DELETE /api/revisoes/:id` - Deletar

### Relatórios
- `GET /api/relatorios` - Gerar relatórios

Consulte o **[Guia de Integração](./INTEGRACAO_BACKEND.md)** para especificações completas.

---

## 🧪 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento (React)
npm run dev

# Build (React)
npm run build

# Lint
npm run lint

# Preview
npm run preview

# Servir frontend estático
npm run serve
```

---

## 📝 Notas Importantes

### Backend
- O backend foi **completamente removido**
- Não há integração com Supabase, Firebase ou qualquer BaaS
- O projeto está pronto para receber um novo backend REST
- Consulte **[INTEGRACAO_BACKEND.md](./INTEGRACAO_BACKEND.md)** para implementar

### Dados Mock
- O frontend inclui dados mock para desenvolvimento
- Configure `useMockData: false` em `config.js` quando o backend estiver pronto

### Autenticação
- Atualmente usa localStorage (client-side only)
- Implementar JWT no backend é recomendado
- Tokens devem ser enviados via header `Authorization: Bearer {token}`

---

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é privado e propriedade de **Fuse Checkar2**.

---

## 📞 Suporte

Para dúvidas ou suporte:
- **Issues**: [GitHub Issues](https://github.com/fernandinhomartins40/fuse-checkar2/issues)
- **Documentação**: Consulte os arquivos `.md` na raiz do projeto

---

## 🚀 Próximos Passos

1. [ ] Implementar backend (ver **[INTEGRACAO_BACKEND.md](./INTEGRACAO_BACKEND.md)**)
2. [ ] Configurar banco de dados
3. [ ] Implementar autenticação JWT
4. [ ] Deploy em produção
5. [ ] Testes end-to-end

---

**Desenvolvido com ❤️ para Auto Centers**
