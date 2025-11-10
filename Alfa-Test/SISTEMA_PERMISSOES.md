# 🔐 Sistema de Permissões - NEXUS

## Níveis de Acesso Implementados

### 👑 ADMIN (Administrador)
**Acesso Total ao Sistema**

✅ **Produtos**
- Ver todos os produtos
- Cadastrar novos produtos
- Editar produtos existentes
- Deletar produtos

✅ **Clientes**
- Ver todos os clientes
- Cadastrar novos clientes
- Editar clientes existentes
- Deletar clientes

✅ **Categorias**
- Ver todas as categorias
- Criar novas categorias
- Editar categorias
- Deletar categorias

✅ **Vendas**
- Ver todas as vendas
- Realizar novas vendas
- Ver detalhes completos

✅ **Transações**
- Ver histórico completo
- Adicionar transações manuais
- Desfazer transações

✅ **Configurações**
- Acessar configurações
- Limpar dados do sistema
- Exportar dados (backup)
- Importar dados (restauração)

✅ **Usuários** (EXCLUSIVO)
- Gerenciar usuários
- Criar novos usuários
- Editar usuários
- Deletar usuários
- Alterar níveis de acesso

---

### 👔 GERENTE
**Acesso de Gestão Operacional**

✅ **Produtos**
- Ver todos os produtos
- Cadastrar novos produtos
- Editar produtos existentes
- Deletar produtos

✅ **Clientes**
- Ver todos os clientes
- Cadastrar novos clientes
- Editar clientes existentes
- Deletar clientes

✅ **Categorias**
- Ver todas as categorias
- Criar novas categorias
- Editar categorias
- Deletar categorias

✅ **Vendas**
- Ver todas as vendas
- Realizar novas vendas
- Ver detalhes completos

✅ **Transações**
- Ver histórico completo
- Adicionar transações manuais
- Desfazer transações

✅ **Configurações**
- Acessar configurações
- Exportar dados (backup)

❌ **Restrições**
- ❌ Não pode gerenciar usuários
- ❌ Não pode limpar dados do sistema
- ❌ Não pode importar dados

---

### 👤 USUÁRIO (Vendedor)
**Acesso Básico de Vendas**

✅ **Produtos**
- Ver todos os produtos
- Ver detalhes dos produtos

✅ **Clientes**
- Ver todos os clientes
- Ver detalhes dos clientes

✅ **Categorias**
- Ver todas as categorias

✅ **Vendas**
- Ver todas as vendas
- Realizar novas vendas
- Ver detalhes das vendas

✅ **Transações**
- Ver histórico de transações

❌ **Restrições**
- ❌ Não pode cadastrar/editar produtos
- ❌ Não pode deletar produtos
- ❌ Não pode cadastrar/editar clientes
- ❌ Não pode deletar clientes
- ❌ Não pode criar/editar categorias
- ❌ Não pode adicionar transações manuais
- ❌ Não pode desfazer transações
- ❌ Não pode acessar configurações
- ❌ Não pode gerenciar usuários

---

## 📋 Tabela Comparativa de Permissões

| Funcionalidade | Admin | Gerente | Usuário |
|----------------|-------|---------|---------|
| **Ver Produtos** | ✅ | ✅ | ✅ |
| **Cadastrar Produtos** | ✅ | ✅ | ❌ |
| **Editar Produtos** | ✅ | ✅ | ❌ |
| **Deletar Produtos** | ✅ | ✅ | ❌ |
| **Ver Clientes** | ✅ | ✅ | ✅ |
| **Cadastrar Clientes** | ✅ | ✅ | ❌ |
| **Editar Clientes** | ✅ | ✅ | ❌ |
| **Deletar Clientes** | ✅ | ✅ | ❌ |
| **Ver Categorias** | ✅ | ✅ | ✅ |
| **Gerenciar Categorias** | ✅ | ✅ | ❌ |
| **Realizar Vendas** | ✅ | ✅ | ✅ |
| **Ver Vendas** | ✅ | ✅ | ✅ |
| **Ver Transações** | ✅ | ✅ | ✅ |
| **Adicionar Transações** | ✅ | ✅ | ❌ |
| **Desfazer Transações** | ✅ | ✅ | ❌ |
| **Acessar Configurações** | ✅ | ✅ | ❌ |
| **Exportar Dados** | ✅ | ✅ | ❌ |
| **Importar Dados** | ✅ | ❌ | ❌ |
| **Limpar Dados** | ✅ | ❌ | ❌ |
| **Gerenciar Usuários** | ✅ | ❌ | ❌ |

---

## 🔧 Implementação Técnica

### Arquivo de Permissões
`src/utils/permissions.ts`

```typescript
export type UserRole = 'admin' | 'gerente' | 'usuario';

export const permissions = {
  // Produtos
  canViewProdutos: (role: UserRole) => true,
  canAddProduto: (role: UserRole) => role === 'admin' || role === 'gerente',
  canEditProduto: (role: UserRole) => role === 'admin' || role === 'gerente',
  canDeleteProduto: (role: UserRole) => role === 'admin' || role === 'gerente',
  
  // ... outras permissões
};
```

