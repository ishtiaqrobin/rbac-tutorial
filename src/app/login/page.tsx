/**
 * Login page
 *
 * EDUCATIONAL FLOW
 * ----------------
 * 1. User enters email + password into the form.
 * 2. `handleSubmit` calls `login()` from AuthContext.
 * 3. AuthContext → apiLogin() → POST /api/auth/login (Axios).
 * 4. Backend verifies the password (bcrypt), looks up role + permissions,
 *    signs a JWT, and returns { token, user }.
 * 5. apiLogin() stores the JWT in localStorage.
 * 6. We redirect to /dashboard.
 * 7. The dashboard page is wrapped in <ProtectedRoute>, which checks
 *    auth state on mount and redirects to /login if no user is found.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.replace('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          RBAC Tutorial — Login
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-600">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <ul className="space-y-1">
            <li>admin@example.com / Admin123!</li>
            <li>editor@example.com / Editor123!</li>
            <li>viewer@example.com / Viewer123!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
