/**
 * api.ts — Axios instance + typed request helpers
 *
 * EDUCATIONAL NOTE
 * ----------------
 * A single Axios instance centralises:
 *   - The backend base URL
 *   - Automatic injection of the JWT (Authorization header)
 *   - Response/error type-safety
 *
 * The JWT lives in `localStorage` in this demo.  In production you
 * would use an HTTP-only cookie so that the token is never
 * accessible from JavaScript (XSS-safe).  We use localStorage here
 * purely for tutorial simplicity.
 */

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

/**
 * Request interceptor: automatically attach the JWT from
 * localStorage to every outgoing request.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor: globally handle 401 / 403.
 * - 401 → the token is invalid/expired.  Clear it and redirect to login.
 * - 403 → the user is authenticated but lacks permission.  Silently
 *   let the component decide what to show (e.g. an "Access denied" banner).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Only redirect in the browser (not during SSR)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
