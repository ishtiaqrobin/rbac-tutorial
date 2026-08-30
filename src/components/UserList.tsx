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
 *      `requirePermission('manage_users')` on the GET /api/users route.
 */

'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User as UserType, Role } from '@/types';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

interface UserListProps {
  roles: Role[];
}

export function UserList({ roles }: UserListProps) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/users')
      .then((res) => setUsers(res.data.users))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId: number, newRoleId: number) => {
    try {
      await api.patch(`/users/${userId}/role`, { role_id: newRoleId });
      const res = await api.get('/users');
      setUsers(res.data.users);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update role');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <Badge variant={user.is_active ? 'default' : 'secondary'}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
