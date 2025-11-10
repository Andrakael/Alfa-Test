const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

let mainWindow;
let dbPath;

// Definir caminho do banco de dados
function getDbPath() {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'database.db');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'logo192.png'),
    title: 'NEXUS - Sistema de Gestão de Estoque IA'
  });

  // Carregar aplicação
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Abrir DevTools apenas em desenvolvimento
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Inicializar caminho do banco
  dbPath = getDbPath();
  console.log('Banco de dados em:', dbPath);
}

// Handlers IPC para comunicação com React

// Informações do sistema
ipcMain.handle('system:getDbPath', () => {
  return dbPath;
});

ipcMain.handle('system:isElectron', () => {
  return true;
});

// Backup do banco de dados
ipcMain.handle('db:backup', async () => {
  try {
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Salvar Backup do Banco de Dados',
      defaultPath: `backup-gestao-estoque-${new Date().toISOString().split('T')[0]}.db`,
      filters: [
        { name: 'Database', extensions: ['db'] }
      ]
    });

    if (filePath && fs.existsSync(dbPath)) {
      fs.copyFileSync(dbPath, filePath);
      return { success: true, path: filePath };
    }
    return { success: false, error: 'Operação cancelada' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Restaurar backup
ipcMain.handle('db:restore', async () => {
  try {
    const { filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Restaurar Backup do Banco de Dados',
      filters: [
        { name: 'Database', extensions: ['db'] }
      ],
      properties: ['openFile']
    });

    if (filePaths && filePaths.length > 0) {
      fs.copyFileSync(filePaths[0], dbPath);
      return { success: true };
    }
    return { success: false, error: 'Operação cancelada' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Exportar JSON
ipcMain.handle('db:exportJSON', async (event, data) => {
  try {
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Exportar Dados',
      defaultPath: `backup-gestao-estoque-${new Date().toISOString().split('T')[0]}.json`,
      filters: [
        { name: 'JSON', extensions: ['json'] }
      ]
    });

    if (filePath) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return { success: true, path: filePath };
    }
    return { success: false, error: 'Operação cancelada' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Importar JSON
ipcMain.handle('db:importJSON', async () => {
  try {
    const { filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Importar Dados',
      filters: [
        { name: 'JSON', extensions: ['json'] }
      ],
      properties: ['openFile']
    });

    if (filePaths && filePaths.length > 0) {
      const data = JSON.parse(fs.readFileSync(filePaths[0], 'utf-8'));
      return { success: true, data };
    }
    return { success: false, error: 'Operação cancelada' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Eventos do app
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
