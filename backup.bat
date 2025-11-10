@echo off
title Backup - Sistema de Gestao de Estoque
color 0E

echo.
echo ===============================================
echo      💾 BACKUP DO SISTEMA DE ESTOQUE 💾
echo ===============================================
echo.

set "backup_folder=backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "backup_folder=%backup_folder: =0%"

echo 📁 Criando pasta de backup: %backup_folder%
mkdir "%backup_folder%" 2>nul

echo 📋 Copiando arquivos do sistema...

REM Copiar arquivos principais
xcopy "src" "%backup_folder%\src\" /E /I /Q
xcopy "public" "%backup_folder%\public\" /E /I /Q
copy "package.json" "%backup_folder%\" >nul
copy "README.md" "%backup_folder%\" >nul
copy "*.bat" "%backup_folder%\" >nul
copy "*.sh" "%backup_folder%\" >nul

REM Copiar configurações se existirem
if exist "tailwind.config.js" copy "tailwind.config.js" "%backup_folder%\" >nul
if exist "tsconfig.json" copy "tsconfig.json" "%backup_folder%\" >nul
if exist "postcss.config.js" copy "postcss.config.js" "%backup_folder%\" >nul

echo 💾 Exportando dados do LocalStorage...
echo.
echo ⚠️  IMPORTANTE: Para backup completo dos dados:
echo    1. Abra o sistema no navegador
echo    2. Va em Configuracoes
echo    3. Clique em "Exportar Dados"
echo    4. Salve o arquivo JSON na pasta: %backup_folder%
echo.

echo ✅ BACKUP DO CODIGO CONCLUIDO!
echo.
echo 📁 Backup salvo em: %backup_folder%
echo.
echo 📋 CONTEUDO DO BACKUP:
echo    ✅ Codigo fonte completo
echo    ✅ Configuracoes
echo    ✅ Scripts de execucao
echo    ⚠️  Dados: Exporte manualmente via sistema
echo.
echo 🔄 Para restaurar:
echo    1. Copie os arquivos de volta
echo    2. Execute: install.bat
echo    3. Importe os dados via sistema
echo.
pause