import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, Calculator } from 'lucide-react';
import { Produto, Cliente, Categoria } from '../types';

interface ItemVenda {
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

interface VendaFormProps {
  produtos: Produto[];
  clientes: Cliente[];
  categorias: Categoria[];
  onSubmit: (venda: {
    clienteId: string;
    itens: ItemVenda[];
    valorTotal: number;
    observacoes?: string;
  }) => void;
  onCancel: () => void;
}

export const VendaForm: React.FC<VendaFormProps> = ({ 
  produtos, 
  clientes, 
  categorias,
  onSubmit, 
  onCancel 
}) => {
  const [clienteId, setClienteId] = useState('');
  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

  const adicionarItem = () => {
    if (!produtoSelecionado) return;

    const produto = produtos.find(p => p.id === produtoSelecionado);
    if (!produto) return;

    // Verificar se já existe o produto no carrinho
    const itemExistente = itens.find(item => item.produtoId === produtoSelecionado);
    const quantidadeJaNoCarrinho = itemExistente ? itemExistente.quantidade : 0;
    const quantidadeTotalDesejada = quantidadeJaNoCarrinho + quantidadeSelecionada;

    // Validar se há estoque suficiente
    if (quantidadeTotalDesejada > produto.quantidade) {
      alert(`Estoque insuficiente! Disponível: ${produto.quantidade}, No carrinho: ${quantidadeJaNoCarrinho}, Tentando adicionar: ${quantidadeSelecionada}`);
      return;
    }
    
    if (itemExistente) {
      // Atualizar quantidade do item existente
      const novosItens = itens.map(item => 
        item.produtoId === produtoSelecionado
          ? {
              ...item,
              quantidade: quantidadeTotalDesejada,
              valorTotal: quantidadeTotalDesejada * produto.valor
            }
          : item
      );
      setItens(novosItens);
    } else {
      // Adicionar novo item
      const novoItem: ItemVenda = {
        produtoId: produtoSelecionado,
        quantidade: quantidadeSelecionada,
        valorUnitario: produto.valor,
        valorTotal: quantidadeSelecionada * produto.valor
      };
      setItens([...itens, novoItem]);
    }

    // Resetar seleção
    setProdutoSelecionado('');
    setQuantidadeSelecionada(1);
  };

  const removerItem = (produtoId: string) => {
    setItens(itens.filter(item => item.produtoId !== produtoId));
  };

  const atualizarQuantidade = (produtoId: string, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerItem(produtoId);
      return;
    }

    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;

    // Validar se há estoque suficiente
    if (novaQuantidade > produto.quantidade) {
      alert(`Estoque insuficiente! Disponível: ${produto.quantidade} unidades`);
      return;
    }

    const novosItens = itens.map(item => 
      item.produtoId === produtoId
        ? {
            ...item,
            quantidade: novaQuantidade,
            valorTotal: novaQuantidade * produto.valor
          }
        : item
    );
    setItens(novosItens);
  };

  const valorTotalVenda = itens.reduce((sum, item) => sum + item.valorTotal, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itens.length === 0) {
      alert('Adicione pelo menos um produto à venda');
      return;
    }

    onSubmit({
      clienteId,
      itens,
      valorTotal: valorTotalVenda,
      observacoes: observacoes || undefined
    });
  };

  const getProdutoInfo = (produtoId: string) => {
    const produto = produtos.find(p => p.id === produtoId);
    const categoria = produto ? categorias.find(c => c.id === produto.categoriaId) : null;
    return { produto, categoria };
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2" />
            Nova Venda
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção do Cliente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
            <select
              required
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} - {cliente.email}
                </option>
              ))}
            </select>
          </div>

          {/* Adicionar Produtos */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Adicionar Produtos</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
                <select
                  value={produtoSelecionado}
                  onChange={(e) => setProdutoSelecionado(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Selecione um produto</option>
                  {produtos
                    .filter(p => {
                      const itemNoCarrinho = itens.find(item => item.produtoId === p.id);
                      const quantidadeJaNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
                      return p.quantidade > quantidadeJaNoCarrinho;
                    })
                    .map((produto) => {
                      const categoria = categorias.find(c => c.id === produto.categoriaId);
                      const itemNoCarrinho = itens.find(item => item.produtoId === produto.id);
                      const quantidadeJaNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
                      const disponivel = produto.quantidade - quantidadeJaNoCarrinho;
                      
                      return (
                        <option key={produto.id} value={produto.id}>
                          {produto.nome} - R$ {produto.valor.toFixed(2)} (Disponível: {disponivel}) - {categoria?.nome}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                <input
                  type="number"
                  min="1"
                  max={(() => {
                    const produto = produtos.find(p => p.id === produtoSelecionado);
                    if (!produto) return 1;
                    const itemNoCarrinho = itens.find(item => item.produtoId === produtoSelecionado);
                    const quantidadeJaNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
                    return Math.max(1, produto.quantidade - quantidadeJaNoCarrinho);
                  })()}
                  value={quantidadeSelecionada}
                  onChange={(e) => setQuantidadeSelecionada(parseInt(e.target.value) || 1)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                {produtoSelecionado && (() => {
                  const produto = produtos.find(p => p.id === produtoSelecionado);
                  const itemNoCarrinho = itens.find(item => item.produtoId === produtoSelecionado);
                  const quantidadeJaNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
                  const disponivel = produto ? produto.quantidade - quantidadeJaNoCarrinho : 0;
                  
                  return (
                    <p className="text-xs text-gray-500 mt-1">
                      {quantidadeJaNoCarrinho > 0 
                        ? `${quantidadeJaNoCarrinho} já no carrinho • ${disponivel} disponível`
                        : `${produto?.quantidade || 0} disponível`
                      }
                    </p>
                  );
                })()}
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={adicionarItem}
                  disabled={!produtoSelecionado}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          {/* Carrinho de Compras */}
          <div className="bg-white border rounded-lg">
            <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
              <h4 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrinho ({itens.length} {itens.length === 1 ? 'item' : 'itens'})
              </h4>
            </div>
            
            {itens.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhum produto adicionado</p>
                <p className="text-sm">Selecione produtos acima para adicionar ao carrinho</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {itens.map((item) => {
                  const { produto, categoria } = getProdutoInfo(item.produtoId);
                  if (!produto) return null;

                  return (
                    <div key={item.produtoId} className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {categoria && (
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: categoria.cor }}
                            />
                          )}
                          <h5 className="font-medium text-gray-900">{produto.nome}</h5>
                        </div>
                        <p className="text-sm text-gray-500">
                          R$ {item.valorUnitario.toFixed(2)} cada • Estoque: {produto.quantidade}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => atualizarQuantidade(item.produtoId, item.quantidade - 1)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantidade}</span>
                          <button
                            type="button"
                            onClick={() => atualizarQuantidade(item.produtoId, item.quantidade + 1)}
                            disabled={item.quantidade >= produto.quantidade}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-right min-w-[80px]">
                          <p className="font-medium text-gray-900">R$ {item.valorTotal.toFixed(2)}</p>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => removerItem(item.produtoId)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                {/* Total */}
                <div className="p-4 bg-gray-50 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-gray-600" />
                      <span className="text-lg font-medium text-gray-900">Total da Venda:</span>
                    </div>
                    <span className="text-2xl font-bold text-primary-600">
                      R$ {valorTotalVenda.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observações (opcional)</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Observações sobre a venda..."
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={itens.length === 0}
              className="px-6 py-2 bg-primary-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Finalizar Venda - R$ {valorTotalVenda.toFixed(2)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};