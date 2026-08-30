/**
 * ProtectedRoute.tsx — Route guard for authentication
 *
 * EDUCATIONAL OVERVIEW
 * --------------------
 * ProtectedRoute is a wrapper component that:
 *   1. Shows a loading spinner while we check if a session exists.
 *   2. Redirects to /login if the user is not authenticated.
 *   3. Renders the wrapped children if the user IS authenticated.
 *
 * In Next.js App Router (pages that live under /app), each protected
 * page simply wraps its content in <ProtectedRoute>.  This keeps the
 * guard logic in ONE place instead of duplicating it in every page.
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // After the initial loading check, if there's no user,
    // send them to the login page.
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // While we're checking, show a spinner (so we don't flash the
  // protected content before redirecting).
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // If the user is not authenticated, render nothing (redirect happens above).
  if (!user) return null;

  // User is authenticated → render the protected content.
  return <>{children}</>;
}
