import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { ProdutoForm } from './components/ProdutoForm';
import { ClienteForm } from './components/ClienteForm';
import { TransacaoForm } from './components/TransacaoForm';
import { ChatBot } from './components/ChatBot';
import { ClientePanel } from './components/ClientePanel';
import { ProdutoPanel } from './components/ProdutoPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Produto, Cliente, Transacao, Categoria, AnexoPDF } from './types';
import { ChatBot as ChatBotService } from './services/chatBot';
import { CategoriaForm } from './components/CategoriaForm';
import { VendaForm } from './components/VendaForm';
import { VendaDetalhes } from './components/VendaDetalhes';
import { Configuracoes } from './components/Configuracoes';
import { Home } from './components/Home';
import { GerenciarUsuarios } from './components/GerenciarUsuarios';
import { hasPermission } from './utils/permissions';
import { Plus, Edit, Trash2, TrendingUp, TrendingDown, DollarSign, Package, Users, Eye, Undo2, BarChart3, ShoppingCart, ChevronDown, ChevronRight, FileText, Search } from 'lucide-react';

function App() {
  console.log('App component loading...');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Verificar se já está autenticado
  useEffect(() => {
    const auth = localStorage.getItem('nexus_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_auth');
    localStorage.removeItem('nexus_user');
    setIsAuthenticated(false);
  };

  // Todos os hooks devem vir ANTES de qualquer return condicional
  const [produtos, setProdutos] = useLocalStorage<Produto[]>('produtos', [
    {
      id: 'prod-1',
      nome: 'Placa Solar 550W',
      valor: 450.00,
      quantidade: 20,
      categoriaId: '2',
      descricao: 'Placa solar monocristalina 550W',
      createdAt: new Date()
    },
    {
      id: 'prod-2',
      nome: 'Inversor 3000W',
      valor: 1200.00,
      quantidade: 5,
      categoriaId: '1',
      descricao: 'Inversor solar 3000W',
      createdAt: new Date()
    }
  ]);
  const [clientes, setClientes] = useLocalStorage<Cliente[]>('clientes', [
    {
      id: 'cli-1',
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123',
      createdAt: new Date()
    },
    {
      id: 'cli-2',
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 88888-8888',
      endereco: 'Av. Principal, 456',
      createdAt: new Date()
    }
  ]);
  const [transacoes, setTransacoes] = useLocalStorage<Transacao[]>('transacoes', []);
  const [categorias, setCategorias] = useLocalStorage<Categoria[]>('categorias', [
    {
      id: '1',
      nome: 'Eletrônicos',
      descricao: 'Produtos eletrônicos em geral',
      cor: '#3B82F6',
      createdAt: new Date()
    },
    {
      id: '2',
      nome: 'Placas Solares',
      descricao: 'Equipamentos de energia solar',
      cor: '#F59E0B',
      createdAt: new Date()
    },
    {
      id: '3',
      nome: 'Ferramentas',
      descricao: 'Ferramentas e equipamentos',
      cor: '#10B981',
      createdAt: new Date()
    }
  ]);
  
  const [showProdutoForm, setShowProdutoForm] = useState(false);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [showTransacaoForm, setShowTransacaoForm] = useState(false);
  const [showCategoriaForm, setShowCategoriaForm] = useState(false);
  const [showVendaForm, setShowVendaForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [selectedVendaId, setSelectedVendaId] = useState<string | null>(null);
  const [vendasExpandidas, setVendasExpandidas] = useState<Set<string>>(new Set());
  const [buscaProduto, setBuscaProduto] = useState('');
  const [buscaCliente, setBuscaCliente] = useState('');
  const [buscaCategoria, setBuscaCategoria] = useState('');
  const [buscaVenda, setBuscaVenda] = useState('');

  const chatBot = new ChatBotService(produtos, clientes, transacoes);

  const handleAddProduto = (produtoData: Omit<Produto, 'id' | 'createdAt'>) => {
    if (editingProduto) {
      // Editando produto existente
      const produtosAtualizados = produtos.map(p => 
        p.id === editingProduto.id 
          ? { ...editingProduto, ...produtoData }
          : p
      );
      setProdutos(produtosAtualizados);
      setEditingProduto(null);
    } else {
      // Adicionando novo produto
      const novoProduto: Produto = {
        ...produtoData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      setProdutos([...produtos, novoProduto]);
    }
    setShowProdutoForm(false);
  };

  const handleEditProduto = (produto: Produto) => {
    setEditingProduto(produto);
    setShowProdutoForm(true);
  };

  const handleDeleteProduto = (produtoId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== produtoId));
    }
  };

  const handleAddCliente = (clienteData: Omit<Cliente, 'id' | 'createdAt'>) => {
    if (editingCliente) {
      // Editando cliente existente
      const clientesAtualizados = clientes.map(c => 
        c.id === editingCliente.id 
          ? { ...editingCliente, ...clienteData }
          : c
      );
      setClientes(clientesAtualizados);
      setEditingCliente(null);
    } else {
      // Adicionando novo cliente
      const novoCliente: Cliente = {
        ...clienteData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      setClientes([...clientes, novoCliente]);
    }
    setShowClienteForm(false);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setShowClienteForm(true);
  };

  const handleDeleteCliente = (clienteId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(clientes.filter(c => c.id !== clienteId));
    }
  };

  const handleAddCategoria = (categoriaData: Omit<Categoria, 'id' | 'createdAt'>) => {
    if (editingCategoria) {
      // Editando categoria existente
      const categoriasAtualizadas = categorias.map(c => 
        c.id === editingCategoria.id 
          ? { ...editingCategoria, ...categoriaData }
          : c
      );
      setCategorias(categoriasAtualizadas);
      setEditingCategoria(null);
    } else {
      // Adicionando nova categoria
      const novaCategoria: Categoria = {
        ...categoriaData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      setCategorias([...categorias, novaCategoria]);
    }
    setShowCategoriaForm(false);
  };

  const handleEditCategoria = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setShowCategoriaForm(true);
  };

  const handleDeleteCategoria = (categoriaId: string) => {
    const produtosComCategoria = produtos.filter(p => p.categoriaId === categoriaId);
    if (produtosComCategoria.length > 0) {
      alert(`Não é possível excluir esta categoria pois existem ${produtosComCategoria.length} produtos vinculados a ela.`);
      return;
    }
    
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategorias(categorias.filter(c => c.id !== categoriaId));
    }
  };

  const handleAddTransacao = (transacaoData: Omit<Transacao, 'id' | 'createdAt'>) => {
    const novaTransacao: Transacao = {
      ...transacaoData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    // Atualizar estoque do produto
    const produtoIndex = produtos.findIndex(p => p.id === transacaoData.produtoId);
    if (produtoIndex !== -1) {
      const novosProdutos = [...produtos];
      if (transacaoData.tipo === 'entrada') {
        novosProdutos[produtoIndex].quantidade += transacaoData.quantidade;
      } else {
        novosProdutos[produtoIndex].quantidade -= transacaoData.quantidade;
      }
      setProdutos(novosProdutos);
    }

    setTransacoes([...transacoes, novaTransacao]);
    setShowTransacaoForm(false);
  };

  const handleUndoTransacao = (transacao: Transacao) => {
    if (window.confirm('Tem certeza que deseja desfazer esta transação?')) {
      // Reverter alteração no estoque
      const produtoIndex = produtos.findIndex(p => p.id === transacao.produtoId);
      if (produtoIndex !== -1) {
        const novosProdutos = [...produtos];
        if (transacao.tipo === 'entrada') {
          novosProdutos[produtoIndex].quantidade -= transacao.quantidade;
        } else {
          novosProdutos[produtoIndex].quantidade += transacao.quantidade;
        }
        setProdutos(novosProdutos);
      }

      // Remover transação
      setTransacoes(transacoes.filter(t => t.id !== transacao.id));
    }
  };

  const handleViewClientePanel = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setActiveTab('cliente-panel');
  };

  const handleVenda = (vendaData: {
    clienteId: string;
    numeroPedido?: string;
    itens: Array<{
      produtoId: string;
      quantidade: number;
      valorUnitario: number;
      valorTotal: number;
    }>;
    valorTotal: number;
    observacoes?: string;
    anexos?: AnexoPDF[];
  }) => {
    const novasTransacoes: Transacao[] = [];
    const novosProdutos = [...produtos];
    const vendaId = `venda-${Date.now()}`;
    const dataVenda = new Date();

    // Criar uma transação para cada item da venda
    vendaData.itens.forEach((item, index) => {
      const transacao: Transacao = {
        id: `${vendaId}-item-${index}`,
        tipo: 'saida',
        produtoId: item.produtoId,
        clienteId: vendaData.clienteId,
        numeroPedido: vendaData.numeroPedido,
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
        valorTotal: item.valorTotal,
        observacoes: vendaData.observacoes,
        anexos: vendaData.anexos,
        createdAt: dataVenda
      };
      novasTransacoes.push(transacao);

      // Atualizar estoque
      const produtoIndex = novosProdutos.findIndex(p => p.id === item.produtoId);
      if (produtoIndex !== -1) {
        novosProdutos[produtoIndex].quantidade -= item.quantidade;
      }
    });

    // Atualizar estados
    setProdutos(novosProdutos);
    setTransacoes([...transacoes, ...novasTransacoes]);
    setShowVendaForm(false);
    
    // Mostrar mensagem de sucesso
    alert(`Venda realizada com sucesso! Total: R$ ${vendaData.valorTotal.toFixed(2)}`);
  };

  const handleViewProdutoPanel = (produto: Produto) => {
    setSelectedProduto(produto);
    setActiveTab('produto-panel');
  };

  const handleViewVenda = (vendaId: string) => {
    setSelectedVendaId(vendaId);
    setActiveTab('venda-detalhes');
  };

  const toggleVendaExpansao = (vendaId: string) => {
    const novasVendasExpandidas = new Set(vendasExpandidas);
    if (novasVendasExpandidas.has(vendaId)) {
      novasVendasExpandidas.delete(vendaId);
    } else {
      novasVendasExpandidas.add(vendaId);
    }
    setVendasExpandidas(novasVendasExpandidas);
  };

  const handleChatMessage = (message: string): string => {
    return chatBot.processMessage(message);
  };

  const handleLimparDados = (tipo: 'todos' | 'produtos' | 'clientes' | 'transacoes' | 'categorias') => {
    switch (tipo) {
      case 'todos':
        setProdutos([]);
        setClientes([]);
        setTransacoes([]);
        setCategorias([]);
        alert('Todos os dados foram removidos com sucesso!');
        break;
      case 'produtos':
        setProdutos([]);
        alert('Todos os produtos foram removidos com sucesso!');
        break;
      case 'clientes':
        setClientes([]);
        alert('Todos os clientes foram removidos com sucesso!');
        break;
      case 'transacoes':
        setTransacoes([]);
        alert('Todas as transações foram removidas com sucesso!');
        break;
      case 'categorias':
        setCategorias([]);
        alert('Todas as categorias foram removidas com sucesso!');
        break;
    }
  };

  const handleExportarDados = () => {
    const dados = {
      produtos,
      clientes,
      transacoes,
      categorias,
      exportadoEm: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-gestao-estoque-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Dados exportados com sucesso!');
  };

  const handleImportarDados = (dados: any) => {
    try {
      if (dados.produtos) setProdutos(dados.produtos);
      if (dados.clientes) setClientes(dados.clientes);
      if (dados.transacoes) setTransacoes(dados.transacoes);
      if (dados.categorias) setCategorias(dados.categorias);
      
      alert('Dados importados com sucesso!');
    } catch (error) {
      alert('Erro ao importar dados. Verifique o formato do arquivo.');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderDashboard = () => {
    const totalProdutos = produtos.length;
    const totalClientes = clientes.length;
    const vendasTransacoes = transacoes.filter(t => t.tipo === 'saida');
    const totalVendas = vendasTransacoes.reduce((sum, t) => sum + t.valorTotal, 0);
    
    // Contar vendas únicas (agrupadas por vendaId)
    const vendasUnicas = vendasTransacoes.reduce((vendas, transacao) => {
      const vendaId = transacao.id.includes('venda-') 
        ? transacao.id.split('-item-')[0] 
        : `${transacao.clienteId || 'sem-cliente'}-${new Date(transacao.createdAt).toISOString().split('T')[0]}`;
      
      if (!vendas.includes(vendaId)) {
        vendas.push(vendaId);
      }
      return vendas;
    }, [] as string[]);
    
    const quantidadeVendas = vendasUnicas.length;
    const produtosSemEstoque = produtos.filter(p => p.quantidade === 0).length;

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Produtos</p>
                <p className="text-2xl font-bold text-gray-900">{totalProdutos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{totalClientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vendas</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalVendas.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{quantidadeVendas} vendas realizadas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sem Estoque</p>
                <p className="text-2xl font-bold text-gray-900">{produtosSemEstoque}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Produtos com Baixo Estoque</h3>
            <div className="space-y-3">
              {produtos
                .filter(p => p.quantidade <= 5)
                .slice(0, 5)
                .map(produto => (
                  <div key={produto.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-900">{produto.nome}</span>
                    <span className={`text-sm font-medium ${
                      produto.quantidade === 0 ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {produto.quantidade} unidades
                    </span>
                  </div>
                ))}
              {produtos.filter(p => p.quantidade <= 5).length === 0 && (
                <p className="text-sm text-gray-500">Todos os produtos têm estoque adequado</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Últimas Transações</h3>
            <div className="space-y-3">
              {transacoes
                .slice(-5)
                .reverse()
                .map(transacao => {
                  const produto = produtos.find(p => p.id === transacao.produtoId);
                  return (
                    <div key={transacao.id} className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-900">{produto?.nome}</span>
                        <div className="flex items-center space-x-2">
                          {transacao.tipo === 'entrada' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-xs text-gray-500">
                            {transacao.quantidade} unidades
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        R$ {transacao.valorTotal.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              {transacoes.length === 0 && (
                <p className="text-sm text-gray-500">Nenhuma transação registrada</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };  const 
renderProdutos = () => {
    const produtosFiltrados = produtos.filter(produto => {
      const busca = buscaProduto.toLowerCase();
      const categoria = categorias.find(c => c.id === produto.categoriaId);
      return (
        produto.nome.toLowerCase().includes(busca) ||
        produto.descricao?.toLowerCase().includes(busca) ||
        categoria?.nome.toLowerCase().includes(busca)
      );
    });

    // Calcular valor total do estoque
    const valorTotalEstoque = produtos.reduce((total, produto) => {
      return total + (produto.valor * produto.quantidade);
    }, 0);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          {hasPermission('canAddProduto') && (
            <button
              onClick={() => setShowProdutoForm(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Produto</span>
            </button>
          )}
        </div>

        {/* Card Valor Total do Estoque */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">Valor Total do Estoque</p>
                <p className="text-3xl font-bold">R$ {valorTotalEstoque.toFixed(2)}</p>
                <p className="text-sm opacity-80 mt-1">{produtos.length} produtos cadastrados</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Produtos em Estoque</p>
              <p className="text-2xl font-bold">{produtos.filter(p => p.quantidade > 0).length}</p>
            </div>
          </div>
        </div>

        {/* Campo de Busca */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome, descrição ou categoria..."
            value={buscaProduto}
            onChange={(e) => setBuscaProduto(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Unitário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {produtosFiltrados.map((produto) => {
              const valorTotalProduto = produto.valor * produto.quantidade;
              
              return (
                <tr key={produto.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                      {produto.descricao && (
                        <div className="text-sm text-gray-500">{produto.descricao}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      const categoria = categorias.find(c => c.id === produto.categoriaId);
                      return categoria ? (
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: categoria.cor }}
                          />
                          {categoria.nome}
                        </div>
                      ) : 'Sem categoria';
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {produto.valor.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      produto.quantidade === 0
                        ? 'bg-red-100 text-red-800'
                        : produto.quantidade <= 5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {produto.quantidade} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    R$ {valorTotalProduto.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewProdutoPanel(produto)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="Ver painel do produto"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                    {hasPermission('canEditProduto') && (
                      <button 
                        onClick={() => handleEditProduto(produto)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    {hasPermission('canDeleteProduto') && (
                      <button 
                        onClick={() => handleDeleteProduto(produto.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {produtosFiltrados.length === 0 && produtos.length > 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente buscar com outros termos.
            </p>
          </div>
        )}
        {produtos.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto cadastrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece cadastrando seu primeiro produto.
            </p>
          </div>
        )}
      </div>
    </div>
    );
  };

  const renderCategorias = () => {
    const categoriasFiltradas = categorias.filter(categoria => {
      const busca = buscaCategoria.toLowerCase();
      return (
        categoria.nome.toLowerCase().includes(busca) ||
        categoria.descricao?.toLowerCase().includes(busca)
      );
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
          {hasPermission('canAddCategoria') && (
            <button
              onClick={() => setShowCategoriaForm(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Nova Categoria</span>
            </button>
          )}
        </div>

        {/* Campo de Busca */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={buscaCategoria}
            onChange={(e) => setBuscaCategoria(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produtos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categoriasFiltradas.map((categoria) => {
              const produtosDaCategoria = produtos.filter(p => p.categoriaId === categoria.id);
              
              return (
                <tr key={categoria.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: categoria.cor }}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{categoria.nome}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: categoria.cor }}
                      />
                      <span className="ml-2 text-sm text-gray-500">{categoria.cor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {produtosDaCategoria.length} produtos
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {categoria.descricao || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {hasPermission('canEditCategoria') && (
                      <button 
                        onClick={() => handleEditCategoria(categoria)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    {hasPermission('canDeleteCategoria') && (
                      <button 
                        onClick={() => handleDeleteCategoria(categoria.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {categoriasFiltradas.length === 0 && categorias.length > 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma categoria encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente buscar com outros termos.
            </p>
          </div>
        )}
        {categorias.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma categoria cadastrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece criando sua primeira categoria de produtos.
            </p>
          </div>
        )}
      </div>
    </div>
    );
  };

  const renderClientes = () => {
    const clientesFiltrados = clientes.filter(cliente => {
      const busca = buscaCliente.toLowerCase();
      return (
        cliente.nome.toLowerCase().includes(busca) ||
        cliente.email?.toLowerCase().includes(busca) ||
        cliente.telefone?.toLowerCase().includes(busca) ||
        cliente.endereco?.toLowerCase().includes(busca)
      );
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          {hasPermission('canAddCliente') && (
            <button
              onClick={() => setShowClienteForm(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Cliente</span>
            </button>
          )}
        </div>

        {/* Campo de Busca */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome, email, telefone ou endereço..."
            value={buscaCliente}
            onChange={(e) => setBuscaCliente(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Gasto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientesFiltrados.map((cliente) => {
              const totalGasto = transacoes
                .filter(t => t.clienteId === cliente.id && t.tipo === 'saida')
                .reduce((sum, t) => sum + t.valorTotal, 0);

              return (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cliente.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.telefone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {totalGasto.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewClientePanel(cliente)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="Ver painel do cliente"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {hasPermission('canEditCliente') && (
                      <button 
                        onClick={() => handleEditCliente(cliente)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    {hasPermission('canDeleteCliente') && (
                      <button 
                        onClick={() => handleDeleteCliente(cliente.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {clientesFiltrados.length === 0 && clientes.length > 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum cliente encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente buscar com outros termos.
            </p>
          </div>
        )}
        {clientes.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum cliente cadastrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece cadastrando seu primeiro cliente.
            </p>
          </div>
        )}
      </div>
    </div>
    );
  };

  const renderVendas = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Sistema de Vendas</h1>
          <button
            onClick={() => setShowVendaForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 flex items-center space-x-2 text-lg font-medium"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Nova Venda</span>
          </button>
        </div>

        {/* Campo de Busca */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por número do pedido, cliente ou produto..."
            value={buscaVenda}
            onChange={(e) => setBuscaVenda(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-sm text-white">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8" />
            <div className="ml-4">
              <p className="text-green-100">Vendas Hoje</p>
              <p className="text-2xl font-bold">
                {transacoes.filter(t => 
                  t.tipo === 'saida' && 
                  new Date(t.createdAt).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-sm text-white">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8" />
            <div className="ml-4">
              <p className="text-blue-100">Faturamento Hoje</p>
              <p className="text-2xl font-bold">
                R$ {transacoes
                  .filter(t => 
                    t.tipo === 'saida' && 
                    new Date(t.createdAt).toDateString() === new Date().toDateString()
                  )
                  .reduce((sum, t) => sum + t.valorTotal, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-sm text-white">
          <div className="flex items-center">
            <Package className="h-8 w-8" />
            <div className="ml-4">
              <p className="text-purple-100">Produtos Disponíveis</p>
              <p className="text-2xl font-bold">
                {produtos.filter(p => p.quantidade > 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Últimas Vendas */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Últimas Vendas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produtos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transacoes
                .filter(t => {
                  if (t.tipo !== 'saida') return false;
                  if (!buscaVenda) return true;
                  
                  const busca = buscaVenda.toLowerCase();
                  const cliente = clientes.find(c => c.id === t.clienteId);
                  const produto = produtos.find(p => p.id === t.produtoId);
                  
                  return (
                    t.numeroPedido?.toLowerCase().includes(busca) ||
                    cliente?.nome.toLowerCase().includes(busca) ||
                    produto?.nome.toLowerCase().includes(busca)
                  );
                })
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 10)
                .reduce((vendas, transacao) => {
                  // Extrair vendaId do ID da transação (formato: venda-timestamp-item-index)
                  const vendaId = transacao.id.includes('venda-') 
                    ? transacao.id.split('-item-')[0] 
                    : `${transacao.clienteId || 'sem-cliente'}-${new Date(transacao.createdAt).toISOString().split('T')[0]}`;
                  

                  
                  const vendaExistente = vendas.find(v => v.key === vendaId);
                  
                  if (vendaExistente) {
                    vendaExistente.produtos.push(transacao);
                    vendaExistente.valorTotal += transacao.valorTotal;
                  } else {
                    vendas.push({
                      key: vendaId,
                      clienteId: transacao.clienteId || '',
                      data: transacao.createdAt,
                      produtos: [transacao],
                      valorTotal: transacao.valorTotal
                    });
                  }
                  return vendas;
                }, [] as Array<{
                  key: string;
                  clienteId: string;
                  data: Date;
                  produtos: Transacao[];
                  valorTotal: number;
                }>)
                .map((venda) => {
                  const cliente = clientes.find(c => c.id === venda.clienteId);
                  
                  return (
                    <tr key={venda.key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(venda.data).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cliente?.nome || 'Cliente não encontrado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="space-y-1">
                          {/* Barra de resumo sempre visível */}
                          <button
                            onClick={() => toggleVendaExpansao(venda.key)}
                            className="w-full flex items-center justify-between p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              {vendasExpandidas.has(venda.key) ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                              <span className="font-medium text-gray-700">
                                {venda.produtos.length} produto{venda.produtos.length > 1 ? 's' : ''} • {venda.produtos.reduce((sum, t) => sum + t.quantidade, 0)} iten{venda.produtos.reduce((sum, t) => sum + t.quantidade, 0) > 1 ? 's' : ''}
                              </span>
                            </div>
                            <span className="text-primary-600 font-semibold">
                              R$ {venda.valorTotal.toFixed(2)}
                            </span>
                          </button>

                          {/* Lista detalhada (expansível) */}
                          {vendasExpandidas.has(venda.key) && (
                            <div className="mt-2 space-y-1 pl-6 border-l-2 border-gray-200">
                              {venda.produtos.map((transacao) => {
                                const produto = produtos.find(p => p.id === transacao.produtoId);
                                const categoria = categorias.find(c => c.id === produto?.categoriaId);
                                return (
                                  <div key={transacao.id} className="flex justify-between items-center text-xs bg-white border px-2 py-2 rounded">
                                    <div className="flex items-center space-x-2">
                                      {categoria && (
                                        <div
                                          className="w-2 h-2 rounded-full"
                                          style={{ backgroundColor: categoria.cor }}
                                        />
                                      )}
                                      <span className="font-medium text-gray-800">
                                        {produto?.nome}
                                      </span>
                                      <span className="text-blue-600 font-medium">
                                        x{transacao.quantidade}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-green-600 font-semibold">
                                        R$ {transacao.valorTotal.toFixed(2)}
                                      </div>
                                      <div className="text-gray-500 text-xs">
                                        R$ {transacao.valorUnitario.toFixed(2)} cada
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ {venda.valorTotal.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Concluída
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleViewVenda(venda.key)}
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                          title="Ver detalhes da venda"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Ver Detalhes</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {transacoes.filter(t => t.tipo === 'saida').length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma venda registrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Comece realizando sua primeira venda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };

  const renderTransacoes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
        {hasPermission('canAddTransacao') && (
          <button
            onClick={() => setShowTransacaoForm(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Transação</span>
          </button>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nº Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Anexos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transacoes
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((transacao) => {
                const produto = produtos.find(p => p.id === transacao.produtoId);
                const cliente = clientes.find(c => c.id === transacao.clienteId);

                return (
                  <tr key={transacao.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transacao.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transacao.tipo === 'entrada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {produto?.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cliente?.nome || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transacao.numeroPedido || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transacao.anexos && transacao.anexos.length > 0 ? (
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-blue-600 font-medium">{transacao.anexos.length}</span>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transacao.quantidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {transacao.valorTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {hasPermission('canUndoTransacao') ? (
                        <button 
                          onClick={() => handleUndoTransacao(transacao)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Desfazer transação"
                        >
                          <Undo2 className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {transacoes.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma transação registrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Registre entradas e saídas de produtos.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderChat = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Assistente Virtual</h1>
      <ChatBot onSendMessage={handleChatMessage} />
    </div>
  );

  const renderConfiguracoes = () => {
    const userRole = localStorage.getItem('nexus_role');
    // Apenas admin e gerente podem acessar configurações
    if (userRole !== 'admin' && userRole !== 'gerente') {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg border-2 border-red-200 p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Acesso Negado
              </h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p className="text-sm">
                Você não tem permissão para acessar as configurações do sistema.
              </p>
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-medium">Nível necessário:</span> Administrador ou Gerente
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Entre em contato com o administrador do sistema para solicitar acesso.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Configuracoes
        onLimparDados={handleLimparDados}
        onExportarDados={handleExportarDados}
        onImportarDados={handleImportarDados}
        estatisticas={{
          produtos: produtos.length,
          clientes: clientes.length,
          transacoes: transacoes.length,
          categorias: categorias.length
        }}
      />
    );
  };

  const renderHome = () => (
    <Home
      produtos={produtos}
      clientes={clientes}
      transacoes={transacoes}
      categorias={categorias}
      onChatMessage={handleChatMessage}
      onNavigate={setActiveTab}
    />
  );

  const renderClientePanel = () => {
    if (!selectedCliente) return null;
    
    return (
      <ClientePanel
        cliente={selectedCliente}
        produtos={produtos}
        transacoes={transacoes}
        onBack={() => {
          setSelectedCliente(null);
          setActiveTab('clientes');
        }}
      />
    );
  };

  const renderProdutoPanel = () => {
    if (!selectedProduto) return null;
    
    return (
      <ProdutoPanel
        produto={selectedProduto}
        clientes={clientes}
        transacoes={transacoes}
        categorias={categorias}
        onBack={() => {
          setSelectedProduto(null);
          setActiveTab('produtos');
        }}
      />
    );
  };

  const renderVendaDetalhes = () => {
    if (!selectedVendaId) return null;
    
    return (
      <VendaDetalhes
        vendaId={selectedVendaId}
        produtos={produtos}
        clientes={clientes}
        transacoes={transacoes}
        categorias={categorias}
        onBack={() => {
          setSelectedVendaId(null);
          setActiveTab('vendas');
        }}
      />
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();
      case 'produtos':
        return renderProdutos();
      case 'categorias':
        return renderCategorias();
      case 'clientes':
        return renderClientes();
      case 'vendas':
        return renderVendas();
      case 'transacoes':
        return renderTransacoes();
      case 'configuracoes':
        return renderConfiguracoes();
      case 'gerenciar-usuarios':
        // Só admin pode acessar
        const userRole = localStorage.getItem('nexus_role');
        if (userRole === 'admin') {
          return <GerenciarUsuarios />;
        } else {
          return renderHome();
        }
      case 'cliente-panel':
        return renderClientePanel();
      case 'produto-panel':
        return renderProdutoPanel();
      case 'venda-detalhes':
        return renderVendaDetalhes();
      default:
        return renderHome();
    }
  };

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Layout activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout}>
        {renderContent()}
      </Layout>

      {showProdutoForm && (
        <ProdutoForm
          onSubmit={handleAddProduto}
          onCancel={() => {
            setShowProdutoForm(false);
            setEditingProduto(null);
          }}
          editingProduto={editingProduto}
          categorias={categorias}
        />
      )}

      {showClienteForm && (
        <ClienteForm
          onSubmit={handleAddCliente}
          onCancel={() => {
            setShowClienteForm(false);
            setEditingCliente(null);
          }}
          editingCliente={editingCliente}
        />
      )}

      {showTransacaoForm && (
        <TransacaoForm
          produtos={produtos}
          clientes={clientes}
          onSubmit={handleAddTransacao}
          onCancel={() => setShowTransacaoForm(false)}
        />
      )}

      {showCategoriaForm && (
        <CategoriaForm
          onSubmit={handleAddCategoria}
          onCancel={() => {
            setShowCategoriaForm(false);
            setEditingCategoria(null);
          }}
          editingCategoria={editingCategoria}
        />
      )}

      {showVendaForm && (
        <VendaForm
          produtos={produtos}
          clientes={clientes}
          categorias={categorias}
          onSubmit={handleVenda}
          onCancel={() => setShowVendaForm(false)}
        />
      )}
    </div>
  );
}

export default App;