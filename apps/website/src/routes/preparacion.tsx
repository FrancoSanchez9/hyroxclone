import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { PillarsSection } from "@/components/sections/preparacion/PillarsSection";
import { TimelineSection } from "@/components/sections/preparacion/TimelineSection";
import { StationTipsSection } from "@/components/sections/preparacion/StationTipsSection";
import { TrainingClubCTA } from "@/components/sections/preparacion/TrainingClubCTA";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

function PrepHero() {
  return (
    <section className="relative w-full overflow-hidden px-6 pb-14 pt-32 md:pt-40">
      <m.img
        src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=60&fit=crop&auto=format"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20 grayscale"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d0d0d]" />
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.09), transparent 70%)" }}
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: ACCENT }}
        >
          Preparación runluv®
        </m.span>
        <AnimatedTitle
          text="LLEGA LISTO A LA LÍNEA DE SALIDA"
          accent={["SALIDA"]}
          className="text-[clamp(2.4rem,7vw,5.5rem)] text-white"
        />
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Correr un autódromo exige base, ritmo y cabeza. Prepara tu desafío con método y llega al
          día del evento en tu mejor forma.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          className="mt-8"
        >
          <Link
            to="/tu-nivel"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:brightness-95 active:scale-[0.96]"
            style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
          >
            Encuentra tu desafío
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}

function PreparacionPage() {
  return (
    <>
      <PrepHero />
      <PillarsSection />
      <TimelineSection />
      <StationTipsSection />
      <TrainingClubCTA />
    </>
  );
}

export const Route = createFileRoute("/preparacion")({
  head: () => ({
    meta: [
      { title: "Preparación | runluv® — Guías y Entrenamientos para Competir" },
      {
        name: "description",
        content:
          "Prepárate para tu próximo runluv®. Planes de entrenamiento, guías de fuerza funcional y consejos de nutrición para que llegues listo al día de la competencia.",
      },
    ],
  }),
  component: PreparacionPage,
});
