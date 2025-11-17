# Multi-stage build para otimizar tamanho da imagem
FROM node:18-alpine AS builder

# Instalar dependências do sistema necessárias
RUN apk add --no-cache python3 make g++

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências do backend (apenas produção)
COPY backend/package*.json ./backend/
RUN cd backend && \
    npm cache clean --force && \
    npm install --production --verbose && \
    npm cache clean --force

# Copiar código fonte do backend
COPY backend ./backend

# Copiar aplicação HTML
COPY html-app ./html-app

# ================================
# Estágio de produção
# ================================
FROM node:18-alpine AS production

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    dumb-init \
    wget \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do backend do estágio anterior
COPY --from=builder --chown=nodejs:nodejs /app/backend ./backend

# Copiar aplicação HTML
COPY --from=builder --chown=nodejs:nodejs /app/html-app ./html-app

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
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3005/health || exit 1

# Usar dumb-init para gerenciar sinais corretamente
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar a aplicação
CMD ["node", "backend/src/server.js"]