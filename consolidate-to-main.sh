#!/bin/bash

# Script para Consolidar Todas as Mudanças na Branch Main
# Execute este script para consolidar e fazer push de todas as alterações

set -e  # Exit on error

echo "🔧 Script de Consolidação - Fuse Checkar2"
echo "=========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se estamos no diretório correto
if [ ! -d "packages" ] || [ ! -f "turbo.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto fuse-checkar2${NC}"
    exit 1
fi

echo "📋 Passo 1: Verificando estado atual do repositório..."
git status

echo ""
echo "📋 Passo 2: Verificando commits pendentes..."
UNPUSHED=$(git log origin/main..main --oneline | wc -l)
echo -e "${YELLOW}Commits pendentes: $UNPUSHED${NC}"

if [ "$UNPUSHED" -gt 0 ]; then
    echo ""
    echo "Commits que serão enviados:"
    git log origin/main..main --oneline --color
fi

echo ""
echo "📋 Passo 3: Listando branches remotas antigas..."
git branch -r | grep -v "origin/main" | grep "origin/claude"

echo ""
read -p "❓ Deseja fazer o push dos commits pendentes para origin/main? (s/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo ""
    echo "📤 Fazendo push para origin/main..."

    # Tentar push simples
    if git push origin main 2>&1; then
        echo -e "${GREEN}✅ Push realizado com sucesso!${NC}"
    else
        echo -e "${YELLOW}⚠️  Push normal falhou. Tentando com force...${NC}"

        read -p "❓ Deseja forçar o push? ATENÇÃO: Isso sobrescreverá o histórico remoto! (s/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Ss]$ ]]; then
            git push -f origin main && echo -e "${GREEN}✅ Force push realizado!${NC}" || echo -e "${RED}❌ Falha no force push${NC}"
        else
            echo -e "${YELLOW}Push cancelado${NC}"
        fi
    fi
else
    echo -e "${YELLOW}Push cancelado pelo usuário${NC}"
fi

echo ""
read -p "❓ Deseja deletar as branches remotas antigas? (s/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo ""
    echo "🗑️  Deletando branches remotas antigas..."

    # Array de branches para deletar
    BRANCHES=(
        "claude/analyze-typescript-errors-01USBDQFrqCqpHxm2vHE6Cvp"
        "claude/backend-docker-nginx-setup-01RwpReiEKAeAqSHZ66rLfiQ"
        "claude/fix-monorepo-imports-016km1tdT7CyZ3oYXHiw7UX4"
        "claude/merged-backend-to-main-01RwpReiEKAeAqSHZ66rLfiQ"
        "claude/remove-backend-setup-frontend-0141FdgUwXYj2JXYiS183BbB"
        "claude/setup-monorepo-structure-01Ed3PVDVWaRVx11PeJq7Pvb"
    )

    for branch in "${BRANCHES[@]}"; do
        echo "Deletando $branch..."
        if git push origin --delete "$branch" 2>&1; then
            echo -e "${GREEN}  ✅ $branch deletada${NC}"
        else
            echo -e "${RED}  ❌ Falha ao deletar $branch${NC}"
        fi
    done
else
    echo -e "${YELLOW}Deleção de branches cancelada${NC}"
fi

echo ""
echo "📊 Estado final do repositório:"
git status
echo ""
git branch -a

echo ""
echo -e "${GREEN}=========================================="
echo "✅ Script concluído!"
echo -e "==========================================${NC}"
echo ""
echo "Próximos passos:"
echo "1. Verifique o estado acima"
echo "2. Se houver problemas de permissão (HTTP 403):"
echo "   - Verifique suas credenciais Git"
echo "   - Verifique proteções de branch no GitHub"
echo "   - Ou crie um PR manualmente no GitHub"
echo ""
