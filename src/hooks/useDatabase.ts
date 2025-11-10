import { useState, useEffect, useCallback } from 'react';
import DatabaseService from '../database/DatabaseService';
import { Produto, Cliente, Transacao, Categoria } from '../types';

export const useDatabase = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const db = DatabaseService.getInstance();

  // Carregar dados iniciais
  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setProdutos(db.produtos.findAll());
      setClientes(db.clientes.findAll());
      setTransacoes(db.transacoes.findAll());
      setCategorias(db.categorias.findAll());
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Produtos
  const addProduto = useCallback((produto: Produto) => {
    db.produtos.create(produto);
    setProdutos(db.produtos.findAll());
  }, [db]);

  const updateProduto = useCallback((produto: Produto) => {
    db.produtos.update(produto);
    setProdutos(db.produtos.findAll());
  }, [db]);

  const deleteProduto = useCallback((id: string) => {
    db.produtos.delete(id);
    setProdutos(db.produtos.findAll());
  }, [db]);

  // Clientes
  const addCliente = useCallback((cliente: Cliente) => {
    db.clientes.create(cliente);
    setClientes(db.clientes.findAll());
  }, [db]);

  const updateCliente = useCallback((cliente: Cliente) => {
    db.clientes.update(cliente);
    setClientes(db.clientes.findAll());
  }, [db]);

  const deleteCliente = useCallback((id: string) => {
    db.clientes.delete(id);
    setClientes(db.clientes.findAll());
  }, [db]);

  // Categorias
  const addCategoria = useCallback((categoria: Categoria) => {
    db.categorias.create(categoria);
    setCategorias(db.categorias.findAll());
  }, [db]);

  const updateCategoria = useCallback((categoria: Categoria) => {
    db.categorias.update(categoria);
    setCategorias(db.categorias.findAll());
  }, [db]);

  const deleteCategoria = useCallback((id: string) => {
    db.categorias.delete(id);
    setCategorias(db.categorias.findAll());
  }, [db]);

  // Transações
  const addTransacao = useCallback((transacao: Transacao) => {
    db.transacoes.create(transacao);
    setTransacoes(db.transacoes.findAll());
  }, [db]);

  const deleteTransacao = useCallback((id: string) => {
    db.transacoes.delete(id);
    setTransacoes(db.transacoes.findAll());
  }, [db]);

  // Limpar dados
  const limparDados = useCallback((tipo: 'todos' | 'produtos' | 'clientes' | 'transacoes' | 'categorias') => {
    switch (tipo) {
      case 'todos':
        transacoes.forEach(t => db.transacoes.delete(t.id));
        produtos.forEach(p => db.produtos.delete(p.id));
        clientes.forEach(c => db.clientes.delete(c.id));
        categorias.forEach(cat => db.categorias.delete(cat.id));
        break;
      case 'produtos':
        produtos.forEach(p => db.produtos.delete(p.id));
        break;
      case 'clientes':
        clientes.forEach(c => db.clientes.delete(c.id));
        break;
      case 'transacoes':
        transacoes.forEach(t => db.transacoes.delete(t.id));
        break;
      case 'categorias':
        categorias.forEach(cat => db.categorias.delete(cat.id));
        break;
    }
    loadData();
  }, [db, produtos, clientes, transacoes, categorias, loadData]);

  // Exportar dados
  const exportarDados = useCallback(() => {
    return db.exportToJSON();
  }, [db]);

  // Importar dados
  const importarDados = useCallback((data: any) => {
    db.importFromJSON(data);
    loadData();
  }, [db, loadData]);

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
    importarDados,
    reloadData: loadData
  };
};
