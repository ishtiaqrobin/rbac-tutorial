/**
 * dashboard/loading.tsx — Loading state for the dashboard route
 *
 * EDUCATIONAL NOTE
 * ----------------
 * In the App Router, if a page (or its parent layout) takes longer
 * to render than the instant threshold, Next.js automatically shows
 * the nearest `loading.tsx` as a fallback.
 *
 * This is useful because our dashboard fetches user data from the API
 * on mount — while that request is in flight, we show skeleton loaders
 * instead of a blank screen. The React `Skeleton` component from
 * ShadcnUI gives a nice "content is loading" placeholder.
 *
 * Because of parallel routing, this loading state applies to BOTH
 * the main dashboard content AND the @recentUsers panel simultaneously
 * — or independently if only one is slow.
 */

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-48" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent users panel skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
