/**
 * UserList.tsx — Admin user-management table with Doodle Aesthetics & Shadcn Select UI
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

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
          <Skeleton key={i} className="h-12 w-full rounded-xl bg-amber-100/50" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-2 border-black rounded-xl bg-red-100 text-[#e05252] font-bold text-base shadow-[2px_2px_0px_0px_#000]">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="font-kalam">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead className="w-44">System Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const currentRole = roles.find(
              (r) => r.id === user.role_id ||
                     r.name.toLowerCase() === (user.role || user.role_name || '').toLowerCase()
            );
            const displayRoleName = currentRole
              ? currentRole.name.toUpperCase()
              : (user.role || user.role_name || 'SELECT ROLE').toUpperCase();

            return (
              <TableRow key={user.id}>
                <TableCell className="font-bold">#{user.id}</TableCell>
                <TableCell className="font-bold text-[#1a1a1a] flex items-center gap-2">
                  <span>👤</span> {user.username}
                </TableCell>
                <TableCell className="font-mono text-sm">{user.email}</TableCell>
                
                {/* Update User Role with Shadcn Select Component */}
                <TableCell className="w-44">
                  <Select
                    value={currentRole ? String(currentRole.id) : ''}
                    onValueChange={(selectedRoleIdStr) => {
                      handleRoleChange(user.id, parseInt(selectedRoleIdStr, 10));
                    }}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Select role">
                        {displayRoleName}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={String(role.id)}>
                          {role.name.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <Badge variant={user.is_active ? 'default' : 'secondary'}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
