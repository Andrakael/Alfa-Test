# Deploy no Railway - NEXUS

## Passo a Passo

### 1. Preparar o Repositório
O código já está pronto para deploy! ✅

### 2. Criar Projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Faça login com sua conta
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha o repositório `Alfa-Test`

### 3. Configurar Variáveis de Ambiente

No Railway, vá em **Variables** e adicione:

```
PORT=8000
SECRET_KEY=GILGAMESH999-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=*
```

### 4. Configurar o Domínio

1. No Railway, vá em **Settings**
2. Em **Networking**, clique em **Generate Domain**
3. Copie a URL gerada (ex: `https://seu-app.railway.app`)

### 5. Atualizar Frontend

Edite o arquivo `src/services/apiClient.ts`:

```typescript
const apiClient = axios.create({
  baseURL: 'https://seu-app.railway.app/api',  // ← Cole sua URL aqui
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 6. Deploy Automático

O Railway vai fazer deploy automaticamente quando você fizer push para o GitHub!

```bash
git add .
git commit -m "Configure Railway deployment"
git push
```

### 7. Inicializar Banco de Dados

Após o deploy, execute os comandos no Railway CLI ou via SSH:

```bash
# Criar usuários padrão
python backend/setup_users.py
```

## Comandos Úteis

### Ver Logs
```bash
railway logs
```

### Conectar via SSH
```bash
railway shell
```

### Reiniciar Serviço
```bash
railway restart
```

## Estrutura de Custos

- **Plano Hobby ($5/mês)**: 
  - $5 de crédito mensal
  - 500 horas de execução
  - 512 MB RAM
  - 1 GB de armazenamento

## Troubleshooting

### Erro de Porta
Se der erro de porta, verifique se o `PORT` está configurado nas variáveis de ambiente.

### Erro de CORS
Adicione o domínio do frontend em `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS=https://seu-frontend.vercel.app,http://localhost:3001
```

### Banco de Dados
O Railway usa SQLite por padrão. Para produção, considere usar PostgreSQL:
1. Adicione um serviço PostgreSQL no Railway
2. Atualize `DATABASE_URL` com a URL fornecida

## URLs Importantes

- **Backend API**: `https://seu-app.railway.app`
- **Documentação**: `https://seu-app.railway.app/docs`
- **Health Check**: `https://seu-app.railway.app/`

## Credenciais Padrão

Após inicializar o banco:

- **Admin**: admin / GILGAMESH999
- **Gerente**: gerente / GILGAMESH99
- **Usuário**: usuario / GILGAMESH9

---

✅ **Pronto!** Seu backend está no ar! 🚀
