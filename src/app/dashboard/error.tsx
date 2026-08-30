/**
 * app/dashboard/error.tsx — Error boundary for the dashboard subtree
 *
 * EDUCATIONAL NOTE
 * ----------------
 * Next.js App Router provides an `error.tsx` file that acts as a
 * React Error Boundary for its folder and all descendants.
 *
 * If any component in /dashboard/ (including the @recentUsers parallel
 * route) throws an error during render, data fetching, or navigation,
 * this boundary catches it and shows a friendly message with a
 * "Try again" button instead of crashing the whole app.
 *
 * The `reset` function (provided by Next.js) re-renders the subtree
 * from the last successful state, giving users a one-click recovery.
 */

'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCw } from 'lucide-react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: Props) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            An error occurred while loading the dashboard. Please try again.
          </p>
          <p className="text-xs text-muted-foreground break-all">
            {error.message}
          </p>
          <Button onClick={reset} variant="outline">
            <RotateCw className="h-4 w-4 mr-2" />
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
