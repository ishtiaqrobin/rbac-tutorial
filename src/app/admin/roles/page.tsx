/**
 * /admin/roles — Role & Permission matrix (Admin only)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * This page displays the entire permission matrix: for every role,
 * which permissions does it grant?
 *
 * The data comes from GET /api/roles (protected by requireRole('admin')
 * on the backend).  The table shows checkmarks for granted permissions
 * and lets admins toggle them (PUT /api/roles/:id/permissions).
 *
 * This is the heart of RBAC administration: you don't edit each user's
 * permissions individually.  Instead you adjust the ROLE's permission
 * set, and every user with that role instantly inherits the change.
 */

'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import api from '@/lib/api';
import { Role, Permission } from '@/types';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      api.get('/roles'),
      api.get('/permissions')
    ]).then(([roleRes, permRes]) => {
      setRoles(roleRes.data.roles);
      setPermissions(permRes.data.permissions);
      setLoading(false);
    });
  }, []);

  const togglePermission = async (roleId: number, permissionId: number) => {
    setUpdating(roleId);
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;

    const rolePerms = role.permissions || [];
    const has = rolePerms.some((p) => p.id === permissionId);
    const newPermIds = rolePerms
      .filter((p) => p.id !== permissionId)
      .map((p) => p.id);
    if (!has) newPermIds.push(permissionId);

    try {
      await api.put(`/roles/${roleId}/permissions`, { permissionIds: newPermIds });
      const res = await api.get('/roles');
      setRoles(res.data.roles);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update permissions');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['admin']}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-64 mt-1" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-64 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </RoleGuard>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin']}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Roles &amp; Permissions</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage which permissions each role grants. Changes apply
                to all users with that role instantly.
              </p>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      {permissions.map((perm) => (
                        <TableHead key={perm.id} className="text-center text-xs">
                          {perm.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        {permissions.map((perm) => {
                          const has = role.permissions?.some((p) => p.id === perm.id);
                          return (
                            <TableCell key={perm.id} className="text-center">
                              <Button
                                variant={has ? 'ghost' : 'ghost'}
                                size="sm"
                                className={has ? 'text-green-600' : 'text-muted-foreground'}
                                onClick={() => togglePermission(role.id, perm.id)}
                                disabled={updating === role.id}
                              >
                                {has ? '✓' : '✕'}
                              </Button>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
