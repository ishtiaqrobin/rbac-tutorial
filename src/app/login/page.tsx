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
 * 7. The dashboard layout wraps content in <ProtectedRoute>, which
 *    checks auth state and redirects to /login if no user is found.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            RBAC Tutorial — Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Demo Accounts</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>Admin → admin@example.com / Admin123!</li>
              <li>Editor → editor@example.com / Editor123!</li>
              <li>Viewer → viewer@example.com / Viewer123!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
