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
  const userRole = localStorage.getItem('nexus_role') || 'usuario';

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

      {/* Debug Info - Mostrar role atual */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-blue-900">🔍 Informações de Debug:</span>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-300">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Usuário:</span>
                <span className="ml-2 text-gray-900">{localStorage.getItem('nexus_user') || 'Não definido'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Role:</span>
                <span className="ml-2 text-gray-900 uppercase font-bold">{userRole}</span>
                {userRole === 'usuario' && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                    Acesso Limitado
                  </span>
                )}
                {userRole === 'gerente' && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    Acesso Gerencial
                  </span>
                )}
                {userRole === 'admin' && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    Acesso Total
                  </span>
                )}
              </div>
              <div>
                <span className="font-medium text-gray-700">Pode limpar dados:</span>
                <span className={`ml-2 font-bold ${userRole === 'admin' ? 'text-green-600' : 'text-red-600'}`}>
                  {userRole === 'admin' ? '✅ SIM' : '❌ NÃO'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Pode importar:</span>
                <span className={`ml-2 font-bold ${userRole === 'admin' ? 'text-green-600' : 'text-red-600'}`}>
                  {userRole === 'admin' ? '✅ SIM' : '❌ NÃO'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const info = {
                usuario: localStorage.getItem('nexus_user'),
                role: localStorage.getItem('nexus_role'),
                auth: localStorage.getItem('nexus_auth'),
                podeAcessarConfig: userRole === 'admin' || userRole === 'gerente',
                podeLimparDados: userRole === 'admin',
                podeImportar: userRole === 'admin'
              };
              alert(JSON.stringify(info, null, 2));
            }}
            className="text-xs text-blue-600 hover:text-blue-800 underline self-start"
          >
            📋 Copiar informações de debug
          </button>
        </div>
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
            className="flex items-center justify-center space-x-2 p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
          >
            <Download className="h-5 w-5" />
            <span>Exportar Dados</span>
          </button>
          
          {userRole === 'admin' ? (
            <label className="flex items-center justify-center space-x-2 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer font-medium">
              <Upload className="h-5 w-5" />
              <span>Importar Dados</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportarArquivo}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center justify-center space-x-2 p-4 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium">
              <Upload className="h-5 w-5" />
              <span>Importar Dados (Apenas Admin)</span>
            </div>
          )}
        </div>
      </div>

      {/* Limpeza de Dados - Apenas Admin */}
      {userRole === 'admin' ? (
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
            
            // Definir cores fixas baseadas no tipo
            const cores = {
              red: {
                border: 'border-red-300',
                borderHover: 'hover:border-red-400',
                icon: 'text-red-600',
                text: 'text-red-600',
                bg: 'bg-red-600',
                bgHover: 'hover:bg-red-700'
              },
              orange: {
                border: 'border-orange-300',
                borderHover: 'hover:border-orange-400',
                icon: 'text-orange-600',
                text: 'text-orange-600',
                bg: 'bg-orange-600',
                bgHover: 'hover:bg-orange-700'
              },
              yellow: {
                border: 'border-yellow-300',
                borderHover: 'hover:border-yellow-400',
                icon: 'text-yellow-600',
                text: 'text-yellow-600',
                bg: 'bg-yellow-600',
                bgHover: 'hover:bg-yellow-700'
              },
              purple: {
                border: 'border-purple-300',
                borderHover: 'hover:border-purple-400',
                icon: 'text-purple-600',
                text: 'text-purple-600',
                bg: 'bg-purple-600',
                bgHover: 'hover:bg-purple-700'
              },
              blue: {
                border: 'border-blue-300',
                borderHover: 'hover:border-blue-400',
                icon: 'text-blue-600',
                text: 'text-blue-600',
                bg: 'bg-blue-600',
                bgHover: 'hover:bg-blue-700'
              }
            };
            
            const estilo = cores[opcao.cor as keyof typeof cores];
            
            return (
              <div
                key={opcao.id}
                className={`border-2 ${estilo.border} ${estilo.borderHover} rounded-lg p-4 transition-colors flex flex-col`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${estilo.icon}`} />
                  <span className={`text-sm font-bold ${estilo.text}`}>
                    {opcao.count} registros
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{opcao.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{opcao.descricao}</p>
                <button
                  onClick={() => handleLimparDados(opcao.id as any)}
                  disabled={opcao.count === 0}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 ${estilo.bg} ${estilo.bgHover} text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium`}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Limpar</span>
                </button>
              </div>
            );
          })}
        </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-yellow-900 mb-2">
                🔒 Área Restrita - Apenas Administradores
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                A funcionalidade de limpeza de dados está disponível apenas para administradores do sistema.
              </p>
              <div className="bg-white rounded-lg p-4 border border-yellow-300">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Seu nível atual:</span> {userRole === 'gerente' ? 'Gerente' : 'Usuário'}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Nível necessário:</span> Administrador
                </p>
              </div>
              <p className="text-xs text-yellow-700 mt-3">
                Entre em contato com o administrador do sistema para solicitar acesso ou realizar operações de limpeza.
              </p>
            </div>
          </div>
        </div>
      )}

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