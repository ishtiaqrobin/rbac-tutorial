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
import { Kalam } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
});

export const metadata: Metadata = {
  title: 'CRAZY8 RBAC Tutorial — Role-Based Access Control',
  description: 'Demonstrating RBAC with Node.js, PostgreSQL, Next.js, and TailwindCSS'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={kalam.variable}>
      <body className={`${kalam.className} bg-[#fdfbf7] text-[#1a1a1a] min-h-screen flex flex-col antialiased selection:bg-[#f3b72b] selection:text-black`}>
        {/* AuthProvider makes user/login/logout available app-wide */}
        <AuthProvider>
          <Navbar />
          <main className="flex-1 bg-[#fdfbf7] pb-12">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
