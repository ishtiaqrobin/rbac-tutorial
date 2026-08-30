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
  id: string | number;
  name?: string;
  username?: string;
  email: string;
  role_id?: number;
  roleId?: number;
  is_active?: boolean;
  isActive?: boolean;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  role_name?: string;
  role?: string;
}

// ─── Auth response ───────────────────────────────────────────────────────
export interface LoginResponse {
  accessToken?: string;
  token?: string;
  user: {
    id: string | number;
    name?: string;
    username?: string;
    email: string;
    role: string;
    roleId?: number;
    permissions: string[];
  };
}

// ─── Authenticated user object (stored in AuthContext) ─────────────────────
export interface AuthUser {
  id: string | number;
  email: string;
  name?: string;
  username?: string;
  role: string;
  roleId?: number;
  permissions: string[];
}

// ─── Role-permission assignment payload ──────────────────────────────────
export interface RolePermissionUpdate {
  permissionIds: number[];
}
