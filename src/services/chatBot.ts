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

    // Saudações
    if (this.isSaudacao(msg)) {
      return this.getSaudacao();
    }

    // Ajuda
    if (this.isAjuda(msg)) {
      return this.getAjuda();
    }

    // Análises e insights
    if (this.isAnalise(msg)) {
      return this.getAnaliseGeral();
    }

    // Produtos mais vendidos
    if (this.isProdutosMaisVendidos(msg)) {
      return this.getProdutosMaisVendidos();
    }

    // Melhores clientes
    if (this.isMelhoresClientes(msg)) {
      return this.getMelhoresClientes();
    }

    // Produtos com baixo estoque
    if (this.isBaixoEstoque(msg)) {
      return this.getProdutosBaixoEstoque();
    }

    // Produtos sem estoque
    if (this.isSemEstoque(msg)) {
      return this.getProdutosSemEstoque();
    }

    // Buscar produto específico
    if (this.isBuscarProduto(msg)) {
      return this.buscarProduto(msg);
    }

    // Buscar cliente específico
    if (this.isBuscarCliente(msg)) {
      return this.buscarCliente(msg);
    }

    // Pergunta sobre gastos de cliente
    if (this.isGastosCliente(msg)) {
      return this.getClienteGastos(msg);
    }

    // Pergunta sobre estoque
    if (this.isEstoque(msg)) {
      return this.getEstoqueInfo(msg);
    }

    // Pergunta sobre total de vendas
    if (this.isTotalVendas(msg)) {
      return this.getTotalVendas();
    }

    // Vendas de hoje
    if (this.isVendasHoje(msg)) {
      return this.getVendasHoje();
    }

    // Valor total do estoque
    if (this.isValorEstoque(msg)) {
      return this.getValorTotalEstoque();
    }

    // Pergunta sobre clientes
    if (this.isTotalClientes(msg)) {
      return this.getTotalClientes();
    }

    // Comparações
    if (this.isComparacao(msg)) {
      return this.getComparacao(msg);
    }

    // Resposta padrão com sugestões inteligentes
    return this.getDefaultResponse();
  }

  // Métodos de detecção de intenção
  private isSaudacao(msg: string): boolean {
    return /^(oi|olá|ola|hey|opa|e ai|eai|bom dia|boa tarde|boa noite)/.test(msg);
  }

  private isAjuda(msg: string): boolean {
    return msg.includes('ajuda') || msg.includes('help') || msg === '?' || msg.includes('o que você') || msg.includes('o que voce');
  }

  private isAnalise(msg: string): boolean {
    return (msg.includes('análise') || msg.includes('analise') || msg.includes('resumo') || msg.includes('overview') || msg.includes('dashboard'));
  }

  private isProdutosMaisVendidos(msg: string): boolean {
    return (msg.includes('mais vendido') || (msg.includes('top') && msg.includes('produto')) || msg.includes('best seller'));
  }

  private isMelhoresClientes(msg: string): boolean {
    return (msg.includes('melhor') || msg.includes('top')) && msg.includes('cliente');
  }

  private isBaixoEstoque(msg: string): boolean {
    return msg.includes('baixo estoque') || msg.includes('pouco estoque') || msg.includes('acabando');
  }

  private isSemEstoque(msg: string): boolean {
    return msg.includes('sem estoque') || msg.includes('zerado') || msg.includes('esgotado');
  }

  private isBuscarProduto(msg: string): boolean {
    return (msg.includes('buscar') || msg.includes('procurar') || msg.includes('encontrar') || msg.includes('info')) && msg.includes('produto');
  }

  private isBuscarCliente(msg: string): boolean {
    return (msg.includes('buscar') || msg.includes('procurar') || msg.includes('encontrar') || msg.includes('info')) && msg.includes('cliente');
  }

  private isGastosCliente(msg: string): boolean {
    return (msg.includes('quanto') || msg.includes('valor')) && (msg.includes('gastou') || msg.includes('comprou') || msg.includes('gasto'));
  }

  private isEstoque(msg: string): boolean {
    return msg.includes('estoque') || (msg.includes('quantidade') && !msg.includes('valor'));
  }

  private isTotalVendas(msg: string): boolean {
    return (msg.includes('total') || msg.includes('quanto')) && (msg.includes('vendas') || msg.includes('faturamento') || msg.includes('receita'));
  }

  private isVendasHoje(msg: string): boolean {
    return (msg.includes('hoje') || msg.includes('hj')) && (msg.includes('venda') || msg.includes('vendeu'));
  }

  private isValorEstoque(msg: string): boolean {
    return msg.includes('valor') && msg.includes('estoque');
  }

  private isTotalClientes(msg: string): boolean {
    return (msg.includes('quantos') || msg.includes('total')) && msg.includes('cliente');
  }

  private isComparacao(msg: string): boolean {
    return msg.includes('comparar') || msg.includes('diferença') || msg.includes('vs');
  }

  // Métodos de resposta
  private getSaudacao(): string {
    const hora = new Date().getHours();
    let saudacao = 'Olá';
    
    if (hora >= 6 && hora < 12) saudacao = 'Bom dia';
    else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
    else saudacao = 'Boa noite';

    return `${saudacao}! 👋 Sou seu assistente virtual. Posso ajudar com análises, relatórios e informações sobre produtos, clientes e vendas. Digite "ajuda" para ver o que posso fazer!`;
  }

  private getAjuda(): string {
    return `🤖 Comandos disponíveis:

📊 ANÁLISES:
• "análise geral" - Resumo completo do sistema
• "produtos mais vendidos" - Top produtos
• "melhores clientes" - Clientes que mais compraram

📦 ESTOQUE:
• "baixo estoque" - Produtos acabando
• "sem estoque" - Produtos zerados
• "valor do estoque" - Valor total em estoque
• "buscar produto [nome]" - Info de produto específico

👥 CLIENTES:
• "quanto [nome] gastou?" - Gastos de cliente
• "melhores clientes" - Top clientes
• "buscar cliente [nome]" - Info de cliente

💰 VENDAS:
• "total de vendas" - Faturamento total
• "vendas hoje" - Vendas do dia
• "comparar [produto1] vs [produto2]" - Comparação

Digite qualquer pergunta e tentarei ajudar! 😊`;
  }

  private getAnaliseGeral(): string {
    const totalProdutos = this.produtos.length;
    const produtosEmEstoque = this.produtos.filter(p => p.quantidade > 0).length;
    const totalClientes = this.clientes.length;
    const vendas = this.transacoes.filter(t => t.tipo === 'saida');
    const totalVendas = vendas.reduce((sum, t) => sum + t.valorTotal, 0);
    const valorEstoque = this.produtos.reduce((sum, p) => sum + (p.valor * p.quantidade), 0);
    const produtosBaixoEstoque = this.produtos.filter(p => p.quantidade > 0 && p.quantidade <= 5).length;

    const vendasHoje = vendas.filter(t => 
      new Date(t.createdAt).toDateString() === new Date().toDateString()
    );
    const faturamentoHoje = vendasHoje.reduce((sum, t) => sum + t.valorTotal, 0);

    return `📊 ANÁLISE GERAL DO SISTEMA

📦 ESTOQUE:
• ${totalProdutos} produtos cadastrados
• ${produtosEmEstoque} com estoque disponível
• ${produtosBaixoEstoque} com baixo estoque (≤5 unidades)
• Valor total: R$ ${valorEstoque.toFixed(2)}

👥 CLIENTES:
• ${totalClientes} clientes cadastrados
• Ticket médio: R$ ${totalClientes > 0 ? (totalVendas / vendas.length).toFixed(2) : '0.00'}

💰 VENDAS:
• Total: R$ ${totalVendas.toFixed(2)} (${vendas.length} transações)
• Hoje: R$ ${faturamentoHoje.toFixed(2)} (${vendasHoje.length} vendas)

${produtosBaixoEstoque > 0 ? `⚠️ Atenção: ${produtosBaixoEstoque} produtos com baixo estoque!` : '✅ Estoque em boas condições!'}`;
  }

  private getProdutosMaisVendidos(): string {
    const vendas = this.transacoes.filter(t => t.tipo === 'saida');
    
    const vendasPorProduto = vendas.reduce((acc, t) => {
      if (!acc[t.produtoId]) {
        acc[t.produtoId] = { quantidade: 0, valor: 0 };
      }
      acc[t.produtoId].quantidade += t.quantidade;
      acc[t.produtoId].valor += t.valorTotal;
      return acc;
    }, {} as Record<string, { quantidade: number; valor: number }>);

    const ranking = Object.entries(vendasPorProduto)
      .map(([produtoId, dados]) => {
        const produto = this.produtos.find(p => p.id === produtoId);
        return { produto, ...dados };
      })
      .filter(item => item.produto)
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5);

    if (ranking.length === 0) {
      return '📦 Ainda não há vendas registradas no sistema.';
    }

    let resposta = '🏆 TOP 5 PRODUTOS MAIS VENDIDOS:\n\n';
    ranking.forEach((item, index) => {
      resposta += `${index + 1}. ${item.produto!.nome}\n`;
      resposta += `   • ${item.quantidade} unidades vendidas\n`;
      resposta += `   • Faturamento: R$ ${item.valor.toFixed(2)}\n\n`;
    });

    return resposta;
  }

  private getMelhoresClientes(): string {
    const vendas = this.transacoes.filter(t => t.tipo === 'saida' && t.clienteId);
    
    const gastosPorCliente = vendas.reduce((acc, t) => {
      if (!acc[t.clienteId!]) {
        acc[t.clienteId!] = { total: 0, compras: 0 };
      }
      acc[t.clienteId!].total += t.valorTotal;
      acc[t.clienteId!].compras += 1;
      return acc;
    }, {} as Record<string, { total: number; compras: number }>);

    const ranking = Object.entries(gastosPorCliente)
      .map(([clienteId, dados]) => {
        const cliente = this.clientes.find(c => c.id === clienteId);
        return { cliente, ...dados };
      })
      .filter(item => item.cliente)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    if (ranking.length === 0) {
      return '👥 Ainda não há clientes com compras registradas.';
    }

    let resposta = '👑 TOP 5 MELHORES CLIENTES:\n\n';
    ranking.forEach((item, index) => {
      resposta += `${index + 1}. ${item.cliente!.nome}\n`;
      resposta += `   • Total gasto: R$ ${item.total.toFixed(2)}\n`;
      resposta += `   • ${item.compras} compras realizadas\n`;
      resposta += `   • Ticket médio: R$ ${(item.total / item.compras).toFixed(2)}\n\n`;
    });

    return resposta;
  }

  private getProdutosBaixoEstoque(): string {
    const baixoEstoque = this.produtos
      .filter(p => p.quantidade > 0 && p.quantidade <= 5)
      .sort((a, b) => a.quantidade - b.quantidade);

    if (baixoEstoque.length === 0) {
      return '✅ Nenhum produto com baixo estoque no momento!';
    }

    let resposta = `⚠️ ${baixoEstoque.length} PRODUTOS COM BAIXO ESTOQUE:\n\n`;
    baixoEstoque.forEach(p => {
      resposta += `• ${p.nome}: ${p.quantidade} unidades\n`;
    });
    resposta += '\n💡 Considere reabastecer esses produtos!';

    return resposta;
  }

  private getProdutosSemEstoque(): string {
    const semEstoque = this.produtos.filter(p => p.quantidade === 0);

    if (semEstoque.length === 0) {
      return '✅ Todos os produtos têm estoque disponível!';
    }

    let resposta = `🚫 ${semEstoque.length} PRODUTOS SEM ESTOQUE:\n\n`;
    semEstoque.forEach(p => {
      resposta += `• ${p.nome} - R$ ${p.valor.toFixed(2)}\n`;
    });
    resposta += '\n⚠️ Atenção: Esses produtos precisam ser reabastecidos!';

    return resposta;
  }

  private buscarProduto(msg: string): string {
    const palavras = msg.split(' ');
    const nomeBusca = palavras.slice(palavras.findIndex(p => p === 'produto') + 1).join(' ');

    if (!nomeBusca) {
      return '🔍 Por favor, especifique o nome do produto. Ex: "buscar produto placa solar"';
    }

    const produto = this.produtos.find(p => 
      p.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    if (!produto) {
      return `❌ Produto "${nomeBusca}" não encontrado.`;
    }

    const vendas = this.transacoes.filter(t => t.produtoId === produto.id && t.tipo === 'saida');
    const totalVendido = vendas.reduce((sum, t) => sum + t.quantidade, 0);
    const faturamento = vendas.reduce((sum, t) => sum + t.valorTotal, 0);
    const valorTotal = produto.valor * produto.quantidade;

    return `📦 ${produto.nome}

💰 FINANCEIRO:
• Valor unitário: R$ ${produto.valor.toFixed(2)}
• Valor total em estoque: R$ ${valorTotal.toFixed(2)}
• Faturamento total: R$ ${faturamento.toFixed(2)}

📊 ESTOQUE:
• Quantidade: ${produto.quantidade} unidades
• Status: ${produto.quantidade === 0 ? '🚫 SEM ESTOQUE' : produto.quantidade <= 5 ? '⚠️ BAIXO ESTOQUE' : '✅ OK'}

📈 VENDAS:
• Total vendido: ${totalVendido} unidades
• Número de vendas: ${vendas.length}

${produto.descricao ? `📝 ${produto.descricao}` : ''}`;
  }

  private buscarCliente(msg: string): string {
    const palavras = msg.split(' ');
    const nomeBusca = palavras.slice(palavras.findIndex(p => p === 'cliente') + 1).join(' ');

    if (!nomeBusca) {
      return '🔍 Por favor, especifique o nome do cliente. Ex: "buscar cliente João"';
    }

    const cliente = this.clientes.find(c => 
      c.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    if (!cliente) {
      return `❌ Cliente "${nomeBusca}" não encontrado.`;
    }

    const compras = this.transacoes.filter(t => t.clienteId === cliente.id && t.tipo === 'saida');
    const totalGasto = compras.reduce((sum, t) => sum + t.valorTotal, 0);
    const ticketMedio = compras.length > 0 ? totalGasto / compras.length : 0;

    return `👤 ${cliente.nome}

📧 ${cliente.email || 'Email não cadastrado'}
📱 ${cliente.telefone || 'Telefone não cadastrado'}
📍 ${cliente.endereco || 'Endereço não cadastrado'}

💰 HISTÓRICO DE COMPRAS:
• Total gasto: R$ ${totalGasto.toFixed(2)}
• Número de compras: ${compras.length}
• Ticket médio: R$ ${ticketMedio.toFixed(2)}

${compras.length === 0 ? '⚠️ Cliente ainda não realizou compras.' : ''}`;
  }

  private getVendasHoje(): string {
    const hoje = new Date().toDateString();
    const vendasHoje = this.transacoes.filter(t => 
      t.tipo === 'saida' && new Date(t.createdAt).toDateString() === hoje
    );

    const faturamento = vendasHoje.reduce((sum, t) => sum + t.valorTotal, 0);
    const itensVendidos = vendasHoje.reduce((sum, t) => sum + t.quantidade, 0);

    return `📅 VENDAS DE HOJE

💰 Faturamento: R$ ${faturamento.toFixed(2)}
🛒 ${vendasHoje.length} vendas realizadas
📦 ${itensVendidos} itens vendidos

${vendasHoje.length === 0 ? '⚠️ Nenhuma venda registrada hoje ainda.' : '✅ Continue assim!'}`;
  }

  private getValorTotalEstoque(): string {
    const valorTotal = this.produtos.reduce((sum, p) => sum + (p.valor * p.quantidade), 0);
    const produtosComEstoque = this.produtos.filter(p => p.quantidade > 0).length;

    return `💎 VALOR TOTAL DO ESTOQUE

💰 R$ ${valorTotal.toFixed(2)}

📦 ${produtosComEstoque} produtos com estoque
📊 ${this.produtos.length} produtos cadastrados

${valorTotal > 0 ? '✅ Seu estoque está valorizado!' : '⚠️ Estoque zerado.'}`;
  }

  private getComparacao(msg: string): string {
    // Extrair nomes dos produtos para comparar
    const match = msg.match(/comparar\s+(.+?)\s+(?:vs|com|e)\s+(.+)/i);
    
    if (!match) {
      return '🔍 Use o formato: "comparar [produto1] vs [produto2]"';
    }

    const [, nome1, nome2] = match;
    const produto1 = this.produtos.find(p => p.nome.toLowerCase().includes(nome1.toLowerCase()));
    const produto2 = this.produtos.find(p => p.nome.toLowerCase().includes(nome2.toLowerCase()));

    if (!produto1 || !produto2) {
      return '❌ Um ou ambos os produtos não foram encontrados.';
    }

    const vendas1 = this.transacoes.filter(t => t.produtoId === produto1.id && t.tipo === 'saida');
    const vendas2 = this.transacoes.filter(t => t.produtoId === produto2.id && t.tipo === 'saida');

    const totalVendido1 = vendas1.reduce((sum, t) => sum + t.quantidade, 0);
    const totalVendido2 = vendas2.reduce((sum, t) => sum + t.quantidade, 0);

    const faturamento1 = vendas1.reduce((sum, t) => sum + t.valorTotal, 0);
    const faturamento2 = vendas2.reduce((sum, t) => sum + t.valorTotal, 0);

    return `⚖️ COMPARAÇÃO DE PRODUTOS

${produto1.nome} vs ${produto2.nome}

💰 PREÇO:
• ${produto1.nome}: R$ ${produto1.valor.toFixed(2)}
• ${produto2.nome}: R$ ${produto2.valor.toFixed(2)}

📦 ESTOQUE:
• ${produto1.nome}: ${produto1.quantidade} unidades
• ${produto2.nome}: ${produto2.quantidade} unidades

📈 VENDAS:
• ${produto1.nome}: ${totalVendido1} unidades (R$ ${faturamento1.toFixed(2)})
• ${produto2.nome}: ${totalVendido2} unidades (R$ ${faturamento2.toFixed(2)})

🏆 Vencedor em vendas: ${faturamento1 > faturamento2 ? produto1.nome : produto2.nome}`;
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

  private getTotalVendas(): string {
    const vendas = this.transacoes.filter(t => t.tipo === 'saida');
    const totalVendas = vendas.reduce((sum, t) => sum + t.valorTotal, 0);

    return `Total de vendas: R$ ${totalVendas.toFixed(2)} em ${vendas.length} transações.`;
  }

  private getTotalClientes(): string {
    return `Temos ${this.clientes.length} clientes cadastrados no sistema.`;
  }

  private getDefaultResponse(): string {
    // Sugestões inteligentes baseadas no contexto
    const sugestoes: string[] = [];

    // Verificar produtos com baixo estoque
    const baixoEstoque = this.produtos.filter(p => p.quantidade > 0 && p.quantidade <= 5).length;
    if (baixoEstoque > 0) {
      sugestoes.push(`⚠️ Você tem ${baixoEstoque} produto(s) com baixo estoque. Digite "baixo estoque" para ver.`);
    }

    // Verificar produtos sem estoque
    const semEstoque = this.produtos.filter(p => p.quantidade === 0).length;
    if (semEstoque > 0) {
      sugestoes.push(`🚫 ${semEstoque} produto(s) sem estoque. Digite "sem estoque" para detalhes.`);
    }

    // Verificar vendas de hoje
    const vendasHoje = this.transacoes.filter(t => 
      t.tipo === 'saida' && new Date(t.createdAt).toDateString() === new Date().toDateString()
    ).length;
    if (vendasHoje > 0) {
      sugestoes.push(`📊 Você teve ${vendasHoje} venda(s) hoje! Digite "vendas hoje" para ver o resumo.`);
    }

    let resposta = '🤔 Não entendi sua pergunta. ';
    
    if (sugestoes.length > 0) {
      resposta += '\n\n💡 SUGESTÕES:\n' + sugestoes.join('\n');
    }

    resposta += '\n\n📝 Digite "ajuda" para ver todos os comandos disponíveis ou tente:\n';
    resposta += '• "análise geral"\n';
    resposta += '• "produtos mais vendidos"\n';
    resposta += '• "melhores clientes"\n';
    resposta += '• "buscar produto [nome]"';

    return resposta;
  }
}