/**
 * Dashboard layout — App Router layout with PARALLEL ROUTING
 *
 * EDUCATIONAL OVERVIEW
 * --------------------
 * Parallel routes in Next.js App Router allow MULTIPLE routes to render
 * simultaneously in the same layout.  They are defined using the
 * `@` convention in the directory name:
 *
 *   app/dashboard/
 *     layout.tsx          ← receives { children } and { recentUsers }
 *     page.tsx            ← main dashboard (children)
 *     @recentUsers/
 *       page.tsx          ← parallel route panel
 *     loading.tsx         ← shown while either route is fetching
 *     error.tsx           ← boundary for errors in this subtree
 *
 * The layout function receives named slot props — each `@`-prefixed
 * folder name maps to a prop with the same name (minus the `@`).
 * This lets the recent-users panel load independently: if it's slow,
 * the main dashboard content still renders.
 *
 * We also wrap EVERYTHING in <ProtectedRoute> here so that individual
 * pages don't need to repeat the auth check.
 */

import { ReactNode } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface DashboardLayoutProps {
  children: ReactNode;
  recentUsers: ReactNode;  // ← from @recentUsers/page.tsx
}

export default function DashboardLayout({ children, recentUsers }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main dashboard content (app/dashboard/page.tsx) */}
          <div className="lg:col-span-2">{children}</div>

          {/* Parallel route: recent users panel */}
          <div>{recentUsers}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
