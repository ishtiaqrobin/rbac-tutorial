/**
 * Navbar.tsx — Top navigation bar (role-aware)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * The navbar demonstrates TWO RBAC principles at the UI level:
 *
 *   1. RoleGuard → show/hide navigation links based on role.
 *      Only Admins see the "Users" and "Roles" links.
 *
 *   2. PermissionGate → show/hide individual buttons based on permission.
 *      The "Invite User" button is gated by `manage_users`.
 *
 * Clicking "Logout" calls `logout()` from the AuthContext, which
 * clears the JWT and resets state.  All protected routes then
 * redirect to the login page.
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { RoleGuard } from './RoleGuard';
import { PermissionGate } from './PermissionGate';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const roleVariant: Record<string, 'destructive' | 'default' | 'secondary' | 'outline'> = {
  admin:  'destructive',
  editor: 'default',
  viewer: 'default'
};

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (loading) return null;

  return (
    <nav className="bg-card shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-foreground">
            RBAC Tutorial
          </Link>

          {user ? (
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>

              <RoleGuard allowedRoles={['admin']}>
                <Link href="/admin/users" className="text-muted-foreground hover:text-foreground transition-colors">
                  Users
                </Link>
              </RoleGuard>

              <RoleGuard allowedRoles={['admin']}>
                <Link href="/admin/roles" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roles &amp; Permissions
                </Link>
              </RoleGuard>

              <Badge variant={roleVariant[user.role] || 'outline'}>
                {user.role.toUpperCase()}
              </Badge>

              <PermissionGate permission="manage_users">
                <Button size="sm">
                  Invite User
                </Button>
              </PermissionGate>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
