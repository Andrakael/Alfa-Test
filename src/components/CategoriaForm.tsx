import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Categoria } from '../types';

interface CategoriaFormProps {
  onSubmit: (categoria: Omit<Categoria, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  editingCategoria?: Categoria | null;
}

const coresPredefinidas = [
  { nome: 'Azul', valor: '#3B82F6' },
  { nome: 'Verde', valor: '#10B981' },
  { nome: 'Vermelho', valor: '#EF4444' },
  { nome: 'Amarelo', valor: '#F59E0B' },
  { nome: 'Roxo', valor: '#8B5CF6' },
  { nome: 'Rosa', valor: '#EC4899' },
  { nome: 'Laranja', valor: '#F97316' },
  { nome: 'Cinza', valor: '#6B7280' },
  { nome: 'Índigo', valor: '#6366F1' },
  { nome: 'Teal', valor: '#14B8A6' }
];

export const CategoriaForm: React.FC<CategoriaFormProps> = ({ 
  onSubmit, 
  onCancel, 
  editingCategoria 
}) => {
  const [formData, setFormData] = useState({
    nome: editingCategoria?.nome || '',
    descricao: editingCategoria?.descricao || '',
    cor: editingCategoria?.cor || coresPredefinidas[0].valor
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {editingCategoria ? 'Editar Categoria' : 'Nova Categoria'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Ex: Eletrônicos, Placas Solares..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cor</label>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {coresPredefinidas.map((cor) => (
                <button
                  key={cor.valor}
                  type="button"
                  onClick={() => setFormData({ ...formData, cor: cor.valor })}
                  className={`w-10 h-10 rounded-full border-2 ${
                    formData.cor === cor.valor ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: cor.valor }}
                  title={cor.nome}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="color"
                value={formData.cor}
                onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-500">Ou escolha uma cor personalizada</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição (opcional)</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Descrição da categoria..."
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
              {editingCategoria ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};