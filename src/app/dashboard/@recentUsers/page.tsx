/**
 * @recentUsers/page.tsx — Parallel route: Recent Users panel with Doodle aesthetics
 */

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { User as UserType } from "@/types";
import { useAuth } from "@/components/AuthProvider";
import { RoleGuard } from "@/components/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldX } from "lucide-react";

export default function RecentUsersPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data?.data?.users || res.data?.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl bg-amber-100/50" />
          <Skeleton className="h-12 w-full rounded-xl bg-amber-100/50" />
          <Skeleton className="h-12 w-full rounded-xl bg-amber-100/50" />
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <p className="text-base text-gray-500 font-kalam">
          No users registered yet.
        </p>
      );
    }

    return (
      <div className="space-y-3 font-kalam">
        {users.slice(0, 5).map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between p-3 border-2 border-black rounded-xl bg-amber-50/60 shadow-[2px_2px_0px_0px_#000]"
          >
            <div>
              <p className="font-bold text-base text-[#1a1a1a]">
                {u.name || u.username || u.email.split("@")[0]}
              </p>
              <p className="text-xs text-gray-600 font-mono">{u.email}</p>
            </div>
            <Badge
              variant={(u.isActive ?? u.is_active) ? "default" : "secondary"}
              className="text-xs"
            >
              {(u.isActive ?? u.is_active) ? "Active" : "Inactive"}
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <RoleGuard
      allowedRoles={["admin"]}
      fallback={
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-white font-kalam">
          <CardHeader className="bg-gray-100 border-b-2 border-black">
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <ShieldX className="h-5 w-5 text-[#e05252]" />
              Recent Users Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-base text-gray-600">
              {user
                ? `Your current role (${user.role.toUpperCase()}) does not possess admin permission to view recent users.`
                : "Please log in as Admin to inspect registered system users."}
            </p>
          </CardContent>
        </Card>
      }
    >
      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-white font-kalam">
        <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-[#1a1a1a]">
            <span>👥</span> Registered System Users
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">{renderContent()}</CardContent>
      </Card>
    </RoleGuard>
  );
}
