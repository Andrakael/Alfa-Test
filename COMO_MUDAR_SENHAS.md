# 🔐 Como Mudar as Senhas do Sistema

## 📝 Usuários Padrão:

| Usuário | Senha | Nível |
|---------|-------|-------|
| admin | admin123 | Administrador |
| gerente | gerente123 | Gerente |
| usuario | usuario123 | Usuário |

---

## 🔧 Como Mudar as Senhas:

### **Passo 1: Abrir o arquivo**
Abra o arquivo: `src/components/Login.tsx`

### **Passo 2: Encontrar as credenciais**
Procure por esta seção (linha ~15):

```typescript
const USUARIOS = {
  'admin': 'admin123',
  'gerente': 'gerente123',
  'usuario': 'usuario123'
};
```

### **Passo 3: Mudar as senhas**
Altere as senhas como quiser:

```typescript
const USUARIOS = {
  'admin': 'SuaSenhaForte123!',
  'gerente': 'OutraSenha456@',
  'usuario': 'SenhaUsuario789#'
};
```

### **Passo 4: Adicionar mais usuários**
Você pode adicionar quantos quiser:

```typescript
const USUARIOS = {
  'admin': 'admin123',
  'gerente': 'gerente123',
  'usuario': 'usuario123',
  'joao': 'joao2024',
  'maria': 'maria2024',
  'vendedor1': 'vend123'
};
```

### **Passo 5: Salvar e recompilar**
```bash
npm run build
```

---

## 🎯 Exemplo Completo:

```typescript
// Arquivo: src/components/Login.tsx
// Linha ~15

const USUARIOS = {
  // Administradores
  'admin': 'Admin@2024!',
  'diretor': 'Diretor@2024!',
  
  // Gerentes
  'gerente1': 'Gerente1@2024',
  'gerente2': 'Gerente2@2024',
  
  // Vendedores
  'vendedor1': 'Vend1@2024',
  'vendedor2': 'Vend2@2024',
  
  // Estoque
  'estoque': 'Estoque@2024'
};
```

---

## 🔒 Dicas de Segurança:

### **Senhas Fortes:**
- ✅ Mínimo 8 caracteres
- ✅ Letras maiúsculas e minúsculas
- ✅ Números
- ✅ Caracteres especiais (@, #, !, etc.)

### **Exemplos de senhas fortes:**
- `Nexus@2024!`
- `Gestao#2024`
- `Estoque$2024`
- `Admin@Nexus2024`

### **Evite:**
- ❌ Senhas óbvias (123456, senha, admin)
- ❌ Datas de nascimento
- ❌ Nomes simples
- ❌ Sequências (abc123, qwerty)

---

## 🚀 Remover a lista de usuários da tela de login:

Se quiser esconder os usuários disponíveis na tela de login:

### **Passo 1:** Abra `src/components/Login.tsx`

### **Passo 2:** Procure por esta seção (linha ~130):

```typescript
{/* Informações de acesso */}
<div className="mt-6 p-4 bg-gray-50 rounded-lg">
  <p className="text-xs text-gray-600 font-medium mb-2">
    👤 Usuários disponíveis:
  </p>
  <div className="space-y-1 text-xs text-gray-500">
    <p>• <span className="font-mono">admin</span> / <span className="font-mono">admin123</span></p>
    <p>• <span className="font-mono">gerente</span> / <span className="font-mono">gerente123</span></p>
    <p>• <span className="font-mono">usuario</span> / <span className="font-mono">usuario123</span></p>
  </div>
</div>
```

### **Passo 3:** Delete todo esse bloco ou comente:

```typescript
{/* 
  Informações de acesso removidas por segurança
*/}
```

---

## 📱 Sistema de Login:

### **Funcionalidades:**
- ✅ Tela de login bonita
- ✅ Validação de usuário e senha
- ✅ Mensagem de erro
- ✅ Sessão salva (não precisa logar toda vez)
- ✅ Botão de logout no header
- ✅ Nome do usuário exibido

### **Como funciona:**
1. Usuário digita login e senha
2. Sistema valida
3. Se correto, salva sessão no navegador
4. Usuário acessa o sistema
5. Pode fazer logout a qualquer momento

---

## 🎨 Personalizar a tela de login:

### **Mudar cores:**
Arquivo: `src/components/Login.tsx`

```typescript
// Linha ~20 - Fundo
className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500"

// Mudar para:
className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-500"
```

### **Mudar título:**
```typescript
// Linha ~30
<h1 className="text-4xl font-black text-white mb-2">
  NEXUS
</h1>

// Mudar para:
<h1 className="text-4xl font-black text-white mb-2">
  SUA EMPRESA
</h1>
```

---

## ✅ Pronto!

Agora seu sistema tem:
- 🔐 Login com senha
- 👤 Múltiplos usuários
- 🚪 Botão de logout
- 💾 Sessão salva
- 🎨 Tela bonita

**Recompile e teste:**
```bash
npm run build
```
