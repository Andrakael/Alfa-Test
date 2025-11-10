import DatabaseManager from './database';
import { CategoriaRepository } from './repositories/CategoriaRepository';
import { ProdutoRepository } from './repositories/ProdutoRepository';
import { ClienteRepository } from './repositories/ClienteRepository';
import { TransacaoRepository } from './repositories/TransacaoRepository';

class DatabaseService {
  private static instance: DatabaseService;
  private dbManager: DatabaseManager;
  
  public categorias: CategoriaRepository;
  public produtos: ProdutoRepository;
  public clientes: ClienteRepository;
  public transacoes: TransacaoRepository;

  private constructor() {
    this.dbManager = new DatabaseManager();
    const db = this.dbManager.getDatabase();
    
    this.categorias = new CategoriaRepository(db);
    this.produtos = new ProdutoRepository(db);
    this.clientes = new ClienteRepository(db);
    this.transacoes = new TransacaoRepository(db);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public exportToJSON(): any {
    return this.dbManager.exportToJSON();
  }

  public importFromJSON(data: any): void {
    this.dbManager.importFromJSON(data);
  }

  public backup(backupPath: string): void {
    this.dbManager.backup(backupPath);
  }

  public restore(backupPath: string): void {
    this.dbManager.restore(backupPath);
  }

  public close(): void {
    this.dbManager.close();
  }
}

export default DatabaseService;
