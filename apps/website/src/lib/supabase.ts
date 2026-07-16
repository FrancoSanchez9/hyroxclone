import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_KEY as string | undefined;

// null sin env vars — el sitio compila y renderiza sin backend, y cada llamada se
// vuelve no-op. Configura .env (ver .env.example) para activar auth y datos.
//
// Este módulo se importa también durante el SSR, donde no hay localStorage. Las
// opciones de auth solo tienen sentido en el navegador: en el servidor apagamos la
// persistencia para no tocar storage inexistente ni intentar leer la URL.
const isBrowser = typeof window !== "undefined";

export const supabase =
  url && key
    ? createClient(url, key, {
        auth: {
          // PKCE en vez del flujo implícito: el token no viaja en el hash de la URL.
          flowType: "pkce",
          persistSession: isBrowser,
          autoRefreshToken: isBrowser,
          // Cierra el flujo OAuth al volver a /auth/callback con ?code=.
          detectSessionInUrl: isBrowser,
        },
      })
    : null;
