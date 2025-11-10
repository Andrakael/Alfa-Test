@echo off
echo Reorganizando repositorio para Railway...

cd ..

echo Copiando arquivos necessarios para raiz...
copy Alfa-Test\requirements.txt .
copy Alfa-Test\runtime.txt .
copy Alfa-Test\Procfile .
copy Alfa-Test\nixpacks.toml .

echo Criando start.sh na raiz...
echo python -m uvicorn Alfa-Test.backend.main:app --host 0.0.0.0 --port $PORT > start.sh

echo Commitando mudancas...
git add requirements.txt runtime.txt Procfile nixpacks.toml start.sh
git commit -m "fix: Mover arquivos de config para raiz do repositorio"
git push

echo Pronto! Agora o Railway deve funcionar.
pause
