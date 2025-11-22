#!/bin/bash
# Script para Aplicar Commits Pendentes
# Execute este script em qualquer clone do repositório

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔧 Aplicando Commits Pendentes - Fuse Checkar2"
echo "=============================================="
echo ""

# Verificar se estamos em um repositório git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Erro: Este não é um repositório Git"
    echo "Execute este script na raiz do repositório fuse-checkar2"
    exit 1
fi

# Verificar branch atual
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Branch atual: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Você não está na branch main"
    read -p "Deseja fazer checkout para main? (s/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        git checkout main
    else
        echo "Cancelado. Execute o script na branch main."
        exit 1
    fi
fi

echo ""
echo "📦 Escolha o método de aplicação:"
echo "  1) Usar Git Bundle (Recomendado)"
echo "  2) Usar Patch Files"
echo ""
read -p "Escolha (1 ou 2): " METHOD

if [ "$METHOD" = "1" ]; then
    echo ""
    echo "📦 Aplicando via Git Bundle..."

    BUNDLE_FILE="$SCRIPT_DIR/commits-pendentes.bundle"

    if [ ! -f "$BUNDLE_FILE" ]; then
        echo "❌ Erro: Bundle não encontrado em $BUNDLE_FILE"
        exit 1
    fi

    # Verificar bundle
    echo "🔍 Verificando bundle..."
    if git bundle verify "$BUNDLE_FILE"; then
        echo "✅ Bundle válido!"
    else
        echo "❌ Bundle inválido!"
        exit 1
    fi

    # Aplicar bundle
    echo "📥 Aplicando commits do bundle..."
    git pull "$BUNDLE_FILE" main

    echo "✅ Commits aplicados com sucesso via bundle!"

elif [ "$METHOD" = "2" ]; then
    echo ""
    echo "📄 Aplicando via Patch Files..."

    PATCHES_DIR="$SCRIPT_DIR/patches"

    if [ ! -d "$PATCHES_DIR" ]; then
        echo "❌ Erro: Diretório de patches não encontrado em $PATCHES_DIR"
        exit 1
    fi

    # Contar patches
    PATCH_COUNT=$(ls -1 "$PATCHES_DIR"/*.patch 2>/dev/null | wc -l)

    if [ "$PATCH_COUNT" -eq 0 ]; then
        echo "❌ Erro: Nenhum patch encontrado em $PATCHES_DIR"
        exit 1
    fi

    echo "📋 Encontrados $PATCH_COUNT patches"

    # Aplicar patches em ordem
    for patch in "$PATCHES_DIR"/*.patch; do
        echo "  Aplicando: $(basename "$patch")"
        if git am < "$patch"; then
            echo "  ✅ Aplicado com sucesso"
        else
            echo "  ❌ Erro ao aplicar patch"
            echo "  Resolvendo conflitos..."
            git am --abort 2>/dev/null || true
            exit 1
        fi
    done

    echo "✅ Todos os patches aplicados com sucesso!"

else
    echo "❌ Opção inválida"
    exit 1
fi

echo ""
echo "📊 Estado final:"
git log --oneline -5
echo ""
git status

echo ""
echo "✅ Commits aplicados com sucesso!"
echo ""
echo "🚀 Próximo passo: Fazer push para o repositório remoto"
echo "   git push origin main"
echo ""
