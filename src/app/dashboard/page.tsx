/**
 * Dashboard main page — Role-aware cards with Handwritten Doodle Aesthetics
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
    <div className="space-y-6 font-kalam">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-2 border-black rounded-2xl bg-white shadow-[4px_4px_0px_0px_#000]">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">
            Dashboard Control <span className="text-[#e05252]">Panel</span>
          </h1>
          <p className="text-gray-600 mt-1 text-base">
            Welcome back, <strong className="text-[#e05252]">{user?.email}</strong>
          </p>
        </div>
        <Badge variant={user?.role === 'admin' ? 'destructive' : 'default'} className="text-base px-4 py-1.5 self-start sm:self-auto">
          ROLE: {user?.role?.toUpperCase()}
        </Badge>
      </div>

      <div className="p-4 border-2 border-dashed border-black rounded-xl bg-white text-base">
        <span className="font-bold">⚡ Active Permissions:</span> {user?.permissions.join(', ') || 'None'}
      </div>

      {/* Role & Permission Gated Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Admin-only card ── */}
        <RoleGuard allowedRoles={['admin']}>
          <Link href="/admin/users">
            <Card className="cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-all border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] bg-red-50">
              <CardHeader>
                <CardTitle className="text-[#e05252] flex items-center gap-2">
                  <span>👥</span> Manage System Users
                </CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  View users, modify system roles, assign permissions, and manage user access status.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </RoleGuard>

        {/* ── Permission-gated: create_content ── */}
        <PermissionGate permission="create_content">
          <Link href="/editor">
            <Card className="cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-all border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-700 flex items-center gap-2">
                  <span>✏️</span> Create New Content
                </CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  Write, compose, and publish new articles, notes, and documentation.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </PermissionGate>

        {/* ── Permission-gated: view_reports ── */}
        <PermissionGate permission="view_reports">
          <Link href="/viewer">
            <Card className="cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-all border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-emerald-700 flex items-center gap-2">
                  <span>📊</span> Analytics &amp; Reports
                </CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  Browse analytics, system reports, performance metrics, and audit logs.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </PermissionGate>

        {/* ── Permission-gated: edit_content ── */}
        <PermissionGate permission="edit_content">
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <span>📝</span> Edit Content
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Modify, update, and manage existing published documents and assets.
              </CardDescription>
            </CardHeader>
          </Card>
        </PermissionGate>

        {/* ── Permission-gated: delete_content ── */}
        <PermissionGate permission="delete_content">
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] bg-rose-100">
            <CardHeader>
              <CardTitle className="text-[#e05252] flex items-center gap-2">
                <span>🗑️</span> Delete Content
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Remove obsolete or flagged content entries permanently.
              </CardDescription>
            </CardHeader>
          </Card>
        </PermissionGate>
      </div>
    </div>
  );
}