### Componente de Proteção
`src/components/ProtectedSection.tsx`

Usado para proteger seções específicas da interface:

```typescript
<ProtectedSection 
  permission="canAddProduto"
  requiredRole="administrador ou gerente"
>
  <button>Cadastrar Produto</button>
</ProtectedSection>
```

### Componente de Acesso Negado
`src/components/AccessDenied.tsx`

Exibido quando o usuário não tem permissão:
- Mostra mensagem clara de acesso negado
- Informa o nível de acesso atual
- Indica o nível necessário
- Sugere contato com administrador

---

## 🎯 Como Usar as Permissões

### 1. Verificar Permissão no Código

```typescript
import { hasPermission } from '../utils/permissions';

if (hasPermission('canAddProduto')) {
  // Mostrar botão de adicionar
}
```

### 2. Proteger Componentes

```typescript
<ProtectedSection permission="canManageUsers">
  <GerenciarUsuarios />
</ProtectedSection>
```

### 3. Proteger Botões e Ações

```typescript
{hasPermission('canDeleteProduto') && (
  <button onClick={handleDelete}>Deletar</button>
)}
```

---

## 👥 Usuários Padrão

### Admin
- **Usuário:** `admin`
- **Senha:** `Admin@2024!Nexus`
- **Acesso:** Total

### Gerente
- **Usuário:** `gerente`
- **Senha:** `Gerente@2024!Nexus`
- **Acesso:** Gestão Operacional

### Usuário
- **Usuário:** `usuario`
- **Senha:** `Usuario@2024!Nexus`
- **Acesso:** Vendas Básicas

---

## 🔒 Segurança

### Armazenamento
- Usuários armazenados em `localStorage`
- Role armazenado em `localStorage` como `nexus_role`
- Username armazenado em `localStorage` como `nexus_user`

### Validações
- Verificação de permissão em cada ação
- Proteção de rotas sensíveis
- Mensagens claras de acesso negado
- Não é possível deletar o último admin

### Recomendações
1. Faça backup regular dos usuários
2. Altere as senhas padrão
3. Crie usuários específicos para cada pessoa
4. Revise periodicamente os níveis de acesso
5. Use o nível mínimo necessário para cada usuário

---

## 📱 Interface do Usuário

### Indicadores Visuais
- Badge colorido mostrando o nível de acesso
- Ícone de usuário no header
- Aba "🔐 Admin" visível apenas para administradores
- Botões desabilitados quando sem permissão
- Mensagens de acesso negado quando necessário

### Feedback ao Usuário
- Mensagens claras sobre permissões
- Indicação do nível necessário
- Sugestão de contato com administrador
- Confirmações antes de ações críticas

---

## 🚀 Próximos Passos (Opcional)

### Melhorias Futuras
1. **Logs de Auditoria**
   - Registrar quem fez cada ação
   - Histórico de alterações
   - Rastreamento de acessos

2. **Permissões Granulares**
   - Permissões por categoria
   - Permissões por cliente
   - Limites de valor para vendas

3. **Autenticação Avançada**
   - Tokens JWT
   - Sessões com timeout
   - Autenticação de dois fatores

4. **Backend Real**
   - API REST para autenticação
   - Banco de dados para usuários
   - Criptografia de senhas

---

## ✅ Status da Implementação

- ✅ Sistema de permissões criado
- ✅ Três níveis de acesso definidos
- ✅ Componente de proteção implementado
- ✅ Componente de acesso negado criado
- ✅ Usuários padrão configurados
- ✅ Documentação completa
- ✅ **Proteções aplicadas em todos os componentes:**
  - ✅ Produtos: botões de adicionar, editar e deletar protegidos
  - ✅ Clientes: botões de adicionar, editar e deletar protegidos
  - ✅ Categorias: botões de adicionar, editar e deletar protegidos
  - ✅ Transações: botões de adicionar e desfazer protegidos
  - ✅ Configurações: acesso restrito a admin/gerente
  - ✅ Limpar dados: apenas admin
  - ✅ Importar dados: apenas admin
  - ✅ Gerenciar usuários: apenas admin

**Sistema de permissões 100% funcional e testado!** 🎉

## 🧪 Como Testar

1. **Faça login como usuário comum:**
   - Usuário: `usuario`
   - Senha: `usuario123`
   - ❌ Não verá botões de adicionar/editar/deletar
   - ❌ Não consegue acessar Configurações
   - ✅ Pode ver produtos, clientes e fazer vendas

2. **Faça login como gerente:**
   - Usuário: `gerente`
   - Senha: `gerente123`
   - ✅ Pode adicionar/editar/deletar produtos e clientes
   - ✅ Pode acessar Configurações
   - ✅ Pode exportar dados
   - ❌ Não pode limpar dados
   - ❌ Não pode importar dados
   - ❌ Não vê aba de gerenciar usuários

3. **Faça login como admin:**
   - Usuário: `admin`
   - Senha: `admin123`
   - ✅ Acesso total a tudo
   - ✅ Vê aba "🔐 Admin" no menu
   - ✅ Pode limpar e importar dados
