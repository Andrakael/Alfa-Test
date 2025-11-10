FROM python:3.10-slim

WORKDIR /app

# Copiar código do backend primeiro
COPY backend ./backend

# Copiar entrypoint
COPY entrypoint.py .
RUN chmod +x entrypoint.py

# Instalar dependências
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expor porta
EXPOSE 8000

# Comando de start
CMD ["python3", "entrypoint.py"]
