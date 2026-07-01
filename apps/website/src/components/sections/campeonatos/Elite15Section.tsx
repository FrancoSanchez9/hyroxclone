import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animation";

export function Elite15Section() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-12 text-center"
        >
          <Badge
            variant="yellow"
            className="mb-5"
            style={{ backgroundColor: "#ffffff", color: "#000" }}
          >
            ELITE LUV
          </Badge>
          <h2
            className="text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            EL NIVEL MÁS ALTO DE RUNLUV®
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            Elite LUV será la línea competitiva más alta de runluv®. A lo largo de la temporada, los
            corredores con mejores resultados buscarán colocarse entre los primeros lugares del
            ranking para acceder a la competencia elite de la Gran Final.
          </p>
        </m.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
          >
            <Card className="h-full border-t-2 p-8" style={{ borderTopColor: "#ffffff" }} hover>
              <h3
                className="mb-4 text-2xl uppercase tracking-wider text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                RANKING RUNLUV®
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                El ranking runluv® permitirá a cada participante consultar sus resultados oficiales,
                comparar su desempeño y seguir su evolución durante la temporada. Podrás ver tu
                posición dentro de tu modalidad, categoría y grupo de edad, así como medir tu avance
                de una sede a otra.
              </p>
            </Card>
          </m.div>

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
          >
            <Card className="h-full border-t-2 p-8" style={{ borderTopColor: "#C0C0C0" }} hover>
              <h3
                className="mb-4 text-2xl uppercase tracking-wider text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                EL DESAFÍO ELITE
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                En la Gran Final, los participantes elite competirán por el reconocimiento oficial
                como los corredores más destacados de la temporada dentro de su modalidad, categoría
                y grupo de edad. Velocidad, estrategia, resistencia y mentalidad reunidas en una
                sola vuelta.
              </p>
            </Card>
          </m.div>
        </div>
      </div>
    </section>
  );
}
