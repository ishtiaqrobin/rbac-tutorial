/**
 * RoleGuard.tsx — Role-based route protection
 *
 * EDUCATIONAL NOTE
 * ----------------
 * RoleGuard is a higher-order wrapper that ONLY renders its children
 * if the current user's role matches one of the allowed roles.
 *
 *   <RoleGuard allowedRoles={['admin']}>
 *     <SensitiveAdminPanel />
 *   </RoleGuard>
 *
 * If the user lacks the required role, we show an "access denied"
 * card instead.  You can also provide a custom `fallback` element.
 *
 * IMPORTANT: RoleGuard is for UI-level protection (hiding/showing
 * components).  The REAL authorization happens on the backend — every
 * API route that needs a specific role has `requireRole('admin')`
 * middleware.  The frontend guard is a UX convenience.
 */

'use client';

import { useAuth } from './AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldX } from 'lucide-react';

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return fallback || <AccessDeniedMessage requiredRoles={allowedRoles} />;

  const isAllowed = allowedRoles.includes(user.role);
  if (!isAllowed) {
    return fallback || <AccessDeniedMessage requiredRoles={allowedRoles} />;
  }

  return <>{children}</>;
}

function AccessDeniedMessage({ requiredRoles }: { requiredRoles: string[] }) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <ShieldX className="h-5 w-5" />
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This area requires one of the following roles: {requiredRoles.join(', ')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
