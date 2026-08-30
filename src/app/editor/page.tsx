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

export default function EditorPage() {
  return (
    <ProtectedRoute>
      {/* Both Admin and Editor can access this page */}
      <RoleGuard allowedRoles={['admin', 'editor']}>
        <EditorContent />
      </RoleGuard>
    </ProtectedRoute>
  );
}

function EditorContent() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
      <p className="text-gray-600 mb-6">
        Hello, {user?.email}. Your role: {user?.role}
      </p>

      {/* Only users with "create_content" can see this */}
      <PermissionGate permission="create_content">
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Create New Article</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Body"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Publish
            </button>
          </form>
        </section>
      </PermissionGate>

      {/* Only users with "edit_content" can see this */}
      <PermissionGate permission="edit_content">
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Edit Existing Article</h2>
          <p className="text-gray-500">Select an article from the list below to edit.</p>
        </section>
      </PermissionGate>

      {/* Only users with "delete_content" can see this — i.e. Admin only */}
      <PermissionGate permission="delete_content">
        <section className="p-6 bg-white rounded-lg shadow border-red-200">
          <h2 className="text-xl font-semibold text-red-800 mb-3">Danger Zone</h2>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Delete Selected Articles
          </button>
        </section>
      </PermissionGate>
    </div>
  );
}
