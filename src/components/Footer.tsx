/**
 * Footer.tsx — Handwritten Doodle Style Footer matching mockup aesthetic
 */

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#fdfbf7] border-t-2 border-black text-[#1a1a1a] py-8 relative font-kalam">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Brand info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#f3b72b] border-2 border-black flex items-center justify-center font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
            ⚡
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight">CRAZY8 <span className="text-[#e05252]">RBAC</span></span>
            <p className="text-xs text-gray-600">Role-Based Access Control System</p>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
          <Link href="/" className="hover:text-[#e05252] underline decoration-wavy decoration-transparent hover:decoration-[#e05252] transition-all">
            HOME
          </Link>
          <Link href="/dashboard" className="hover:text-[#e05252] underline decoration-wavy decoration-transparent hover:decoration-[#e05252] transition-all">
            DASHBOARD
          </Link>
          <Link href="/admin/users" className="hover:text-[#e05252] underline decoration-wavy decoration-transparent hover:decoration-[#e05252] transition-all">
            USERS
          </Link>
          <Link href="/admin/roles" className="hover:text-[#e05252] underline decoration-wavy decoration-transparent hover:decoration-[#e05252] transition-all">
            ROLES
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} CRAZY8 RBAC Tutorial. All rights reserved.
        </div>
      </div>

      {/* Powered by MonstarX Badge at fixed bottom-right (matching image mockup) */}
      <div className="mt-6 flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2d3748] text-white text-xs font-sans font-medium px-3 py-1 rounded-lg shadow-md border border-gray-700 inline-flex items-center gap-1">
          <span>Powered by</span>
          <span className="font-bold text-yellow-400">MonstarX</span>
        </div>
      </div>
    </footer>
  );
}
