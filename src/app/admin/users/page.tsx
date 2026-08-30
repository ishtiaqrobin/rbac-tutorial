/**
 * /admin/users — User management panel (Admin only)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * This page demonstrates the FULL RBAC flow on the frontend:
 *
 *   1. <ProtectedRoute> ensures the user is authenticated.
 *   2. <RoleGuard allowedRoles={['admin']}> ensures the user is an Admin.
 *      If not, RoleGuard renders its fallback (an "Access Denied" message).
 *
 *    If BOTH checks pass, we fetch the role list and the user list from
 *    the backend.  The backend independently enforced
 *    `requirePermission('manage_users')` on the GET /api/users route,
 *    so even if this guard were bypassed, the API would return 403.
 */

'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import { UserList } from '@/components/UserList';
import api from '@/lib/api';
import { Role } from '@/types';

export default function AdminUsersPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    // Fetch the list of roles for the role-assignment dropdown.
    api.get('/roles').then((res) => setRoles(res.data.roles));
  }, []);

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin']}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>
          <p className="text-gray-600 mb-6">
            As an Admin you can view all users and reassign their roles.
          </p>
          <UserList roles={roles} />
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
