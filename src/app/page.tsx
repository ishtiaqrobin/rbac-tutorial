/**
 * Landing page — public facing (role-aware content)
 */

'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { RoleGuard } from '@/components/RoleGuard';
import { PermissionGate } from '@/components/PermissionGate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">RBAC Tutorial</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Role-Based Access Control demonstration with Node.js, PostgreSQL,
        Next.js, and TailwindCSS.
      </p>

      {!user ? (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                You are not logged in.
              </p>
              <Button asChild>
                <Link href="/login">Login to get started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Demo Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Admin → admin@example.com / Admin123!</li>
                <li>Editor → editor@example.com / Editor123!</li>
                <li>Viewer → viewer@example.com / Viewer123!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Welcome back, <strong>{user.email}</strong>.
              </p>
              <p>
                Your role: <Badge variant="outline">{user.role}</Badge>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Your permissions: {user.permissions.join(', ') || '—'}
              </p>
            </CardContent>
          </Card>

          <RoleGuard allowedRoles={['admin']}>
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Admin Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  As an Admin you can manage users, roles, and permissions.
                </p>
                <Button asChild variant="link">
                  <Link href="/admin/users">Go to Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
          </RoleGuard>

          <PermissionGate permission="create_content">
            <Button>
              + Create New Content
            </Button>
          </PermissionGate>

          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
