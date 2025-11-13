import { useState, useEffect } from 'react';
import { produtosAPI, clientesAPI, transacoesAPI, categoriasAPI } from '../services/api';
import { Produto, Cliente, Transacao, Categoria } from '../types';

export function useAPI() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const token = localStorage.getItem('nexus_token');
    if (token) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    produtos,
    setProdutos,
    clientes,
    setClientes,
    transacoes,
    setTransacoes,
    categorias,
    setCategorias,
    loading,
    error,
    reloadData: loadData,
  };
}
