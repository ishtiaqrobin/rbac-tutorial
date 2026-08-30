/**
 * @recentUsers/page.tsx — Parallel route: Recent Users panel
 *
 * EDUCATIONAL NOTE
 * ----------------
 * This is a PARALLEL ROUTE.  It lives in `@recentUsers/` and is
 * rendered as the `recentUsers` prop in the dashboard layout.
 *
 * The key property of parallel routes is INDEPENDENT LOADING:
 *   - If this component is slow (API call takes time), the main
 *     dashboard (children) is still fully interactive.
 *   - The loading.tsx in the dashboard folder shows a skeleton
 *     while this panel fetches data.
 *
 * This component is Admin-only; other roles see a friendly message.
 */

'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User as UserType } from '@/types';
import { useAuth } from '@/components/AuthProvider';
import { RoleGuard } from '@/components/RoleGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldX } from 'lucide-react';

export default function RecentUsersPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then((res) => setUsers(res.data.users))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      );
    }

    if (users.length === 0) {
      return <p className="text-sm text-muted-foreground">No users found.</p>;
    }

    return (
      <div className="space-y-3">
        {users.slice(0, 5).map((u) => (
          <div key={u.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{u.username}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
            <Badge variant={u.is_active ? 'default' : 'secondary'}>
              {u.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <RoleGuard
      allowedRoles={['admin']}
      fallback={
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldX className="h-5 w-5 text-muted-foreground" />
              Recent Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {user
                ? `Your role (${user.role}) does not have permission to view the user list.`
                : 'You must be logged in to view this panel.'}
            </p>
          </CardContent>
        </Card>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </RoleGuard>
  );
}
