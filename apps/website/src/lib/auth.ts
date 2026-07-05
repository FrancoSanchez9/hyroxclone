// Mock client-side auth for the demo dashboard. No backend, no real credentials —
// a localStorage flag gates the dashboard. Swap for a real provider later.
// ponytail: localStorage session, replace with real auth (OAuth/JWT) when a backend exists.

const KEY = "runluv_session";

export type Role = "admin" | "runner";
export type Provider = "password" | "google";

export interface Session {
  email: string;
  name: string;
  role: Role;
  provider: Provider;
}

export function login(email: string, provider: Provider = "password"): Session {
  const name = email.split("@")[0].replace(/[._-]+/g, " ") || "Corredor";
  // Demo rule: any email containing "admin" gets the admin role.
  const role: Role = email.toLowerCase().includes("admin") ? "admin" : "runner";
  const session: Session = { email, name, role, provider };
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function isAdmin(): boolean {
  return getSession()?.role === "admin";
}
