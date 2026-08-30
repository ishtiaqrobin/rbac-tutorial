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

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

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
    // Optimistically update UI, then call the API.
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
      // Refresh roles
      const res = await api.get('/roles');
      setRoles(res.data.roles);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update permissions');
    }
  };

  if (loading) return <p className="max-w-6xl mx-auto py-8">Loading roles...</p>;

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin']}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Roles &amp; Permissions</h1>
          <p className="text-gray-600 mb-6">
            Manage which permissions each role grants. Changes apply
            to all users with that role instantly.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  {permissions.map((perm) => (
                    <th key={perm.id} className="text-center py-3 px-2 font-medium text-xs text-gray-600">
                      {perm.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-t">
                    <td className="py-3 px-4 font-medium">{role.name}</td>
                    {permissions.map((perm) => {
                      const has = role.permissions?.some((p) => p.id === perm.id);
                      return (
                        <td key={perm.id} className="text-center py-3">
                          <button
                            onClick={() => togglePermission(role.id, perm.id)}
                            className={
                              has
                                ? 'text-green-600 hover:text-green-800'
                                : 'text-gray-300 hover:text-gray-500'
                            }
                            title={has ? 'Revoke' : 'Grant'}
                          >
                            {has ? '✓' : '✕'}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
