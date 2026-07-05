import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { m } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { login, isAuthenticated, isAdmin } from "@/lib/auth";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const enter = (mail: string, provider: "password" | "google") => {
    const session = login(mail, provider);
    void navigate({ to: session.role === "admin" ? "/admin" : "/dashboard" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Ingresa un correo válido y una contraseña de al menos 4 caracteres.");
      return;
    }
    enter(email, "password");
  };

  const handleGoogle = () => {
    // Mock OAuth — swap for a real Google flow when a backend exists.
    enter("atleta@gmail.com", "google");
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
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
          Área de corredores
        </p>
        <h1
          className="text-[clamp(2.6rem,9vw,4rem)] leading-[0.9] tracking-tight text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Inicia <span style={{ color: ACCENT }}>sesión</span>
        </h1>
        <p className="mt-3 text-sm text-white/55">
          Accede a tu panel para ver tus inscripciones, resultados y tu siguiente desafío.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              Correo
            </span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-[border-color] duration-150 focus:border-[#d4ff00] focus:outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              Contraseña
            </span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-[border-color] duration-150 focus:border-[#d4ff00] focus:outline-none"
              />
            </div>
          </label>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:brightness-95 active:scale-[0.96]"
            style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
          >
            Entrar
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">o</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google sign-in */}
        <button
          type="button"
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-3 bg-white px-8 py-4 text-sm font-semibold text-[#1f1f1f] transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/90 active:scale-[0.96]"
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

        <div className="mt-6 flex items-center justify-between text-xs text-white/50">
          <span>
            ¿Sin cuenta?{" "}
            <Link to="/eventos" className="underline hover:text-white">
              Inscríbete a un evento
            </Link>
          </span>
        </div>

        <p className="mt-8 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/50">
          Demo: cualquier correo y contraseña te dejan entrar; nada se envía a un servidor. Usa un
          correo que contenga "admin" (ej. admin@runluv.mx) para entrar como administrador.
        </p>
      </m.div>
    </section>
  );
}

export const Route = createFileRoute("/auth/login")({
  beforeLoad: () => {
    if (isAuthenticated()) throw redirect({ to: isAdmin() ? "/admin" : "/dashboard" });
  },
  head: () => ({
    meta: [{ title: "Iniciar sesión | runluv®" }],
  }),
  component: LoginPage,
});
