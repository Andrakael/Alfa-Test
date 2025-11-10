FROM python:3.10-slim

WORKDIR /app

# Copiar código do backend primeiro
COPY backend ./backend

# Instalar dependências
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expor porta
EXPOSE 8000

# Comando de start
CMD ["python3", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
