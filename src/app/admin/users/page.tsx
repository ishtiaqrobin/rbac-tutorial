/**
 * /admin/users — User management panel (Admin only)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * Wrapped in <ProtectedRoute> (auth check) + <RoleGuard allowedRoles={['admin']}>
 * (role check).  The backend independently enforced
 * `requirePermission('manage_users')` on the GET /api/users route.
 */

'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import { UserList } from '@/components/UserList';
import api from '@/lib/api';
import { Role } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export default function AdminUsersPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    api.get('/roles').then((res) => setRoles(res.data.roles));
  }, []);

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin']}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                As an Admin you can view all users and reassign their roles.
              </p>
            </CardHeader>
            <CardContent>
              {roles.length > 0 ? (
                <UserList roles={roles} />
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Spinner />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
