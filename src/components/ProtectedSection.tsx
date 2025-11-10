import React from 'react';
import { AccessDenied } from './AccessDenied';
import { hasPermission } from '../utils/permissions';

interface ProtectedSectionProps {
  children: React.ReactNode;
  permission: string;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export const ProtectedSection: React.FC<ProtectedSectionProps> = ({ 
  children, 
  permission,
  requiredRole = 'administrador ou gerente',
  fallback 
}) => {
  const hasAccess = hasPermission(permission as any);

  if (!hasAccess) {
    return fallback || <AccessDenied requiredRole={requiredRole} />;
  }

  return <>{children}</>;
};
