import { m } from "framer-motion";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const phases = [
  {
    range: "Semanas 1–4",
    name: "Base",
    focuses: [
      "Volumen de carrera progresivo a ritmo cómodo",
      "2–3 sesiones de fuerza por semana",
      "Trabajo de movilidad y técnica de zancada",
      "Constancia antes que intensidad",
    ],
  },
  {
    range: "Semanas 5–8",
    name: "Construcción",
    focuses: [
      "Series y cambios de ritmo",
      "Tiradas largas para resistencia",
      "Simula tu desafío: ritmo objetivo del evento",
      "Ajusta hidratación y nutrición en tiradas largas",
    ],
  },
  {
    range: "Semanas 9–12",
    name: "Pico",
    focuses: [
      "Entrenamiento específico a ritmo de carrera",
      "Ensayo completo del circuito o distancia",
      "Semana 11: última carga fuerte",
      "Semana 12: taper — baja volumen, llega fresco",
    ],
  },
];

export function TimelineSection() {
  return (
    <section
      className="w-full bg-[#0a0a0a] py-20 md:py-28"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Plan de entrenamiento
          </p>
          <AnimatedTitle
            text="TU PLAN DE 12 SEMANAS"
            accent={["SEMANAS"]}
            className="text-4xl text-white sm:text-5xl md:text-6xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            Tres fases progresivas para llevarte del entrenamiento base al pico de forma el día del
            evento.
          </p>
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row">
          <div
            className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px sm:block"
            style={{
              background: "linear-gradient(180deg, rgba(212,255,0,0.5), rgba(212,255,0,0.15))",
            }}
            aria-hidden="true"
          />

          {phases.map((phase, idx) => (
            <m.div
              key={phase.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: EASE }}
              className="relative flex-1"
            >
              <div
                className="absolute -left-[1.35rem] top-6 hidden h-3 w-3 rounded-full sm:block"
                style={{ background: ACCENT }}
                aria-hidden="true"
              />
              <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-6">
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: ACCENT }}
                >
                  {phase.range}
                </p>
                <h3
                  className="mt-1 text-3xl uppercase leading-none tracking-wide text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {phase.name}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {phase.focuses.map((focus) => (
                    <li key={focus} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: ACCENT }}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-white/65">{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
