/**
 * /admin/users — User management panel (Admin only) with Doodle Styling
 */

'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import { UserList } from '@/components/UserList';
import api from '@/lib/api';
import { Role } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminUsersPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    api.get('/roles').then((res) => setRoles(res.data.roles));
  }, []);

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin']}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-kalam">
          <Card className="border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white">
            <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black">
              <CardTitle className="text-3xl font-bold tracking-tight text-[#1a1a1a] flex items-center gap-2">
                <span>👑</span> User Management Center
              </CardTitle>
              <p className="text-base text-gray-700 font-medium">
                As an Admin, view registered users, modify assigned system roles, and update active privileges.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              {roles.length > 0 ? (
                <UserList roles={roles} />
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin text-3xl">⚡</div>
                  <span className="ml-3 font-bold text-lg">Loading roles matrix...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
