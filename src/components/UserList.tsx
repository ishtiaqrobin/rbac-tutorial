/**
 * UserList.tsx — Admin user-management table
 *
 * EDUCATIONAL NOTE
 * ----------------
 * This component shows how the frontend uses RBAC to build an
 * admin UI:
 *
 *   1. It only renders for Admins (ProtectedRoute + RoleGuard wrap the page).
 *   2. The data is fetched via the API — the backend already enforced
 *      `requirePermission('manage_users')` before returning the list.
 *   3. Action buttons (edit role, delete) are shown because the user
 *      must already be an Admin to be here.
 */

'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { User, Role } from '../types';

interface UserListProps {
  roles: Role[];  // passed from the server page
}

export function UserList({ roles }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then((res) => setUsers(res.data.users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId: number, newRoleId: number) => {
    try {
      await api.patch(`/users/${userId}/role`, { role_id: newRoleId });
      // Refresh the list
      const res = await api.get('/users');
      setUsers(res.data.users);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update role');
    }
  };

  if (loading) return <p className="text-gray-600">Loading users...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 font-medium">ID</th>
            <th className="text-left py-3 px-4 font-medium">Username</th>
            <th className="text-left py-3 px-4 font-medium">Email</th>
            <th className="text-left py-3 px-4 font-medium">Role</th>
            <th className="text-left py-3 px-4 font-medium">Active</th>
            <th className="text-left py-3 px-4 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-3 px-4">{user.id}</td>
              <td className="py-3 px-4 font-medium">{user.username}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">
                <select
                  value={user.role_id}
                  onChange={(e) => handleRoleChange(user.id, parseInt(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-3 px-4">
                <span className={user.is_active ? 'text-green-600' : 'text-red-600'}>
                  {user.is_active ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
