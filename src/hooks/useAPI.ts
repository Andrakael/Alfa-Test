import { useState, useEffect } from 'react';
import { Produto, Cliente, Transacao, Categoria } from '../types';
import { produtosAPI, clientesAPI, transacoesAPI, categoriasAPI } from '../services/api';

export const useAPI = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar todos os dados
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [produtosData, clientesData, transacoesData, categoriasData] = await Promise.all([
        produtosAPI.getAll(),
        clientesAPI.getAll(),
        transacoesAPI.getAll(),
        categoriasAPI.getAll(),
      ]);

      setProdutos(produtosData);
      setClientes(clientesData);
      setTransacoes(transacoesData);
      setCategorias(categoriasData);
    } catch (err: any) {
      console.error('Erro ao carregar dados:', err);
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados ao montar
  useEffect(() => {
    const token = localStorage.getItem('nexus_token');
    if (token) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  // ==================== PRODUTOS ====================

  const addProduto = async (produto: Omit<Produto, 'id' | 'createdAt'>) => {
    try {
      const novoProduto = await produtosAPI.create(produto);
      setProdutos([...produtos, novoProduto]);
      return novoProduto;
    } catch (err: any) {
      console.error('Erro ao adicionar produto:', err);
      throw err;
    }
  };

  const updateProduto = async (id: string, produto: Partial<Produto>) => {
    try {
      const produtoAtualizado = await produtosAPI.update(id, produto);
      setProdutos(produtos.map(p => p.id === id ? produtoAtualizado : p));
      return produtoAtualizado;
    } catch (err: any) {
      console.error('Erro ao atualizar produto:', err);
      throw err;
    }
  };

  const deleteProduto = async (id: string) => {
    try {
      await produtosAPI.delete(id);
      setProdutos(produtos.filter(p => p.id !== id));
    } catch (err: any) {
      console.error('Erro ao deletar produto:', err);
      throw err;
    }
  };

  // ==================== CLIENTES ====================

  const addCliente = async (cliente: Omit<Cliente, 'id' | 'createdAt'>) => {
    try {
      const novoCliente = await clientesAPI.create(cliente);
      setClientes([...clientes, novoCliente]);
      return novoCliente;
    } catch (err: any) {
      console.error('Erro ao adicionar cliente:', err);
      throw err;
    }
  };

  const updateCliente = async (id: string, cliente: Partial<Cliente>) => {
    try {
      const clienteAtualizado = await clientesAPI.update(id, cliente);
      setClientes(clientes.map(c => c.id === id ? clienteAtualizado : c));
      return clienteAtualizado;
    } catch (err: any) {
      console.error('Erro ao atualizar cliente:', err);
      throw err;
    }
  };

  const deleteCliente = async (id: string) => {
    try {
      await clientesAPI.delete(id);
      setClientes(clientes.filter(c => c.id !== id));
    } catch (err: any) {
      console.error('Erro ao deletar cliente:', err);
      throw err;
    }
  };

  // ==================== CATEGORIAS ====================

  const addCategoria = async (categoria: Omit<Categoria, 'id' | 'createdAt'>) => {
    try {
      const novaCategoria = await categoriasAPI.create(categoria);
      setCategorias([...categorias, novaCategoria]);
      return novaCategoria;
    } catch (err: any) {
      console.error('Erro ao adicionar categoria:', err);
      throw err;
    }
  };

  const updateCategoria = async (id: string, categoria: Partial<Categoria>) => {
    try {
      const categoriaAtualizada = await categoriasAPI.update(id, categoria);
      setCategorias(categorias.map(c => c.id === id ? categoriaAtualizada : c));
      return categoriaAtualizada;
    } catch (err: any) {
      console.error('Erro ao atualizar categoria:', err);
      throw err;
    }
  };

  const deleteCategoria = async (id: string) => {
    try {
      await categoriasAPI.delete(id);
      setCategorias(categorias.filter(c => c.id !== id));
    } catch (err: any) {
      console.error('Erro ao deletar categoria:', err);
      throw err;
    }
  };

  // ==================== TRANSAÇÕES ====================

  const addTransacao = async (transacao: Omit<Transacao, 'id' | 'createdAt'>) => {
    try {
      const novaTransacao = await transacoesAPI.create(transacao);
      setTransacoes([...transacoes, novaTransacao]);
      
      // Atualizar estoque do produto localmente
      const produto = produtos.find(p => p.id === transacao.produtoId);
      if (produto) {
        const novaQuantidade = transacao.tipo === 'entrada' 
          ? produto.quantidade + transacao.quantidade
          : produto.quantidade - transacao.quantidade;
        
        setProdutos(produtos.map(p => 
          p.id === transacao.produtoId 
            ? { ...p, quantidade: novaQuantidade }
            : p
        ));
      }
      
      return novaTransacao;
    } catch (err: any) {
      console.error('Erro ao adicionar transação:', err);
      throw err;
    }
  };

  const deleteTransacao = async (id: string) => {
    try {
      const transacao = transacoes.find(t => t.id === id);
      await transacoesAPI.delete(id);
      setTransacoes(transacoes.filter(t => t.id !== id));
      
      // Reverter estoque do produto localmente
      if (transacao) {
        const produto = produtos.find(p => p.id === transacao.produtoId);
        if (produto) {
          const novaQuantidade = transacao.tipo === 'entrada'
            ? produto.quantidade - transacao.quantidade
            : produto.quantidade + transacao.quantidade;
          
          setProdutos(produtos.map(p =>
            p.id === transacao.produtoId
              ? { ...p, quantidade: novaQuantidade }
              : p
          ));
        }
      }
    } catch (err: any) {
      console.error('Erro ao deletar transação:', err);
      throw err;
    }
  };

  return {
    // Dados
    produtos,
    clientes,
    transacoes,
    categorias,
    loading,
    error,
    
    // Funções
    loadData,
    
    // Produtos
    addProduto,
    updateProduto,
    deleteProduto,
    
    // Clientes
    addCliente,
    updateCliente,
    deleteCliente,
    
    // Categorias
    addCategoria,
    updateCategoria,
    deleteCategoria,
    
    // Transações
    addTransacao,
    deleteTransacao,
  };
};
