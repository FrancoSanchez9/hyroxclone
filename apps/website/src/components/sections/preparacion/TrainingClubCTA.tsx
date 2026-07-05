import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

export function TrainingClubCTA() {
  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #101204 100%)" }}
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.09), transparent 70%)" }}
      />
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
          Comunidad
        </p>
        <h2
          className="text-balance text-5xl uppercase leading-none tracking-wide text-white sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Entrena con tu <span style={{ color: ACCENT }}>club</span>
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-white/55">
          Encuentra un club de running o un coach cerca de ti y prepárate en comunidad para tu
          próximo desafío runluv®.
        </p>
        <Link
          to="/gimnasios"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:brightness-95 active:scale-[0.96]"
          style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
        >
          Encuentra tu club
          <ArrowRight className="h-4 w-4" />
        </Link>
      </m.div>
    </section>
  );
}
