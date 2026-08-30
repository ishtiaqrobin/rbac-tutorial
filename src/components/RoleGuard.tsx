/**
 * RoleGuard.tsx — Role-based route protection
 *
 * EDUCATIONAL OVERVIEW
 * --------------------
 * RoleGuard is a higher-order wrapper that ONLY renders its children
 * if the current user's role matches one of the allowed roles.
 *
 *   <RoleGuard allowedRoles={['admin']}>
 *     <SensitiveAdminPanel />
 *   </RoleGuard>
 *
 * If the user lacks the required role, we show an "access denied"
 * message instead.  You can also provide a custom `fallback` element.
 *
 * IMPORTANT: RoleGuard is for UI-level protection (hiding/showing
 * components).  The REAL authorization happens on the backend — every
 * API route that needs a specific role has `requireRole('admin')`
 * middleware.  The frontend guard is a UX convenience; it does NOT
 * replace backend checks.
 */

'use client';

import { useAuth } from './AuthProvider';

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, loading } = useAuth();

  // While loading, render nothing (or a skeleton).
  if (loading) return null;

  // Not logged in → deny.
  if (!user) {
    return fallback || <AccessDeniedMessage />;
  }

  // Check if the user's role is in the allowed list.
  const isAllowed = allowedRoles.includes(user.role);

  if (!isAllowed) {
    return fallback || <AccessDeniedMessage requiredRoles={allowedRoles} />;
  }

  // User has one of the allowed roles → render children.
  return <>{children}</>;
}

function AccessDeniedMessage({ requiredRoles }: { requiredRoles?: string[] }) {
  return (
    <div className="rounded-lg bg-red-50 p-6 text-center">
      <h3 className="text-lg font-semibold text-red-800">Access Denied</h3>
      <p className="text-sm text-red-600 mt-2">
        {requiredRoles
          ? `This area requires one of the following roles: ${requiredRoles.join(', ')}`
          : 'You do not have permission to view this content.'}
      </p>
    </div>
  );
}
