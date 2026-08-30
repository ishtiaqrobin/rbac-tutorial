/**
 * PermissionGate.tsx — Fine-grained permission-based rendering
 *
 * EDUCATIONAL OVERVIEW
 * --------------------
 * PermissionGate renders its children ONLY if the current user
 * holds at least ONE of the specified permissions.
 *
 *   <PermissionGate permission="manage_users">
 *     <button>Delete User</button>
 *   </PermissionGate>
 *
 * This is how you hide individual buttons, menu items, or sections
 * based on the user's permissions — complementing RoleGuard which
 * works at the page/role level.
 *
 * The permissions checked here come from the JWT (decoded by
 * getCurrentUser).  The backend independently verifies the same
 * permissions on every API call — so even if a user tampers with
 * the JWT, the server-side RBAC middleware will still block them.
 */

'use client';

import { useAuth } from './AuthProvider';

interface PermissionGateProps {
  /** A single permission string, or an array. */
  permission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGate({ permission, children, fallback }: PermissionGateProps) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return fallback || null;

  // Normalise to an array of permission names.
  const required = Array.isArray(permission) ? permission : [permission];

  // Grant access if the user has AT LEAST ONE required permission.
  const hasPermission = required.some((perm) => user.permissions?.includes(perm));

  if (!hasPermission) {
    return fallback || null;
  }

  return <>{children}</>;
}
