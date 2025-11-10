FROM python:3.10-slim

WORKDIR /app

# Copiar código do backend
COPY backend ./backend

# Instalar dependências
RUN pip install --no-cache-dir -r backend/requirements.txt

# Inicializar banco de dados
RUN cd backend && python3 init_db.py

# Expor porta
EXPOSE 8000

# Comando de start usando shell form para suportar variáveis de ambiente
CMD python3 -m uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}
