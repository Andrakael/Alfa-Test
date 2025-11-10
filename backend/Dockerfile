FROM python:3.10-slim

WORKDIR /app

# Copiar código do backend
COPY . .

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expor porta
EXPOSE 8000

# Comando de start
CMD python3 -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
