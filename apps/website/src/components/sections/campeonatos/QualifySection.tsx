import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animation";

const qualifyPaths = [
  {
    number: "01",
    title: "Puebla",
    sub: "Autódromo Internacional Miguel E. Abed",
    body: "Primera sede de la temporada 2027. Amozoc, Puebla.",
    accent: "#ffffff",
  },
  {
    number: "02",
    title: "León",
    sub: "Autódromo de León",
    body: "Segunda sede. León, Guanajuato.",
    accent: "#ffffff",
  },
  {
    number: "03",
    title: "Guadalajara",
    sub: "Autódromo Hermanos Gallo",
    body: "Tercera sede. Tlaquepaque, Jalisco.",
    accent: "#ffffff",
  },
  {
    number: "04",
    title: "Monterrey",
    sub: "Autódromo Monterrey",
    body: "Cuarta sede. Apodaca, Nuevo León.",
    accent: "#C0C0C0",
  },
];

export function QualifySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-14 text-center"
        >
          <Badge variant="dark" className="mb-5 border border-[#2a2a2a]">
            CLASIFICACIÓN
          </Badge>
          <h2
            className="text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CÓMO CLASIFICAR A LA GRAN FINAL
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Todos los eventos oficiales de la temporada 2027 podrán sumar al ranking runluv®. La
            clasificación dependerá de los resultados en cada sede, la modalidad, la categoría y el
            grupo de edad.
          </p>
        </m.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {qualifyPaths.map((path, idx) => (
            <m.div
              key={path.number}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={idx + 1}
            >
              <Card className="group relative h-full overflow-hidden p-6" hover>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${path.accent}08, transparent)`,
                  }}
                />
                <div className="relative z-10 flex flex-col gap-4">
                  <span
                    className="text-5xl font-normal leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: path.accent,
                      opacity: 0.9,
                    }}
                  >
                    {path.number}
                  </span>
                  <div>
                    <h3
                      className="text-2xl uppercase tracking-wider text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {path.title}
                    </h3>
                    <p
                      className="mt-1 text-xs uppercase tracking-widest text-white/40"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {path.sub}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{path.body}</p>
                </div>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
