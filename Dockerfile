FROM python:3.10-slim

WORKDIR /app

# Copiar código do backend primeiro
COPY backend ./backend

# Copiar script de start
COPY start.sh .
RUN chmod +x start.sh

# Instalar dependências
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expor porta
EXPOSE 8000

# Comando de start
CMD ["./start.sh"]
