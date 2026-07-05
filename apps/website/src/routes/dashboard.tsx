import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { m } from "framer-motion";
import {
  Calendar,
  MapPin,
  LogOut,
  Compass,
  Trophy,
  Ticket,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { getSession, logout, isAuthenticated, isAdmin } from "@/lib/auth";
import { getNextEvent, seasonCircuits } from "@/data/events";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
function longDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function DashboardPage() {
  const navigate = useNavigate();
  const session = getSession();
  const nextEvent = getNextEvent();
  // ponytail: sin backend aún no hay historial de carreras — 0 sellos por ahora.
  const stampedCircuits = 0;

  const handleLogout = () => {
    logout();
    void navigate({ to: "/auth/login" });
  };

  const shortcuts = [
    { Icon: Compass, label: "¿Cuál es tu reto?", sub: "Descúbrelo en 2 minutos", to: "/tu-nivel" },
    { Icon: Ticket, label: "Inscripciones", sub: "Elige tu carrera", to: "/eventos" },
    { Icon: Trophy, label: "Ranking", sub: "Resultados oficiales", to: "/ranking" },
  ] as const;

  return (
    <div
      className="min-h-screen px-6 pb-24 pt-32 md:pt-36"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 70%, #101204 100%)" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              Tu panel
            </p>
            <h1
              className="text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.9] tracking-tight text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Hola, <span style={{ color: ACCENT }}>{session?.name ?? "corredor"}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin() && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.96]"
                style={{ background: ACCENT }}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Panel admin
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/60 transition-[border-color,color] duration-150 hover:border-white/50 hover:text-white active:scale-[0.96]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </button>
          </div>
        </m.div>

        {/* Next race */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="relative mt-10 overflow-hidden border border-white/10"
        >
          {nextEvent.imageUrl && (
            <img
              src={nextEvent.imageUrl}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-25 grayscale"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          <div className="relative z-10 flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.25em]"
                style={{ color: ACCENT }}
              >
                Tu próxima carrera
              </p>
              <h2
                className="mt-1 text-4xl uppercase leading-none tracking-wide text-white sm:text-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {nextEvent.name}
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" style={{ color: ACCENT }} />
                  {longDate(nextEvent.date)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: ACCENT }} />
                  {nextEvent.venue}, {nextEvent.city}
                </span>
              </div>
            </div>
            <Link
              to={nextEvent.registrationUrl}
              className="inline-flex shrink-0 items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] hover:brightness-95 active:scale-[0.96]"
              style={{ background: ACCENT }}
            >
              Ver evento
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </m.div>

        {/* Shortcuts */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {shortcuts.map((s, i) => (
            <m.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: EASE }}
            >
              <Link
                to={s.to}
                className="group flex h-full flex-col gap-3 border border-white/10 border-t-2 border-t-transparent bg-white/[0.03] p-6 transition-colors duration-200 hover:border-t-[#d4ff00]"
              >
                <s.Icon size={26} style={{ color: ACCENT }} aria-hidden="true" />
                <div>
                  <h3
                    className="text-xl uppercase leading-none tracking-wide text-white transition-colors duration-200 group-hover:text-[#d4ff00]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {s.label}
                  </h3>
                  <p className="mt-1 text-xs text-white/50">{s.sub}</p>
                </div>
              </Link>
            </m.div>
          ))}
        </div>

        {/* Season passport — 5 Circuitos */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          className="mt-6 border border-white/10 bg-white/[0.03] p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.25em]"
                style={{ color: ACCENT }}
              >
                Pasaporte runluv®
              </p>
              <h2
                className="mt-1 text-3xl uppercase leading-none tracking-wide text-white sm:text-4xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                5 Circuitos
              </h2>
            </div>
            {/* ponytail: 0 sellado — enchufar al historial de inscripciones cuando exista backend. */}
            <span className="text-sm font-bold uppercase tracking-widest text-white/50">
              {stampedCircuits}/{seasonCircuits.length} sellados
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {seasonCircuits.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center gap-2 border border-dashed border-white/15 py-4 text-center"
              >
                <MapPin className="h-5 w-5 text-white/30" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wide text-white/70">
                  {c.city}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/50">
            Corre las 5 paradas de la temporada y sella tu pasaporte.{" "}
            <Link
              to="/checkout"
              search={{ event: "pase-temporada-2026", division: "", category: "", qty: 1 }}
              className="underline hover:text-white"
              style={{ color: ACCENT }}
            >
              Consigue el pase de temporada
            </Link>
            .
          </p>
        </m.div>

        {/* Placeholder state */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 border border-dashed border-white/15 p-8 text-center"
        >
          <p className="text-sm text-white/50">
            Aún no tienes inscripciones activas.{" "}
            <Link to="/eventos" className="underline hover:text-white" style={{ color: ACCENT }}>
              Encuentra tu próxima carrera
            </Link>{" "}
            y aparecerá aquí.
          </p>
        </m.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!isAuthenticated()) throw redirect({ to: "/auth/login" });
  },
  head: () => ({
    meta: [{ title: "Mi panel | runluv®" }],
  }),
  component: DashboardPage,
});
