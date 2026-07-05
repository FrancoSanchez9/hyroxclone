import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const STATS = [
  { value: "4", label: "Sedes clasificatorias" },
  { value: "1", label: "Gran Final" },
  { value: "2027", label: "Primera temporada" },
];

export function ChampionshipHero() {
  return (
    <section className="relative w-full overflow-hidden px-6 pb-14 pt-32 md:pt-40">
      {/* Background — iconic circuit */}
      <m.img
        src="https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=1920&q=80&fit=crop&auto=format"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20 grayscale"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.1), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: ACCENT }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: ACCENT }} />
          Temporada nacional 2027
        </m.span>

        <AnimatedTitle
          text="LA TEMPORADA RUNLUV®"
          accent={["RUNLUV®"]}
          className="text-[clamp(2.8rem,9vw,6.5rem)] text-white"
        />

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Cuatro autódromos clasificatorios y una Gran Final en el circuito más icónico de México.
          Cada carrera suma al ranking. Cada vuelta te acerca a la Ciudad de México.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:brightness-95 active:scale-[0.96]"
            style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
          >
            Ver el calendario
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/ranking"
            className="inline-flex items-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/40 transition-[border-color,background-color] duration-[160ms] hover:border-white hover:bg-white/8 active:scale-[0.96]"
          >
            Ver ranking
          </Link>
        </m.div>

        {/* Stats strip */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span
                className="text-4xl leading-none tabular-nums"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
              >
                {s.value}
              </span>
              <span className="max-w-[7rem] text-xs font-semibold uppercase tracking-widest text-white/50">
                {s.label}
              </span>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
