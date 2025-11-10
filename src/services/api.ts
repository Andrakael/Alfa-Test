import apiClient from './apiClient';
import { Produto, Cliente, Transacao, Categoria } from '../types';

// ==================== AUTH ====================

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    username: string;
    email: string | null;
    role: string;
    created_at: string;
  };
}

export const authAPI = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    // Usar URLSearchParams para application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    
    console.log('🔑 Enviando credenciais:', { 
      username, 
      passwordLength: password.length,
      paramsString: params.toString()
    });
    
    const response = await apiClient.post('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    console.log('📨 Resposta recebida:', response.data);
    
    return response.data;
  },

  register: async (username: string, password: string, email?: string, role: string = 'usuario') => {
    const response = await apiClient.post('/register', {
      username,
      password,
      email,
      role,
    });
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get('/me');
    return response.data;
  },
};

// ==================== CATEGORIAS ====================

export const categoriasAPI = {
  getAll: async (): Promise<Categoria[]> => {
    const response = await apiClient.get('/categorias');
    return response.data.map((cat: any) => ({
      ...cat,
      createdAt: new Date(cat.created_at),
      categoriaId: cat.id.toString(),
    }));
  },

  create: async (categoria: Omit<Categoria, 'id' | 'createdAt'>): Promise<Categoria> => {
    const response = await apiClient.post('/categorias', {
      nome: categoria.nome,
      descricao: categoria.descricao,
      cor: categoria.cor,
    });
    return {
      ...response.data,
      id: response.data.id.toString(),
      createdAt: new Date(response.data.created_at),
    };
  },

  update: async (id: string, categoria: Partial<Categoria>): Promise<Categoria> => {
    const response = await apiClient.put(`/categorias/${id}`, {
      nome: categoria.nome,
      descricao: categoria.descricao,
      cor: categoria.cor,
    });
    return {
      ...response.data,
      id: response.data.id.toString(),
      createdAt: new Date(response.data.created_at),
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categorias/${id}`);
  },
};

// ==================== PRODUTOS ====================

export const produtosAPI = {
  getAll: async (): Promise<Produto[]> => {
    const response = await apiClient.get('/produtos');
    return response.data.map((prod: any) => ({
      ...prod,
      id: prod.id.toString(),
      categoriaId: prod.categoria_id?.toString(),
      createdAt: new Date(prod.created_at),
    }));
  },

  create: async (produto: Omit<Produto, 'id' | 'createdAt'>): Promise<Produto> => {
    const response = await apiClient.post('/produtos', {
      nome: produto.nome,
      valor: produto.valor,
      quantidade: produto.quantidade,
      descricao: produto.descricao,
      categoria_id: produto.categoriaId ? parseInt(produto.categoriaId) : null,
    });
    return {
      ...response.data,
      id: response.data.id.toString(),
      categoriaId: response.data.categoria_id?.toString(),
      createdAt: new Date(response.data.created_at),
    };
  },

  update: async (id: string, produto: Partial<Produto>): Promise<Produto> => {
    const response = await apiClient.put(`/produtos/${id}`, {
      nome: produto.nome,
      valor: produto.valor,
      quantidade: produto.quantidade,
      descricao: produto.descricao,
      categoria_id: produto.categoriaId ? parseInt(produto.categoriaId) : null,
    });
    return {
      ...response.data,
      id: response.data.id.toString(),
      categoriaId: response.data.categoria_id?.toString(),
      createdAt: new Date(response.data.created_at),
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/produtos/${id}`);
  },
};

// ==================== CLIENTES ====================

export const clientesAPI = {
  getAll: async (): Promise<Cliente[]> => {
    const response = await apiClient.get('/clientes');
    return response.data.map((cli: any) => ({
      ...cli,
      id: cli.id.toString(),
      createdAt: new Date(cli.created_at),
    }));
  },

  create: async (cliente: Omit<Cliente, 'id' | 'createdAt'>): Promise<Cliente> => {
    const response = await apiClient.post('/clientes', cliente);
    return {
      ...response.data,
      id: response.data.id.toString(),
      createdAt: new Date(response.data.created_at),
    };
  },

  update: async (id: string, cliente: Partial<Cliente>): Promise<Cliente> => {
    const response = await apiClient.put(`/clientes/${id}`, cliente);
    return {
      ...response.data,
      id: response.data.id.toString(),
      createdAt: new Date(response.data.created_at),
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/clientes/${id}`);
  },
};

// ==================== TRANSAÇÕES ====================

export const transacoesAPI = {
  getAll: async (): Promise<Transacao[]> => {
    const response = await apiClient.get('/transacoes');
    return response.data.map((trans: any) => ({
      ...trans,
      id: trans.id.toString(),
      produtoId: trans.produto_id.toString(),
      clienteId: trans.cliente_id?.toString(),
      valorUnitario: trans.valor_unitario,
      valorTotal: trans.valor_total,
      numeroPedido: trans.numero_pedido,
      createdAt: new Date(trans.created_at),
    }));
  },

  create: async (transacao: Omit<Transacao, 'id' | 'createdAt'>): Promise<Transacao> => {
    const response = await apiClient.post('/transacoes', {
      tipo: transacao.tipo,
      produto_id: parseInt(transacao.produtoId),
      cliente_id: transacao.clienteId ? parseInt(transacao.clienteId) : null,
      quantidade: transacao.quantidade,
      valor_unitario: transacao.valorUnitario,
      valor_total: transacao.valorTotal,
      numero_pedido: transacao.numeroPedido,
      observacoes: transacao.observacoes,
    });
    return {
      ...response.data,
      id: response.data.id.toString(),
      produtoId: response.data.produto_id.toString(),
      clienteId: response.data.cliente_id?.toString(),
      valorUnitario: response.data.valor_unitario,
      valorTotal: response.data.valor_total,
      numeroPedido: response.data.numero_pedido,
      createdAt: new Date(response.data.created_at),
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/transacoes/${id}`);
  },
};
