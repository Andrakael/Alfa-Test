# 🚀 Como Gerar o Executável - Guia Rápido

## ✅ Status: TUDO PRONTO!

O Electron está 100% configurado e pronto para gerar o executável.

---

## 🎯 PASSO A PASSO SIMPLES:

### **Opção 1: Testar primeiro (Recomendado)**

```bash
npm run electron:dev
```

**O que acontece:**
- Abre o aplicativo em janela desktop
- Funciona igual ao navegador, mas como app nativo
- Você pode testar tudo antes de gerar o .exe

**Para fechar:** Feche a janela ou pressione `Ctrl+C` no terminal

---

### **Opção 2: Gerar executável direto**

```bash
npm run electron:build:win
```

**O que acontece:**
1. Compila o React (build)
2. Empacota com Electron
3. Cria instalador Windows
4. Salva em: `dist/Sistema de Gestão de Estoque Setup.exe`

**Tempo:** 5-10 minutos (primeira vez pode demorar mais)

**Tamanho final:** ~150-200 MB

---

## 📦 Depois de gerar:

### **Arquivo gerado:**
```
dist/
└── Sistema de Gestão de Estoque Setup.exe  ← Este é o instalador!
```

### **Como instalar:**
1. Copie o `Setup.exe` para o PC desejado
2. Execute como administrador
3. Siga o instalador
4. Pronto! Atalho criado na área de trabalho

---

## 💾 Onde ficam os dados:

**Banco de dados:**
```
C:\Users\[Usuario]\AppData\Roaming\sistema-gestao-estoque\database.db
```

**Para fazer backup:**
- Copie este arquivo .db
- Ou use "Exportar Dados" no app (gera JSON)

---

## 🔧 Comandos úteis:

```bash
# Testar em desenvolvimento
npm run electron:dev

# Gerar executável Windows
npm run electron:build:win

# Limpar e gerar novamente
rmdir /s /q dist build
npm run electron:build:win

# Apenas React no navegador (como antes)
npm start
```

---

## 🎨 Personalizar antes de gerar:

### **Mudar nome do aplicativo:**

Edite `package.json`:
```json
"build": {
  "productName": "Gestão Empresa XYZ"
}
```

### **Adicionar ícone personalizado:**

1. Crie um ícone `.ico` (256x256px)
2. Salve em `public/icon.ico`
3. Atualize `package.json`:
```json
"win": {
  "icon": "public/icon.ico"
}
```

---

## ⚠️ Problemas comuns:

### **"Electron não encontrado"**
```bash
npm install --legacy-peer-deps
```

### **Erro ao gerar executável**
```bash
# Limpar tudo
rmdir /s /q node_modules dist build
npm install --legacy-peer-deps
npm run electron:build:win
```

### **Antivírus bloqueia**
- Normal! Adicione exceção
- Ou assine digitalmente o executável (avançado)

---

## 📊 Diferenças: Navegador vs Executável

| Recurso | Navegador | Executável |
|---------|-----------|------------|
| Armazenamento | localStorage | SQLite (.db) |
| Backup | Export JSON | Export JSON + Backup .db |
| Instalação | Não precisa | Instala no Windows |
| Ícone | Favicon | Ícone nativo |
| Offline | ✅ | ✅ |
| Atualização | F5 | Reinstalar |

---

## 🎉 PRONTO PARA GERAR!

**Comando principal:**
```bash
npm run electron:build:win
```

**Aguarde 5-10 minutos e o instalador estará pronto em `dist/`**

---

## 📞 Próximos passos após gerar:

1. ✅ Teste o instalador em seu PC
2. ✅ Instale em outros PCs da empresa
3. ✅ Configure backup semanal
4. ✅ Treine usuários

**Dúvidas?** Consulte `ELECTRON_GUIDE.md` para detalhes completos.
