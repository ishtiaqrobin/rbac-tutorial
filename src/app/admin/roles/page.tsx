/**
 * /admin/roles — Role & Permission matrix (Admin only) with Doodle Styling
 */

'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import api from '@/lib/api';
import { Role, Permission } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchMatrixData = () => {
    Promise.all([
      api.get('/roles'),
      api.get('/permissions')
    ]).then(([roleRes, permRes]) => {
      const rolesList = roleRes.data?.data?.roles || roleRes.data?.roles || [];
      const permsList = permRes.data?.data?.permissions || permRes.data?.permissions || [];
      setRoles(rolesList);
      setPermissions(permsList);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMatrixData();
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
      fetchMatrixData();
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-kalam">
            <Card className="border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white">
              <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black">
                <Skeleton className="h-8 w-64 rounded-xl bg-amber-100/60" />
                <Skeleton className="h-4 w-96 mt-2 rounded-xl bg-amber-100/60" />
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Skeleton className="h-12 w-full rounded-xl bg-amber-100/60" />
                <Skeleton className="h-48 w-full rounded-xl bg-amber-100/60" />
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-kalam">
          <Card className="border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white">
            <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black">
              <CardTitle className="text-3xl font-bold tracking-tight text-[#1a1a1a] flex items-center gap-2">
                <span>🔑</span> Role &amp; Permission Access Matrix
              </CardTitle>
              <p className="text-base text-gray-700 font-medium mt-1">
                Configure permission mapping for system roles. Toggling permissions updates access dynamically for all users assigned to that role.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48 text-base">Role Name</TableHead>
                    {permissions.map((perm) => (
                      <TableHead key={perm.id} className="text-center text-xs font-bold font-mono uppercase">
                        {perm.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-bold text-[#1a1a1a] flex items-center gap-2 text-base">
                        <span>🏷️</span> {role.name.toUpperCase()}
                      </TableCell>
                      {permissions.map((perm) => {
                        const has = role.permissions?.some((p) => p.id === perm.id);
                        return (
                          <TableCell key={perm.id} className="text-center">
                            <Button
                              variant={has ? 'default' : 'outline'}
                              size="sm"
                              className={`w-9 h-9 p-0 rounded-xl font-bold text-base transition-all ${
                                has
                                  ? 'bg-[#f3b72b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]'
                                  : 'bg-gray-100 text-gray-400 border border-gray-300 shadow-none'
                              }`}
                              onClick={() => togglePermission(role.id, perm.id)}
                              disabled={updating === role.id}
                              title={`${has ? 'Revoke' : 'Grant'} ${perm.name} for ${role.name}`}
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
            </CardContent>
          </Card>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
