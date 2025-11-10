
import React from 'react';
import { ArrowLeft, User, Calendar, Package, DollarSign, FileText, Tag, Download } from 'lucide-react';
import { Produto, Cliente, Transacao, Categoria } from '../types';

interface VendaDetalhesProps {
  vendaId: string;
  produtos: Produto[];
  clientes: Cliente[];
  transacoes: Transacao[];
  categorias: Categoria[];
  onBack: () => void;
}

export const VendaDetalhes: React.FC<VendaDetalhesProps> = ({ 
  vendaId,
  produtos, 
  clientes, 
  transacoes, 
  categorias,
  onBack 
}) => {
  // Buscar todas as transações desta venda
  const transacoesVenda = transacoes.filter(t => {
    if (t.tipo !== 'saida') return false;
    
    // Se o vendaId começa com 'venda-', buscar por esse prefixo
    if (vendaId.startsWith('venda-')) {
      return t.id.startsWith(vendaId);
    }
    
    // Caso contrário, usar a lógica antiga (cliente + data)
    const [clienteIdFromKey, dataFromKey] = vendaId.split('-');
    const transacaoData = new Date(t.createdAt).toISOString().split('T')[0];
    const transacaoClienteId = t.clienteId || 'sem-cliente';
    return transacaoClienteId === clienteIdFromKey && transacaoData === dataFromKey;
  });

  if (transacoesVenda.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Venda não encontrada</h1>
        </div>
      </div>
    );
  }

  const primeiraTransacao = transacoesVenda[0];
  const cliente = clientes.find(c => c.id === primeiraTransacao.clienteId);
  const valorTotal = transacoesVenda.reduce((sum, t) => sum + t.valorTotal, 0);
  const quantidadeTotal = transacoesVenda.reduce((sum, t) => sum + t.quantidade, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header com Botão Voltar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Detalhes da Venda</h1>
          <p className="text-sm text-gray-600">
            {new Date(primeiraTransacao.createdAt).toLocaleDateString('pt-BR')} às {new Date(primeiraTransacao.createdAt).toLocaleTimeString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Número do Pedido - Destaque Principal */}
      {primeiraTransacao.numeroPedido && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium opacity-90">Número do Pedido</p>
              <p className="text-4xl font-bold">{primeiraTransacao.numeroPedido}</p>
            </div>
          </div>
        </div>
      )}

      {/* Informações Principais - Grid Compacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card Cliente */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-500 uppercase">Cliente</p>
              <p className="text-sm font-bold text-gray-900 truncate">{cliente?.nome || 'N/A'}</p>
              {cliente?.email && (
                <p className="text-xs text-gray-500 truncate">{cliente.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Card Data */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Data da Venda</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(primeiraTransacao.createdAt).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(primeiraTransacao.createdAt).toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Card Itens */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Total de Itens</p>
              <p className="text-sm font-bold text-gray-900">{quantidadeTotal} unidades</p>
              <p className="text-xs text-gray-500">{transacoesVenda.length} produtos</p>
            </div>
          </div>
        </div>

        {/* Card Valor Total */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium opacity-90 uppercase">Valor Total</p>
              <p className="text-2xl font-bold">R$ {valorTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Observações */}
      {primeiraTransacao.observacoes && (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start space-x-2">
            <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Observações</p>
              <p className="text-sm text-gray-600 mt-1">{primeiraTransacao.observacoes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Anexos PDF */}
      {primeiraTransacao.anexos && primeiraTransacao.anexos.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Anexos PDF ({primeiraTransacao.anexos?.length || 0})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {primeiraTransacao.anexos?.map((anexo) => {
              const formatarTamanho = (bytes: number) => {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
              };

              const downloadAnexo = () => {
                const link = document.createElement('a');
                link.href = anexo.arquivo;
                link.download = anexo.nome;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              };

              const getTipoLabel = (tipo: string) => {
                switch (tipo) {
                  case 'orcamento_fornecedor': return 'Orçamento Fornecedor';
                  case 'documento_empresa': return 'Documento Empresa';
                  default: return 'Outros Documentos';
                }
              };

              const corCard = anexo.tipo === 'orcamento_fornecedor' ? 'purple' : 
                             anexo.tipo === 'documento_empresa' ? 'blue' : 'green';
              
              return (
                <div
                  key={anexo.id}
                  className={`border-2 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer group ${
                    corCard === 'purple' ? 'border-purple-300 bg-purple-50 hover:bg-purple-100' :
                    corCard === 'blue' ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' :
                    'border-green-300 bg-green-50 hover:bg-green-100'
                  }`}
                  onClick={downloadAnexo}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform ${
                      corCard === 'purple' ? 'bg-purple-500' :
                      corCard === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        corCard === 'purple' ? 'text-purple-900' :
                        corCard === 'blue' ? 'text-blue-900' : 'text-green-900'
                      }`}>
                        {anexo.nome}
                      </p>
                      <p className={`text-xs mt-1 font-medium ${
                        corCard === 'purple' ? 'text-purple-700' :
                        corCard === 'blue' ? 'text-blue-700' : 'text-green-700'
                      }`}>
                        {getTipoLabel(anexo.tipo)}
                      </p>
                      <p className={`text-xs mt-1 ${
                        corCard === 'purple' ? 'text-purple-600' :
                        corCard === 'blue' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {formatarTamanho(anexo.tamanho)}
                      </p>
                      <div className={`flex items-center space-x-1 text-xs mt-2 font-medium ${
                        corCard === 'purple' ? 'text-purple-600' :
                        corCard === 'blue' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        <Download className="h-3 w-3" />
                        <span>Clique para baixar</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Produtos Vendidos */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Produtos Vendidos
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Unitário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transacoesVenda.map((transacao) => {
                const produto = produtos.find(p => p.id === transacao.produtoId);
                const categoria = produto ? categorias.find(c => c.id === produto.categoriaId) : null;
                
                return (
                  <tr key={transacao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {produto?.nome || 'Produto não encontrado'}
                        </div>
                        {produto?.descricao && (
                          <div className="text-sm text-gray-500">{produto.descricao}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {categoria ? (
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: categoria.cor }}
                          />
                          <span className="text-sm text-gray-900">{categoria.nome}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Sem categoria</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {transacao.quantidade} un
                      </span>
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
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={4} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  Total da Venda:
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  R$ {valorTotal.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Resumo Estatístico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Produtos Únicos</p>
              <p className="text-2xl font-bold">{transacoesVenda.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Quantidade Total</p>
              <p className="text-2xl font-bold">{quantidadeTotal}</p>
            </div>
            <Tag className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Ticket Médio</p>
              <p className="text-2xl font-bold">
                R$ {transacoesVenda.length > 0 ? (valorTotal / transacoesVenda.length).toFixed(2) : '0.00'}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Informações do Cliente */}
      {cliente && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Informações do Cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Nome Completo</p>
              <p className="text-sm text-gray-900">{cliente?.nome || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm text-gray-900">{cliente?.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Telefone</p>
              <p className="text-sm text-gray-900">{cliente?.telefone || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Endereço</p>
              <p className="text-sm text-gray-900">{cliente?.endereco || '-'}</p>
            </div>
          </div>
          
          {/* Histórico de Compras do Cliente */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-md font-medium text-gray-900 mb-3">Histórico de Compras</h4>
            {(() => {
              const comprasCliente = transacoes.filter(t => 
                t.clienteId === cliente?.id && t.tipo === 'saida'
              );
              const totalGasto = comprasCliente.reduce((sum, t) => sum + t.valorTotal, 0);
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total de Compras</p>
                    <p className="text-lg font-bold text-gray-900">{comprasCliente.length}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Gasto</p>
                    <p className="text-lg font-bold text-gray-900">R$ {totalGasto.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Ticket Médio</p>
                    <p className="text-lg font-bold text-gray-900">
                      R$ {comprasCliente.length > 0 ? (totalGasto / comprasCliente.length).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};