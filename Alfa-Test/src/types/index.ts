export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
  cor: string;
  createdAt: Date;
}

export interface Produto {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
  categoriaId: string;
  descricao?: string;
  createdAt: Date;
}

export interface Cliente {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  endereco?: string; // Agora representa CPF
  createdAt: Date;
}

export interface AnexoPDF {
  id: string;
  nome: string;
  tipo: 'orcamento_fornecedor' | 'documento_empresa' | 'outros';
  arquivo: string; // base64
  tamanho: number;
  dataUpload: Date;
}

export interface Transacao {
  id: string;
  tipo: 'entrada' | 'saida';
  produtoId: string;
  clienteId?: string;
  numeroPedido?: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacoes?: string;
  anexos?: AnexoPDF[];
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}