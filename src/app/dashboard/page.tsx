/**
 * Dashboard main page — role-aware cards
 *
 * This page is the `children` slot of the dashboard layout.
 * It no longer needs <ProtectedRoute> — that's handled by the layout.
 *
 * We use <RoleGuard> and <PermissionGate> to show/hide individual
 * cards based on the authenticated user's capabilities.
 */

'use client';

import { RoleGuard } from '@/components/RoleGuard';
import { PermissionGate } from '@/components/PermissionGate';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, <strong>{user?.email}</strong>
          </p>
        </div>
        <Badge variant="outline" className="text-lg">
          Role: {user?.role}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        Your permissions: {user?.permissions.join(', ') || '—'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Admin-only card ── */}
        <RoleGuard allowedRoles={['admin']}>
          <Link href="/admin/users">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-red-600">Manage Users</CardTitle>
                <CardDescription>
                  View, edit roles, and deactivate users.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </RoleGuard>

        {/* ── Permission-gated: create_content ── */}
        <PermissionGate permission="create_content">
          <Link href="/editor">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-amber-600">Create Content</CardTitle>
                <CardDescription>
                  Write and publish new content items.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </PermissionGate>

        {/* ── Permission-gated: view_reports ── */}
        <PermissionGate permission="view_reports">
          <Link href="/viewer">
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-green-600">View Reports</CardTitle>
                <CardDescription>
                  Browse analytics and content reports.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </PermissionGate>

        {/* ── Permission-gated: edit_content ── */}
        <PermissionGate permission="edit_content">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Edit Content</CardTitle>
              <CardDescription>
                Modify existing published content.
              </CardDescription>
            </CardHeader>
          </Card>
        </PermissionGate>

        {/* ── Permission-gated: delete_content ── */}
        <PermissionGate permission="delete_content">
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Delete Content</CardTitle>
              <CardDescription>
                Remove content that is no longer needed.
              </CardDescription>
            </CardHeader>
          </Card>
        </PermissionGate>
      </div>
    </div>
  );
}
