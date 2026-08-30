/**
 * Landing page — public facing.
 * Shows different content depending on whether the user is logged in
 * and what role they have.
 */

'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import { PermissionGate } from '@/components/PermissionGate';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">RBAC Tutorial</h1>
      <p className="text-lg text-gray-600 mb-8">
        Role-Based Access Control demonstration with Node.js, PostgreSQL,
        Next.js, and TailwindCSS.
      </p>

      {!user ? (
        <div className="space-y-4">
          <p className="text-gray-600">You are not logged in.</p>
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
          >
            Login to get started
          </Link>

          {/* Show dummy credentials for the tutorial */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Demo Accounts</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Admin  → admin@example.com  / Admin123!</li>
              <li>Editor → editor@example.com / Editor123!</li>
              <li>Viewer → viewer@example.com / Viewer123!</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-gray-700">
            Welcome back, <strong>{user.email}</strong>.
          </p>
          <p>
            Your role: <strong className="text-primary">{user.role}</strong>
          </p>
          <p>
            Your permissions:
            <span className="text-sm text-gray-500">
              {' '}{user.permissions.join(', ')}
            </span>
          </p>

          {/* RoleGuard: show admin tools only to admins */}
          <RoleGuard allowedRoles={['admin']}>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800">Admin Panel</h3>
              <p className="text-sm text-red-600 mt-1">
                As an Admin you can manage users, roles, and permissions.
              </p>
              <Link
                href="/admin/users"
                className="inline-block mt-2 text-sm text-red-700 hover:underline"
              >
                Go to Admin Panel →
              </Link>
            </div>
          </RoleGuard>

          {/* PermissionGate: show a content-creation button only to users who can do it */}
          <PermissionGate permission="create_content">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              + Create New Content
            </button>
          </PermissionGate>

          <Link
            href="/dashboard"
            className="inline-block px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
