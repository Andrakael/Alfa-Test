# 🗄️ Sistema de Banco de Dados SQLite

## 📋 O que foi implementado

### ✅ Estrutura completa do banco de dados SQLite:

1. **Schema SQL** (`src/database/schema.sql`)
   - Tabelas: categorias, produtos, clientes, transacoes, anexos
   - Foreign keys e constraints
   - Índices para performance

2. **DatabaseManager** (`src/database/database.ts`)
   - Gerencia conexão com SQLite
   - Métodos de backup/restore
   - Export/Import JSON
   - Salva em: `C:\Users\[Usuario]\AppData\Roaming\SistemaGestaoEstoque\database.db`

3. **Repositories** (DAOs)
   - `CategoriaRepository` - CRUD de categorias
   - `ProdutoRepository` - CRUD de produtos  
   - `ClienteRepository` - CRUD de clientes
   - `TransacaoRepository` - CRUD de transações + anexos

4. **DatabaseService** (`src/database/DatabaseService.ts`)
   - Singleton para acesso global
   - Centraliza todos os repositórios

5. **Hooks React**
   - `useDatabase.ts` - Hook para usar SQLite (Electron)
   - `useDatabaseOrStorage.ts` - Hook híbrido (navegador + Electron)

---

## 🌐 Como funciona ATUALMENTE (Navegador)

**Status atual:** O sistema continua usando **localStorage** no navegador.

- ✅ Funciona perfeitamente no navegador
- ✅ Dados salvos localmente
- ✅ Export/Import JSON funcionando
- ❌ SQLite ainda não está ativo (precisa Electron)

---

## 🖥️ Para usar SQLite (Próximos passos)

### **Opção 1: Criar executável com Electron**

#### 1. Instalar Electron:
```bash
npm install --save-dev electron electron-builder concurrently wait-on cross-env
```

#### 2. Criar arquivos Electron:

**`public/electron.js`:**
```javascript
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const DatabaseService = require('../src/database/DatabaseService').default;

let mainWindow;
let db;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Inicializar banco de dados
  db = DatabaseService.getInstance();
}

// IPC Handlers para comunicação com React
ipcMain.handle('db:getProdutos', () => db.produtos.findAll());
ipcMain.handle('db:addProduto', (event, produto) => db.produtos.create(produto));
// ... outros handlers

app.whenReady().then(createWindow);
```

**`public/preload.js`:**
```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  db: {
    getProdutos: () => ipcRenderer.invoke('db:getProdutos'),
    addProduto: (produto) => ipcRenderer.invoke('db:addProduto', produto),
    // ... outros métodos
  }
});
```

#### 3. Atualizar `package.json`:
```json
{
  "main": "public/electron.js",
  "homepage": "./",
  "scripts": {
    "electron:dev": "concurrently \"cross-env BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "electron:build:win": "npm run build && electron-builder --win"
  },
  "build": {
    "appId": "com.empresa.gestao-estoque",
    "productName": "Sistema de Gestão de Estoque",
    "files": [
      "build/**/*",
      "node_modules/**/*",
      "public/electron.js",
      "public/preload.js"
    ],
    "win": {
      "target": "nsis",
      "icon": "public/icon.ico"
    },
    "directories": {
      "buildResources": "public"
    }
  }
}
```

#### 4. Gerar executável:
```bash
# Desenvolvimento
npm run electron:dev

# Build para Windows
npm run electron:build:win
```

O executável será gerado em: `dist/Sistema de Gestão de Estoque Setup.exe`

---

### **Opção 2: Usar Tauri (mais leve que Electron)**

Tauri é uma alternativa mais leve ao Electron.

```bash
npm install --save-dev @tauri-apps/cli
npm install @tauri-apps/api
```

---

## 💾 Backup e Segurança

### **Backup automático:**
Você pode configurar backup automático diário:

```typescript
// Adicionar no App.tsx
useEffect(() => {
  const backupInterval = setInterval(() => {
    const data = exportarDados();
    const dataStr = JSON.stringify(data);
    const blob = new Blob([dataStr], { type: 'application/json' });
    // Salvar em pasta de backup
  }, 24 * 60 * 60 * 1000); // 24 horas

  return () => clearInterval(backupInterval);
}, []);
```

### **Localização do banco:**
- **Windows:** `C:\Users\[Usuario]\AppData\Roaming\SistemaGestaoEstoque\database.db`
- **Mac:** `~/Library/Application Support/SistemaGestaoEstoque/database.db`
- **Linux:** `~/.config/SistemaGestaoEstoque/database.db`

---

## 🚀 Recomendação para Empresa

### **Melhor fluxo:**

1. **Desenvolvimento:** Continue usando navegador (localStorage)
2. **Produção:** Crie executável com Electron + SQLite
3. **Backup:** Configure backup automático semanal
4. **Distribuição:** Instale o .exe em cada PC da empresa

### **Vantagens:**
- ✅ Cada PC tem seu próprio banco de dados
- ✅ Não precisa de servidor
- ✅ Funciona offline
- ✅ Backup fácil (copiar arquivo .db)
- ✅ Dados seguros localmente

---

## 📞 Próximos passos

Quer que eu:
1. ✅ Configure o Electron completo?
2. ✅ Crie o executável para Windows?
3. ✅ Configure backup automático?
4. ✅ Adicione sincronização em nuvem (opcional)?

**Escolha uma opção e eu implemento!** 🚀
