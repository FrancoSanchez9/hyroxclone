import { Link } from "@tanstack/react-router";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RaceTrack } from "./RaceTrack";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ACCENT } from "@/lib/theme";

const TITLE_LINES: { text: string; accent?: boolean }[] = [
  { text: "LA CARRERA" },
  { text: "SOBRE" },
  { text: "CIRCUITOS", accent: true },
];

export function LaCarreraHeroSection() {
  // Multi-layer parallax: the lane texture drifts fastest, the racetrack
  // illustration lags behind the copy — depth without any extra assets.
  const { scrollY } = useScroll();
  const lanesY = useTransform(scrollY, [0, 700], [0, 140]);
  const trackY = useTransform(scrollY, [0, 700], [0, -70]);

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] px-6 pb-16 pt-32 md:pt-40">
      {/* Aurora atmosphere + lane texture (parallax layer) */}
      <AuroraBackground intensity="subtle" />
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[10%] h-[120%]"
        style={{
          y: lanesY,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.025) 119px, rgba(255,255,255,0.025) 120px)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <span
            className="hero-rise mb-5 inline-block text-xs font-bold uppercase tracking-[0.3em]"
            style={{ animationDelay: "0s", color: ACCENT }}
          >
            La experiencia runluv®
          </span>

          <h1
            aria-label="La carrera sobre circuitos de clase mundial"
            className="uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {TITLE_LINES.map((line, i) => (
              <span key={line.text} aria-hidden="true" className="block overflow-hidden">
                <span
                  className="hero-line text-[clamp(2.8rem,8vw,6rem)]"
                  style={{
                    animationDelay: `${(0.1 + i * 0.1).toFixed(2)}s`,
                    ...(line.accent ? { color: ACCENT } : {}),
                  }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-rise mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
            style={{ animationDelay: "0.4s" }}
          >
            runluv® transforma los autódromos donde rugen los motores en pistas para corredores.
            Elige tu desafío, recorre el circuito y descubre hasta dónde puedes llegar.
          </p>

          <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.5s" }}>
            <Link
              to="/eventos"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96]"
              style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
            >
              Inscríbete
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tu-nivel"
              className="inline-flex items-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/40 transition-[border-color,background-color] duration-[160ms] hover:border-white hover:bg-white/8 active:scale-[0.96]"
            >
              ¿Cuál es tu reto?
            </Link>
          </div>
        </div>

        {/* Racetrack — counter-parallax layer for depth */}
        <m.div style={{ y: trackY }}>
          <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
            <RaceTrack className="w-full" />
          </div>
        </m.div>
      </div>
    </section>
  );
}
