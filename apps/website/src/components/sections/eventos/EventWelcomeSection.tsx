import { m } from "framer-motion";
import {
  FileText,
  ListOrdered,
  Map,
  Trophy,
  CreditCard,
  QrCode,
  UserX,
  Clock,
  CalendarClock,
  Sunrise,
} from "lucide-react";
import { type RunluvEvent } from "@/data/events";
import { SEASON_NAME } from "@/data/season";
import { ACCENT, EASE } from "@/lib/theme";

// Franjas verdes diagonales reutilizables.
const STRIPES = `repeating-linear-gradient(45deg, ${ACCENT} 0, ${ACCENT} 3px, transparent 3px, transparent 12px)`;

const ATHLETE_LINKS = [
  { icon: ListOrdered, label: "Lista de salida" },
  { icon: FileText, label: "Briefing técnico" },
  { icon: Map, label: "Mapa del venue" },
  { icon: Trophy, label: "Horarios de premiación" },
];

const EARLY_CHECKIN_RULES = [
  { icon: CreditCard, text: "Identificación oficial vigente obligatoria." },
  { icon: UserX, text: "No se permite recoger el kit en nombre de otra persona." },
  { icon: QrCode, text: "Presenta el código QR de tu confirmación de registro." },
];

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function EventWelcomeSection({ event }: { event: RunluvEvent }) {
  const paragraphs = event.description ?? (event.about ? [event.about] : []);

  return (
    <>
      {/* ── WELCOME / CITY STORY ── */}
      {event.tagline && (
        <m.section
          aria-labelledby="welcome-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative overflow-hidden border border-white/10 bg-white/2 p-7 sm:p-9"
        >
          {/* franja verde superior */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-1"
            style={{ background: ACCENT }}
            aria-hidden="true"
          />
          {/* franjas diagonales esquina */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rotate-12"
            style={{
              backgroundImage: STRIPES,
              opacity: 0.5,
              maskImage: "radial-gradient(circle at top right, #000, transparent 70%)",
            }}
          />
          {/* número fantasma */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-2 select-none leading-none tabular-nums"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "11rem",
              color: "transparent",
              WebkitTextStroke: `2px rgba(212,255,0,0.12)`,
            }}
          >
            01
          </span>

          <div className="relative">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: ACCENT }} />
              Primera parada · {SEASON_NAME}
            </span>
            <h2
              id="welcome-heading"
              className="mt-4 text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[0.9] tracking-wide uppercase text-balance"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
            >
              {event.tagline}
            </h2>
            <div
              className="mt-6 flex max-w-2xl flex-col gap-4 border-l-2 pl-6"
              style={{ borderColor: ACCENT }}
            >
              {paragraphs.map((p, i) => (
                <m.p
                  key={p.slice(0, 24)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: EASE }}
                  className="text-base leading-relaxed text-white/70 text-pretty"
                >
                  {p}
                </m.p>
              ))}
            </div>
          </div>
        </m.section>
      )}

      {/* ── ATHLETE INFO ── */}
      <section aria-labelledby="info-heading">
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ color: ACCENT }}
        >
          Anuncio
        </p>
        <h2
          id="info-heading"
          className="mb-4 text-4xl leading-none tracking-wider text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Información del evento
        </h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/55">
          En los días previos al evento publicaremos aquí la información importante para atletas. 3
          días antes del evento se vinculará tu hora de salida.
        </p>

        {/* Athlete resource cards — placeholders until published */}
        <m.div
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {ATHLETE_LINKS.map(({ icon: Icon, label }) => (
            <m.div
              key={label}
              variants={cardItem}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className="group relative flex items-center gap-4 overflow-hidden border border-white/10 bg-white/2 p-5 transition-colors duration-200 hover:border-rl-accent/40"
            >
              {/* franja lateral que crece en hover */}
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-0.5 transition-[width] duration-200 group-hover:w-1.5"
                style={{ background: ACCENT }}
                aria-hidden="true"
              />
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-rl-accent/30"
                style={{ background: "rgba(212,255,0,0.08)" }}
              >
                <Icon size={18} style={{ color: ACCENT }} aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-semibold uppercase tracking-wide text-white/80">
                {label}
              </span>
              <span className="border border-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white/50">
                Próximamente
              </span>
            </m.div>
          ))}
        </m.div>

        {/* Check-in blocks */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative flex flex-col gap-4 overflow-hidden border border-white/10 border-t-2 border-t-rl-accent bg-white/2 p-6"
          >
            <div className="flex items-center gap-3">
              <CalendarClock size={22} style={{ color: ACCENT }} aria-hidden="true" />
              <h3
                className="text-2xl leading-none tracking-wide text-white uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Registro anticipado
              </h3>
            </div>
            <div className="flex flex-col gap-1 text-sm text-white/55">
              <p>
                <span className="font-bold text-white/80">Fecha y horarios:</span> Por confirmar
              </p>
              <p>
                <span className="font-bold text-white/80">Lugar:</span> Por confirmar
              </p>
            </div>
            <div className="mt-1 flex flex-col gap-2.5 border-t border-white/10 pt-4">
              {EARLY_CHECKIN_RULES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon
                    size={15}
                    className="mt-0.5 shrink-0"
                    style={{ color: ACCENT }}
                    aria-hidden="true"
                  />
                  <span className="text-xs leading-relaxed text-white/60">{text}</span>
                </div>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
            className="relative flex flex-col gap-4 overflow-hidden border border-white/10 border-t-2 border-t-rl-accent bg-white/2 p-6"
          >
            <div className="flex items-center gap-3">
              <Sunrise size={22} style={{ color: ACCENT }} aria-hidden="true" />
              <h3
                className="text-2xl leading-none tracking-wide text-white uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Registro el día del evento
              </h3>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-3">
                <Clock
                  size={15}
                  className="mt-0.5 shrink-0"
                  style={{ color: ACCENT }}
                  aria-hidden="true"
                />
                <span className="text-xs leading-relaxed text-white/60">
                  Abre 90 minutos antes del primer bloque de salida.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  size={15}
                  className="mt-0.5 shrink-0"
                  style={{ color: ACCENT }}
                  aria-hidden="true"
                />
                <span className="text-xs leading-relaxed text-white/60">
                  Cierra 1 hora antes de tu salida — llegar tarde significa no poder participar.
                </span>
              </div>
            </div>
            <p
              className="mt-auto flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: ACCENT }}
            >
              <span
                className="h-2.5 w-6 shrink-0"
                style={{ backgroundImage: STRIPES }}
                aria-hidden="true"
              />
              Reserva el día completo
            </p>
          </m.div>
        </div>
      </section>
    </>
  );
}
