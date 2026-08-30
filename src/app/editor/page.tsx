/**
 * /editor — Content creation & editing (Editor and Admin only)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * This page uses PermissionGate to show different sections depending
 * on whether the user can CREATE, EDIT, or DELETE content:
 *   - "create_content" → show the "Create new article" form
 *   - "edit_content"   → show the "Edit existing article" section
 *   - "delete_content" → show the "Bulk delete" section
 *
 * Admin has all three permissions; Editor has create + edit but NOT delete.
 * This demonstrates that RBAC permissions are finer-grained than roles —
 * even though both Admin and Editor can access /editor, the UI adapts
 * to exactly what each role is allowed to do.
 */

'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PermissionGate } from '@/components/PermissionGate';
import { RoleGuard } from '@/components/RoleGuard';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function EditorPage() {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin', 'editor']}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                Hello, you have access to this area.
              </p>
            </CardHeader>
          </Card>

          {/* Only users with "create_content" can see this */}
          <PermissionGate permission="create_content">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Article</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Title" />
                  <Textarea placeholder="Body" rows={5} />
                  <Button type="submit">Publish</Button>
                </form>
              </CardContent>
            </Card>
          </PermissionGate>

          {/* Only users with "edit_content" can see this */}
          <PermissionGate permission="edit_content">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Edit Existing Article</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Select an article from the list below to edit.
                </p>
              </CardContent>
            </Card>
          </PermissionGate>

          {/* Only users with "delete_content" can see this — i.e. Admin only */}
          <PermissionGate permission="delete_content">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">
                  Delete Selected Articles
                </Button>
              </CardContent>
            </Card>
          </PermissionGate>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
