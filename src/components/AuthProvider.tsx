/**
 * AuthProvider.tsx — Global authentication context
 *
 * EDUCATIONAL OVERVIEW
 * --------------------
 * AuthProvider wraps the entire application (see RootLayout) and makes
 * four things available to every component via React Context:
 *
 *   1. `user`         — the decoded JWT payload (id, email, role, permissions)
 *   2. `loading`      — true while we're checking if a session exists
 *   3. `login(email, password)` — calls the backend, stores the token,
 *                                and updates `user`
 *   4. `logout()`     — removes the token and resets `user` to null
 *
 * HOW IT WORKS:
 *   - On mount, we call getCurrentUser() which reads the JWT from
 *     localStorage and decodes it.  If a valid token exists, `user`
 *     is populated immediately (no API round-trip needed).
 *   - `login()` stores the token then re-reads it so the context
 *     state stays in sync with what's in localStorage.
 *   - `logout()` clears the token and sets `user` to null.
 *
 * Why Context?  It re-renders any descendant component that calls
 * useContext(AuthContext) when `user` changes, so the navbar, route
 * guards, and permission-gated buttons all react instantly.
 */

"use client"; // This component uses useState / useEffect — must be a client component.

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { AuthUser } from "../types";
import {
  getCurrentUser,
  fetchCurrentUser,
  login as apiLogin,
  logout as apiLogout,
} from "../lib/auth";

// ─── Context shape ────────────────────────────────────────────────────────
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value of `undefined` so we can
// detect when a component tries to use it outside of a provider.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider component ───────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: check for an existing session.
  // 1. Try the backend `/me` endpoint (uses HTTP-Only cookies set on sign-in).
  // 2. Fall back to the decoded JWT stored in localStorage.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Prefer the server-side session (HTTP-Only cookie) for accuracy.
      const serverUser = await fetchCurrentUser();
      if (cancelled) return;

      if (serverUser) {
        setUser(serverUser);
      } else {
        // Fall back to the localStorage JWT (legacy / offline path).
        const stored = getCurrentUser();
        if (stored) setUser(stored);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * login():
   *   1. Calls the backend (POST /auth/sign-in).
   *   2. The backend sets HTTP-Only cookies (session + JWT) and returns the
   *      user profile + access token.
   *   3. apiLogin() stores the access token in localStorage (backup) and
   *      returns the user object.
   *   4. We update React state.
   */
  const handleLogin = async (email: string, password: string) => {
    const authUser = await apiLogin(email, password);
    setUser(authUser);
  };

  /**
   * logout():
   *   1. apiLogout() calls the backend to clear the session + removes the
   *      token from localStorage.
   *   2. We reset React state so all consumers re-render.
   */
  const handleLogout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Convenience hook ─────────────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
