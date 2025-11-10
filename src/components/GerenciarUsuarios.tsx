import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface Usuario {
  username: string;
  password: string;
  role: 'admin' | 'gerente' | 'usuario';
}

export const GerenciarUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'usuario' as 'admin' | 'gerente' | 'usuario'
  });

  // Carregar usuários do backend
  useEffect(() => {
    // Usuários atualizados do backend
    const defaultUsers: Usuario[] = [
      { username: 'admin', password: 'GILGAMESH999', role: 'admin' },
      { username: 'gerente', password: 'GILGAMESH99', role: 'gerente' },
      { username: 'usuario', password: 'GILGAMESH9', role: 'usuario' }
    ];
    setUsuarios(defaultUsers);
    localStorage.setItem('nexus_usuarios', JSON.stringify(defaultUsers));
  }, []);

  const saveUsuarios = (newUsers: Usuario[]) => {
    setUsuarios(newUsers);
    localStorage.setItem('nexus_usuarios', JSON.stringify(newUsers));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      // Editar usuário
      const updated = usuarios.map(u => 
        u.username === editingUser 
          ? { ...formData }
          : u
      );
      saveUsuarios(updated);
      setMessage({ type: 'success', text: 'Usuário atualizado com sucesso!' });
    } else {
      // Verificar se usuário já existe
      if (usuarios.find(u => u.username === formData.username)) {
        setMessage({ type: 'error', text: 'Usuário já existe!' });
        return;
      }
      // Adicionar novo usuário
      saveUsuarios([...usuarios, formData]);
      setMessage({ type: 'success', text: 'Usuário criado com sucesso!' });
    }

    // Resetar form
    setFormData({ username: '', password: '', role: 'usuario' });
    setShowForm(false);
    setEditingUser(null);

    // Limpar mensagem após 3 segundos
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (user: Usuario) => {
    setFormData(user);
    setEditingUser(user.username);
    setShowForm(true);
  };

  const handleDelete = (username: string) => {
    // Não permitir deletar o último admin
    const admins = usuarios.filter(u => u.role === 'admin');
    if (admins.length === 1 && admins[0].username === username) {
      setMessage({ type: 'error', text: 'Não é possível deletar o último administrador!' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (window.confirm(`Tem certeza que deseja deletar o usuário "${username}"?`)) {
      saveUsuarios(usuarios.filter(u => u.username !== username));
      setMessage({ type: 'success', text: 'Usuário deletado com sucesso!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: 'bg-red-100 text-red-800 border-red-200',
      gerente: 'bg-blue-100 text-blue-800 border-blue-200',
      usuario: 'bg-green-100 text-green-800 border-green-200'
    };
    const labels = {
      admin: 'Administrador',
      gerente: 'Gerente',
      usuario: 'Usuário'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[role as keyof typeof styles]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="h-7 w-7 mr-2 text-red-600" />
            Gerenciar Usuários
          </h1>
          <p className="text-sm text-gray-600 mt-1">Painel exclusivo de administração</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingUser(null);
            setFormData({ username: '', password: '', role: 'usuario' });
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* Mensagem de sucesso/erro */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Formulário */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-purple-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                  disabled={!!editingUser}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Acesso
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="usuario">Usuário</option>
                  <option value="gerente">Gerente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700"
              >
                {editingUser ? 'Atualizar' : 'Criar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingUser(null);
                  setFormData({ username: '', password: '', role: 'usuario' });
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Usuários */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Usuários Cadastrados ({usuarios.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Senha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nível
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((user) => (
                <tr key={user.username} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user.role === 'admin' ? 'bg-red-100' : user.role === 'gerente' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        <Users className={`h-5 w-5 ${
                          user.role === 'admin' ? 'text-red-600' : user.role === 'gerente' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-gray-600">
                        {showPassword[user.username] ? user.password : '••••••••'}
                      </span>
                      <button
                        onClick={() => setShowPassword({ ...showPassword, [user.username]: !showPassword[user.username] })}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword[user.username] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.username)}
                      className="text-red-600 hover:text-red-900"
                      title="Deletar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informações */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">⚠️ Importante:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Apenas administradores podem acessar este painel</li>
              <li>Não é possível deletar o último administrador</li>
              <li>As senhas são armazenadas localmente no navegador</li>
              <li>Faça backup regular dos usuários (Export JSON)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
