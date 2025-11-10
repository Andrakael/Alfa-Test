# 🔐 Commit do Sistema de Permissões

## 📋 Arquivos Modificados/Criados

### Novos Arquivos:
- `src/components/AccessDenied.tsx` - Componente de acesso negado
- `src/components/ProtectedSection.tsx` - Componente de proteção de seções
- `src/utils/permissions.ts` - Sistema de permissões
- `SISTEMA_PERMISSOES.md` - Documentação completa
- `TESTE_PERMISSOES.md` - Guia de testes

### Arquivos Modificados:
- `src/App.tsx` - Proteções aplicadas em todos os componentes
- `src/components/Configuracoes.tsx` - Proteção de configurações e limpeza de dados
- `src/components/Layout.tsx` - Aba admin visível apenas para admins
- `src/components/GerenciarUsuarios.tsx` - Gerenciamento de usuários
- `src/components/Login.tsx` - Sistema de autenticação com roles

## 🚀 Comandos Git

### Opção 1: Commit Único (Recomendado)

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit com mensagem descritiva
git commit -m "feat: Implementar sistema completo de permissões com 3 níveis de acesso

- Adicionar sistema de permissões (admin, gerente, usuario)
- Proteger botões de adicionar/editar/deletar em produtos, clientes e categorias
- Proteger acesso a configurações (apenas admin e gerente)
- Proteger limpeza de dados (apenas admin)
- Proteger importação de dados (apenas admin)
- Adicionar componentes AccessDenied e ProtectedSection
- Adicionar painel de debug em configurações
- Adicionar documentação completa do sistema de permissões
- Adicionar guia de testes

BREAKING CHANGE: Usuários comuns não podem mais editar/deletar dados"

# Enviar para o repositório remoto
git push origin main
```

### Opção 2: Commits Separados (Mais Organizado)

```bash
# 1. Sistema de permissões base
git add src/utils/permissions.ts
git add src/components/AccessDenied.tsx
git add src/components/ProtectedSection.tsx
git commit -m "feat: Adicionar sistema base de permissões com 3 níveis"

# 2. Proteções no App principal
git add src/App.tsx
git commit -m "feat: Aplicar proteções de permissão em produtos, clientes, categorias e transações"

# 3. Proteções em Configurações
git add src/components/Configuracoes.tsx
git commit -m "feat: Proteger configurações e limpeza de dados (apenas admin)"

# 4. Atualização do Layout
git add src/components/Layout.tsx
git commit -m "feat: Adicionar aba admin visível apenas para administradores"

# 5. Sistema de login
git add src/components/Login.tsx
git commit -m "feat: Atualizar sistema de login com suporte a roles"

# 6. Gerenciamento de usuários
git add src/components/GerenciarUsuarios.tsx
git commit -m "feat: Adicionar painel de gerenciamento de usuários (apenas admin)"

# 7. Documentação
git add SISTEMA_PERMISSOES.md TESTE_PERMISSOES.md COMMIT_PERMISSOES.md
git commit -m "docs: Adicionar documentação completa do sistema de permissões"

# 8. Enviar tudo
git push origin main
```

### Opção 3: Verificar antes de commitar

```bash
# Ver status dos arquivos
git status

# Ver diferenças dos arquivos modificados
git diff

# Ver diferenças de um arquivo específico
git diff src/App.tsx

# Adicionar arquivos específicos
git add src/App.tsx
git add src/components/Configuracoes.tsx
# ... adicione os outros arquivos

# Fazer commit
git commit -m "feat: Sistema de permissões completo"

# Enviar
git push origin main
```

## 📝 Mensagem de Commit Detalhada (Opcional)

Se quiser uma mensagem mais detalhada:

```bash
git add .

git commit -m "feat: Implementar sistema completo de permissões

Implementação de sistema de controle de acesso com 3 níveis:

ADMIN (Administrador):
- Acesso total ao sistema
- Pode gerenciar usuários
- Pode limpar e importar dados
- Vê aba exclusiva de administração

GERENTE:
- Pode adicionar/editar/deletar produtos, clientes e categorias
- Pode acessar configurações
- Pode exportar dados
- Não pode limpar ou importar dados
- Não pode gerenciar usuários

USUARIO (Vendedor):
- Pode visualizar produtos e clientes
- Pode realizar vendas
- Pode ver histórico
- Não pode editar ou deletar dados
- Não pode acessar configurações

Componentes criados:
- AccessDenied: Tela de acesso negado
- ProtectedSection: Wrapper para proteger seções
- permissions.ts: Sistema de verificação de permissões

Proteções aplicadas em:
- Produtos: botões de adicionar, editar e deletar
- Clientes: botões de adicionar, editar e deletar
- Categorias: botões de adicionar, editar e deletar
- Transações: botões de adicionar e desfazer
- Configurações: acesso restrito e limpeza de dados
- Gerenciar Usuários: acesso exclusivo admin

Documentação:
- SISTEMA_PERMISSOES.md: Documentação completa
- TESTE_PERMISSOES.md: Guia de testes

BREAKING CHANGE: Usuários existentes precisam fazer logout e login
novamente para que as permissões sejam aplicadas corretamente."

git push origin main
```

## ⚠️ Antes de Fazer Push

### Verificar se está tudo funcionando:

1. **Teste como usuário:**
   ```
   Login: usuario / usuario123
   - Não deve ver botões de editar/deletar
   - Não deve acessar configurações
   ```

2. **Teste como gerente:**
   ```
   Login: gerente / gerente123
   - Deve ver botões de editar/deletar
   - Deve acessar configurações
   - Não deve ver botões de limpar dados
   ```

3. **Teste como admin:**
   ```
   Login: admin / admin123
   - Deve ter acesso total
   - Deve ver aba "🔐 Admin"
   - Deve poder limpar dados
   ```

### Verificar arquivos:

```bash
# Listar arquivos que serão commitados
git status

# Ver resumo das mudanças
git diff --stat
```

## 🎯 Comando Rápido (Copie e Cole)

Se quiser fazer tudo de uma vez:

```bash
git add . && git commit -m "feat: Sistema completo de permissões (admin/gerente/usuario)" && git push origin main
```

## ✅ Após o Push

Verifique se foi enviado corretamente:

```bash
# Ver último commit
git log -1

# Ver commits recentes
git log --oneline -5
```

## 🔄 Se Precisar Desfazer

Se algo der errado:

```bash
# Desfazer último commit (mantém as alterações)
git reset --soft HEAD~1

# Desfazer último commit (descarta as alterações)
git reset --hard HEAD~1

# Desfazer push (CUIDADO!)
git push origin main --force
```

---

**Pronto para commitar? Execute um dos comandos acima!** 🚀
