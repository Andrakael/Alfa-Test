import React, { useState } from 'react';
import { Trash2, AlertTriangle, Database, Download, Upload } from 'lucide-react';

interface ConfiguracoesProps {
  onLimparDados: (tipo: 'todos' | 'produtos' | 'clientes' | 'transacoes' | 'categorias') => void;
  onExportarDados: () => void;
  onImportarDados: (dados: any) => void;
  estatisticas: {
    produtos: number;
    clientes: number;
    transacoes: number;
    categorias: number;
  };
}

export const Configuracoes: React.FC<ConfiguracoesProps> = ({
  onLimparDados,
  onExportarDados,
  onImportarDados,
  estatisticas
}) => {
  const [showConfirmacao, setShowConfirmacao] = useState<string | null>(null);

  const handleLimparDados = (tipo: 'todos' | 'produtos' | 'clientes' | 'transacoes' | 'categorias') => {
    setShowConfirmacao(tipo);
  };

  const confirmarLimpeza = () => {
    if (showConfirmacao) {
      onLimparDados(showConfirmacao as any);
      setShowConfirmacao(null);
    }
  };

  const handleImportarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const dados = JSON.parse(e.target?.result as string);
          onImportarDados(dados);
        } catch (error) {
          alert('Erro ao importar arquivo. Verifique se é um arquivo JSON válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const opcoes = [
    {
      id: 'todos',
      titulo: 'Limpar Todos os Dados',
      descricao: 'Remove todos os produtos, clientes, transações e categorias',
      cor: 'red',
      icone: Database,
      count: estatisticas.produtos + estatisticas.clientes + estatisticas.transacoes + estatisticas.categorias
    },
    {
      id: 'produtos',
      titulo: 'Limpar Produtos',
      descricao: 'Remove todos os produtos cadastrados',
      cor: 'orange',
      icone: Database,
      count: estatisticas.produtos
    },
    {
      id: 'clientes',
      titulo: 'Limpar Clientes',
      descricao: 'Remove todos os clientes cadastrados',
      cor: 'yellow',
      icone: Database,
      count: estatisticas.clientes
    },
    {
      id: 'transacoes',
      titulo: 'Limpar Transações',
      descricao: 'Remove todo o histórico de transações',
      cor: 'purple',
      icone: Database,
      count: estatisticas.transacoes
    },
    {
      id: 'categorias',
      titulo: 'Limpar Categorias',
      descricao: 'Remove todas as categorias (exceto padrão)',
      cor: 'blue',
      icone: Database,
      count: estatisticas.categorias
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h1>
      </div>

      {/* Estatísticas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Estatísticas do Sistema</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{estatisticas.produtos}</p>
            <p className="text-sm text-gray-600">Produtos</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{estatisticas.clientes}</p>
            <p className="text-sm text-gray-600">Clientes</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{estatisticas.transacoes}</p>
            <p className="text-sm text-gray-600">Transações</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{estatisticas.categorias}</p>
            <p className="text-sm text-gray-600">Categorias</p>
          </div>
        </div>
      </div>

      {/* Backup e Restauração */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Backup e Restauração</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onExportarDados}
            className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <Download className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">Exportar Dados</span>
          </button>
          
          <label className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
            <Upload className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Importar Dados</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportarArquivo}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Limpeza de Dados */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
          Zona de Perigo - Limpeza de Dados
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Atenção: Essas ações são irreversíveis. Faça backup antes de prosseguir.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opcoes.map((opcao) => {
            const Icon = opcao.icone;
            return (
              <div
                key={opcao.id}
                className={`border-2 border-${opcao.cor}-200 rounded-lg p-4 hover:border-${opcao.cor}-300 transition-colors`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 text-${opcao.cor}-600`} />
                  <span className={`text-sm font-bold text-${opcao.cor}-600`}>
                    {opcao.count} registros
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{opcao.titulo}</h3>
                <p className="text-sm text-gray-600 mb-3">{opcao.descricao}</p>
                <button
                  onClick={() => handleLimparDados(opcao.id as any)}
                  disabled={opcao.count === 0}
                  className={`w-full flex items-center justify-center space-x-2 px-3 py-2 bg-${opcao.cor}-600 text-white rounded-md hover:bg-${opcao.cor}-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors`}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Limpar</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmacao && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="text-lg font-medium text-gray-900 mt-2">
                Confirmar Exclusão
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Tem certeza que deseja limpar{' '}
                  <strong>
                    {showConfirmacao === 'todos' ? 'TODOS OS DADOS' : 
                     showConfirmacao === 'produtos' ? 'todos os produtos' :
                     showConfirmacao === 'clientes' ? 'todos os clientes' :
                     showConfirmacao === 'transacoes' ? 'todas as transações' :
                     'todas as categorias'}
                  </strong>?
                </p>
                <p className="text-sm text-red-600 mt-2 font-medium">
                  Esta ação não pode ser desfeita!
                </p>
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  onClick={() => setShowConfirmacao(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarLimpeza}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Confirmar Exclusão
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};