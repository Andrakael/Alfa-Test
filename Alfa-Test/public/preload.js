const { contextBridge, ipcRenderer } = require('electron');

// Expor API segura para o React
contextBridge.exposeInMainWorld('electron', {
  // Informações do sistema
  isElectron: () => ipcRenderer.invoke('system:isElectron'),
  getDbPath: () => ipcRenderer.invoke('system:getDbPath'),
  
  // Operações de banco de dados
  db: {
    backup: () => ipcRenderer.invoke('db:backup'),
    restore: () => ipcRenderer.invoke('db:restore'),
    exportJSON: (data) => ipcRenderer.invoke('db:exportJSON', data),
    importJSON: () => ipcRenderer.invoke('db:importJSON')
  }
});
