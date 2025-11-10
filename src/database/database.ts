import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

class DatabaseManager {
  private db: Database.Database;
  private dbPath: string;

  constructor() {
    // Definir caminho do banco de dados
    const appDataPath = process.env.APPDATA || 
                        (process.platform === 'darwin' ? process.env.HOME + '/Library/Application Support' : '/var/local');
    const dbDir = path.join(appDataPath, 'SistemaGestaoEstoque');
    
    // Criar diretório se não existir
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    this.dbPath = path.join(dbDir, 'database.db');
    this.db = new Database(this.dbPath);
    
    // Habilitar foreign keys
    this.db.pragma('foreign_keys = ON');
    
    // Inicializar schema
    this.initializeSchema();
  }

  private initializeSchema() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    this.db.exec(schema);
  }

  // Método para fazer backup
  public backup(backupPath: string): void {
    this.db.backup(backupPath);
  }

  // Método para restaurar backup
  public restore(backupPath: string): void {
    this.db.close();
    fs.copyFileSync(backupPath, this.dbPath);
    this.db = new Database(this.dbPath);
    this.db.pragma('foreign_keys = ON');
  }

  // Método para exportar dados em JSON
  public exportToJSON(): any {
    const categorias = this.db.prepare('SELECT * FROM categorias').all();
    const produtos = this.db.prepare('SELECT * FROM produtos').all();
    const clientes = this.db.prepare('SELECT * FROM clientes').all();
    const transacoes = this.db.prepare('SELECT * FROM transacoes').all();
    const anexos = this.db.prepare('SELECT * FROM anexos').all();

    return {
      categorias,
      produtos,
      clientes,
      transacoes,
      anexos,
      exportadoEm: new Date().toISOString()
    };
  }

  // Método para importar dados de JSON
  public importFromJSON(data: any): void {
    const transaction = this.db.transaction(() => {
      // Limpar tabelas
      this.db.prepare('DELETE FROM anexos').run();
      this.db.prepare('DELETE FROM transacoes').run();
      this.db.prepare('DELETE FROM produtos').run();
      this.db.prepare('DELETE FROM clientes').run();
      this.db.prepare('DELETE FROM categorias').run();

      // Inserir categorias
      if (data.categorias) {
        const insertCategoria = this.db.prepare(
          'INSERT INTO categorias (id, nome, descricao, cor, created_at) VALUES (?, ?, ?, ?, ?)'
        );
        data.categorias.forEach((cat: any) => {
          insertCategoria.run(cat.id, cat.nome, cat.descricao, cat.cor, cat.created_at);
        });
      }

      // Inserir produtos
      if (data.produtos) {
        const insertProduto = this.db.prepare(
          'INSERT INTO produtos (id, nome, descricao, valor, quantidade, categoria_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        data.produtos.forEach((prod: any) => {
          insertProduto.run(
            prod.id, prod.nome, prod.descricao, prod.valor, 
            prod.quantidade, prod.categoria_id, prod.created_at
          );
        });
      }

      // Inserir clientes
      if (data.clientes) {
        const insertCliente = this.db.prepare(
          'INSERT INTO clientes (id, nome, email, telefone, endereco, created_at) VALUES (?, ?, ?, ?, ?, ?)'
        );
        data.clientes.forEach((cli: any) => {
          insertCliente.run(cli.id, cli.nome, cli.email, cli.telefone, cli.endereco, cli.created_at);
        });
      }

      // Inserir transações
      if (data.transacoes) {
        const insertTransacao = this.db.prepare(
          'INSERT INTO transacoes (id, tipo, produto_id, cliente_id, numero_pedido, quantidade, valor_unitario, valor_total, observacoes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        data.transacoes.forEach((trans: any) => {
          insertTransacao.run(
            trans.id, trans.tipo, trans.produto_id, trans.cliente_id, 
            trans.numero_pedido, trans.quantidade, trans.valor_unitario, 
            trans.valor_total, trans.observacoes, trans.created_at
          );
        });
      }

      // Inserir anexos
      if (data.anexos) {
        const insertAnexo = this.db.prepare(
          'INSERT INTO anexos (id, transacao_id, nome, tipo, arquivo, tamanho, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        data.anexos.forEach((anexo: any) => {
          insertAnexo.run(
            anexo.id, anexo.transacao_id, anexo.nome, anexo.tipo, 
            anexo.arquivo, anexo.tamanho, anexo.created_at
          );
        });
      }
    });

    transaction();
  }

  public getDatabase(): Database.Database {
    return this.db;
  }

  public close(): void {
    this.db.close();
  }
}

export default DatabaseManager;
