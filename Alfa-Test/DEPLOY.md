# 🚀 Guia de Deploy - Sistema de Gestão de Estoque

Este guia mostra como colocar seu sistema na nuvem usando diferentes plataformas gratuitas.

## 📋 Pré-requisitos

1. **Conta no GitHub** (para versionamento do código)
2. **Node.js instalado** localmente
3. **Código funcionando** localmente

## 🌐 Opções de Hospedagem Gratuita

### 1. 🔥 **Vercel** (Recomendado - Mais Fácil)

**Vantagens:**
- Deploy automático a cada commit
- HTTPS gratuito
- CDN global
- Domínio personalizado gratuito

**Passos:**

1. **Criar conta:** https://vercel.com
2. **Conectar GitHub:** Autorize o Vercel a acessar seus repositórios
3. **Importar projeto:** Clique em "New Project" e selecione seu repositório
4. **Deploy automático:** O Vercel detecta automaticamente que é um projeto React
5. **URL pronta:** Você recebe uma URL como `https://seu-projeto.vercel.app`

**Configuração automática:** O arquivo `vercel.json` já está configurado!

---

### 2. 🎯 **Netlify**

**Vantagens:**
- Interface muito amigável
- Deploy por drag & drop
- Formulários gratuitos
- Funções serverless

**Passos:**

1. **Criar conta:** https://netlify.com
2. **Conectar GitHub:** Link your Git provider
3. **Deploy settings:**
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Deploy:** Netlify faz o resto automaticamente

**Configuração automática:** O arquivo `netlify.toml` já está configurado!

---

### 3. 📄 **GitHub Pages**

**Vantagens:**
- Totalmente gratuito
- Integrado ao GitHub
- Fácil de configurar

**Passos:**

1. **Push para GitHub:** Envie seu código para um repositório
2. **Ativar GitHub Actions:** O arquivo `.github/workflows/deploy.yml` já está pronto
3. **Configurar Pages:**
   - Vá em Settings > Pages
   - Source: GitHub Actions
4. **URL:** `https://seu-usuario.github.io/nome-do-repositorio`

---

### 4. 🐳 **Railway** (Para Docker)

**Vantagens:**
- Suporte a Docker
- Base de dados gratuita
- Fácil escalabilidade

**Passos:**

1. **Criar conta:** https://railway.app
2. **Conectar GitHub:** Link your repository
3. **Deploy:** Railway detecta o Dockerfile automaticamente
4. **Domínio:** Você recebe um domínio `.railway.app`

---

## 🛠️ Preparação do Código

### 1. **Criar repositório no GitHub:**

```bash
# Inicializar Git (se ainda não fez)
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Sistema de Gestão de Estoque - Deploy inicial"

# Conectar ao GitHub (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/gestao-estoque.git

# Enviar código
git push -u origin main
```

### 2. **Build de produção:**

```bash
# Testar build localmente
npm run build

# Verificar se não há erros
npm start
```

## 🔧 Configurações Importantes

### **Variáveis de Ambiente (se necessário):**

Crie um arquivo `.env.production`:

```env
REACT_APP_VERSION=1.0.0
REACT_APP_NAME=Sistema de Gestão de Estoque
```

### **Otimizações de Performance:**

O sistema já está otimizado com:
- ✅ Lazy loading de componentes
- ✅ Compressão Gzip
- ✅ Cache de assets estáticos
- ✅ Minificação automática

## 🚀 Deploy Rápido (Recomendado)

### **Opção 1: Vercel (1 minuto)**

1. Acesse: https://vercel.com
2. Clique "Continue with GitHub"
3. Selecione seu repositório
4. Clique "Deploy"
5. ✅ Pronto! URL disponível

### **Opção 2: Netlify (2 minutos)**

1. Acesse: https://netlify.com
2. Arraste a pasta `build` para o site
3. ✅ Deploy instantâneo!

## 🔒 Domínio Personalizado (Opcional)

### **Vercel:**
1. Vá em Project Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

### **Netlify:**
1. Vá em Site Settings > Domain Management
2. Add custom domain
3. Configure DNS

## 📊 Monitoramento

### **Analytics Gratuitos:**
- **Vercel Analytics:** Incluído gratuitamente
- **Netlify Analytics:** $9/mês (opcional)
- **Google Analytics:** Gratuito (adicione o código)

### **Uptime Monitoring:**
- **UptimeRobot:** https://uptimerobot.com (gratuito)
- **Pingdom:** Plano gratuito disponível

## 🆘 Solução de Problemas

### **Build Falha:**
```bash
# Limpar cache
npm run build
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Roteamento não funciona:**
- ✅ Arquivos `netlify.toml` e `vercel.json` já configurados
- ✅ Nginx configurado para SPA

### **Assets não carregam:**
- Verifique se `homepage` está correto no `package.json`
- Para GitHub Pages: `"homepage": "https://seu-usuario.github.io/repo-name"`

## 🎯 Recomendação Final

**Para iniciantes:** Use **Vercel** - é o mais simples e confiável.

**Para projetos maiores:** Use **Netlify** - mais recursos avançados.

**Para desenvolvedores:** Use **Railway** com Docker - mais controle.

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs de build na plataforma
2. Teste o build localmente primeiro
3. Consulte a documentação da plataforma escolhida

---

🎉 **Seu sistema estará online 24/7 na nuvem!**