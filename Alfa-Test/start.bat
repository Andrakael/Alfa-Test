@echo off
title Sistema de Gestao de Estoque
color 0A

echo.
echo  ███████╗██╗███████╗████████╗███████╗███╗   ███╗ █████╗ 
echo  ██╔════╝██║██╔════╝╚══██╔══╝██╔════╝████╗ ████║██╔══██╗
echo  ███████╗██║███████╗   ██║   █████╗  ██╔████╔██║███████║
echo  ╚════██║██║╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║██╔══██║
echo  ███████║██║███████║   ██║   ███████╗██║ ╚═╝ ██║██║  ██║
echo  ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝
echo.
echo            🏪 SISTEMA DE GESTAO DE ESTOQUE 🏪
echo.
echo ⚡ Iniciando sistema...
echo.

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js nao encontrado!
    echo 📥 Baixe em: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
echo 📦 Verificando dependencias...

REM Instalar dependências se necessário
if not exist "node_modules" (
    echo 🔄 Instalando dependencias pela primeira vez...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar dependencias
        pause
        exit /b 1
    )
    echo ✅ Dependencias instaladas!
)

echo 🚀 Iniciando servidor de desenvolvimento...
echo.
echo 🌐 O sistema abrira automaticamente no navegador
echo 📍 URL: http://localhost:3000
echo.
echo ⚠️  Para parar o servidor: Ctrl + C
echo.

REM Iniciar o servidor
npm start

pause