import { Link } from "@tanstack/react-router";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ACCENT } from "@/lib/theme";
import { SEASON_NAME, SEASON_YEAR_RANGE } from "@/data/season";

const STATS = [
  { value: "4", label: "Sedes clasificatorias" },
  { value: "1", label: "Gran Final" },
  { value: SEASON_YEAR_RANGE, label: "Primera temporada" },
];

export function ChampionshipHero() {
  // Photo scrolls slower than the copy (same pattern as the home hero): the CSS
  // push-in stays on the img, the JS parallax lives on the wrapper.
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <section className="relative w-full overflow-hidden px-6 pb-14 pt-32 md:pt-40">
      {/* Background — iconic circuit (parallax layer) */}
      <m.div
        className="pointer-events-none absolute inset-x-0 -top-[12%] h-[115%]"
        style={{ y: photoY }}
        aria-hidden="true"
      >
        <img
          src="/images/1532444458054-01a7dd3e9fca-1920.webp"
          width={1920}
          height={1184}
          alt=""
          loading="eager"
          className="hero-zoom h-full w-full object-cover object-center opacity-20 grayscale"
        />
      </m.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
      <AuroraBackground intensity="strong" className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <span
          className="hero-rise mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]"
          style={{ animationDelay: "0s", color: ACCENT }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: ACCENT }} />
          {SEASON_NAME} · México
        </span>

        <h1
          aria-label="La temporada runluv®"
          className="uppercase leading-none tracking-wide text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
            <span
              className="hero-line text-[clamp(2.8rem,9vw,6.5rem)]"
              style={{ animationDelay: "0.1s" }}
            >
              LA TEMPORADA
            </span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
            <span
              className="hero-line text-[clamp(2.8rem,9vw,6.5rem)]"
              style={{ animationDelay: "0.2s", color: ACCENT }}
            >
              RUNLUV®
            </span>
          </span>
        </h1>

        <p
          className="hero-rise mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          style={{ animationDelay: "0.4s" }}
        >
          Cuatro autódromos clasificatorios y una Gran Final en el circuito más icónico de México.
          Cada carrera suma al ranking. Cada vuelta te acerca a la Ciudad de México.
        </p>

        <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.5s" }}>
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96]"
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
        </div>

        {/* Stats strip */}
        <div
          className="hero-rise mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8"
          style={{ animationDelay: "0.6s" }}
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
        </div>
      </div>
    </section>
  );
}
