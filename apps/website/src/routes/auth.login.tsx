import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { m } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, MailCheck } from "lucide-react";
import { signInWithPassword, signUpWithPassword, signInWithGoogle, getSession } from "@/lib/auth";
import { ACCENT, EASE } from "@/lib/theme";

type Mode = "signin" | "signup";

const inputCls =
  "w-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-[border-color] duration-150 focus:border-rl-accent focus:outline-none";
const labelCls = "text-[10px] font-bold uppercase tracking-widest text-white/50";

/** Traduce los errores de Supabase (en inglés) a algo legible en español. */
function friendlyError(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  if (/Invalid login credentials/i.test(msg)) return "Correo o contraseña incorrectos.";
  if (/Email not confirmed/i.test(msg))
    return "Confirma tu correo antes de entrar. Revisa tu bandeja.";
  // Supabase rechaza dominios sin registros MX (ej. example.com o dominios inexistentes).
  if (/Email address .* is invalid|email_address_invalid/i.test(msg))
    return "Ese correo no parece válido. Usa una dirección real que puedas revisar.";
  if (/User already registered/i.test(msg)) return "Ese correo ya tiene cuenta. Inicia sesión.";
  if (/Password should be at least/i.test(msg))
    return "La contraseña debe tener al menos 6 caracteres.";
  if (/rate limit|too many/i.test(msg)) return "Demasiados intentos. Espera un momento.";
  return msg;
}

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  const goHome = (role: "admin" | "runner") =>
    navigate({ to: role === "admin" ? "/admin" : "/dashboard" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) return setError("Ingresa un correo válido.");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (mode === "signup" && !name.trim()) return setError("Ingresa tu nombre.");

    setBusy(true);
    try {
      if (mode === "signin") {
        const session = await signInWithPassword(email, password);
        await goHome(session.role);
      } else {
        const { session, needsConfirmation } = await signUpWithPassword(email, password, name);
        // Con confirmación de correo activada no hay sesión todavía: hay que avisar,
        // no redirigir a un panel al que aún no puede entrar.
        if (needsConfirmation || !session) setConfirmSent(true);
        else await goHome(session.role);
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setBusy(true);
    try {
      // Redirige fuera del sitio; no hay nada que hacer después de esta llamada.
      await signInWithGoogle();
    } catch (err) {
      setError(friendlyError(err));
      setBusy(false);
    }
  };

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "linear-gradient(160deg, #000 0%, #0a0a0a 45%, #101204 100%)" }}
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.08), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.03) 119px, rgba(255,255,255,0.03) 120px)",
        }}
      />

      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative z-10 w-full max-w-md"
      >
        {confirmSent ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: ACCENT }}
            >
              <MailCheck size={38} strokeWidth={2.5} className="text-black" />
            </div>
            <h1
              className="text-[clamp(2.2rem,7vw,3.2rem)] leading-[0.9] uppercase tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Confirma tu correo
            </h1>
            <p className="text-sm text-white/55">
              Enviamos un enlace a <span className="font-semibold text-white">{email}</span>. Ábrelo
              para activar tu cuenta y poder entrar.
            </p>
            <button
              type="button"
              onClick={() => {
                setConfirmSent(false);
                setMode("signin");
              }}
              className="text-xs font-bold uppercase tracking-widest text-white/60 underline transition-colors hover:text-white"
            >
              Volver a iniciar sesión
            </button>
          </div>
        ) : (
          <>
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              Área de corredores
            </p>
            <h1
              className="text-[clamp(2.6rem,9vw,4rem)] leading-[0.9] tracking-tight text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {mode === "signin" ? (
                <>
                  Inicia <span style={{ color: ACCENT }}>sesión</span>
                </>
              ) : (
                <>
                  Crea tu <span style={{ color: ACCENT }}>cuenta</span>
                </>
              )}
            </h1>
            <p className="mt-3 text-sm text-white/55">
              {mode === "signin"
                ? "Accede a tu panel para ver tus inscripciones, resultados y tu siguiente desafío."
                : "Regístrate para guardar tus inscripciones y seguir tu pasaporte de circuitos."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              {mode === "signup" && (
                <label className="flex flex-col gap-2">
                  <span className={labelCls}>Nombre</span>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre y apellido"
                      className={inputCls}
                    />
                  </div>
                </label>
              )}

              <label className="flex flex-col gap-2">
                <span className={labelCls}>Correo</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className={inputCls}
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelCls}>Contraseña</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <input
                    type="password"
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputCls}
                  />
                </div>
              </label>

              {error && (
                <p role="alert" className="text-xs text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96] disabled:opacity-60"
                style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Un momento…
                  </>
                ) : (
                  <>
                    {mode === "signin" ? "Entrar" : "Crear cuenta"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                o
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google sign-in */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="flex w-full items-center justify-center gap-3 bg-white px-8 py-4 text-sm font-semibold text-[#1f1f1f] transition-[transform,background-color] duration-[160ms] ease-out-strong hover:bg-white/90 active:scale-[0.96] disabled:opacity-60"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Continuar con Google
            </button>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
              {mode === "signin" ? (
                <span>
                  ¿Sin cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className="underline transition-colors hover:text-white"
                  >
                    Crea una
                  </button>
                </span>
              ) : (
                <span>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError("");
                    }}
                    className="underline transition-colors hover:text-white"
                  >
                    Inicia sesión
                  </button>
                </span>
              )}
              <Link to="/eventos" className="underline transition-colors hover:text-white">
                Ver eventos
              </Link>
            </div>
          </>
        )}
      </m.div>
    </section>
  );
}

export const Route = createFileRoute("/auth/login")({
  // Con SSR a propósito: es una página pública y barata de renderizar. En el
  // servidor getSession() devuelve null (no hay localStorage) y no redirige; el
  // mismo beforeLoad vuelve a correr en el cliente al hidratar, y ahí sí redirige
  // a quien ya tenga sesión. Marcarla ssr:false solo haría que el servidor mandara
  // un placeholder vacío, provocando mismatch al hidratar tras un redirect.
  beforeLoad: async () => {
    const session = await getSession();
    if (session) throw redirect({ to: session.role === "admin" ? "/admin" : "/dashboard" });
  },
  head: () => ({
    meta: [{ title: "Iniciar sesión | runluv®" }],
  }),
  component: LoginPage,
});
