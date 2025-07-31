# 🚀 Instruções de Deploy - Fuse Checkar2

Deploy automatizado para VPS via GitHub Actions.

## ✅ O que foi configurado

- **GitHub Actions** com deploy automatizado
- **VPS**: `31.97.85.98` (nova VPS fornecida)
- **Docker** com isolamento completo
- **Docker Compose** para orquestração
- **Nginx** como proxy reverso
- **Porta 3005** isolada (não conflita com outras apps)
- **Build automático** React + Vite
- **Backend unificado** Node.js + Express

## 🔧 Configuração Necessária

### 1. Secrets do GitHub

No seu repositório GitHub, configure as seguintes secrets:

**Settings → Secrets and Variables → Actions → New repository secret**

```
VPS_PASSWORD = [sua_senha_da_vps]
```

### 2. Atualizar URL do Repositório

No arquivo `.github/workflows/deploy.yml`, linha 120, altere:

```yaml
git clone https://github.com/SEU_USUARIO/fuse-checkar2.git .
```

Para o seu repositório real:

```yaml
git clone https://github.com/fernandinhomartins40/fuse-checkar2.git .
```

### 3. Estrutura Esperada

O deploy espera esta estrutura no repositório:

```
projeto/
├── .github/workflows/deploy.yml    # ✅ Criado
├── package.json                    # ✅ Existe (root)
├── vite.config.ts                  # ✅ Existe
├── src/                            # ✅ Existe (frontend)
├── backend/                        # ✅ Criado
│   ├── package.json               # ✅ Criado
│   └── src/
│       └── server.js              # ✅ Criado
└── dist/                          # Será criado no build
```

## 🚀 Como Fazer Deploy

### Deploy Automático
```bash
git add .
git commit -m "Deploy para produção"
git push origin main
```

### Deploy Manual (GitHub)
1. Acesse **Actions** no GitHub
2. Selecione **"Deploy Fuse Checkar2"**
3. Clique **"Run workflow"**
4. Marque **"Reinstalação completa"** se necessário

## 📊 Processo de Deploy

### 1. **Verificação do Sistema**
- Verifica Docker, Docker Compose, Nginx
- Checa se containers estão rodando
- Determina se precisa instalação

### 2. **Instalação (se necessária)**
- Docker Engine
- Docker Compose
- Nginx
- Dependências básicas

### 3. **Atualização do Código**
- Clone/pull do repositório
- Verificação de arquivos críticos (Dockerfile, docker-compose.yml)

### 4. **Build Docker**
- `docker-compose build --no-cache` (multi-stage build)
- Build do React + Backend em imagem otimizada
- Criação de diretórios (logs, data)

### 5. **Configuração Nginx**
- Proxy para porta 3005
- Headers otimizados para Docker
- Health check em `/health`

### 6. **Deploy com Docker**
- `docker-compose up -d` (containers isolados)
- Health check interno
- Verificação de recursos

### 7. **Verificação Final**
- Teste da API (`/api/health`)
- Teste do Nginx proxy
- Monitoramento de recursos Docker
- Relatório completo

## 🌐 URLs de Acesso

Após o deploy:

- **Aplicação**: `http://31.97.85.98/`
- **API Health**: `http://31.97.85.98/api/health`
- **API Base**: `http://31.97.85.98/api/`

## 🔍 Monitoramento

### SSH na VPS
```bash
ssh root@31.97.85.98
```

### Comandos Úteis
```bash
# Status dos containers
docker-compose ps
docker stats fuse-checkar2-app

# Logs da aplicação
docker-compose logs -f fuse-checkar2

# Status do Nginx
systemctl status nginx
nginx -t

# Verificar porta
netstat -tlnp | grep :3005
curl http://localhost:3005/api/health

# Reiniciar serviços
docker-compose restart fuse-checkar2
systemctl restart nginx
```

## 🛠️ Troubleshooting

### Deploy falha na instalação
- Verifique se a senha está correta nas Secrets
- Execute com "Reinstalação completa" = true

### Container não inicia
```bash
ssh root@31.97.85.98
cd /opt/fuse-checkar2
docker-compose logs fuse-checkar2  # Ver logs
docker exec -it fuse-checkar2-app sh  # Entrar no container
```

### Nginx não funciona
```bash
ssh root@31.97.85.98
nginx -t  # Testa configuração
systemctl status nginx
tail -f /var/log/nginx/error.log
```

### Build falha
- Verifique se `package.json` está no root
- Verifique se `npm run build` funciona localmente
- Confira se há dependências faltando

## 📝 Logs Importantes

### Aplicação (PM2)
```bash
pm2 logs fuse-checkar2
pm2 logs fuse-checkar2 --lines 100
```

### Nginx
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Sistema
```bash
journalctl -u nginx -f
systemctl status pm2-root
```

## 🔄 Rollback

Se houver problemas:

### 1. Rollback via PM2
```bash
ssh root@31.97.85.98
cd /opt/fuse-checkar2/backend/src
pm2 restart fuse-checkar2
```

### 2. Rollback via Git
```bash
ssh root@31.97.85.98
cd /opt/fuse-checkar2
git log --oneline  # Ver commits
git reset --hard COMMIT_ANTERIOR
pm2 restart fuse-checkar2
```

### 3. Rollback completo
- Execute deploy com "Reinstalação completa" = true
- Retorne para commit estável

## 🔐 Segurança

### Firewall Configurado
```bash
ufw status
# Permite: SSH (22), HTTP (80), HTTPS (443)
```

### Acesso SSH
- Somente via chave/senha
- Porta padrão (22)
- Root access (configurar user dedicado posteriormente)

## 📈 Próximos Passos

1. **SSL Certificate**: Configurar HTTPS com Let's Encrypt
2. **Domínio**: Apontar domínio para VPS
3. **Banco de Dados**: PostgreSQL/MongoDB
4. **Backup**: Backup automático de dados
5. **Monitoring**: Alertas e métricas
6. **User dedicado**: Criar user específico (não root)

---

**✅ Deploy configurado e pronto para uso!**

Execute `git push origin main` para fazer o primeiro deploy.