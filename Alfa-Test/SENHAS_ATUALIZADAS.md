# 🔐 Senhas Atualizadas - NEXUS

## ⚠️ IMPORTANTE: Senhas Foram Alteradas!

As senhas padrão foram atualizadas para senhas mais seguras.

## 👥 Credenciais de Acesso:

### 🔴 Administrador
- **Usuário:** `admin`
- **Senha:** `Admin@2024!Nexus`
- **Nível:** Acesso Total

### 🔵 Gerente
- **Usuário:** `gerente`
- **Senha:** `Gerente@2024!Nexus`
- **Nível:** Gestão Operacional

### 🟢 Usuário
- **Usuário:** `usuario`
- **Senha:** `Usuario@2024!Nexus`
- **Nível:** Vendas Básicas

---

## 📝 Padrão das Senhas:

```
[Tipo]@2024!Nexus
```

- **Maiúscula inicial** do tipo de usuário
- **@2024** - Ano atual
- **!Nexus** - Nome do sistema

### Exemplos:
- Admin → `Admin@2024!Nexus`
- Gerente → `Gerente@2024!Nexus`
- Usuario → `Usuario@2024!Nexus`

---

## 🔄 Como Reinicializar o Banco com Novas Senhas:

### 1. Deletar banco antigo:
```bash
cd backend
del nexus.db  # Windows
# ou
rm nexus.db   # Linux/Mac
```

### 2. Reinicializar:
```bash
python init_db.py
```

### 3. Verificar:
```
🎉 Banco de dados inicializado com sucesso!

📋 Usuários criados:
  • admin / Admin@2024!Nexus (Administrador)
  • gerente / Gerente@2024!Nexus (Gerente)
  • usuario / Usuario@2024!Nexus (Usuário)
```

---

## 🚀 Testar Login:

### Frontend:
1. Acesse: http://localhost:3000
2. Use as novas credenciais acima

### Backend API (Swagger):
1. Acesse: http://localhost:8000/docs
2. Clique em "Authorize"
3. Use as novas credenciais

---

## 🔒 Segurança:

### Por que mudamos?
- ✅ Senhas antigas eram muito simples
- ✅ Google/navegadores bloqueavam por serem vazadas
- ✅ Novas senhas seguem padrões de segurança:
  - Maiúsculas e minúsculas
  - Números
  - Caracteres especiais (@, !)
  - Mínimo 8 caracteres

### Recomendações:
1. **Em produção**, altere TODAS as senhas
2. Use senhas únicas para cada usuário
3. Ative autenticação de dois fatores (2FA)
4. Nunca compartilhe senhas em texto plano

---

## 📚 Documentação Atualizada:

Os seguintes arquivos foram atualizados com as novas senhas:
- ✅ `backend/init_db.py`
- ✅ `SISTEMA_PERMISSOES.md`
- ✅ `SENHAS_ATUALIZADAS.md` (este arquivo)

---

## ⚡ Quick Start:

```bash
# 1. Reinicializar banco
cd backend
del nexus.db
python init_db.py

# 2. Iniciar backend
python main.py

# 3. Testar login
# Frontend: http://localhost:3000
# Usuário: admin
# Senha: Admin@2024!Nexus
```

---

**Senhas atualizadas em:** 10/11/2025  
**Versão:** 2.0  
**Status:** ✅ Ativo
