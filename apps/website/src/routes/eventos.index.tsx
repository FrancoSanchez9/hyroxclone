import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { upcomingEvents, divisions } from "@/data/events";
import { SEASON_NAME } from "@/data/season";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { cn } from "@/lib/utils";
import { ACCENT, EASE } from "@/lib/theme";

const FILTERS = ["Todos", "La Última Vuelta", "Cada Paso Cuenta", "5K", "10K", "Teams"] as const;
type Filter = (typeof FILTERS)[number];

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function dateParts(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return { day: d.getDate(), month: MONTHS[d.getMonth()].toUpperCase(), year: d.getFullYear() };
}

function EventRow({ event, index }: { event: (typeof upcomingEvents)[number]; index: number }) {
  const { day, month, year } = dateParts(event.date);

  return (
    <m.div
      layout
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.18, ease: EASE } }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
    >
      <Link
        to={event.registrationUrl}
        className="group relative block h-[240px] overflow-hidden md:h-[280px]"
      >
        {/* Full-bleed autódromo photo — always visible, color on hover */}
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            width={1200}
            height={700}
            alt={event.name}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center grayscale transition-[transform,filter] duration-[600ms] ease-out-strong group-hover:scale-105 group-hover:grayscale-0"
          />
        )}
        {/* Legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Racing stripe — lime bar that widens on hover */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1 transition-[width] duration-300 ease-out-strong group-hover:w-2"
          style={{ background: ACCENT }}
        />

        {/* Ghost stage number — huge, behind content */}
        <span
          className="pointer-events-none absolute -bottom-6 right-4 select-none tabular-nums leading-none md:right-10"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "13rem",
            color: "transparent",
            WebkitTextStroke: "2px rgba(212,255,0,0.18)",
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 flex h-full items-center gap-5 px-5 md:gap-10 md:px-12">
          {/* Date block */}
          <div className="shrink-0 text-center">
            <span
              className="block tabular-nums text-6xl leading-[0.8] text-white md:text-8xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {day}
            </span>
            <span
              className="text-lg font-bold uppercase tracking-widest md:text-xl"
              style={{ color: ACCENT }}
            >
              {month}
            </span>
            <span className="block text-xs tabular-nums text-white/45">{year}</span>
          </div>

          {/* Vertical divider */}
          <div className="hidden h-24 w-px shrink-0 bg-white/15 md:block" />

          {/* Name + venue + categories */}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {event.featured && (
                <span
                  className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black"
                  style={{ background: ACCENT }}
                >
                  Próxima
                </span>
              )}
              {event.soldOut && (
                <span className="border border-white/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Agotado
                </span>
              )}
            </div>
            <h2
              className="text-4xl leading-[0.9] tracking-wide text-white uppercase transition-colors duration-200 group-hover:text-rl-accent md:text-6xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {event.name}
            </h2>
            <p className="mt-2 text-sm text-white/60">
              {event.venue} — {event.city}
            </p>
            <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
              {event.categories.slice(0, 6).map((cat) => (
                <span
                  key={cat}
                  className="border border-white/20 bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60 backdrop-blur-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* CTA — desktop only, arrow chip */}
          <span
            className={cn(
              "hidden shrink-0 items-center gap-2 self-center border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-[background-color,border-color,color] duration-200 lg:inline-flex",
              event.soldOut
                ? "border-white/15 text-white/50"
                : "border-white/40 text-white group-hover:border-rl-accent group-hover:bg-rl-accent group-hover:text-black",
            )}
          >
            {event.soldOut ? "Agotado" : "Registrarse"}
            {!event.soldOut && (
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </span>
        </div>
      </Link>
    </m.div>
  );
}

function EventosPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Todos");

  const filteredEvents =
    activeFilter === "Todos"
      ? upcomingEvents
      : upcomingEvents.filter((e) => e.categories.includes(activeFilter));

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(180deg, #000 0%, #0a0a0a 45%, #101204 100%)" }}
    >
      {/* Hero — image-backed, dark, sport */}
      <section className="relative overflow-hidden px-6 pb-0 pt-32 md:pt-40">
        {/* Background racetrack photo */}
        <m.img
          src="/images/1532444458054-01a7dd3e9fca-1920.webp"
          width={1920}
          height={1184}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-25 grayscale"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        <div
          aria-hidden="true"
          className="animate-blob pointer-events-none absolute -left-40 -top-20 h-[28rem] w-[28rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,255,0,0.1), transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl pb-12">
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: ACCENT }} />
            {SEASON_NAME}
          </m.span>
          <AnimatedTitle
            text="EVENTOS OFICIALES MÉXICO"
            accent={["MÉXICO"]}
            className="text-[clamp(2.6rem,8vw,6rem)] text-white"
          />
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { value: "5", label: "Autódromos" },
              { value: "1", label: "Temporada" },
              { value: "6", label: "Modalidades" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span
                  className="text-3xl leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
                >
                  {s.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated sweep line — franja */}
        <div aria-hidden="true" className="relative z-10 h-px w-full overflow-hidden bg-white/10">
          <div
            className="animate-line-sweep absolute inset-y-0 w-1/3"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            }}
          />
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-10 border-b border-white/10 bg-[#0a0a0a]/95 px-6 py-5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-[background-color,border-color,color] duration-150 active:scale-[0.96]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rl-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
                  isActive
                    ? "border-rl-accent bg-rl-accent text-black"
                    : "border-white/15 bg-transparent text-white/50 hover:border-white/50 hover:text-white",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* Season calendar — F1-style stage rows */}
      <section className="px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          {filteredEvents.length === 0 ? (
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-sm uppercase tracking-widest text-white/50"
            >
              No hay eventos para esta categoría
            </m.p>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredEvents.map((event, i) => (
                  <EventRow key={event.id} event={event} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Categorías */}
      <section
        className="relative overflow-hidden px-6 py-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <div className="relative mx-auto max-w-7xl">
          <m.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12 font-display text-5xl uppercase tracking-wider text-white md:text-6xl"
          >
            Categorías
          </m.h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {divisions.map((div, i) => (
              <m.div
                key={div.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                whileHover={{ y: -4 }}
                className="flex h-full flex-col gap-4 border border-white/10 border-t-2 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-t-rl-accent"
                style={{ borderTopColor: i === 0 ? ACCENT : undefined }}
              >
                <span className="font-display text-3xl uppercase leading-none tracking-wide text-white">
                  {div.name}
                </span>
                <p className="flex-1 text-sm leading-relaxed text-white/55">{div.description}</p>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    Formato
                  </p>
                  <p className="mt-1 text-xs font-semibold" style={{ color: ACCENT }}>
                    {div.weights.women}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/eventos/")({
  head: () => ({
    meta: [
      { title: "Eventos | runluv® — Calendario de Competencias en México" },
      {
        name: "description",
        content:
          "Encuentra el próximo evento runluv® cerca de ti. Puebla, Guadalajara, León, Monterrey y CDMX. Consulta fechas, precios y cupos disponibles. ¡Inscríbete ahora!",
      },
    ],
  }),
  component: EventosPage,
});
