import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Produto, Cliente, Transacao } from '../types';

interface TransacaoFormProps {
  produtos: Produto[];
  clientes: Cliente[];
  onSubmit: (transacao: Omit<Transacao, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const TransacaoForm: React.FC<TransacaoFormProps> = ({ 
  produtos, 
  clientes, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    tipo: 'entrada' as 'entrada' | 'saida',
    produtoId: '',
    clienteId: '',
    quantidade: '',
    observacoes: ''
  });

  const produtoSelecionado = produtos.find(p => p.id === formData.produtoId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!produtoSelecionado) return;

    const quantidade = parseInt(formData.quantidade);
    const valorUnitario = produtoSelecionado.valor;
    const valorTotal = quantidade * valorUnitario;

    onSubmit({
      tipo: formData.tipo,
      produtoId: formData.produtoId,
      clienteId: formData.tipo === 'saida' ? formData.clienteId : undefined,
      quantidade,
      valorUnitario,
      valorTotal,
      observacoes: formData.observacoes || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Nova Transação</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'entrada' | 'saida' })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Produto</label>
            <select
              required
              value={formData.produtoId}
              onChange={(e) => setFormData({ ...formData, produtoId: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - R$ {produto.valor.toFixed(2)} (Estoque: {produto.quantidade})
                </option>
              ))}
            </select>
          </div>

          {formData.tipo === 'saida' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Cliente</label>
              <select
                required
                value={formData.clienteId}
                onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input
              type="number"
              required
              min="1"
              max={formData.tipo === 'saida' ? produtoSelecionado?.quantidade : undefined}
              value={formData.quantidade}
              onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {produtoSelecionado && formData.quantidade && (
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">
                Valor unitário: R$ {produtoSelecionado.valor.toFixed(2)}
              </p>
              <p className="text-sm font-medium text-gray-900">
                Valor total: R$ {(produtoSelecionado.valor * parseInt(formData.quantidade || '0')).toFixed(2)}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Observações (opcional)</label>
            <textarea
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-700"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};