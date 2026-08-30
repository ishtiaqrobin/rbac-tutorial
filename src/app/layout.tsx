/**
 * Root layout — wraps every page with the AuthProvider and shared styles.
 *
 * EDUCATIONAL NOTE
 * ----------------
 * The <AuthProvider> wraps ALL routes so that every component in the
 * tree can call `useAuth()`.  Without this, the context would be
 * undefined and `useAuth()` would throw.
 *
 * The <Navbar> is also rendered here so it appears on every page
 * and always reflects the current auth state.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RBAC Tutorial — Role-Based Access Control Demo',
  description: 'Demonstrating RBAC with Node.js, PostgreSQL, Next.js, and TailwindCSS'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AuthProvider makes user/login/logout available app-wide */}
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50 pb-12">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
