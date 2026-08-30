/**
 * /viewer — Reports dashboard (Viewer and above only)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * The Viewer role has ONLY the "view_reports" permission.
 * This page demonstrates:
 *   - ProtectedRoute: ensures the user is logged in
 *   - PermissionGate: shows/hides the "Export Data" button based on
 *     the "create_content" permission (only Admin/Editor see it)
 */

'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PermissionGate } from '@/components/PermissionGate';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ViewerPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Reports Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">1,247</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">89</p>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Content Items</p>
                </CardContent>
              </Card>
            </div>

            <PermissionGate
              permission="create_content"
              fallback={
                <p className="text-sm text-muted-foreground italic">
                  (Content creation is restricted to Editors and Admins.)
                </p>
              }
            >
              <Button>
                Export Data
              </Button>
            </PermissionGate>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
