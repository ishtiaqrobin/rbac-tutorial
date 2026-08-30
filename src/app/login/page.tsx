/**
 * Login page — Handwritten Doodle Aesthetics with Quick Role Switcher
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

  const setDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 font-kalam">
      <div className="w-full max-w-md relative">
        
        {/* Sticky Note Accent on Top Left */}
        <div className="absolute -top-4 -left-4 bg-[#fef08a] border-2 border-black shadow-[2px_2px_0px_0px_#000] px-3 py-1 font-bold text-xs -rotate-6 rounded-md z-10">
          LOGIN FORM 🔐
        </div>

        <Card className="w-full border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white">
          <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black pt-8">
            <CardTitle className="text-3xl text-center font-bold tracking-tight text-[#1a1a1a]">
              CRAZY8 <span className="text-[#e05252]">RBAC</span> LOGIN
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            
            {error && (
              <div className="p-3 bg-red-100 border-2 border-black rounded-xl text-[#e05252] text-sm font-bold shadow-[2px_2px_0px_0px_#000]">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-base font-bold mb-1 text-[#1a1a1a]">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-bold mb-1 text-[#1a1a1a]">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full text-lg py-3" disabled={loading}>
                {loading ? '⚡ Authenticating...' : '🚀 Sign In to Account'}
              </Button>
            </form>

            {/* Quick Demo Fill Selector */}
            <div className="pt-4 border-t-2 border-black">
              <h3 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-1">
                <span>⚡</span> Select Demo Role to Auto-fill:
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDemoAccount('admin@example.com', 'Admin123!')}
                  className="p-2 border-2 border-black rounded-xl bg-red-50 hover:bg-red-100 font-bold text-xs shadow-[2px_2px_0px_0px_#000] text-red-700 transition-transform active:translate-y-0.5"
                >
                  🔴 Admin
                </button>

                <button
                  type="button"
                  onClick={() => setDemoAccount('editor@example.com', 'Editor123!')}
                  className="p-2 border-2 border-black rounded-xl bg-blue-50 hover:bg-blue-100 font-bold text-xs shadow-[2px_2px_0px_0px_#000] text-blue-700 transition-transform active:translate-y-0.5"
                >
                  🔵 Editor
                </button>

                <button
                  type="button"
                  onClick={() => setDemoAccount('viewer@example.com', 'Viewer123!')}
                  className="p-2 border-2 border-black rounded-xl bg-emerald-50 hover:bg-emerald-100 font-bold text-xs shadow-[2px_2px_0px_0px_#000] text-emerald-700 transition-transform active:translate-y-0.5"
                >
                  🟢 Viewer
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
