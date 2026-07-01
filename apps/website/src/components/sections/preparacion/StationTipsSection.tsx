import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animation";

const stationTips = [
  {
    name: "SkiErg",
    badge: "1,000 m",
    tip: "Usa el impulso de caderas, no solo los brazos. Mantén un ritmo sostenible desde el inicio; salir demasiado rápido destroza las piernas para el sled.",
  },
  {
    name: "Sled Push",
    badge: "50 m",
    tip: "Posición baja, pasos cortos y rápidos. Respira de forma rítmica. Practica con el peso real de competencia en tus últimas semanas de entrenamiento.",
  },
  {
    name: "Wall Balls",
    badge: "75–100 reps",
    tip: "Descansos estratégicos de 3–5 reps son mejor que fallar un set largo. Practica series de 10–15 para construir resistencia sin acumular fatiga excesiva.",
  },
];

export function StationTipsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="w-full bg-[#0d0d0d] py-20 md:py-28"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-12 text-center"
        >
          <Badge variant="yellow" className="mb-4" style={{ backgroundColor: "#ffffff" }}>
            Estaciones
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CONSEJOS POR ESTACIÓN
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Las 3 estaciones que más atletas subestiman y cómo dominarlas.
          </p>
        </m.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stationTips.map((station, idx) => (
            <m.div
              key={station.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={idx + 1}
            >
              <Card className="h-full p-5" hover>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3
                    className="text-xl leading-none tracking-wider text-white uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {station.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-[#ffffff]/40 text-[10px] text-[#ffffff]/80"
                  >
                    {station.badge}
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-white/60">{station.tip}</p>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
