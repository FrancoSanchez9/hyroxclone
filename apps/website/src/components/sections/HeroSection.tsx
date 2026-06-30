import { motion } from "framer-motion";
import logoSrc from "@/assets/image02.png";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DURATION = 0.7;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stats = [
  { value: "15M+", label: "Corredores en México" },
  { value: "7x", label: "Retorno económico" },
  { value: "15,000", label: "Asistentes por evento" },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-dvh w-full flex-col overflow-hidden"
      style={{ background: "#060608" }}
      aria-label="Hero"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=80&fit=crop&auto=format"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
      />

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, #060608)" }}
      />

      {/* Decorative circuit line */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px opacity-10"
        style={{ background: "linear-gradient(90deg, transparent, #a855f7, transparent)" }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-36 pt-32 text-center">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0 }}
          className="mb-6"
        >
          <img
            src={logoSrc}
            alt="runluv"
            className="h-10 md:h-14 w-auto mx-auto brightness-[1.05]"
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.08 }}
          className="max-w-5xl text-[clamp(2.6rem,8vw,6.5rem)] font-normal leading-none tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          transformamos el running en{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            desarrollo para ciudades
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.18 }}
          className="mt-6 max-w-xl text-base md:text-lg text-white/55 leading-relaxed font-light"
        >
          Turismo, economía y comunidad en un solo evento.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contacto"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold uppercase tracking-widest text-white bg-[#a855f7] hover:bg-[#9333ea] transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
          >
            Agenda una reunión
          </a>
          <a
            href="#que-es"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold uppercase tracking-widest text-[#a855f7] border border-[#a855f7]/50 hover:border-[#a855f7] hover:bg-[#a855f7]/8 transition-all duration-[160ms]"
          >
            ¿Qué es runluv?
          </a>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #a855f7 50%, transparent)" }}
        />
        <div
          className="grid grid-cols-3 divide-x"
          style={{
            backgroundColor: "rgba(15,15,20,0.85)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid #2a2a3a",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-4 py-5 sm:py-6"
            >
              <span
                className="text-[clamp(1.4rem,3vw,2.1rem)] font-normal leading-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  background: "linear-gradient(135deg, #a855f7, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-white/60 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
