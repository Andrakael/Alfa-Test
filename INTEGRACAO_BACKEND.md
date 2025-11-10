# 🔗 Guia de Integração Frontend + Backend

## 📋 O que foi criado:

### Backend (Python + FastAPI)
- ✅ API REST completa
- ✅ Autenticação JWT
- ✅ Banco SQLite com dados isolados por usuário
- ✅ Permissões por role (admin, gerente, usuario)
- ✅ CRUD completo para produtos, clientes, categorias e transações

## 🚀 Como Usar:

### 1. Instalar Python

Se não tiver Python instalado:
- Download: https://www.python.org/downloads/
- Marque "Add Python to PATH" durante instalação

### 2. Configurar Backend

```bash
# Ir para pasta do backend
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual (Windows)
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Inicializar banco de dados
python init_db.py

# Iniciar servidor
python main.py
```

O backend estará rodando em: **http://localhost:8000**

### 3. Testar Backend

Abra no navegador: **http://localhost:8000/docs**

Você verá a documentação interativa (Swagger UI) onde pode testar todos os endpoints.

### 4. Integrar com Frontend

Agora você precisa modificar o frontend React para usar a API ao invés do localStorage.

## 📝 Próximos Passos:

### Opção A: Integração Manual

Vou criar um serviço API no frontend que se conecta ao backend:

```typescript
// src/services/api.ts
const API_URL = 'http://localhost:8000/api';

export const api = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${username}&password=${password}`
    });
    return response.json();
  },
  
  getProdutos: async (token) => {
    const response = await fetch(`${API_URL}/produtos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  
  // ... outros métodos
};
```

### Opção B: Usar Axios (Recomendado)

Instalar Axios e criar um cliente HTTP configurado:

```bash
npm install axios
```

```typescript
// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

## 🎯 Quer que eu faça a integração?

Posso criar:

1. **Serviço de API** - Cliente HTTP para comunicar com backend
2. **Hooks customizados** - useAuth, useProdutos, useClientes, etc.
3. **Context API** - Gerenciar estado global com dados do backend
4. **Atualizar componentes** - Modificar App.tsx e componentes para usar API

**Isso vai substituir o localStorage por chamadas reais ao backend!**

## 📊 Comparação:

### Antes (localStorage):
```
Frontend → localStorage (dados locais no navegador)
```

### Depois (Backend):
```
Frontend → API (HTTP) → Backend → SQLite (dados no servidor)
```

## ✅ Vantagens do Backend:

1. **Dados isolados por usuário** - Cada usuário tem seus próprios dados
2. **Funciona em qualquer dispositivo** - Dados no servidor
3. **Seguro** - Autenticação JWT
4. **Escalável** - Pode adicionar mais funcionalidades
5. **Deploy fácil** - Railway, Heroku, etc.

## 🔧 Comandos Úteis:

### Iniciar Backend:
```bash
cd backend
venv\Scripts\activate  # Windows
python main.py
```

### Iniciar Frontend:
```bash
npm start
```

### Ver documentação da API:
```
http://localhost:8000/docs
```

### Criar novo usuário:
```bash
curl -X POST "http://localhost:8000/api/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "teste",
    "password": "teste123",
    "role": "usuario"
  }'
```

## 🎯 Decisão:

**Quer que eu faça a integração completa do frontend com o backend agora?**

Isso vai:
- ✅ Criar serviço de API
- ✅ Atualizar todos os componentes
- ✅ Substituir localStorage por chamadas HTTP
- ✅ Adicionar loading states
- ✅ Tratamento de erros
- ✅ Autenticação JWT

**Responda "sim" e eu faço tudo! 🚀**
