import React, { useState, useRef, useEffect } from 'react';
import { Lock, User, AlertCircle, Loader2, X } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  console.log('🔵 Login component mounted');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  console.log('📝 Login state:', { username, password: password ? '***' : '', error, loading, errorLength: error.length });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 SUBMIT DISPARADO!', { username, password });
    e.preventDefault();
    // Não limpar o erro aqui, só quando começar a digitar
    setLoading(true);

    try {
      // Importar a API dinamicamente
      const { authAPI } = await import('../services/api');
      
      console.log('📡 Tentando login via API...');
      const response = await authAPI.login(username, password);
      
      console.log('✅ Login bem-sucedido via API!', response);
      
      // Salvar token e dados do usuário
      localStorage.setItem('nexus_auth', 'true');
      localStorage.setItem('nexus_user', response.user.username);
      localStorage.setItem('nexus_token', response.access_token);
      localStorage.setItem('nexus_role', response.user.role);
      
      // Chamar callback de sucesso
      onLogin();
    } catch (error: any) {
      console.error('❌ Erro no login:', error);
      
      let errorMessage = '';
      if (error.response?.status === 401) {
        errorMessage = 'Usuário ou senha incorretos. Verifique suas credenciais e tente novamente.';
      } else if (error.code === 'ERR_NETWORK' || error.message?.includes('Network')) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão ou se o backend está rodando.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente em alguns instantes.';
      } else {
        errorMessage = error.response?.data?.detail || 'Erro inesperado ao fazer login. Tente novamente.';
      }
      
      console.log('🔴 Definindo erro:', errorMessage);
      setError(errorMessage);
      console.log('🔴 Erro definido!');
      
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <Lock className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            NEXUS
          </h1>
          <p className="text-blue-100 text-lg">
            Sistema de Gestão de Estoque IA
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Fazer Login
          </h2>

          {error && (
            <div 
              key={error}
              className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start space-x-3 text-red-700"
              style={{ animation: 'shake 0.5s ease-in-out' }}
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-sm">Erro ao fazer login</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setError('');
                }}
                className="text-red-400 hover:text-red-600 transition-colors focus:outline-none"
                type="button"
                aria-label="Fechar mensagem de erro"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Usuário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite seu usuário"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              <span>{loading ? 'Autenticando...' : 'Entrar'}</span>
            </button>
          </form>

          {/* Informações removidas por segurança */}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white text-sm opacity-80">
            © 2024 NEXUS - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};
