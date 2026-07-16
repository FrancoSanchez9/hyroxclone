// Auth real sobre Supabase. Reemplaza la sesión mock de localStorage.
//
// El rol vive en app_metadata.role — lo firma el servidor dentro del JWT, así que
// el navegador no puede falsificarlo. IMPORTANTE: isAdmin() aquí es SOLO para
// decidir qué UI pintar. La barrera real es el RLS de la base de datos
// (public.is_admin() lee el mismo claim del JWT verificado). Alguien que manipule
// su localStorage puede ver el cascarón del panel admin, pero cada query fallará.
//
// getSession() lee la sesión cacheada sin revalidar la firma contra el servidor;
// es rápido y suficiente para gating de UI. No lo uses para autorizar nada
// sensible — para eso está el RLS.

import { useEffect, useState } from "react";
import type { Session as SupabaseSession } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type Role = "admin" | "runner";

export interface Session {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

/** Falta configurar .env — el sitio compila pero no hay auth. */
class AuthUnavailableError extends Error {
  constructor() {
    super("Supabase no está configurado. Copia .env.example a .env y agrega tus keys.");
    this.name = "AuthUnavailableError";
  }
}

function displayName(email: string, meta: Record<string, unknown> | undefined): string {
  const fromMeta = (meta?.name ?? meta?.full_name) as string | undefined;
  if (fromMeta?.trim()) return fromMeta.trim();
  return email.split("@")[0]?.replace(/[._-]+/g, " ") || "Corredor";
}

function toSession(sb: SupabaseSession | null): Session | null {
  const user = sb?.user;
  if (!user) return null;
  const email = user.email ?? "";
  return {
    userId: user.id,
    email,
    name: displayName(email, user.user_metadata),
    role: user.app_metadata?.role === "admin" ? "admin" : "runner",
  };
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return toSession(data.session);
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}

export async function isAdmin(): Promise<boolean> {
  return (await getSession())?.role === "admin";
}

export async function signInWithPassword(email: string, password: string): Promise<Session> {
  if (!supabase) throw new AuthUnavailableError();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const session = toSession(data.session);
  if (!session) throw new Error("No se pudo iniciar sesión.");
  return session;
}

/**
 * Crea la cuenta. Si el proyecto tiene confirmación de correo activada (default en
 * Supabase), `data.session` viene null y el usuario debe confirmar antes de entrar
 * — por eso devolvemos `needsConfirmation` en vez de asumir que ya hay sesión.
 */
export async function signUpWithPassword(
  email: string,
  password: string,
  name: string,
): Promise<{ session: Session | null; needsConfirmation: boolean }> {
  if (!supabase) throw new AuthUnavailableError();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw error;
  return { session: toSession(data.session), needsConfirmation: data.session === null };
}

/** Redirige a Google; la sesión se resuelve al volver en /auth/callback. */
export async function signInWithGoogle(): Promise<void> {
  if (!supabase) throw new AuthUnavailableError();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Alias — las rutas ya llamaban `logout()`. */
export const logout = signOut;

/**
 * Hook de sesión. `onAuthStateChange` emite INITIAL_SESSION al suscribirse, así que
 * no hace falta un getSession() extra: el primer evento resuelve el estado inicial.
 */
export function useSession(): { session: Session | null; loading: boolean } {
  const [state, setState] = useState<{ session: Session | null; loading: boolean }>({
    session: null,
    loading: true,
  });

  useEffect(() => {
    if (!supabase) {
      setState({ session: null, loading: false });
      return;
    }
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, sb) => {
      setState({ session: toSession(sb), loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);

  return state;
}
