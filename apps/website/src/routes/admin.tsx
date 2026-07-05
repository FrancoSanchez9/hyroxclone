import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  PanelsTopLeft,
  LogOut,
  Pencil,
  Star,
  ShieldCheck,
} from "lucide-react";
import { getSession, logout, isAuthenticated, isAdmin } from "@/lib/auth";
import { upcomingEvents } from "@/data/events";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

// ponytail: in-memory mock data + toasts; wire to a real API when a backend exists.

const TABS = [
  { id: "resumen", label: "Resumen", Icon: LayoutDashboard },
  { id: "eventos", label: "Eventos", Icon: CalendarDays },
  { id: "usuarios", label: "Usuarios", Icon: Users },
  { id: "secciones", label: "Secciones", Icon: PanelsTopLeft },
] as const;
type TabId = (typeof TABS)[number]["id"];

const STATS = [
  { value: "5", label: "Eventos activos" },
  { value: "1,248", label: "Usuarios" },
  { value: "3,412", label: "Inscripciones" },
  { value: "$2.9M", label: "Ingresos MXN" },
];

const MOCK_USERS = [
  { name: "Ana Torres", email: "ana.torres@gmail.com", role: "runner", races: 3 },
  { name: "Luis Hernández", email: "luish@hotmail.com", role: "runner", races: 1 },
  { name: "María Sandoval", email: "msandoval@runluv.mx", role: "admin", races: 0 },
  { name: "Carlos Peña", email: "cpena@gmail.com", role: "runner", races: 5 },
  { name: "Sofía Ramos", email: "sofia.r@gmail.com", role: "runner", races: 2 },
];

const SITE_SECTIONS = [
  { id: "hero", label: "Hero + contador" },
  { id: "que-es", label: "¿Qué es runluv?" },
  { id: "desafios", label: "Elige tu desafío" },
  { id: "stats", label: "Stats (franja lima)" },
  { id: "eventos", label: "Próximas carreras" },
];

const demoToast = () => toast("Demo — los cambios no se guardan todavía");

function MonthDate({ dateStr }: { dateStr: string }) {
  const d = new Date(dateStr + "T00:00:00");
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  return (
    <span className="tabular-nums text-white/60">
      {d.getDate()} {months[d.getMonth()]} {d.getFullYear()}
    </span>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const session = getSession();
  const [tab, setTab] = useState<TabId>("resumen");
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(SITE_SECTIONS.map((s) => [s.id, true])),
  );

  const handleLogout = () => {
    logout();
    void navigate({ to: "/auth/login" });
  };

  return (
    <div
      className="min-h-screen px-6 pb-24 pt-32 md:pt-36"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 70%, #101204 100%)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              <ShieldCheck className="h-4 w-4" />
              Administración
            </p>
            <h1
              className="text-[clamp(2.2rem,6vw,4rem)] leading-[0.9] tracking-tight text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Panel <span style={{ color: ACCENT }}>runluv®</span>
            </h1>
            <p className="mt-2 text-xs text-white/50">{session?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/60 transition-[border-color,color] duration-150 hover:border-white/50 hover:text-white active:scale-[0.96]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Salir
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex items-center gap-2 border px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-[background-color,border-color,color] duration-150 active:scale-[0.96]",
                tab === id
                  ? "border-[#d4ff00] bg-[#d4ff00] text-black"
                  : "border-white/15 text-white/50 hover:border-white/40 hover:text-white",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="pt-8"
          >
            {tab === "resumen" && (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="border border-white/10 bg-white/[0.03] p-6">
                    <p
                      className="tabular-nums text-4xl leading-none sm:text-5xl"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/50">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tab === "eventos" && (
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr style={{ background: ACCENT }}>
                      {["Evento", "Fecha", "Ciudad", "Cupo", "Estado", ""].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-black"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {upcomingEvents.map((e) => (
                      <tr
                        key={e.id}
                        className="transition-colors duration-150 hover:bg-white/[0.03]"
                      >
                        <td className="px-4 py-3.5 font-semibold text-white">{e.name}</td>
                        <td className="px-4 py-3.5">
                          <MonthDate dateStr={e.date} />
                        </td>
                        <td className="px-4 py-3.5 text-white/60">{e.city}</td>
                        <td className="px-4 py-3.5 tabular-nums text-white/60">
                          {e.spotsLeft ?? "—"}
                        </td>
                        <td className="px-4 py-3.5">
                          {e.featured ? (
                            <span
                              className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black"
                              style={{ background: ACCENT }}
                            >
                              Próxima
                            </span>
                          ) : (
                            <span className="text-xs text-white/50">Activo</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={demoToast}
                              aria-label={`Editar ${e.name}`}
                              className="border border-white/15 p-2 text-white/50 transition-colors duration-150 hover:border-white/50 hover:text-white active:scale-[0.94]"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={demoToast}
                              aria-label={`Destacar ${e.name}`}
                              className="border border-white/15 p-2 text-white/50 transition-colors duration-150 hover:border-[#d4ff00] hover:text-[#d4ff00] active:scale-[0.94]"
                            >
                              <Star className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "usuarios" && (
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr style={{ background: ACCENT }}>
                      {["Nombre", "Correo", "Rol", "Carreras"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-black"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {MOCK_USERS.map((u) => (
                      <tr
                        key={u.email}
                        className="transition-colors duration-150 hover:bg-white/[0.03]"
                      >
                        <td className="px-4 py-3.5 font-semibold text-white">{u.name}</td>
                        <td className="px-4 py-3.5 text-white/60">{u.email}</td>
                        <td className="px-4 py-3.5">
                          <span
                            className={cn(
                              "px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                              u.role === "admin"
                                ? "bg-[#d4ff00] text-black"
                                : "border border-white/20 text-white/50",
                            )}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 tabular-nums text-white/60">{u.races}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "secciones" && (
              <div className="flex max-w-2xl flex-col gap-3">
                <p className="mb-2 text-sm text-white/50">
                  Controla qué secciones se muestran en la página de inicio.
                </p>
                {SITE_SECTIONS.map((s) => {
                  const on = visible[s.id];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="switch"
                      aria-checked={on}
                      onClick={() => {
                        setVisible((v) => ({ ...v, [s.id]: !v[s.id] }));
                        demoToast();
                      }}
                      className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-colors duration-150 hover:border-white/25 active:scale-[0.99]"
                    >
                      <span
                        className={cn("text-sm font-semibold", on ? "text-white" : "text-white/50")}
                      >
                        {s.label}
                      </span>
                      {/* Toggle */}
                      <span
                        className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200"
                        style={{ background: on ? ACCENT : "rgba(255,255,255,0.15)" }}
                        aria-hidden="true"
                      >
                        <span
                          className="absolute top-0.5 h-5 w-5 rounded-full bg-black transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                          style={{ transform: on ? "translateX(1.45rem)" : "translateX(0.125rem)" }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (!isAuthenticated()) throw redirect({ to: "/auth/login" });
    if (!isAdmin()) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [{ title: "Administración | runluv®" }],
  }),
  component: AdminPage,
});
