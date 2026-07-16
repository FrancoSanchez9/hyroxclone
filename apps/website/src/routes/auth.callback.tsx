import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ACCENT } from "@/lib/theme";

/**
 * Aterrizaje del OAuth de Google. Con flowType 'pkce' Supabase vuelve aquí con
 * `?code=...`; el cliente (detectSessionInUrl) canjea ese código por una sesión de
 * forma asíncrona. Por eso no leemos la sesión de una: esperamos el evento
 * SIGNED_IN / INITIAL_SESSION y recién ahí redirigimos según el rol.
 */
function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    // Capturado en un local: el narrowing de `supabase` no sobrevive dentro de los
    // callbacks diferidos de abajo.
    const client = supabase;
    if (!client) {
      setError("Supabase no está configurado.");
      return;
    }

    // Si el proveedor devolvió un error, viene en la query — no tiene caso esperar.
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get("error_description") ?? params.get("error");
    if (oauthError) {
      setError(oauthError);
      return;
    }

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      if (!session) return; // aún canjeando el código
      const role = session.user.app_metadata?.role === "admin" ? "admin" : "runner";
      void navigate({ to: role === "admin" ? "/admin" : "/dashboard", replace: true });
    });

    // Red de seguridad: si en 10s no hubo sesión, el canje falló silenciosamente.
    const timeout = setTimeout(() => {
      void client.auth.getSession().then(({ data }) => {
        if (!data.session) setError("No pudimos completar el inicio de sesión.");
      });
    }, 10_000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <section
      className="flex min-h-screen w-full flex-col items-center justify-center gap-6 px-6 text-center"
      style={{ background: "linear-gradient(160deg, #000 0%, #0a0a0a 45%, #101204 100%)" }}
    >
      {error ? (
        <>
          <h1
            className="text-4xl uppercase tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Algo salió mal
          </h1>
          <p className="max-w-sm text-sm text-white/55">{error}</p>
          <Link
            to="/auth/login"
            className="text-xs font-bold uppercase tracking-widest text-white/60 underline transition-colors hover:text-white"
          >
            ← Volver a iniciar sesión
          </Link>
        </>
      ) : (
        <>
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: ACCENT }} />
          <p className="text-sm text-white/55">Completando tu inicio de sesión…</p>
        </>
      )}
    </section>
  );
}

export const Route = createFileRoute("/auth/callback")({
  // El canje del código ocurre en el navegador; SSR no tiene nada que aportar.
  ssr: false,
  head: () => ({
    meta: [{ title: "Iniciando sesión | runluv®" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthCallbackPage,
});
