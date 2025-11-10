import Database from 'better-sqlite3';
import { Produto } from '../../types';

export class ProdutoRepository {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  findAll(): Produto[] {
    const rows = this.db.prepare('SELECT * FROM produtos ORDER BY nome').all();
    return rows.map(this.mapToProduto);
  }

  findById(id: string): Produto | null {
    const row = this.db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
    return row ? this.mapToProduto(row) : null;
  }

  findByCategoria(categoriaId: string): Produto[] {
    const rows = this.db.prepare('SELECT * FROM produtos WHERE categoria_id = ?').all(categoriaId);
    return rows.map(this.mapToProduto);
  }

  create(produto: Produto): void {
    this.db.prepare(
      'INSERT INTO produtos (id, nome, descricao, valor, quantidade, categoria_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(
      produto.id,
      produto.nome,
      produto.descricao,
      produto.valor,
      produto.quantidade,
      produto.categoriaId,
      produto.createdAt.toISOString()
    );
  }

  update(produto: Produto): void {
    this.db.prepare(
      'UPDATE produtos SET nome = ?, descricao = ?, valor = ?, quantidade = ?, categoria_id = ? WHERE id = ?'
    ).run(
      produto.nome,
      produto.descricao,
      produto.valor,
      produto.quantidade,
      produto.categoriaId,
      produto.id
    );
  }

  updateQuantidade(id: string, quantidade: number): void {
    this.db.prepare('UPDATE produtos SET quantidade = ? WHERE id = ?').run(quantidade, id);
  }

  delete(id: string): void {
    this.db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
  }

  private mapToProduto(row: any): Produto {
    return {
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      valor: row.valor,
      quantidade: row.quantidade,
      categoriaId: row.categoria_id,
      createdAt: new Date(row.created_at)
    };
  }
}
