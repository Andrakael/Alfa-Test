import React from 'react';
import { ArrowLeft, Package, DollarSign, ShoppingCart, Calendar, TrendingUp } from 'lucide-react';
import { Cliente, Produto, Transacao } from '../types';

interface ClientePanelProps {
  cliente: Cliente;
  produtos: Produto[];
  transacoes: Transacao[];
  onBack: () => void;
}

export const ClientePanel: React.FC<ClientePanelProps> = ({ 
  cliente, 
  produtos, 
  transacoes, 
  onBack 
}) => {
  const transacoesCliente = transacoes.filter(t => 
    t.clienteId === cliente.id && t.tipo === 'saida'
  );

  const totalGasto = transacoesCliente.reduce((sum, t) => sum + t.valorTotal, 0);
  const totalItens = transacoesCliente.reduce((sum, t) => sum + t.quantidade, 0);
  const ultimaCompra = transacoesCliente.length > 0 
    ? new Date(Math.max(...transacoesCliente.map(t => new Date(t.createdAt).getTime())))
    : null;

  // Produtos mais comprados
  const produtosMaisComprados = transacoesCliente.reduce((acc, transacao) => {
    const produto = produtos.find(p => p.id === transacao.produtoId);
    if (produto) {
      const key = produto.id;
      if (!acc[key]) {
        acc[key] = {
          produto,
          quantidade: 0,
          valorTotal: 0,
          transacoes: 0
        };
      }
      acc[key].quantidade += transacao.quantidade;
      acc[key].valorTotal += transacao.valorTotal;
      acc[key].transacoes += 1;
    }
    return acc;
  }, {} as Record<string, { produto: Produto; quantidade: number; valorTotal: number; transacoes: number }>);

  const produtosOrdenados = Object.values(produtosMaisComprados)
    .sort((a, b) => b.valorTotal - a.valorTotal);

  // Compras por mês
  const comprasPorMes = transacoesCliente.reduce((acc, transacao) => {
    const mes = new Date(transacao.createdAt).toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long' 
    });
    if (!acc[mes]) {
      acc[mes] = { valor: 0, quantidade: 0 };
    }
    acc[mes].valor += transacao.valorTotal;
    acc[mes].quantidade += transacao.quantidade;
    return acc;
  }, {} as Record<string, { valor: number; quantidade: number }>);

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
          <h1 className="text-2xl font-bold text-gray-900">Painel do Cliente</h1>
          <p className="text-gray-600">{cliente.nome}</p>
        </div>
      </div>

      {/* Informações do Cliente */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Informações do Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nome</p>
            <p className="text-sm text-gray-900">{cliente.nome}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-sm text-gray-900">{cliente.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Contato</p>
            <p className="text-sm text-gray-900">{cliente.telefone || 'Não informado'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">CPF</p>
            <p className="text-sm text-gray-900">{cliente.endereco || 'Não informado'}</p>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Gasto</p>
              <p className="text-2xl font-bold text-gray-900">R$ {totalGasto.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Itens Comprados</p>
              <p className="text-2xl font-bold text-gray-900">{totalItens}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Compras</p>
              <p className="text-2xl font-bold text-gray-900">{transacoesCliente.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Última Compra</p>
              <p className="text-sm font-bold text-gray-900">
                {ultimaCompra ? ultimaCompra.toLocaleDateString('pt-BR') : 'Nunca'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Produtos Mais Comprados */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Produtos Mais Comprados
          </h3>
          <div className="space-y-4">
            {produtosOrdenados.slice(0, 5).map((item, index) => (
              <div key={item.produto.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">{item.produto.nome}</p>
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
            {produtosOrdenados.length === 0 && (
              <p className="text-gray-500 text-center py-4">Nenhuma compra registrada</p>
            )}
          </div>
        </div>

        {/* Histórico por Mês */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Compras por Mês</h3>
          <div className="space-y-3">
            {Object.entries(comprasPorMes)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .slice(0, 6)
              .map(([mes, dados]) => (
                <div key={mes} className="flex justify-between items-center">
                  <span className="text-sm text-gray-900 capitalize">{mes}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">R$ {dados.valor.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{dados.quantidade} itens</p>
                  </div>
                </div>
              ))}
            {Object.keys(comprasPorMes).length === 0 && (
              <p className="text-gray-500 text-center py-4">Nenhuma compra registrada</p>
            )}
          </div>
        </div>
      </div>

      {/* Histórico Detalhado */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Histórico de Compras</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Unitário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transacoesCliente
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((transacao) => {
                  const produto = produtos.find(p => p.id === transacao.produtoId);
                  return (
                    <tr key={transacao.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transacao.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {produto?.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transacao.quantidade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        R$ {transacao.valorUnitario.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ {transacao.valorTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {transacoesCliente.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma compra registrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Este cliente ainda não realizou nenhuma compra.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};