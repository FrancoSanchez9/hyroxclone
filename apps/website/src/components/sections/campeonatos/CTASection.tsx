import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ACCENT, EASE } from "@/lib/theme";

export function CTASection() {
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
        <h2
          className="text-balance text-5xl uppercase leading-none tracking-wide text-white sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Tu primera vuelta <span style={{ color: ACCENT }}>comienza aquí</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">
          La temporada 2027 es solo el inicio. Elige tu desafío, entrena, compite y forma parte de
          la comunidad runluv®.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96]"
            style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
          >
            Ver eventos
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/tu-nivel"
            className="inline-flex items-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/40 transition-[border-color,background-color] duration-[160ms] hover:border-white hover:bg-white/8 active:scale-[0.96]"
          >
            Encuentra tu desafío
          </Link>
        </div>
      </m.div>
    </section>
  );
}
