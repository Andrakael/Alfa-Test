# 🚀 Guia Electron - Sistema de Gestão de Estoque

## ✅ O que foi configurado:

1. ✅ **Electron instalado** - Framework para criar executável
2. ✅ **electron-builder** - Para gerar instalador Windows
3. ✅ **Arquivos criados:**
   - `public/electron.js` - Processo principal do Electron
   - `public/preload.js` - Bridge segura entre Electron e React
4. ✅ **package.json atualizado** - Scripts e configurações

---

## 🎯 Como usar:

### **1. Testar em modo desenvolvimento:**

```bash
npm run electron:dev
```

Isso vai:
- Iniciar o React (localhost:3000)
- Abrir janela do Electron automaticamente
- Hot reload funcionando

### **2. Gerar executável para Windows:**

```bash
npm run electron:build:win
```

Isso vai:
- Fazer build do React
- Criar instalador Windows (.exe)
- Salvar em: `dist/Sistema de Gestão de Estoque Setup.exe`

**Tempo estimado:** 5-10 minutos

### **3. Instalar e usar:**

1. Vá para pasta `dist/`
2. Execute `Sistema de Gestão de Estoque Setup.exe`
3. Siga o instalador
4. Aplicativo será instalado em: `C:\Program Files\Sistema de Gestão de Estoque`

---

## 📦 Onde ficam os dados:

### **Banco de dados SQLite:**
```
C:\Users\[SeuUsuario]\AppData\Roaming\sistema-gestao-estoque\database.db
```

### **Backups (quando exportar):**
- Você escolhe onde salvar
- Formato: `.db` ou `.json`

---

## 🔧 Funcionalidades do Electron:

### **Já implementadas:**

1. ✅ **Janela nativa** - Aplicativo desktop real
2. ✅ **Banco SQLite** - Dados em arquivo local
3. ✅ **Backup do banco** - Copiar arquivo .db
4. ✅ **Export/Import JSON** - Diálogos nativos
5. ✅ **Ícone personalizado** - Logo do sistema
6. ✅ **Instalador Windows** - Setup profissional

### **Diálogos nativos:**
- Salvar arquivo (backup)
- Abrir arquivo (restore)
- Escolher pasta

---

## 🎨 Personalização:

### **Mudar ícone do app:**

1. Crie um ícone `.ico` (256x256px)
2. Salve em `public/icon.ico`
3. Atualize `package.json`:

```json
"win": {
  "icon": "public/icon.ico"
}
```

### **Mudar nome do app:**

Em `package.json`:
```json
"build": {
  "productName": "Seu Nome Aqui"
}
```

---

## 📊 Estrutura do projeto:

```
projeto/
├── public/
│   ├── electron.js       ← Processo principal
│   ├── preload.js        ← Bridge segura
│   └── logo192.png       ← Ícone
├── src/
│   ├── database/         ← SQLite (usado no Electron)
│   ├── hooks/            ← React hooks
│   └── ...
├── build/                ← Build do React (gerado)
└── dist/                 ← Executável (gerado)
    └── Sistema de Gestão de Estoque Setup.exe
```

---

## 🐛 Troubleshooting:

### **Erro: "electron não encontrado"**
```bash
npm install --save-dev electron --legacy-peer-deps
```

### **Erro ao gerar executável:**
```bash
# Limpar cache
npm run build
rmdir /s /q dist
npm run electron:build:win
```

### **Banco de dados não funciona:**
- Verifique se `better-sqlite3` está instalado
- Rode: `npm rebuild better-sqlite3`

### **Aplicativo não abre:**
- Verifique antivírus (pode bloquear)
- Execute como administrador

---

## 🚀 Distribuição:

### **Para distribuir na empresa:**

1. **Gere o instalador:**
   ```bash
   npm run electron:build:win
   ```

2. **Copie o instalador:**
   - Arquivo: `dist/Sistema de Gestão de Estoque Setup.exe`
   - Tamanho: ~150-200 MB

3. **Distribua:**
   - Pendrive
   - Rede compartilhada
   - Email (se permitido)

4. **Instale em cada PC:**
   - Execute o Setup.exe
   - Siga o instalador
   - Pronto!

### **Cada PC terá:**
- ✅ Aplicativo instalado
- ✅ Banco de dados próprio
- ✅ Atalho na área de trabalho
- ✅ Entrada no menu iniciar

---

## 💾 Backup recomendado:

### **Backup manual:**
1. Abra o app
2. Vá em Configurações
3. Clique em "Exportar Dados"
4. Salve o JSON em local seguro

### **Backup automático (opcional):**
Configure backup semanal para:
```
\\servidor-empresa\backups\gestao-estoque\
```

---

## 📈 Próximas melhorias (opcional):

- [ ] Auto-update (atualização automática)
- [ ] Sincronização em nuvem
- [ ] Multi-usuário (rede local)
- [ ] Relatórios em PDF
- [ ] Gráficos avançados

---

## 🎉 Pronto para usar!

**Comandos principais:**

```bash
# Desenvolvimento
npm run electron:dev

# Gerar executável
npm run electron:build:win

# Apenas React (navegador)
npm start
```

**Dúvidas?** Consulte a documentação do Electron: https://www.electronjs.org/
