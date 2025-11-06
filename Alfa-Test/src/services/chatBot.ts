import { Produto, Cliente, Transacao } from '../types';

export class ChatBot {
  private produtos: Produto[];
  private clientes: Cliente[];
  private transacoes: Transacao[];

  constructor(produtos: Produto[], clientes: Cliente[], transacoes: Transacao[]) {
    this.produtos = produtos;
    this.clientes = clientes;
    this.transacoes = transacoes;
  }

  processMessage(message: string): string {
    const msg = message.toLowerCase().trim();

    // Pergunta sobre gastos de cliente
    if (msg.includes('quanto') && msg.includes('gastou')) {
      return this.getClienteGastos(msg);
    }

    // Pergunta sobre estoque
    if (msg.includes('estoque') || msg.includes('quantidade')) {
      return this.getEstoqueInfo(msg);
    }

    // Pergunta sobre produtos específicos
    if (msg.includes('placa solar') || msg.includes('placas solares')) {
      return this.getPlacasSolaresInfo();
    }

    // Pergunta sobre total de vendas
    if (msg.includes('total') && (msg.includes('vendas') || msg.includes('faturamento'))) {
      return this.getTotalVendas();
    }

    // Pergunta sobre clientes
    if (msg.includes('cliente') && msg.includes('quantos')) {
      return this.getTotalClientes();
    }

    // Resposta padrão
    return this.getDefaultResponse();
  }

  private getClienteGastos(message: string): string {
    // Extrair nome do cliente da mensagem
    const words = message.split(' ');
    let clienteNome = '';
    
    for (let i = 0; i < words.length; i++) {
      if (words[i].includes('cliente') && i + 1 < words.length) {
        clienteNome = words[i + 1];
        break;
      }
    }

    if (!clienteNome) {
      return 'Por favor, especifique o nome do cliente. Exemplo: "Quanto o cliente João gastou?"';
    }

    const cliente = this.clientes.find(c => 
      c.nome.toLowerCase().includes(clienteNome.toLowerCase())
    );

    if (!cliente) {
      return `Cliente "${clienteNome}" não encontrado no sistema.`;
    }

    const transacoesCliente = this.transacoes.filter(t => 
      t.clienteId === cliente.id && t.tipo === 'saida'
    );

    const totalGasto = transacoesCliente.reduce((sum, t) => sum + t.valorTotal, 0);

    return `O cliente ${cliente.nome} gastou um total de R$ ${totalGasto.toFixed(2)} em ${transacoesCliente.length} transações.`;
  }

  private getEstoqueInfo(message: string): string {
    const totalProdutos = this.produtos.length;
    const produtosEmEstoque = this.produtos.filter(p => p.quantidade > 0).length;
    const produtosSemEstoque = totalProdutos - produtosEmEstoque;

    return `Temos ${totalProdutos} produtos cadastrados. ${produtosEmEstoque} com estoque disponível e ${produtosSemEstoque} sem estoque.`;
  }

  private getPlacasSolaresInfo(): string {
    const placasSolares = this.produtos.filter(p => 
      p.nome.toLowerCase().includes('placa') && p.nome.toLowerCase().includes('solar')
    );

    if (placasSolares.length === 0) {
      return 'Não encontrei placas solares cadastradas no sistema.';
    }

    const totalQuantidade = placasSolares.reduce((sum, p) => sum + p.quantidade, 0);
    const valorMedio = placasSolares.reduce((sum, p) => sum + p.valor, 0) / placasSolares.length;

    return `Temos ${placasSolares.length} tipos de placas solares cadastradas, com ${totalQuantidade} unidades em estoque. Valor médio: R$ ${valorMedio.toFixed(2)}.`;
  }

  private getTotalVendas(): string {
    const vendas = this.transacoes.filter(t => t.tipo === 'saida');
    const totalVendas = vendas.reduce((sum, t) => sum + t.valorTotal, 0);

    return `Total de vendas: R$ ${totalVendas.toFixed(2)} em ${vendas.length} transações.`;
  }

  private getTotalClientes(): string {
    return `Temos ${this.clientes.length} clientes cadastrados no sistema.`;
  }

  private getDefaultResponse(): string {
    const responses = [
      'Posso ajudar com informações sobre estoque, clientes e vendas. Tente perguntar: "Quanto o cliente João gastou?" ou "Quantas placas solares temos?"',
      'Estou aqui para ajudar! Pergunte sobre gastos de clientes, estoque de produtos ou total de vendas.',
      'Você pode me perguntar sobre: gastos por cliente, quantidade em estoque, informações sobre produtos específicos ou totais de vendas.'
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}