/**
 * Minimal password gate for the admin page. This is intentionally
 * simple and client-side only — swap this out for real auth
 * (JWT/session cookie from the backend team) before going live.
 */

// TODO(backend): replace with a real login endpoint + token.
const ADMIN_PASSWORD = "velvetbrew2026";
const AUTH_KEY = "vb_admin_auth";

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function isAuthed(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
