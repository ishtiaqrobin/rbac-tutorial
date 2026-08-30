/**
 * Landing page — Public facing with role-aware content, designed in exact match to attached mockup image!
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { RoleGuard } from '@/components/RoleGuard';
import { PermissionGate } from '@/components/PermissionGate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user } = useAuth();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const doodleCards = [
    { id: 1, title: 'Lightbulb', icon: '💡', color: 'border-amber-400' },
    { id: 2, title: 'Bot', icon: '🤖', color: 'border-blue-400' },
    { id: 3, title: 'Location', icon: '📍', color: 'border-red-400' },
    { id: 4, title: 'Eyes', icon: '👓', color: 'border-emerald-400' },
    { id: 5, title: 'Analytics', icon: '📊', color: 'border-purple-400' },
    { id: 6, title: 'Heart', icon: '❤️', color: 'border-pink-400' },
    { id: 7, title: 'Globe', icon: '🌐', color: 'border-cyan-400' },
    { id: 8, title: 'Reward', icon: '💰', color: 'border-yellow-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-kalam">
      {/* ================= HERO SECTION (MATCHING ATTACHED IMAGE) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
        
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Dashed Pill Badge */}
          <div className="inline-flex items-center gap-2 border-2 border-dashed border-black rounded-lg px-3.5 py-1 bg-white text-xs font-bold text-[#1a1a1a] shadow-sm">
            <span className="text-amber-500">✏️</span>
            <span>LIVE MULTIPLAYER BRAINSTORMING</span>
          </div>

          {/* Main Title with Red Wavy Accent */}
          <div className="relative inline-block">
            <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-[#1a1a1a]">
              Crazy<span className="text-[#e05252]">8</span>
            </h1>
            {/* Hand-drawn red squiggly underline accent */}
            <svg 
              className="absolute -bottom-3 right-0 w-32 h-4 text-[#e05252]" 
              viewBox="0 0 100 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 12C20 4 35 18 50 10C65 2 80 16 95 8" 
                stroke="currentColor" 
                strokeWidth="6" 
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Tagline */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">
              8 Ideas. 8 Minutes.
            </h2>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e05252] italic">
              Let the best ideas win.
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed max-w-lg font-medium">
            Bring people into a room, give them a challenge, and let the ideas fly.
            Generate, vote, discover, and prioritize the best ideas together.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {!user ? (
              <>
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#f3b72b] hover:bg-[#eab308] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] transition-all rounded-xl px-7 py-3 text-lg"
                >
                  <Link href="/login">START A CRAZY8</Link>
                </Button>
                
                <Button 
                  asChild
                  variant="dashed"
                  size="lg"
                  className="px-7 py-3 text-lg font-bold"
                >
                  <Link href="/login">JOIN A CRAZY8</Link>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#f3b72b] hover:bg-[#eab308] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] transition-all rounded-xl px-7 py-3 text-lg"
                >
                  <Link href="/dashboard">GO TO DASHBOARD</Link>
                </Button>
                
                <RoleGuard allowedRoles={['admin']}>
                  <Button 
                    asChild
                    variant="outline"
                    size="lg"
                    className="px-7 py-3 text-lg font-bold"
                  >
                    <Link href="/admin/users">ADMIN PANEL</Link>
                  </Button>
                </RoleGuard>
              </>
            )}
          </div>

          {/* Demo Link */}
          <div className="pt-1">
            <a 
              href="#demo" 
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a1a1a] hover:text-[#e05252] transition-colors group"
            >
              <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-xs group-hover:bg-[#f3b72b]">
                ▶
              </span>
              <span className="underline decoration-wavy underline-offset-2">Watch a 60-second demo</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hand-Drawn Interactive Sketchboard Illustration */}
        <div className="lg:col-span-6 relative">
          
          {/* Main Outer Sketch Container */}
          <div className="relative border-2 border-black rounded-2xl bg-white p-6 shadow-[6px_6px_0px_0px_#000] transition-all">
            
            {/* Binder Spiral Ring Decoration on Left */}
            <div className="absolute left-2 top-8 bottom-8 flex flex-col justify-between z-10">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full border-2 border-black bg-[#fdfbf7] shadow-inner" />
              ))}
            </div>

            {/* Inner Interactive Board */}
            <div className="ml-5 border-2 border-black rounded-xl p-4 bg-[#fffdfa] relative">
              
              {/* Board Header */}
              <div className="flex justify-between items-center mb-4 border-b-2 border-black/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#1a1a1a] font-bold text-[#e05252]">⤶</span>
                  <span className="text-xl font-bold tracking-wider underline decoration-[#e05252] decoration-wavy">
                    CRAZY8
                  </span>
                  <span className="text-[#1a1a1a] font-bold text-[#e05252]">⤷</span>
                </div>

                {/* Timer Badge */}
                <div className="flex items-center gap-1 border-2 border-black bg-[#f3b72b] px-3 py-0.5 rounded-lg text-sm font-bold shadow-[2px_2px_0px_0px_#000]">
                  <span>🕒</span>
                  <span>08:00</span>
                </div>
              </div>

              {/* 8 Doodle Cards Grid (4x2) */}
              <div className="grid grid-cols-4 gap-3">
                {doodleCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card.id)}
                    className={`relative border-2 border-black rounded-xl p-2 bg-white flex flex-col items-center justify-center h-24 hover:scale-105 transition-all shadow-[2px_2px_0px_0px_#000] ${
                      selectedCard === card.id ? 'bg-amber-100 ring-2 ring-black' : ''
                    }`}
                  >
                    {/* Circle Number Top-Left */}
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full border border-black text-[10px] font-bold flex items-center justify-center bg-amber-50">
                      {card.id}
                    </div>
                    <div className="text-2xl mt-1">{card.icon}</div>
                    <span className="text-[10px] font-bold mt-1 text-gray-700">{card.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Notes Attachments matching image */}
            {/* Sticky Note 1: SKETCH (Top Left) */}
            <div className="absolute -top-3 -left-3 bg-[#fef08a] border-2 border-black shadow-[2px_2px_0px_0px_#000] px-3 py-1 font-bold text-xs -rotate-6 rounded-md">
              SKETCH ✏️
            </div>

            {/* Sticky Note 2: VOTE (Right Edge) */}
            <div className="absolute top-1/3 -right-4 bg-[#3b82f6] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] px-3 py-2 font-bold text-xs rotate-6 rounded-lg flex flex-col items-center">
              <span>VOTE</span>
              <span className="text-xs">☑️</span>
            </div>

            {/* Sticky Note 3: WIN (Bottom Right) */}
            <div className="absolute -bottom-4 right-8 bg-[#ec4899] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] px-4 py-2 font-bold text-xs -rotate-3 rounded-lg flex flex-col items-center">
              <span>WIN</span>
              <span className="text-sm">🍷</span>
            </div>
          </div>

          {/* Underneath sketch page decorative shadow card */}
          <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-black bg-[#fef08a]/40 rounded-2xl -z-10" />
        </div>
      </div>

      {/* ================= RBAC SYSTEM STATUS & DEMO ACCOUNTS ================= */}
      <div className="mt-16 space-y-8">
        {!user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status Card */}
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-white">
              <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black">
                <CardTitle className="flex items-center gap-2">
                  <span>🔒</span> System Access Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-base text-gray-700">
                  You are currently browsing as a <strong>Guest User</strong>. Login to experience full Role-Based Access Control features.
                </p>
                <Button asChild className="w-full">
                  <Link href="/login">🔑 Login to Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Demo Accounts Card */}
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-white">
              <CardHeader className="bg-amber-100 border-b-2 border-black">
                <CardTitle className="flex items-center gap-2">
                  <span>👥</span> Quick Demo Credentials
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="p-3 border-2 border-black rounded-xl bg-red-50 flex justify-between items-center">
                    <div>
                      <Badge variant="destructive">Admin</Badge>
                      <p className="text-xs text-gray-600 mt-1 font-mono">admin@example.com / Admin123!</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500">Full Access</span>
                  </div>

                  <div className="p-3 border-2 border-black rounded-xl bg-blue-50 flex justify-between items-center">
                    <div>
                      <Badge variant="default">Editor</Badge>
                      <p className="text-xs text-gray-600 mt-1 font-mono">editor@example.com / Editor123!</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500">Content Access</span>
                  </div>

                  <div className="p-3 border-2 border-black rounded-xl bg-emerald-50 flex justify-between items-center">
                    <div>
                      <Badge variant="outline">Viewer</Badge>
                      <p className="text-xs text-gray-600 mt-1 font-mono">viewer@example.com / Viewer123!</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500">Read Only</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">
                      Welcome back, <span className="text-[#e05252]">{user.email}</span>!
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-gray-600">Assigned Role:</span>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                        {user.role.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Granted Permissions:</strong> {user.permissions.join(', ') || '—'}
                    </p>
                  </div>

                  <Button asChild>
                    <Link href="/dashboard">📊 Open Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Role Gated Admin Panel Link */}
            <RoleGuard allowedRoles={['admin']}>
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-red-50">
                <CardHeader>
                  <CardTitle className="text-[#e05252] flex items-center gap-2">
                    <span>👑</span> Admin Control Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-700 mb-4">
                    As an Admin, you possess full privilege to manage system users, roles, and granular permissions.
                  </p>
                  <Button asChild variant="destructive">
                    <Link href="/admin/users">Manage System Users & Roles →</Link>
                  </Button>
                </CardContent>
              </Card>
            </RoleGuard>

            {/* Permission Gated Action */}
            <PermissionGate permission="create_content">
              <div className="p-4 border-2 border-black rounded-xl bg-amber-100 shadow-[3px_3px_0px_0px_#000] flex justify-between items-center">
                <span className="font-bold text-lg">⚡ Content Creator Privileges Active</span>
                <Button className="bg-[#f3b72b] text-black">
                  + Create New Content
                </Button>
              </div>
            </PermissionGate>
          </div>
        )}
      </div>
    </div>
  );
}
