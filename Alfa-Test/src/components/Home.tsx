import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  Calendar,
  AlertCircle,
  Star,
  Activity
} from 'lucide-react';
import { ChatBot } from './ChatBot';
import { Produto, Cliente, Transacao, Categoria } from '../types';

interface HomeProps {
  produtos: Produto[];
  clientes: Cliente[];
  transacoes: Transacao[];
  categorias: Categoria[];
  onChatMessage: (message: string) => string;
  onNavigate: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  produtos, 
  clientes, 
  transacoes, 
  categorias,
  onChatMessage,
  onNavigate 
}) => {
  const totalProdutos = produtos.length;
  const totalClientes = clientes.length;
  const vendasTransacoes = transacoes.filter(t => t.tipo === 'saida');
  const totalVendas = vendasTransacoes.reduce((sum, t) => sum + t.valorTotal, 0);
  
  // Contar vendas únicas
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

  // Vendas de hoje
  const hoje = new Date().toDateString();
  const vendasHoje = vendasTransacoes.filter(t => 
    new Date(t.createdAt).toDateString() === hoje
  );
  const faturamentoHoje = vendasHoje.reduce((sum, t) => sum + t.valorTotal, 0);

  // Produtos mais vendidos
  const produtosMaisVendidos = vendasTransacoes.reduce((acc, transacao) => {
    const produto = produtos.find(p => p.id === transacao.produtoId);
    if (produto) {
      const key = produto.id;
      if (!acc[key]) {
        acc[key] = {
          produto,
          quantidade: 0,
          valorTotal: 0
        };
      }
      acc[key].quantidade += transacao.quantidade;
      acc[key].valorTotal += transacao.valorTotal;
    }
    return acc;
  }, {} as Record<string, { produto: Produto; quantidade: number; valorTotal: number }>);

  const topProdutos = Object.values(produtosMaisVendidos)
    .sort((a, b) => b.valorTotal - a.valorTotal)
    .slice(0, 5);

  // Clientes que mais compraram
  const clientesMaisCompraram = vendasTransacoes.reduce((acc, transacao) => {
    const cliente = clientes.find(c => c.id === transacao.clienteId);
    if (cliente) {
      const key = cliente.id;
      if (!acc[key]) {
        acc[key] = {
          cliente,
          valorTotal: 0,
          compras: 0
        };
      }
      acc[key].valorTotal += transacao.valorTotal;
      acc[key].compras += 1;
    }
    return acc;
  }, {} as Record<string, { cliente: Cliente; valorTotal: number; compras: number }>);

  const topClientes = Object.values(clientesMaisCompraram)
    .sort((a, b) => b.valorTotal - a.valorTotal)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header com Boas-vindas */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bem-vindo ao Sistema de Gestão! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Aqui está um resumo do seu negócio hoje, {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="hidden md:block">
            <Activity className="h-16 w-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate('produtos')}
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Produtos</p>
              <p className="text-2xl font-bold text-gray-900">{totalProdutos}</p>
              {produtosSemEstoque > 0 && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {produtosSemEstoque} sem estoque
                </p>
              )}
            </div>
          </div>
        </div>

        <div 
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate('clientes')}
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{totalClientes}</p>
              <p className="text-xs text-green-600 mt-1">
                {topClientes.length} clientes ativos
              </p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate('vendas')}
        >
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Vendas</p>
              <p className="text-2xl font-bold text-gray-900">R$ {totalVendas.toFixed(2)}</p>
              <p className="text-xs text-gray-500">{quantidadeVendas} vendas realizadas</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoje</p>
              <p className="text-2xl font-bold text-gray-900">R$ {faturamentoHoje.toFixed(2)}</p>
              <p className="text-xs text-gray-500">{vendasHoje.length} vendas hoje</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Principal com 3 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna 1: Produtos Mais Vendidos */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Top Produtos
            </h3>
          </div>
          <div className="p-6">
            {topProdutos.length > 0 ? (
              <div className="space-y-4">
                {topProdutos.map((item, index) => {
                  const categoria = categorias.find(c => c.id === item.produto.categoriaId);
                  return (
                    <div key={item.produto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            {categoria && (
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: categoria.cor }}
                              />
                            )}
                            <p className="font-medium text-gray-900">{item.produto.nome}</p>
                          </div>
                          <p className="text-sm text-gray-500">{item.quantidade} vendidos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">R$ {item.valorTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhuma venda registrada ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna 2: Melhores Clientes */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              Melhores Clientes
            </h3>
          </div>
          <div className="p-6">
            {topClientes.length > 0 ? (
              <div className="space-y-4">
                {topClientes.map((item, index) => (
                  <div key={item.cliente.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.cliente.nome}</p>
                        <p className="text-sm text-gray-500">{item.compras} compras</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">R$ {item.valorTotal.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhum cliente com compras ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna 3: Últimas Atividades */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-500" />
              Atividades Recentes
            </h3>
          </div>
          <div className="p-6">
            {transacoes.length > 0 ? (
              <div className="space-y-3">
                {transacoes
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 8)
                  .map((transacao) => {
                    const produto = produtos.find(p => p.id === transacao.produtoId);
                    const cliente = clientes.find(c => c.id === transacao.clienteId);
                    
                    return (
                      <div key={transacao.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                        <div className={`p-2 rounded-full ${
                          transacao.tipo === 'entrada' 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          {transacao.tipo === 'entrada' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {produto?.nome}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transacao.tipo === 'entrada' ? 'Entrada' : 'Venda'} • {cliente?.nome || 'Sistema'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {transacao.quantidade}x
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(transacao.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhuma atividade ainda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Bot Integrado */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            🤖 Assistente Virtual
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Faça perguntas sobre seus dados, vendas, estoque e muito mais!
          </p>
        </div>
        <div className="p-6">
          <ChatBot onSendMessage={onChatMessage} />
        </div>
      </div>
    </div>
  );
};