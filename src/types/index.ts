/**
 * Shared TypeScript types for the RBAC frontend.
 * These mirror the backend's DTOs so that the API contract
 * is documented at both ends.
 */

// ─── Role ────────────────────────────────────────────────────────────────
export interface Role {
  id: number;
  name: string;
  description: string;
  permissions?: Permission[];
}

// ─── Permission ──────────────────────────────────────────────────────────
export interface Permission {
  id: number;
  name: string;
  description: string;
}

// ─── User ────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  username: string;
  email: string;
  role_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role_name?: string;
}

// ─── Auth response (from POST /api/auth/login) ───────────────────────────
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
    permissions: string[];
  };
}

// ─── Authenticated user object (stored in AuthContext) ─────────────────────
export interface AuthUser {
  id: number;
  email: string;
  username: string;
  role: string;
  permissions: string[];
}

// ─── Role-permission assignment payload ──────────────────────────────────
export interface RolePermissionUpdate {
  permissionIds: number[];
}
