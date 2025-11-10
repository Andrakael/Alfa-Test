import React from 'react';
import { ArrowLeft, Package, TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react';
import { Produto, Cliente, Transacao, Categoria } from '../types';

interface ProdutoPanelProps {
  produto: Produto;
  clientes: Cliente[];
  transacoes: Transacao[];
  categorias: Categoria[];
  onBack: () => void;
}

export const ProdutoPanel: React.FC<ProdutoPanelProps> = ({ 
  produto, 
  clientes, 
  transacoes, 
  categorias,
  onBack 
}) => {
  const transacoesProduto = transacoes.filter(t => t.produtoId === produto.id);
  const entradasProduto = transacoesProduto.filter(t => t.tipo === 'entrada');
  const saidasProduto = transacoesProduto.filter(t => t.tipo === 'saida');

  const totalEntradas = entradasProduto.reduce((sum, t) => sum + t.quantidade, 0);
  const totalSaidas = saidasProduto.reduce((sum, t) => sum + t.quantidade, 0);
  const faturamentoTotal = saidasProduto.reduce((sum, t) => sum + t.valorTotal, 0);
  const clientesUnicos = new Set(saidasProduto.map(t => t.clienteId)).size;

  // Clientes que mais compraram este produto
  const clientesMaisCompraram = saidasProduto.reduce((acc, transacao) => {
    const clienteId = transacao.clienteId;
    if (clienteId) {
      if (!acc[clienteId]) {
        acc[clienteId] = {
          cliente: clientes.find(c => c.id === clienteId),
          quantidade: 0,
          valorTotal: 0,
          transacoes: 0
        };
      }
      acc[clienteId].quantidade += transacao.quantidade;
      acc[clienteId].valorTotal += transacao.valorTotal;
      acc[clienteId].transacoes += 1;
    }
    return acc;
  }, {} as Record<string, { cliente?: Cliente; quantidade: number; valorTotal: number; transacoes: number }>);

  const clientesOrdenados = Object.values(clientesMaisCompraram)
    .filter(item => item.cliente)
    .sort((a, b) => b.valorTotal - a.valorTotal);

  // Movimentação por mês
  const movimentacaoPorMes = transacoesProduto.reduce((acc, transacao) => {
    const mes = new Date(transacao.createdAt).toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long' 
    });
    if (!acc[mes]) {
      acc[mes] = { entradas: 0, saidas: 0, faturamento: 0 };
    }
    if (transacao.tipo === 'entrada') {
      acc[mes].entradas += transacao.quantidade;
    } else {
      acc[mes].saidas += transacao.quantidade;
      acc[mes].faturamento += transacao.valorTotal;
    }
    return acc;
  }, {} as Record<string, { entradas: number; saidas: number; faturamento: number }>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel do Produto</h1>
          <p className="text-gray-600">{produto.nome}</p>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Informações do Produto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nome</p>
            <p className="text-sm text-gray-900">{produto.nome}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Categoria</p>
            <div className="flex items-center">
              {(() => {
                const categoria = categorias.find(c => c.id === produto.categoriaId);
                return categoria ? (
                  <>
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: categoria.cor }}
                    />
                    <p className="text-sm text-gray-900">{categoria.nome}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Sem categoria</p>
                );
              })()}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Valor Unitário</p>
            <p className="text-sm text-gray-900">R$ {produto.valor.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Estoque Atual</p>
            <p className={`text-sm font-medium ${
              produto.quantidade === 0 ? 'text-red-600' : 
              produto.quantidade <= 5 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {produto.quantidade} unidades
            </p>
          </div>
          {produto.descricao && (
            <div className="md:col-span-2 lg:col-span-4">
              <p className="text-sm font-medium text-gray-500">Descrição</p>
              <p className="text-sm text-gray-900">{produto.descricao}</p>
            </div>
          )}
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Entradas</p>
              <p className="text-2xl font-bold text-gray-900">{totalEntradas}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Saídas</p>
              <p className="text-2xl font-bold text-gray-900">{totalSaidas}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Faturamento</p>
              <p className="text-2xl font-bold text-gray-900">R$ {faturamentoTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clientes Únicos</p>
              <p className="text-2xl font-bold text-gray-900">{clientesUnicos}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Principais Clientes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Principais Clientes
          </h3>
          <div className="space-y-4">
            {clientesOrdenados.slice(0, 5).map((item, index) => (
              <div key={item.cliente?.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">{item.cliente?.nome}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantidade} unidades • {item.transacoes} compras
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">R$ {item.valorTotal.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    Média: R$ {(item.valorTotal / item.transacoes).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            {clientesOrdenados.length === 0 && (
              <p className="text-gray-500 text-center py-4">Nenhuma venda registrada</p>
            )}
          </div>
        </div>

        {/* Movimentação por Mês */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Movimentação por Mês</h3>
          <div className="space-y-3">
            {Object.entries(movimentacaoPorMes)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .slice(0, 6)
              .map(([mes, dados]) => (
                <div key={mes} className="border-b pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900 capitalize">{mes}</span>
                    <span className="text-sm font-medium text-gray-900">R$ {dados.faturamento.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>↑ {dados.entradas} entradas</span>
                    <span>↓ {dados.saidas} saídas</span>
                  </div>
                </div>
              ))}
            {Object.keys(movimentacaoPorMes).length === 0 && (
              <p className="text-gray-500 text-center py-4">Nenhuma movimentação registrada</p>
            )}
          </div>
        </div>
      </div>

      {/* Histórico Detalhado */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Histórico de Movimentações</h3>
        </div>
        <div className="overflow-x-auto">
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
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transacoesProduto
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((transacao) => {
                  const cliente = clientes.find(c => c.id === transacao.clienteId);
                  return (
                    <tr key={transacao.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transacao.createdAt).toLocaleDateString('pt-BR')}
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
                        {cliente?.nome || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transacao.quantidade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ {transacao.valorTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {transacoesProduto.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma movimentação registrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Este produto ainda não teve movimentações.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};