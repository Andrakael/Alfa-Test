import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface AccessDeniedProps {
  message?: string;
  requiredRole?: string;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ 
  message = "Você não tem permissão para acessar esta funcionalidade.",
  requiredRole = "administrador ou gerente"
}) => {
  const currentUser = localStorage.getItem('nexus_user') || 'Usuário';
  const currentRole = localStorage.getItem('nexus_role') || 'usuario';
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'gerente': return 'Gerente';
      case 'usuario': return 'Usuário';
      default: return role;
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border-2 border-red-200 p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Acesso Negado
          </h2>
        </div>

        <div className="space-y-4 text-gray-600">
          <div className="flex items-center justify-center space-x-2 text-yellow-700 bg-yellow-50 p-3 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-medium">
              {message}
            </span>
          </div>

          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium">Usuário atual:</span> {currentUser}
            </p>
            <p>
              <span className="font-medium">Nível de acesso:</span> {getRoleLabel(currentRole)}
            </p>
            <p>
              <span className="font-medium">Nível necessário:</span> {requiredRole}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Entre em contato com o administrador do sistema para solicitar acesso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
