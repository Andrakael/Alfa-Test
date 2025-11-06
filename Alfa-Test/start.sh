#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

clear

echo -e "${CYAN}"
echo "  ███████╗██╗███████╗████████╗███████╗███╗   ███╗ █████╗ "
echo "  ██╔════╝██║██╔════╝╚══██╔══╝██╔════╝████╗ ████║██╔══██╗"
echo "  ███████╗██║███████╗   ██║   █████╗  ██╔████╔██║███████║"
echo "  ╚════██║██║╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║██╔══██║"
echo "  ███████║██║███████║   ██║   ███████╗██║ ╚═╝ ██║██║  ██║"
echo "  ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝"
echo -e "${NC}"
echo ""
echo -e "${PURPLE}            🏪 SISTEMA DE GESTÃO DE ESTOQUE 🏪${NC}"
echo ""
echo -e "${YELLOW}⚡ Iniciando sistema...${NC}"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado!${NC}"
    echo -e "${BLUE}📥 Baixe em: https://nodejs.org${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js encontrado${NC}"
echo -e "${YELLOW}📦 Verificando dependências...${NC}"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}🔄 Instalando dependências pela primeira vez...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao instalar dependências${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Dependências instaladas!${NC}"
fi

echo -e "${CYAN}🚀 Iniciando servidor de desenvolvimento...${NC}"
echo ""
echo -e "${GREEN}🌐 O sistema abrirá automaticamente no navegador${NC}"
echo -e "${BLUE}📍 URL: http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}⚠️  Para parar o servidor: Ctrl + C${NC}"
echo ""

# Iniciar o servidor
npm start