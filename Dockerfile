# Multi-stage build para otimizar tamanho da imagem
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json do frontend
COPY package*.json ./

# Instalar dependências do frontend
RUN npm ci --only=production && npm cache clean --force

# Copiar código fonte do frontend
COPY . .

# Build do frontend React+Vite
RUN npm run build

# Instalar dependências do backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ================================
# Estágio de produção
# ================================
FROM node:18-alpine AS production

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    dumb-init \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do backend do estágio anterior
COPY --from=builder --chown=nodejs:nodejs /app/backend ./backend

# Copiar build do frontend do estágio anterior
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Criar pasta de logs
RUN mkdir -p /app/logs && chown -R nodejs:nodejs /app/logs

# Mudar para usuário não-root
USER nodejs

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3005

# Expor porta
EXPOSE 3005

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); const options = { host: 'localhost', port: 3005, path: '/api/health', timeout: 2000 }; const req = http.get(options, (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); }); req.on('error', () => process.exit(1)); req.end();"

# Usar dumb-init para gerenciar sinais corretamente
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar a aplicação
CMD ["node", "backend/src/server.js"]