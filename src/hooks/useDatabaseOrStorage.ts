import { useState, useEffect, useCallback } from 'react';
import { Produto, Cliente, Transacao, Categoria } from '../types';

// Detectar se está rodando no Electron ou navegador
const isElectron = () => {
  return typeof window !== 'undefined' && 
         typeof (window as any).electron !== 'undefined';
};

export const useDatabaseOrStorage = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar do localStorage (navegador)
  const loadFromLocalStorage = useCallback(() => {
    try {
      const produtosData = localStorage.getItem('produtos');
      const clientesData = localStorage.getItem('clientes');
      const transacoesData = localStorage.getItem('transacoes');
      const categoriasData = localStorage.getItem('categorias');

      if (produtosData) setProdutos(JSON.parse(produtosData));
      if (clientesData) setClientes(JSON.parse(clientesData));
      if (transacoesData) setTransacoes(JSON.parse(transacoesData));
      if (categoriasData) setCategorias(JSON.parse(categoriasData));
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
    }
  }, []);

  // Salvar no localStorage
  const saveToLocalStorage = useCallback((key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, []);

  // Carregar dados iniciais
  useEffect(() => {
    setLoading(true);
    if (isElectron()) {
      // TODO: Carregar do SQLite via IPC quando estiver no Electron
      console.log('Rodando no Electron - usando SQLite');
    } else {
      loadFromLocalStorage();
    }
    setLoading(false);
  }, [loadFromLocalStorage]);

  // Produtos
  const addProduto = useCallback((produto: Produto) => {
    const novosProdutos = [...produtos, produto];
    setProdutos(novosProdutos);
    saveToLocalStorage('produtos', novosProdutos);
  }, [produtos, saveToLocalStorage]);

  const updateProduto = useCallback((produto: Produto) => {
    const novosProdutos = produtos.map(p => p.id === produto.id ? produto : p);
    setProdutos(novosProdutos);
    saveToLocalStorage('produtos', novosProdutos);
  }, [produtos, saveToLocalStorage]);

  const deleteProduto = useCallback((id: string) => {
    const novosProdutos = produtos.filter(p => p.id !== id);
    setProdutos(novosProdutos);
    saveToLocalStorage('produtos', novosProdutos);
  }, [produtos, saveToLocalStorage]);

  // Clientes
  const addCliente = useCallback((cliente: Cliente) => {
    const novosClientes = [...clientes, cliente];
    setClientes(novosClientes);
    saveToLocalStorage('clientes', novosClientes);
  }, [clientes, saveToLocalStorage]);

  const updateCliente = useCallback((cliente: Cliente) => {
    const novosClientes = clientes.map(c => c.id === cliente.id ? cliente : c);
    setClientes(novosClientes);
    saveToLocalStorage('clientes', novosClientes);
  }, [clientes, saveToLocalStorage]);

  const deleteCliente = useCallback((id: string) => {
    const novosClientes = clientes.filter(c => c.id !== id);
    setClientes(novosClientes);
    saveToLocalStorage('clientes', novosClientes);
  }, [clientes, saveToLocalStorage]);

  // Categorias
  const addCategoria = useCallback((categoria: Categoria) => {
    const novasCategorias = [...categorias, categoria];
    setCategorias(novasCategorias);
    saveToLocalStorage('categorias', novasCategorias);
  }, [categorias, saveToLocalStorage]);

  const updateCategoria = useCallback((categoria: Categoria) => {
    const novasCategorias = categorias.map(c => c.id === categoria.id ? categoria : c);
    setCategorias(novasCategorias);
    saveToLocalStorage('categorias', novasCategorias);
  }, [categorias, saveToLocalStorage]);

  const deleteCategoria = useCallback((id: string) => {
    const novasCategorias = categorias.filter(c => c.id !== id);
    setCategorias(novasCategorias);
    saveToLocalStorage('categorias', novasCategorias);
  }, [categorias, saveToLocalStorage]);

  // Transações
  const addTransacao = useCallback((transacao: Transacao) => {
    const novasTransacoes = [...transacoes, transacao];
    setTransacoes(novasTransacoes);
    saveToLocalStorage('transacoes', novasTransacoes);
  }, [transacoes, saveToLocalStorage]);

  const deleteTransacao = useCallback((id: string) => {
    const novasTransacoes = transacoes.filter(t => t.id !== id);
    setTransacoes(novasTransacoes);
    saveToLocalStorage('transacoes', novasTransacoes);
  }, [transacoes, saveToLocalStorage]);

  // Limpar dados
  const limparDados = useCallback((tipo: 'todos' | 'produtos' | 'clientes' | 'transacoes' | 'categorias') => {
    switch (tipo) {
      case 'todos':
        setProdutos([]);
        setClientes([]);
        setTransacoes([]);
        setCategorias([]);
        saveToLocalStorage('produtos', []);
        saveToLocalStorage('clientes', []);
        saveToLocalStorage('transacoes', []);
        saveToLocalStorage('categorias', []);
        break;
      case 'produtos':
        setProdutos([]);
        saveToLocalStorage('produtos', []);
        break;
      case 'clientes':
        setClientes([]);
        saveToLocalStorage('clientes', []);
        break;
      case 'transacoes':
        setTransacoes([]);
        saveToLocalStorage('transacoes', []);
        break;
      case 'categorias':
        setCategorias([]);
        saveToLocalStorage('categorias', []);
        break;
    }
  }, [saveToLocalStorage]);

  // Exportar dados
  const exportarDados = useCallback(() => {
    return {
      produtos,
      clientes,
      transacoes,
      categorias,
      exportadoEm: new Date().toISOString()
    };
  }, [produtos, clientes, transacoes, categorias]);

  // Importar dados
  const importarDados = useCallback((data: any) => {
    if (data.produtos) {
      setProdutos(data.produtos);
      saveToLocalStorage('produtos', data.produtos);
    }
    if (data.clientes) {
      setClientes(data.clientes);
      saveToLocalStorage('clientes', data.clientes);
    }
    if (data.transacoes) {
      setTransacoes(data.transacoes);
      saveToLocalStorage('transacoes', data.transacoes);
    }
    if (data.categorias) {
      setCategorias(data.categorias);
      saveToLocalStorage('categorias', data.categorias);
    }
  }, [saveToLocalStorage]);

  return {
    produtos,
    clientes,
    transacoes,
    categorias,
    loading,
    addProduto,
    updateProduto,
    deleteProduto,
    addCliente,
    updateCliente,
    deleteCliente,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    addTransacao,
    deleteTransacao,
    limparDados,
    exportarDados,
    importarDados
  };
};
