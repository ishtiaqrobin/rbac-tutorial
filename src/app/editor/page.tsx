/**
 * /editor — Content creation & editing (Editor and Admin only) with Doodle Styling
 */

"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PermissionGate } from "@/components/PermissionGate";
import { RoleGuard } from "@/components/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      await api.post("/contents", { title, body });
      setMessage({
        type: "success",
        text: "✅ Article published successfully!",
      });
      setTitle("");
      setBody("");
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to publish article.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["admin", "editor"]}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-kalam space-y-6">
          {/* Header Card */}
          <Card className="border-2 border-black shadow-[6px_6px_0px_0px_#000] rounded-2xl bg-white">
            <CardHeader className="bg-[#f3b72b]/20 border-b-2 border-black">
              <CardTitle className="text-3xl font-bold tracking-tight text-[#1a1a1a] flex items-center gap-2">
                <span>✏️</span> Content Workspace Center
              </CardTitle>
              <p className="text-base text-gray-700 font-medium mt-1">
                You have authorized access to compose, edit, and manage
                application content.
              </p>
            </CardHeader>
          </Card>

          {/* Only users with "create_content" can see this */}
          <PermissionGate permission="create_content">
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-white">
              <CardHeader className="bg-amber-50 border-b-2 border-black">
                <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
                  <span>🚀</span> Create &amp; Publish New Article
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {message && (
                  <div
                    className={`mb-4 p-3 border-2 border-black rounded-xl text-sm font-bold shadow-[2px_2px_0px_0px_#000] ${
                      message.type === "success"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-[#e05252]"
                    }`}
                  >
                    {message.text}
                  </div>
                )}
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-base font-bold mb-1 text-[#1a1a1a]">
                      Article Title
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title for your article..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-bold mb-1 text-[#1a1a1a]">
                      Article Content Body
                    </label>
                    <Textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Write your content here..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-lg"
                    disabled={submitting}
                  >
                    {submitting ? "⏳ Publishing..." : "✨ Publish Article Now"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </PermissionGate>

          {/* Only users with "edit_content" can see this */}
          <PermissionGate permission="edit_content">
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-white">
              <CardHeader className="bg-blue-50 border-b-2 border-black">
                <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
                  <span>📝</span> Modify Existing Articles
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-base text-gray-700 font-medium">
                  Select an article from your published drafts to edit title,
                  body, or tags.
                </p>
              </CardContent>
            </Card>
          </PermissionGate>

          {/* Only users with "delete_content" can see this — i.e. Admin only */}
          <PermissionGate permission="delete_content">
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-2xl bg-red-50">
              <CardHeader className="bg-red-100 border-b-2 border-black">
                <CardTitle className="text-2xl text-[#e05252] flex items-center gap-2">
                  <span>⚠️</span> Admin Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 flex justify-between items-center">
                <p className="text-base text-gray-700 font-medium">
                  Permanently remove selected articles and assets from the
                  system storage.
                </p>
                <Button variant="destructive">🗑️ Delete Selected</Button>
              </CardContent>
            </Card>
          </PermissionGate>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
