@echo off
echo 🚀 Iniciando deploy do Sistema de Gestão de Estoque...

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Instale Node.js primeiro.
    pause
    exit /b 1
)

REM Verificar se npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm não encontrado. Instale npm primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js e npm encontrados

REM Instalar dependências
echo 📦 Instalando dependências...
npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo ✅ Dependências instaladas

REM Fazer build de produção
echo 🔨 Criando build de produção...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build de produção
    pause
    exit /b 1
)

echo ✅ Build de produção criado

REM Verificar se a pasta build foi criada
if not exist "build" (
    echo ❌ Pasta build não encontrada
    pause
    exit /b 1
)

echo ✅ Build verificado
echo.
echo 🎉 Deploy preparado com sucesso!
echo.
echo 📁 Arquivos prontos na pasta 'build/'
echo.
echo 🌐 Próximos passos para colocar online:
echo.
echo 1️⃣  VERCEL (Mais fácil):
echo    • Acesse: https://vercel.com
echo    • Conecte seu GitHub
echo    • Importe este projeto
echo    • Deploy automático!
echo.
echo 2️⃣  NETLIFY:
echo    • Acesse: https://netlify.com
echo    • Arraste a pasta 'build' para o site
echo    • Deploy instantâneo!
echo.
echo 3️⃣  GITHUB PAGES:
echo    • Faça push para GitHub
echo    • Ative GitHub Actions
echo    • Configure Pages
echo.
echo 📖 Guia completo: Leia o arquivo DEPLOY.md
echo.
echo ✨ Seu sistema estará online 24/7!
echo.
pause