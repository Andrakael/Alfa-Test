# 🚀 NEXUS Backend API

Backend em Python com FastAPI + SQLite para o sistema NEXUS.

## 📋 Características

- ✅ **FastAPI** - Framework moderno e rápido
- ✅ **SQLite** - Banco de dados leve e portável
- ✅ **SQLAlchemy** - ORM poderoso
- ✅ **JWT Authentication** - Autenticação segura
- ✅ **Permissões por Role** - admin, gerente, usuario
- ✅ **CORS habilitado** - Integração com frontend
- ✅ **Documentação automática** - Swagger UI

## 🔧 Instalação

### 1. Criar ambiente virtual

```bash
cd backend
python -m venv venv
```

### 2. Ativar ambiente virtual

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Configurar variáveis de ambiente

```bash
copy .env.example .env
```

Edite o arquivo `.env` e configure suas variáveis.

## 🚀 Executar

```bash
python main.py
```

Ou com uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

A API estará disponível em:
- **API:** http://localhost:8000
- **Documentação:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 📚 Endpoints

### Autenticação

- `POST /api/register` - Registrar novo usuário
- `POST /api/login` - Login e obter token
- `GET /api/me` - Obter usuário atual

### Categorias

- `GET /api/categorias` - Listar categorias
- `POST /api/categorias` - Criar categoria (gerente+)
- `PUT /api/categorias/{id}` - Atualizar categoria (gerente+)
- `DELETE /api/categorias/{id}` - Deletar categoria (gerente+)

### Produtos

- `GET /api/produtos` - Listar produtos
- `POST /api/produtos` - Criar produto (gerente+)
- `PUT /api/produtos/{id}` - Atualizar produto (gerente+)
- `DELETE /api/produtos/{id}` - Deletar produto (gerente+)

### Clientes

- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente (gerente+)
- `PUT /api/clientes/{id}` - Atualizar cliente (gerente+)
- `DELETE /api/clientes/{id}` - Deletar cliente (gerente+)

### Transações

- `GET /api/transacoes` - Listar transações
- `POST /api/transacoes` - Criar transação (vendas: todos, entradas: gerente+)
- `DELETE /api/transacoes/{id}` - Desfazer transação (gerente+)

## 🔐 Autenticação

Todas as rotas (exceto `/api/register` e `/api/login`) requerem autenticação via JWT.

### Como usar:

1. Faça login em `/api/login`
2. Copie o `access_token` da resposta
3. Adicione o header em todas as requisições:
   ```
   Authorization: Bearer {seu_token_aqui}
   ```

## 👥 Níveis de Permissão

### ADMIN
- Acesso total a tudo

### GERENTE
- Pode criar/editar/deletar produtos, clientes, categorias
- Pode adicionar transações de entrada
- Pode desfazer transações

### USUARIO
- Pode visualizar tudo
- Pode criar vendas (transações de saída)
- Não pode editar ou deletar

## 🗄️ Banco de Dados

O banco SQLite é criado automaticamente no primeiro run em `nexus.db`.

### Estrutura:

- **users** - Usuários do sistema
- **categorias** - Categorias de produtos
- **produtos** - Produtos cadastrados
- **clientes** - Clientes cadastrados
- **transacoes** - Histórico de movimentações

Cada usuário tem seus próprios dados isolados.

## 🌐 Deploy no Railway

### 1. Criar conta no Railway

https://railway.app

### 2. Criar novo projeto

- Conecte seu repositório GitHub
- Railway detectará automaticamente o Python

### 3. Configurar variáveis de ambiente

No painel do Railway, adicione:
```
SECRET_KEY=sua-chave-super-segura-aqui
```

### 4. Deploy automático

Railway fará deploy automaticamente a cada push no GitHub.

## 📝 Criar Usuário Inicial

Após iniciar o backend, crie um usuário admin:

```bash
curl -X POST "http://localhost:8000/api/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@nexus.com",
    "role": "admin"
  }'
```

Ou use a documentação interativa em http://localhost:8000/docs

## 🧪 Testar API

### Com curl:

```bash
# Login
curl -X POST "http://localhost:8000/api/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"

# Listar produtos (com token)
curl -X GET "http://localhost:8000/api/produtos" \
  -H "Authorization: Bearer {seu_token}"
```

### Com Swagger UI:

Acesse http://localhost:8000/docs e teste diretamente no navegador.

## 📦 Estrutura do Projeto

```
backend/
├── main.py           # Aplicação principal
├── models.py         # Modelos do banco de dados
├── schemas.py        # Schemas Pydantic
├── auth.py           # Autenticação e permissões
├── database.py       # Configuração do banco
├── requirements.txt  # Dependências
├── .env.example      # Exemplo de variáveis
├── .gitignore        # Arquivos ignorados
└── README.md         # Esta documentação
```

## 🔧 Desenvolvimento

### Adicionar nova rota:

1. Defina o modelo em `models.py`
2. Crie o schema em `schemas.py`
3. Adicione a rota em `main.py`
4. Aplique permissões com `auth.check_permission()`

### Migrations:

Para mudanças no banco, use Alembic:

```bash
pip install alembic
alembic init alembic
alembic revision --autogenerate -m "descrição"
alembic upgrade head
```

## ❓ Problemas Comuns

### Erro: "No module named 'fastapi'"

```bash
pip install -r requirements.txt
```

### Erro: "Could not validate credentials"

O token expirou. Faça login novamente.

### Erro: "403 Forbidden"

Você não tem permissão. Verifique seu role.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando FastAPI**
