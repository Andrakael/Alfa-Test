# Guia de Instalação - Sistema de Gestão de Estoque

## 1. Instalar Node.js

### Windows:
1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador baixado
4. Siga as instruções do instalador
5. Reinicie o terminal/prompt de comando

### Verificar instalação:
```bash
node --version
npm --version
```

## 2. Instalar dependências do projeto

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

## 3. Iniciar o projeto

```bash
npm start
```

O sistema abrirá automaticamente no navegador em: http://localhost:3000

## Possíveis problemas:

### Se aparecer erro "npm não é reconhecido":
- Reinicie o terminal
- Verifique se o Node.js foi instalado corretamente
- Adicione o Node.js ao PATH do sistema

### Se aparecer erros de dependências:
```bash
npm cache clean --force
npm install
```

### Se o projeto não abrir no navegador:
- Acesse manualmente: http://localhost:3000
- Verifique se a porta 3000 não está sendo usada por outro programa