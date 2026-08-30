/**
 * ProtectedRoute.tsx — Route guard for authentication
 *
 * EDUCATIONAL NOTE
 * ----------------
 * ProtectedRoute is a wrapper component that:
 *   1. Shows a loading spinner while we check if a session exists.
 *   2. Redirects to /login if the user is not authenticated.
 *   3. Renders the wrapped children if the user IS authenticated.
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
