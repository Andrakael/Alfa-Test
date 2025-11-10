import Database from 'better-sqlite3';
import { Transacao, AnexoPDF } from '../../types';

export class TransacaoRepository {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  findAll(): Transacao[] {
    const rows = this.db.prepare('SELECT * FROM transacoes ORDER BY created_at DESC').all();
    return rows.map(row => this.mapToTransacao(row));
  }

  findById(id: string): Transacao | null {
    const row = this.db.prepare('SELECT * FROM transacoes WHERE id = ?').get(id);
    return row ? this.mapToTransacao(row) : null;
  }

  findByProduto(produtoId: string): Transacao[] {
    const rows = this.db.prepare('SELECT * FROM transacoes WHERE produto_id = ? ORDER BY created_at DESC').all(produtoId);
    return rows.map(row => this.mapToTransacao(row));
  }

  findByCliente(clienteId: string): Transacao[] {
    const rows = this.db.prepare('SELECT * FROM transacoes WHERE cliente_id = ? ORDER BY created_at DESC').all(clienteId);
    return rows.map(row => this.mapToTransacao(row));
  }

  findByTipo(tipo: 'entrada' | 'saida'): Transacao[] {
    const rows = this.db.prepare('SELECT * FROM transacoes WHERE tipo = ? ORDER BY created_at DESC').all(tipo);
    return rows.map(row => this.mapToTransacao(row));
  }

  create(transacao: Transacao): void {
    const transaction = this.db.transaction(() => {
      // Inserir transação
      this.db.prepare(
        'INSERT INTO transacoes (id, tipo, produto_id, cliente_id, numero_pedido, quantidade, valor_unitario, valor_total, observacoes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).run(
        transacao.id,
        transacao.tipo,
        transacao.produtoId,
        transacao.clienteId,
        transacao.numeroPedido,
        transacao.quantidade,
        transacao.valorUnitario,
        transacao.valorTotal,
        transacao.observacoes,
        transacao.createdAt.toISOString()
      );

      // Inserir anexos se existirem
      if (transacao.anexos && transacao.anexos.length > 0) {
        const insertAnexo = this.db.prepare(
          'INSERT INTO anexos (id, transacao_id, nome, tipo, arquivo, tamanho, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        transacao.anexos.forEach(anexo => {
          insertAnexo.run(
            anexo.id,
            transacao.id,
            anexo.nome,
            anexo.tipo,
            anexo.arquivo,
            anexo.tamanho,
            new Date().toISOString()
          );
        });
      }
    });

    transaction();
  }

  delete(id: string): void {
    // Os anexos serão deletados automaticamente por causa do ON DELETE CASCADE
    this.db.prepare('DELETE FROM transacoes WHERE id = ?').run(id);
  }

  private mapToTransacao(row: any): Transacao {
    // Buscar anexos da transação
    const anexosRows = this.db.prepare('SELECT * FROM anexos WHERE transacao_id = ?').all(row.id);
    const anexos: AnexoPDF[] = anexosRows.map((anexoRow: any) => ({
      id: anexoRow.id,
      nome: anexoRow.nome,
      tipo: anexoRow.tipo,
      arquivo: anexoRow.arquivo,
      tamanho: anexoRow.tamanho,
      dataUpload: new Date(anexoRow.created_at)
    }));

    return {
      id: row.id,
      tipo: row.tipo,
      produtoId: row.produto_id,
      clienteId: row.cliente_id,
      numeroPedido: row.numero_pedido,
      quantidade: row.quantidade,
      valorUnitario: row.valor_unitario,
      valorTotal: row.valor_total,
      observacoes: row.observacoes,
      anexos: anexos.length > 0 ? anexos : undefined,
      createdAt: new Date(row.created_at)
    };
  }
}
