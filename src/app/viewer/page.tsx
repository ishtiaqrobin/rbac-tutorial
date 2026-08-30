/**
 * /viewer — Reports dashboard (Viewer and above only) with Doodle Aesthetics
 */

'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PermissionGate } from '@/components/PermissionGate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ViewerPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-kalam">
        <Card className="border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white">
          <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black">
            <CardTitle className="text-3xl font-bold tracking-tight text-[#1a1a1a] flex items-center gap-2">
              <span>📊</span> System Analytics &amp; Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-2 border-black bg-amber-50 shadow-[3px_3px_0px_0px_#000] rounded-xl">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-[#1a1a1a]">1,247</p>
                  <p className="text-sm font-bold text-gray-600 mt-1">Total System Users</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-black bg-emerald-50 shadow-[3px_3px_0px_0px_#000] rounded-xl">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-emerald-800">89</p>
                  <p className="text-sm font-bold text-gray-600 mt-1">Active User Sessions</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-black bg-blue-50 shadow-[3px_3px_0px_0px_#000] rounded-xl">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-blue-800">12</p>
                  <p className="text-sm font-bold text-gray-600 mt-1">Published Articles</p>
                </CardContent>
              </Card>
            </div>

            <PermissionGate
              permission="create_content"
              fallback={
                <div className="p-4 border-2 border-dashed border-black rounded-xl bg-gray-50 text-gray-600 text-sm font-bold">
                  ℹ️ Data Export privileges require Editor or Admin permissions.
                </div>
              }
            >
              <Button className="text-base py-2.5">
                📥 Export Analytics Report Data
              </Button>
            </PermissionGate>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
