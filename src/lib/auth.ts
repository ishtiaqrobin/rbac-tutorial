/**
 * auth.ts — Frontend authentication & authorization helpers
 */

import api from "./api";
import { AuthUser } from "../types";

const TOKEN_KEY = "token";

function decodeJwt(token: string): any {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getCurrentUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;

  const payload = decodeJwt(token);
  if (!payload) return null;

  const userId = payload.userId || payload.id;
  if (!userId) return null;

  return {
    id: userId,
    email: payload.email || "",
    name: payload.name || payload.username || "",
    username: payload.username || payload.name || "",
    role: payload.role || "viewer",
    roleId: payload.roleId,
    permissions: payload.permissions || [],
  };
}

export function hasRole(...roles: string[]): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return roles.map((r) => r.toLowerCase()).includes(user.role.toLowerCase());
}

export function hasPermission(permission: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * fetchCurrentUser — fetch the authenticated user from the backend `/me`
 * endpoint. This relies on the HTTP-Only session/JWT cookies that the backend
 * sets on sign-in, so it works even if localStorage was cleared.
 *
 * Returns null if the user is not authenticated (401).
 */
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await api.get("/auth/me");
    const rawUser = response.data?.data?.user || response.data?.user;
    if (!rawUser) return null;

    return {
      id: rawUser.id,
      email: rawUser.email,
      name: rawUser.name || rawUser.username || "",
      username: rawUser.username || rawUser.name || "",
      role: rawUser.role,
      roleId: rawUser.roleId || rawUser.role_id,
      permissions: rawUser.permissions || [],
    };
  } catch {
    return null;
  }
}

// ─── API calls ───────────────────────────────────────────────────────────

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  const response = await api.post("/auth/sign-in", { email, password });
  const responseData = response.data;

  const token =
    responseData?.data?.accessToken ||
    responseData?.data?.token ||
    responseData?.token;

  if (token) {
    setToken(token);
  }

  const rawUser = responseData?.data?.user || responseData?.user;
  if (rawUser) {
    const authUser: AuthUser = {
      id: rawUser.id,
      email: rawUser.email,
      name: rawUser.name || rawUser.username || "",
      username: rawUser.username || rawUser.name || "",
      role: rawUser.role,
      roleId: rawUser.roleId || rawUser.role_id,
      permissions: rawUser.permissions || [],
    };
    return authUser;
  }

  const decoded = getCurrentUser();
  if (decoded) return decoded;

  throw new Error("Authentication succeeded but user payload is missing.");
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/sign-out");
  } catch {
    // Ignore network / logout endpoint errors
  } finally {
    removeToken();
  }
}
