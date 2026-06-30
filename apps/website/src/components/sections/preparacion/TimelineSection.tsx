import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animation";

const phases = [
  {
    range: "Semanas 1–4",
    name: "Base",
    color: "#ffffff",
    focuses: [
      "Volumen de running progresivo",
      "Aprender los movimientos de cada estación",
      "2–3 sesiones de fuerza funcional por semana",
      "Técnica antes que intensidad",
    ],
  },
  {
    range: "Semanas 5–8",
    name: "Construcción",
    color: "#e0e0e0",
    focuses: [
      "Incrementar intensidad en running",
      "Workouts combinados (run + estación)",
      "Cargas progresivas en estaciones de sled",
      "Introducir simulacros de carrera cortos",
    ],
  },
  {
    range: "Semanas 9–12",
    name: "Pico",
    color: "#cccccc",
    focuses: [
      "Entrenamiento específico de carrera",
      "Simulacros completos de HYROX",
      "Semana 11: carga alta final",
      "Semana 12: taper, reducción de volumen",
    ],
  },
];

export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="w-full bg-[#0a0a0a] py-20 md:py-28"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(255,255,255,0.018) 18px, rgba(255,255,255,0.018) 19px)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-14 text-center"
        >
          <Badge variant="dark" className="mb-4 border border-[#2a2a2a]">
            Plan de Entrenamiento
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TU PLAN DE 12 SEMANAS
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Tres fases progresivas diseñadas para llevarte del entrenamiento base hasta el pico de
            rendimiento el día de la carrera.
          </p>
        </m.div>

        <div className="relative flex flex-col gap-6 sm:flex-row">
          <div
            className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-[#ffffff]/30 via-[#e0e0e0]/30 to-[#cccccc]/30 sm:block"
            aria-hidden="true"
          />

          {phases.map((phase, idx) => (
            <m.div
              key={phase.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={idx + 1}
              className="relative flex-1"
            >
              <div
                className="absolute -left-[1.35rem] top-6 hidden h-3 w-3 rounded-full sm:block"
                style={{ backgroundColor: phase.color }}
                aria-hidden="true"
              />
              <Card className="h-full" hover>
                <CardHeader className="pb-3">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: phase.color }}
                  >
                    {phase.range}
                  </p>
                  <h3
                    className="text-3xl leading-none tracking-wider text-white uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {phase.name}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {phase.focuses.map((focus) => (
                      <li key={focus} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: phase.color }}
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-white/65">{focus}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
