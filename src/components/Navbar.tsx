/**
 * Navbar.tsx — Top navigation bar (role-aware)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * The navbar demonstrates TWO RBAC principles at the UI level:
 *
 *   1. RoleGuard / hasRole() → show/hide navigation links based on role.
 *      Only Admins see the "Users" and "Roles" links.
 *
 *   2. PermissionGate → show/hide individual buttons based on permission.
 *      The "Delete" button on user rows is gated by `manage_users`.
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

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (loading) return null;

  // Role badges for visual feedback
  const roleColors: Record<string, string> = {
    admin:  'bg-red-100 text-red-800',
    editor: 'bg-amber-100 text-amber-800',
    viewer: 'bg-green-100 text-green-800'
  };
  const roleClass = user ? (roleColors[user.role] || 'bg-gray-100') : '';

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* ── Logo / Brand ── */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            RBAC Tutorial
          </Link>

          {/* ── Navigation links (role-aware) ── */}
          {user ? (
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                Dashboard
              </Link>

              {/* Only Admins see the Users link */}
              <RoleGuard allowedRoles={['admin']}>
                <Link href="/admin/users" className="text-gray-700 hover:text-primary transition-colors">
                  Users
                </Link>
              </RoleGuard>

              {/* Only Admins see the Roles link */}
              <RoleGuard allowedRoles={['admin']}>
                <Link href="/admin/roles" className="text-gray-700 hover:text-primary transition-colors">
                  Roles & Permissions
                </Link>
              </RoleGuard>

              {/* Role badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleClass}`}>
                {user?.role?.toUpperCase()}
              </span>

              {/* ── Permission-gated button ── */}
              <PermissionGate permission="manage_users">
                <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-blue-700 transition">
                  Invite User
                </button>
              </PermissionGate>

              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            // Not logged in → show Login link
            <Link href="/login" className="text-gray-700 hover:text-primary transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
