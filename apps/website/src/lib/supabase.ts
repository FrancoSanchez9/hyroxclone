import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_KEY as string | undefined;

// Sin env vars el sitio compila y renderiza sin backend, y cada llamada se vuelve
// no-op. Configura .env (ver .env.example) para activar auth y datos.
//
// El SDK completo se carga sólo cuando una interacción realmente usa auth o datos.
// Así las páginas públicas no descargan Supabase, realtime, storage y postgrest en
// su ruta crítica.
const isBrowser = typeof window !== "undefined";
let clientPromise: Promise<SupabaseClient | null> | undefined;

export function getSupabase(): Promise<SupabaseClient | null> {
  if (!url || !key) return Promise.resolve(null);

  clientPromise ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(url, key, {
      auth: {
        // PKCE en vez del flujo implícito: el token no viaja en el hash de la URL.
        flowType: "pkce",
        persistSession: isBrowser,
        autoRefreshToken: isBrowser,
        // Cierra el flujo OAuth al volver a /auth/callback con ?code=.
        detectSessionInUrl: isBrowser,
      },
    }),
  );

  return clientPromise;
}
