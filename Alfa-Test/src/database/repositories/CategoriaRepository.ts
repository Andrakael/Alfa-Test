import Database from 'better-sqlite3';
import { Categoria } from '../../types';

export class CategoriaRepository {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  findAll(): Categoria[] {
    const rows = this.db.prepare('SELECT * FROM categorias ORDER BY nome').all();
    return rows.map(this.mapToCategoria);
  }

  findById(id: string): Categoria | null {
    const row = this.db.prepare('SELECT * FROM categorias WHERE id = ?').get(id);
    return row ? this.mapToCategoria(row) : null;
  }

  create(categoria: Categoria): void {
    this.db.prepare(
      'INSERT INTO categorias (id, nome, descricao, cor, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(
      categoria.id,
      categoria.nome,
      categoria.descricao,
      categoria.cor,
      categoria.createdAt.toISOString()
    );
  }

  update(categoria: Categoria): void {
    this.db.prepare(
      'UPDATE categorias SET nome = ?, descricao = ?, cor = ? WHERE id = ?'
    ).run(categoria.nome, categoria.descricao, categoria.cor, categoria.id);
  }

  delete(id: string): void {
    this.db.prepare('DELETE FROM categorias WHERE id = ?').run(id);
  }

  private mapToCategoria(row: any): Categoria {
    return {
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      cor: row.cor,
      createdAt: new Date(row.created_at)
    };
  }
}
