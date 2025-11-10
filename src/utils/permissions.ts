// Sistema de permissões por nível de usuário

export type UserRole = 'admin' | 'gerente' | 'usuario';

export const permissions = {
  // Produtos
  canViewProdutos: (role: UserRole) => true, // Todos podem ver
  canAddProduto: (role: UserRole) => role === 'admin' || role === 'gerente',
  canEditProduto: (role: UserRole) => role === 'admin' || role === 'gerente',
  canDeleteProduto: (role: UserRole) => role === 'admin' || role === 'gerente',

  // Clientes
  canViewClientes: (role: UserRole) => true, // Todos podem ver
  canAddCliente: (role: UserRole) => role === 'admin' || role === 'gerente',
  canEditCliente: (role: UserRole) => role === 'admin' || role === 'gerente',
  canDeleteCliente: (role: UserRole) => role === 'admin' || role === 'gerente',

  // Categorias
  canViewCategorias: (role: UserRole) => true,
  canAddCategoria: (role: UserRole) => role === 'admin' || role === 'gerente',
  canEditCategoria: (role: UserRole) => role === 'admin' || role === 'gerente',
  canDeleteCategoria: (role: UserRole) => role === 'admin' || role === 'gerente',

  // Vendas
  canViewVendas: (role: UserRole) => true, // Todos podem ver
  canAddVenda: (role: UserRole) => true, // Todos podem fazer vendas
  canViewVendaDetalhes: (role: UserRole) => true,

  // Transações
  canViewTransacoes: (role: UserRole) => true,
  canAddTransacao: (role: UserRole) => role === 'admin' || role === 'gerente',
  canUndoTransacao: (role: UserRole) => role === 'admin' || role === 'gerente',

  // Configurações
  canViewConfiguracoes: (role: UserRole) => role === 'admin' || role === 'gerente',
  canLimparDados: (role: UserRole) => role === 'admin', // Só admin
  canExportarDados: (role: UserRole) => role === 'admin' || role === 'gerente',
  canImportarDados: (role: UserRole) => role === 'admin',

  // Usuários
  canManageUsers: (role: UserRole) => role === 'admin', // Só admin

  // Painéis
  canViewClientePanel: (role: UserRole) => true,
  canViewProdutoPanel: (role: UserRole) => true,
};

// Helper para verificar permissão
export const hasPermission = (permission: keyof typeof permissions, role?: string | null): boolean => {
  const userRole = (role || localStorage.getItem('nexus_role') || 'usuario') as UserRole;
  return permissions[permission](userRole);
};

// Helper para obter role do usuário logado
export const getCurrentUserRole = (): UserRole => {
  return (localStorage.getItem('nexus_role') || 'usuario') as UserRole;
};
