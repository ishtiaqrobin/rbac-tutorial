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
    <nav className="bg-[#fdfbf7] border-b-2 border-black sticky top-0 z-50 font-kalam">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#f3b72b] border-2 border-black flex items-center justify-center font-bold text-xl shadow-[3px_3px_0px_0px_#000] group-hover:rotate-6 transition-transform">
              ⚡
            </div>
            <span className="text-2xl font-bold tracking-wide text-[#1a1a1a]">
              CRAZY<span className="text-[#e05252]">8</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-base font-bold">
            <Link 
              href="/" 
              className="text-[#1a1a1a] hover:text-[#e05252] hover:underline decoration-wavy decoration-[#e05252] underline-offset-4 transition-all"
            >
              HOME
            </Link>
            
            {user && (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-[#1a1a1a] hover:text-[#e05252] hover:underline decoration-wavy decoration-[#e05252] underline-offset-4 transition-all"
                >
                  DASHBOARD
                </Link>

                <RoleGuard allowedRoles={['admin']}>
                  <Link 
                    href="/admin/users" 
                    className="text-[#1a1a1a] hover:text-[#e05252] hover:underline decoration-wavy decoration-[#e05252] underline-offset-4 transition-all"
                  >
                    USERS
                  </Link>
                </RoleGuard>

                <RoleGuard allowedRoles={['admin']}>
                  <Link 
                    href="/admin/roles" 
                    className="text-[#1a1a1a] hover:text-[#e05252] hover:underline decoration-wavy decoration-[#e05252] underline-offset-4 transition-all"
                  >
                    ROLES &amp; PERMISSIONS
                  </Link>
                </RoleGuard>
              </>
            )}
          </div>

          {/* Right Action Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Role Badge (pill style matching language selector in mockup) */}
                <div className="hidden sm:flex items-center space-x-1 border-2 border-black rounded-xl px-3 py-1 bg-white text-xs font-bold shadow-[2px_2px_0px_0px_#000]">
                  <span>🌐</span>
                  <span className="uppercase text-[#e05252]">{user.role}</span>
                </div>

                <PermissionGate permission="manage_users">
                  <Button 
                    variant="dashed"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    JOIN
                  </Button>
                </PermissionGate>

                {/* Yellow Action Button */}
                <Button 
                  onClick={handleLogout}
                  size="sm"
                  className="bg-[#f3b72b] hover:bg-[#eab308] text-black font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all rounded-xl px-4 py-1.5"
                >
                  LOGOUT
                </Button>

                {/* User Avatar Circle */}
                <div 
                  className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_#000] text-[#1a1a1a]"
                  title={user.email}
                >
                  👤
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="dashed" 
                    size="sm"
                  >
                    JOIN
                  </Button>
                </Link>
                <Link href="/login">
                  <Button 
                    size="sm"
                    className="bg-[#f3b72b] hover:bg-[#eab308] text-black font-bold border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all rounded-xl px-5 py-1.5"
                  >
                    START
                  </Button>
                </Link>
                <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
                  👤
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
