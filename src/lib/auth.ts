/**
 * auth.ts — Frontend authentication & authorization helpers
 *
 * EDUCATIONAL OVERVIEW
 * --------------------
 * This module provides the functions that the React context and
 * components use to:
 *   - login()           — call the backend, store the JWT
 *   - logout()          — clear the JWT
 *   - getCurrentUser()  — decode the stored JWT to read the user's
 *                          role and permissions without calling the API
 *   - hasRole()         — check if the current user has a given role
 *   - hasPermission()   — check if the current user has a given
 *                          permission (used for fine-grained UI gating)
 *
 * IMPORTANT: The role and permissions are read from the JWT payload,
 * which was signed by the backend at login time.  The JWT is the
 * source of truth for authorization on the frontend.  The backend
 * ALSO validates on every API call (defense in depth), so even if a
 * client tampers with localStorage the server will still reject
 * unauthorized requests.
 */

import api from './api';
import { AuthUser } from '../types';

const TOKEN_KEY = 'token';

// ─── Lightweight JWT decoder (no extra dependency) ────────────────────────
// We only need the payload (middle segment) — base64url decode + JSON parse.
//
// IMPORTANT: This runs in the BROWSER (client-side).  We must use
// `atob` (a Web API) instead of `Buffer.from` (a Node.js API),
// because Next.js client components do not have `Buffer` available.
function decodeJwt(token: string): any {
  try {
    const payload = token.split('.')[1];
    // base64url uses - and _ instead of + and /
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Persist the JWT in localStorage after a successful login.
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Retrieve the stored JWT (or null).
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove the JWT — effectively a client-side logout.
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Decode the JWT and reconstruct an AuthUser object.
 * Returns null if there is no token or it is malformed.
 */
export function getCurrentUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;

  const payload = decodeJwt(token);
  if (!payload || !payload.userId) return null;

  return {
    id: payload.userId,
    email: payload.email,
    username: payload.username || '',
    role: payload.role,
    permissions: payload.permissions || []
  };
}

/**
 * Check whether the current user has one of the given roles.
 * Returns true if the user has ANY of the listed roles.
 */
export function hasRole(...roles: string[]): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return roles.includes(user.role);
}

/**
 * Check whether the current user holds a given permission.
 * Permissions come from the JWT's `permissions` array.
 */
export function hasPermission(permission: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return user.permissions.includes(permission);
}

/**
 * Returns true if the user is logged in (has a valid, decodable token).
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// ─── API calls ───────────────────────────────────────────────────────────

/**
 * Call POST /api/auth/login and store the returned token.
 */
export async function login(email: string, password: string): Promise<AuthUser> {
  const response = await api.post('/auth/login', { email, password });
  const { token, user } = response.data;
  setToken(token);

  // The backend returns role/permissions in `user`; the JWT also contains
  // them.  We rely on the JWT (via getCurrentUser) for subsequent checks.
  return getCurrentUser() as AuthUser;
}

/**
 * Remove the token from storage — the caller (context) handles
 * updating React state afterwards.
 */
export function logout(): void {
  removeToken();
}
