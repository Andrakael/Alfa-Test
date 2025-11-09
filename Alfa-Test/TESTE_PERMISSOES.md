# 🧪 Como Testar as Permissões

## ⚠️ IMPORTANTE: Faça Logout e Login Novamente!

As permissões são carregadas no momento do login. Se você já estava logado quando as alterações foram feitas, precisa fazer logout e login novamente.

## 📋 Passo a Passo para Testar

### 1. Verificar Role Atual (Console do Navegador)

Abra o Console do Navegador (F12) e digite:

```javascript
console.log('Role atual:', localStorage.getItem('nexus_role'));
console.log('Usuário:', localStorage.getItem('nexus_user'));
```

### 2. Fazer Logout

1. Clique no botão **"Sair"** no canto superior direito
2. Você será redirecionado para a tela de login

### 3. Testar como USUÁRIO

1. **Login:**
   - Usuário: `usuario`
   - Senha: `usuario123`

2. **O que você DEVE ver:**
   - ✅ Home, Produtos, Categorias, Clientes, Vendas, Histórico
   - ✅ Pode fazer vendas
   - ✅ Pode ver painéis de produtos e clientes

3. **O que você NÃO DEVE ver:**
   - ❌ Botão "Novo Produto"
   - ❌ Botões de Editar (lápis) em produtos
   - ❌ Botões de Deletar (lixeira) em produtos
   - ❌ Botão "Novo Cliente"
   - ❌ Botões de Editar em clientes
   - ❌ Botões de Deletar em clientes
   - ❌ Botão "Nova Categoria"
   - ❌ Botões de Editar em categorias
   - ❌ Botões de Deletar em categorias
   - ❌ Botão "Nova Transação"
   - ❌ Botões de Desfazer transação
   - ❌ Aba "🔐 Admin" no menu lateral

4. **Ao acessar Configurações:**
   - ❌ Deve ver mensagem: "Acesso Negado"
   - ❌ Não consegue acessar a página

### 4. Testar como GERENTE

1. **Fazer Logout** (botão Sair)

2. **Login:**
   - Usuário: `gerente`
   - Senha: `gerente123`

3. **O que você DEVE ver:**
   - ✅ Todos os botões de adicionar/editar/deletar
   - ✅ Pode acessar Configurações
   - ✅ Pode exportar dados
   - ✅ Botão "Importar Dados" aparece DESABILITADO (cinza)

4. **O que você NÃO DEVE ver:**
   - ❌ Seção "Zona de Perigo - Limpeza de Dados"
   - ❌ Botões de limpar dados
   - ❌ Aba "🔐 Admin" no menu lateral

5. **Ao acessar Configurações:**
   - ✅ Vê estatísticas
   - ✅ Pode exportar dados
   - ❌ Botão "Importar Dados" está desabilitado
   - ❌ Vê mensagem: "🔒 Área Restrita - Apenas Administradores"

### 5. Testar como ADMIN

1. **Fazer Logout** (botão Sair)

2. **Login:**
   - Usuário: `admin`
   - Senha: `admin123`

3. **O que você DEVE ver:**
   - ✅ TUDO liberado
   - ✅ Aba "🔐 Admin" no menu lateral
   - ✅ Pode acessar Configurações
   - ✅ Pode exportar E importar dados
   - ✅ Vê seção "Zona de Perigo - Limpeza de Dados"
   - ✅ Pode limpar dados

## 🔍 Verificação Rápida

### Console do Navegador (F12)

Execute este código para verificar as permissões:

```javascript
// Verificar role atual
const role = localStorage.getItem('nexus_role');
console.log('Role:', role);

// Testar permissões
const permissions = {
  canAddProduto: role === 'admin' || role === 'gerente',
  canEditProduto: role === 'admin' || role === 'gerente',
  canDeleteProduto: role === 'admin' || role === 'gerente',
  canViewConfiguracoes: role === 'admin' || role === 'gerente',
  canLimparDados: role === 'admin',
  canManageUsers: role === 'admin'
};

console.table(permissions);
```

## ❌ Problemas Comuns

### "Ainda vejo os botões mesmo como usuário"

**Solução:** Você não fez logout e login novamente. As permissões são carregadas no login.

1. Clique em "Sair"
2. Faça login novamente com `usuario` / `usuario123`
3. Agora os botões devem estar ocultos

### "Não consigo acessar Configurações"

**Se você é usuário:** Isso está correto! Usuários não podem acessar configurações.

**Se você é gerente ou admin:** Faça logout e login novamente.

### "Os botões aparecem mas estão desabilitados"

**Isso está errado!** Os botões devem estar completamente ocultos (não aparecer na tela).

**Solução:**
1. Limpe o cache do navegador (Ctrl + Shift + Delete)
2. Recarregue a página (Ctrl + F5)
3. Faça logout e login novamente

## 🎯 Checklist Final

- [ ] Fiz logout
- [ ] Fiz login como `usuario` / `usuario123`
- [ ] Não vejo botões de adicionar/editar/deletar
- [ ] Não consigo acessar Configurações
- [ ] Fiz logout novamente
- [ ] Fiz login como `gerente` / `gerente123`
- [ ] Vejo botões de adicionar/editar/deletar
- [ ] Consigo acessar Configurações mas não limpar dados
- [ ] Fiz logout novamente
- [ ] Fiz login como `admin` / `admin123`
- [ ] Vejo tudo e posso fazer tudo

## ✅ Tudo Funcionando?

Se seguiu todos os passos e ainda tem problemas:

1. Abra o Console (F12)
2. Vá em "Application" > "Local Storage"
3. Verifique se existe:
   - `nexus_auth`: "true"
   - `nexus_user`: nome do usuário
   - `nexus_role`: "usuario", "gerente" ou "admin"

Se o `nexus_role` estiver errado ou vazio, delete todos os itens do localStorage e faça login novamente.
