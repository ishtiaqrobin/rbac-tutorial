/**
 * Dashboard page — the first stop after login.
 *
 * EDUCATIONAL NOTE
 * ----------------
 * The dashboard is protected by <ProtectedRoute>, which ensures only
 * authenticated users can see it.  Inside, we use <RoleGuard> and
 * <PermissionGate> to show role-specific content without needing
 * separate routes:
 *
 *   - Admins see a "Manage System" card.
 *   - Editors see a "Create Content" card (permission-based).
 *   - Viewers see a "Reports" card (permission-based).
 *
 * This demonstrates that RBAC works at BOTH the page level (ProtectedRoute)
 * AND the component level (RoleGuard / PermissionGate).
 */

'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import { PermissionGate } from '@/components/PermissionGate';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome, <strong>{user?.email}</strong> (Role: {user?.role})
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ── Admin-only card ── */}
        <RoleGuard allowedRoles={['admin']}>
          <Link href="/admin/users" className="block p-6 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition">
            <h3 className="text-lg font-semibold text-red-800">Manage Users</h3>
            <p className="text-sm text-red-600 mt-1">
              View, edit roles, and deactivate users.
            </p>
          </Link>
        </RoleGuard>

        {/* ── Permission-gated: create_content ── */}
        <PermissionGate permission="create_content">
          <Link href="/editor" className="block p-6 bg-amber-50 rounded-lg border border-amber-200 hover:bg-amber-100 transition">
            <h3 className="text-lg font-semibold text-amber-800">Create Content</h3>
            <p className="text-sm text-amber-600 mt-1">
              Write and publish new content items.
            </p>
          </Link>
        </PermissionGate>

        {/* ── Permission-gated: view_reports ── */}
        <PermissionGate permission="view_reports">
          <Link href="/viewer" className="block p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition">
            <h3 className="text-lg font-semibold text-green-800">View Reports</h3>
            <p className="text-sm text-green-600 mt-1">
              Browse analytics and content reports.
            </p>
          </Link>
        </PermissionGate>

        {/* ── Permission-gated: edit_content ── */}
        <PermissionGate permission="edit_content">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">Edit Content</h3>
            <p className="text-sm text-blue-600 mt-1">
              Modify existing published content.
            </p>
          </div>
        </PermissionGate>

        {/* ── Permission-gated: delete_content ── */}
        <PermissionGate permission="delete_content">
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800">Delete Content</h3>
            <p className="text-sm text-purple-600 mt-1">
              Remove content that is no longer needed.
            </p>
          </div>
        </PermissionGate>
      </div>
    </div>
  );
}
