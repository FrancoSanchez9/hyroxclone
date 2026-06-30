import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Zap, Dumbbell, Activity, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animation";

const pillars = [
  {
    number: "01",
    icon: Activity,
    title: "Running",
    description:
      "Desarrolla tu base aeróbica. El running es la columna vertebral de HYROX: 8 km en total divididos en 8 tramos de 1 km.",
  },
  {
    number: "02",
    icon: Dumbbell,
    title: "Fuerza Funcional",
    description:
      "Cada estación requiere fuerza y resistencia muscular. Entrena los movimientos específicos: ski erg, sled, rowing, wall balls.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Resistencia Mixta",
    description:
      "La clave es la transición: tu cuerpo cambia entre running y ejercicio funcional 8 veces. Entrena bloques combinados.",
  },
  {
    number: "04",
    icon: Calendar,
    title: "Periodización",
    description:
      "Planifica tu preparación con suficiente tiempo. Mínimo 12 semanas para principiantes, 8 semanas para atletas con base.",
  },
];

export function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="w-full bg-[#0d0d0d] py-20 md:py-28"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-14 text-center"
        >
          <Badge variant="yellow" className="mb-4" style={{ backgroundColor: "#ffffff" }}>
            Metodología
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            LOS 4 PILARES DEL ENTRENAMIENTO HYROX
          </h2>
        </m.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <m.div
                key={pillar.number}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={idx + 1}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <Card
                  className="h-full border-t-2 border-t-transparent transition-colors duration-200 hover:border-t-[#ffffff]"
                  hover
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="yellow"
                          className="shrink-0 px-2.5 py-1 text-sm font-bold"
                          style={{ backgroundColor: "#ffffff" }}
                        >
                          {pillar.number}
                        </Badge>
                        <h3
                          className="text-2xl leading-none tracking-wider text-white uppercase"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {pillar.title}
                        </h3>
                      </div>
                      <Icon className="h-6 w-6 shrink-0 text-[#ffffff]/70" aria-hidden="true" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-white/60">{pillar.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
