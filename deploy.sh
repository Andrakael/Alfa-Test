#!/bin/bash

echo "🚀 Iniciando deploy do Sistema de Gestão de Estoque..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js primeiro."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas"

# Fazer build de produção
echo "🔨 Criando build de produção..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build de produção"
    exit 1
fi

echo "✅ Build de produção criado"

# Verificar se a pasta build foi criada
if [ ! -d "build" ]; then
    echo "❌ Pasta build não encontrada"
    exit 1
fi

echo "✅ Build verificado"

echo ""
echo "🎉 Deploy preparado com sucesso!"
echo ""
echo "📁 Arquivos prontos na pasta 'build/'"
echo ""
echo "🌐 Próximos passos para colocar online:"
echo ""
echo "1️⃣  VERCEL (Mais fácil):"
echo "   • Acesse: https://vercel.com"
echo "   • Conecte seu GitHub"
echo "   • Importe este projeto"
echo "   • Deploy automático!"
echo ""
echo "2️⃣  NETLIFY:"
echo "   • Acesse: https://netlify.com"
echo "   • Arraste a pasta 'build' para o site"
echo "   • Deploy instantâneo!"
echo ""
echo "3️⃣  GITHUB PAGES:"
echo "   • Faça push para GitHub"
echo "   • Ative GitHub Actions"
echo "   • Configure Pages"
echo ""
echo "📖 Guia completo: Leia o arquivo DEPLOY.md"
echo ""
echo "✨ Seu sistema estará online 24/7!"