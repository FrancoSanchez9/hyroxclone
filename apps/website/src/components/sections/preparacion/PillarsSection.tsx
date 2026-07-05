import { m } from "framer-motion";
import { Activity, Gauge, Dumbbell, Moon } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const pillars = [
  {
    number: "01",
    icon: Activity,
    title: "Base de carrera",
    description:
      "Construye tu motor aeróbico. Kilómetros constantes a ritmo cómodo son los cimientos de cualquier desafío, del 5K a las 4 horas de Cada Paso Cuenta.",
  },
  {
    number: "02",
    icon: Gauge,
    title: "Ritmo y estrategia",
    description:
      "En runluv® no siempre gana quien sale más rápido. Aprende a administrar tu esfuerzo, leer el circuito y decidir cuándo apretar y cuándo resistir.",
  },
  {
    number: "03",
    icon: Dumbbell,
    title: "Fuerza y movilidad",
    description:
      "Piernas fuertes y buena movilidad te protegen de lesiones y te sostienen en los kilómetros finales. Dos sesiones por semana marcan la diferencia.",
  },
  {
    number: "04",
    icon: Moon,
    title: "Descanso y nutrición",
    description:
      "La preparación también se construye fuera de la pista. Duerme, come e hidrátate con intención: tu cuerpo se adapta cuando descansa, no cuando entrena.",
  },
];

export function PillarsSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0d0d0d] py-20 md:py-28"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Faded runner backdrop */}
      <img
        src="https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1600&q=80&fit=crop&auto=format"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.1] grayscale"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Metodología
          </p>
          <AnimatedTitle
            text="LOS 4 PILARES"
            accent={["PILARES"]}
            className="text-5xl text-white sm:text-6xl md:text-7xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            La preparación que te lleva a la meta se apoya en cuatro pilares. Domínalos y llegarás
            listo para cualquier desafío.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <m.div
                key={pillar.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col gap-3 overflow-hidden border border-white/10 border-t-2 border-t-transparent bg-white/[0.03] p-7 transition-colors duration-200 hover:border-t-[#d4ff00]"
              >
                <span
                  className="pointer-events-none absolute -right-2 -top-4 select-none tabular-nums leading-none text-white/[0.05]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "8rem" }}
                  aria-hidden="true"
                >
                  {pillar.number}
                </span>
                <Icon size={26} style={{ color: ACCENT }} aria-hidden="true" />
                <h3
                  className="text-2xl uppercase leading-none tracking-wide text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{pillar.description}</p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
