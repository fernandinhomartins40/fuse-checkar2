# 🐳 Setup Docker - Fuse Checkar2

Aplicação totalmente dockerizada com isolamento completo para VPS com múltiplas aplicações.

## ✅ Configuração Implementada

### **Docker Multi-Stage Build**
- ✅ **Stage 1**: Build do React + instalação backend
- ✅ **Stage 2**: Imagem otimizada de produção
- ✅ **Alpine Linux**: Imagem leve (< 100MB final)
- ✅ **Usuário não-root**: Segurança aprimorada
- ✅ **Health check**: Monitoramento automático

### **Docker Compose**
- ✅ **Rede isolada**: `fuse-checkar2-network`
- ✅ **Limites de recursos**: CPU 0.5, RAM 512MB
- ✅ **Volumes persistentes**: logs e dados
- ✅ **Restart policy**: `unless-stopped`

### **Porta Isolada**
- ✅ **Porta 3005**: Não conflita com outras apps
- ✅ **Nginx proxy**: Host para porta 3005
- ✅ **Isolamento completo**: Não afeta outras aplicações

## 🏗️ Arquivos Docker

### **Dockerfile** (Multi-stage otimizado)
```dockerfile
# Build stage
FROM node:18-alpine AS builder
# Build React + Backend deps

# Production stage  
FROM node:18-alpine AS production
# Imagem final otimizada
```

### **docker-compose.yml**
```yaml
services:
  fuse-checkar2:
    build: .
    ports:
      - "3005:3005"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

### **.dockerignore**
- Exclui `node_modules`, `.git`, docs
- Build mais rápido e imagem menor

## 🚀 Deploy Automatizado

### **GitHub Actions** adaptado para Docker:
1. **Verificação**: Docker + Docker Compose
2. **Build**: `docker-compose build --no-cache`
3. **Deploy**: `docker-compose up -d`
4. **Health Check**: Aguarda API responder
5. **Nginx**: Proxy para porta 3005

## 📊 Vantagens do Docker

### **Isolamento Completo**
- ✅ Não interfere com outras aplicações
- ✅ Dependências isoladas
- ✅ Rede própria
- ✅ Recursos limitados

### **Facilidade de Deploy**
- ✅ Build idêntico em qualquer ambiente
- ✅ Rollback rápido (imagens versionadas)
- ✅ Zero downtime com recreate
- ✅ Logs centralizados

### **Segurança**
- ✅ Usuário não-root (nodejs:1001)
- ✅ Container read-only quando possível
- ✅ Rede isolada
- ✅ Volumes específicos

## 🔧 Comandos Úteis

### **Deploy Manual**
```bash
ssh root@31.97.85.98
cd /opt/fuse-checkar2

# Build e deploy
docker-compose up -d --build

# Apenas restart
docker-compose restart fuse-checkar2

# Ver logs
docker-compose logs -f fuse-checkar2
```

### **Monitoramento**
```bash
# Status dos containers
docker-compose ps

# Recursos utilizados
docker stats fuse-checkar2-app

# Health check
curl http://localhost:3005/api/health

# Logs em tempo real
docker logs -f fuse-checkar2-app
```

### **Manutenção**
```bash
# Parar aplicação
docker-compose down

# Limpar imagens antigas
docker image prune -f

# Rebuild completo
docker-compose build --no-cache
docker-compose up -d
```

## 🔄 Desenvolvimento vs Produção

### **Desenvolvimento (Local)**
```bash
npm run dev  # Frontend + Backend separados
```

### **Produção (Docker)**
```bash
docker-compose up -d  # Tudo unificado
```

## 📈 Recursos e Limites

### **Configuração Atual**
- **CPU**: 0.5 cores (máximo)
- **RAM**: 512MB (máximo)
- **Reserva**: 0.25 cores, 256MB
- **Porta**: 3005 (isolada)

### **Monitoramento**
```bash
# Ver uso atual
docker stats --no-stream fuse-checkar2-app

# Histórico de recursos
docker exec fuse-checkar2-app cat /proc/meminfo
docker exec fuse-checkar2-app cat /proc/loadavg
```

## 🔒 Segurança

### **Container Hardening**
- ✅ **Usuário não-root**: nodejs (uid: 1001)
- ✅ **Alpine Linux**: Menor superfície de ataque
- ✅ **dumb-init**: Correto handle de sinais
- ✅ **Health checks**: Detecção de problemas

### **Rede**
- ✅ **Bridge isolada**: fuse-checkar2-network
- ✅ **Apenas porta necessária**: 3005
- ✅ **Nginx proxy**: Camada adicional

## 🐛 Troubleshooting

### **Container não inicia**
```bash
# Ver logs completos
docker-compose logs fuse-checkar2

# Entrar no container
docker exec -it fuse-checkar2-app sh

# Verificar arquivos
docker exec fuse-checkar2-app ls -la /app
```

### **API não responde**
```bash
# Teste direto no container
docker exec fuse-checkar2-app wget -qO- http://localhost:3005/api/health

# Verificar porta
docker port fuse-checkar2-app

# Testar nginx
curl -v http://localhost/api/health
```

### **Build falha**
```bash
# Build com logs verbosos
docker-compose build --no-cache --progress=plain

# Verificar .dockerignore
cat .dockerignore

# Espaço em disco
df -h
docker system df
```

## 🔄 Backup e Restore

### **Backup**
```bash
# Backup da imagem
docker save fuse-checkar2:latest | gzip > fuse-checkar2-backup.tar.gz

# Backup dos dados
tar -czf fuse-data-backup.tar.gz logs/ data/
```

### **Restore**
```bash
# Restore da imagem
gunzip -c fuse-checkar2-backup.tar.gz | docker load

# Restore dos dados
tar -xzf fuse-data-backup.tar.gz
```

## 📊 URLs e Portas

### **Aplicação**
- **Externa**: http://31.97.85.98/ (via Nginx)
- **Interna**: http://localhost:3005/ (container)
- **Health**: http://31.97.85.98/api/health

### **Desenvolvimento**
- **Frontend**: http://localhost:8080 (Vite dev)
- **Backend**: http://localhost:3005 (direto)

---

**🐳 Aplicação 100% dockerizada e isolada!**

Ideal para VPS com múltiplas aplicações, sem conflitos de porta ou dependências.