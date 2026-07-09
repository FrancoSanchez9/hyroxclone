import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { RaceTrack } from "./RaceTrack";
import { ACCENT, EASE } from "@/lib/theme";

export function LaCarreraHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] px-6 pb-16 pt-32 md:pt-40">
      {/* Ambient glow + lane texture */}
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.08), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.025) 119px, rgba(255,255,255,0.025) 120px)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            La experiencia runluv®
          </m.span>

          <h1
            aria-label="La carrera sobre circuitos de clase mundial"
            className="uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {[
              { text: "LA CARRERA", accent: false },
              { text: "SOBRE", accent: false },
              { text: "CIRCUITOS", accent: true },
            ].map((line, i) => (
              <span key={line.text} aria-hidden="true" className="block overflow-hidden">
                <m.span
                  className="block text-[clamp(2.8rem,8vw,6rem)]"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
                  style={line.accent ? { color: ACCENT } : undefined}
                >
                  {line.text}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
          >
            runluv® transforma los autódromos donde rugen los motores en pistas para corredores.
            Elige tu desafío, recorre el circuito y descubre hasta dónde puedes llegar.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
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
          </m.div>
        </div>

        {/* Racetrack */}
        <m.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <RaceTrack className="w-full" />
        </m.div>
      </div>
    </section>
  );
}
