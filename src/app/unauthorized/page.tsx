/**
 * /unauthorized — Shown when the user is authenticated but lacks
 * the role or permission required for a given action.
 */

'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-800 mb-4">
          403 — Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          {user
            ? `You (${user.email}, role: ${user.role}) are authenticated but do not have the required permissions.`
            : 'You must be logged in to view this page.'}
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
