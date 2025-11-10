import React from 'react';
import { AccessDenied } from './AccessDenied';
import { hasPermission } from '../utils/permissions';

interface ProtectedSectionProps {
  children: React.ReactNode;
  permission: string;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export const ProtectedSection = ({ 
  children, 
  permission,
  requiredRole = 'administrador ou gerente',
  fallback 
}: ProtectedSectionProps): React.ReactElement | null => {
  const hasAccess = hasPermission(permission as any);

  if (!hasAccess) {
    return (fallback as React.ReactElement) || <AccessDenied requiredRole={requiredRole} />;
  }

  return <>{children}</> as React.ReactElement;
};
