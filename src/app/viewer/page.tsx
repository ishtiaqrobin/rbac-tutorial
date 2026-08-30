/**
 * /viewer — Reports dashboard (Viewer and above only)
 *
 * EDUCATIONAL NOTE
 * ----------------
 * The Viewer role has ONLY the "view_reports" permission.
 * This page confirms that a Viewer can access reports but cannot
 * see any admin or editor sections.  The PermissionGate ensures
 * the content-creation buttons don't even render.
 */

'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PermissionGate } from '@/components/PermissionGate';
import { useAuth } from '@/components/AuthProvider';

export default function ViewerPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports Dashboard</h1>
        <PermissionGate permission="view_reports">
          <p className="text-gray-600 mb-6">
            Here are the latest reports and analytics.
          </p>
        </PermissionGate>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <p className="text-3xl font-bold text-primary">1,247</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <p className="text-3xl font-bold text-primary">89</p>
            <p className="text-sm text-gray-500">Active Sessions</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-gray-500">Content Items</p>
          </div>
        </div>

        {/* This button is hidden from Viewers because they lack "create_content" */}
        <PermissionGate permission="create_content" fallback={
          <p className="text-sm text-gray-400 italic">
            (Content creation is restricted to Editors and Admins.)
          </p>
        }>
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            Export Data
          </button>
        </PermissionGate>
      </div>
    </ProtectedRoute>
  );
}
