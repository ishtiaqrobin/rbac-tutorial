/**
 * /unauthorized — Shown when the user is authenticated but lacks
 * the role or permission required for a given action.
 */

'use client';

import { ShieldX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="border-destructive/50 max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <ShieldX className="h-5 w-5" />
            403 — Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {user
              ? `You (${user.email}, role: ${user.role}) are authenticated but do not have the required permissions.`
              : 'You must be logged in to view this page.'}
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
