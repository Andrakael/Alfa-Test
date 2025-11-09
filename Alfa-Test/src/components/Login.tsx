import React, { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      // Buscar usuários do localStorage
      const savedUsers = localStorage.getItem('nexus_usuarios');
      let usuarios: any = {};
      
      if (savedUsers) {
        const userList = JSON.parse(savedUsers);
        userList.forEach((u: any) => {
          usuarios[u.username] = { password: u.password, role: u.role };
        });
      } else {
        // Usuários padrão se não existir
        usuarios = {
          'admin': { password: 'admin123', role: 'admin' },
          'gerente': { password: 'gerente123', role: 'gerente' },
          'usuario': { password: 'usuario123', role: 'usuario' }
        };
        // Salvar usuários padrão
        const defaultUsers = [
          { username: 'admin', password: 'admin123', role: 'admin' },
          { username: 'gerente', password: 'gerente123', role: 'gerente' },
          { username: 'usuario', password: 'usuario123', role: 'usuario' }
        ];
        localStorage.setItem('nexus_usuarios', JSON.stringify(defaultUsers));
      }
      
      const user = usuarios[username];
      
      if (user && password === user.password) {
        // Salvar sessão
        localStorage.setItem('nexus_auth', 'true');
        localStorage.setItem('nexus_user', username);
        localStorage.setItem('nexus_role', user.role);
        onLogin();
      } else {
        setError('Usuário ou senha incorretos!');
        setPassword('');
      }
      setLoading(false);
    }, 500);
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
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
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
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Entrando...' : 'Entrar'}
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
