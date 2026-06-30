import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { divisions } from "@/data/events";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animation";

const divisionDetails: Record<
  string,
  { forWho: string; openWeight: string; proWeight: string; ageGroups: string }
> = {
  Open: {
    forWho: "Atletas de cualquier nivel. Primera competencia o buscando superar su propio tiempo.",
    openWeight:
      "Mujeres: SkiErg / Remo estándar, Sled 60 kg, Farmers 2×16 kg, Sandbag 10 kg, Wall Balls 4 kg",
    proWeight: "N/A",
    ageGroups:
      "16-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50-54, 55-59, 60-64, 65-69, 70-74, 75-79, 80-84, 85-89",
  },
  Pro: {
    forWho: "Atletas con sólida base de funcional y running que buscan el mayor desafío.",
    openWeight: "Mujeres Pro: Sled 90 kg, Farmers 2×20 kg, Sandbag 15 kg, Wall Balls 6 kg",
    proWeight: "Hombres Pro: Sled 150 kg, Farmers 2×28 kg, Sandbag 20 kg, Wall Balls 9 kg",
    ageGroups: "16-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50-54, 55-59 (máximo)",
  },
  Doubles: {
    forWho:
      "Dúos que quieren competir juntos. Ambos corren cada km y se alternan en las estaciones.",
    openWeight: "Mismos pesos que Open individual, divididos entre los dos atletas.",
    proWeight: "Doubles Pro disponible con pesos elevados.",
    ageGroups: "Se usa el promedio de edad de ambos atletas para determinar el grupo.",
  },
  Relay: {
    forWho: "Equipos de 4 personas. Cada atleta corre 2 km y completa 2 estaciones consecutivas.",
    openWeight: "Mismos pesos estándar Open.",
    proWeight: "N/A",
    ageGroups: "Dos categorías: Relay Under 40 (todos los miembros menores de 40) y Relay 40+.",
  },
};

export function DivisionsDetailSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-12 text-center"
        >
          <Badge variant="yellow" className="mb-4">
            Categorías
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TODAS LAS DIVISIONES
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50">
            Conoce en detalle cada categoría: quién puede participar, pesos y grupos de edad.
          </p>
        </m.div>

        <div className="space-y-4">
          {divisions.map((division, idx) => {
            const detail = divisionDetails[division.name];
            return (
              <m.div
                key={division.name}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={idx + 1}
              >
                <Card className="w-full overflow-hidden">
                  <CardHeader className="border-b border-[#2a2a2a] pb-4">
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-block h-3 w-3 shrink-0"
                        style={{ backgroundColor: division.color }}
                      />
                      <h3
                        className="text-4xl leading-none tracking-wider uppercase"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          color: division.color,
                        }}
                      >
                        {division.name}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60 max-w-2xl">
                      {division.description}
                    </p>
                  </CardHeader>
                  {detail && (
                    <CardContent>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                            Para quién es
                          </p>
                          <p className="text-sm leading-relaxed text-white/70">{detail.forWho}</p>
                        </div>
                        <div>
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                            Pesos / Formato
                          </p>
                          <p className="text-sm leading-relaxed text-white/70">
                            {detail.openWeight}
                          </p>
                          {detail.proWeight !== "N/A" && (
                            <p className="mt-1 text-sm leading-relaxed text-white/50">
                              {detail.proWeight}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                            Grupos de edad
                          </p>
                          <p className="text-sm leading-relaxed text-white/70">
                            {detail.ageGroups}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
