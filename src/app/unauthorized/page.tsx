/**
 * /unauthorized — Access Denied Page with Doodle Aesthetics
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
    <div className="min-h-[75vh] flex items-center justify-center px-4 font-kalam">
      <Card className="border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white max-w-md w-full">
        <CardHeader className="bg-red-100 border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-2xl text-[#e05252] font-bold">
            <ShieldX className="h-6 w-6 text-[#e05252]" />
            403 — Restricted Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-base text-gray-700 font-medium">
            {user
              ? `You (${user.email}, role: ${user.role.toUpperCase()}) are authenticated, but lack granted authorization for this restricted route.`
              : 'You must log in to access this page.'}
          </p>
          <Button asChild className="w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
