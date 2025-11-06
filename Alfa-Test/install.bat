@echo off
title Instalacao - Sistema de Gestao de Estoque
color 0B

echo.
echo ===============================================
echo    🔧 INSTALACAO DO SISTEMA DE ESTOQUE 🔧
echo ===============================================
echo.

REM Verificar Node.js
echo 🔍 Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js nao encontrado!
    echo.
    echo 📥 INSTALE O NODE.JS PRIMEIRO:
    echo    1. Acesse: https://nodejs.org
    echo    2. Baixe a versao LTS
    echo    3. Instale normalmente
    echo    4. Reinicie o computador
    echo    5. Execute este script novamente
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado!
node --version

REM Verificar npm
echo 🔍 Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm nao encontrado!
    pause
    exit /b 1
)

echo ✅ npm encontrado!
npm --version

echo.
echo 📦 Instalando dependencias do projeto...
echo ⏳ Isso pode demorar alguns minutos...
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO na instalacao!
    echo.
    echo 🔧 Tente estas solucoes:
    echo    1. Verifique sua conexao com internet
    echo    2. Execute como Administrador
    echo    3. Limpe o cache: npm cache clean --force
    echo    4. Tente novamente
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ INSTALACAO CONCLUIDA COM SUCESSO!
echo.
echo 🚀 Para iniciar o sistema:
echo    - Execute: start.bat
echo    - Ou digite: npm start
echo.
echo 🌐 O sistema abrira em: http://localhost:3000
echo.
echo 📋 FUNCIONALIDADES DISPONIVEIS:
echo    ✅ Gestao de Produtos
echo    ✅ Gestao de Clientes  
echo    ✅ Sistema de Vendas
echo    ✅ Controle de Estoque
echo    ✅ Historico de Transacoes
echo    ✅ Chat Bot Integrado
echo    ✅ Backup e Restauracao
echo.
pause