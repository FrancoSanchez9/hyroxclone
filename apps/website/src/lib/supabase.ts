import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// ponytail: null sin env vars — el sitio funciona sin backend y cada llamada
// se vuelve no-op. Configura .env (ver .env.example) para activar la captura.
export const supabase = url && key ? createClient(url, key) : null;
