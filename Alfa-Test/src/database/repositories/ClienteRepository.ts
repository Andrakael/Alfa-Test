import Database from 'better-sqlite3';
import { Cliente } from '../../types';

export class ClienteRepository {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  findAll(): Cliente[] {
    const rows = this.db.prepare('SELECT * FROM clientes ORDER BY nome').all();
    return rows.map(this.mapToCliente);
  }

  findById(id: string): Cliente | null {
    const row = this.db.prepare('SELECT * FROM clientes WHERE id = ?').get(id);
    return row ? this.mapToCliente(row) : null;
  }

  create(cliente: Cliente): void {
    this.db.prepare(
      'INSERT INTO clientes (id, nome, email, telefone, endereco, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(
      cliente.id,
      cliente.nome,
      cliente.email,
      cliente.telefone,
      cliente.endereco,
      cliente.createdAt.toISOString()
    );
  }

  update(cliente: Cliente): void {
    this.db.prepare(
      'UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?'
    ).run(cliente.nome, cliente.email, cliente.telefone, cliente.endereco, cliente.id);
  }

  delete(id: string): void {
    this.db.prepare('DELETE FROM clientes WHERE id = ?').run(id);
  }

  private mapToCliente(row: any): Cliente {
    return {
      id: row.id,
      nome: row.nome,
      email: row.email,
      telefone: row.telefone,
      endereco: row.endereco,
      createdAt: new Date(row.created_at)
    };
  }
}
