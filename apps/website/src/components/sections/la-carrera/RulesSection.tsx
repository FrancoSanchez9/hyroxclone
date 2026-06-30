import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Ruler, AlertTriangle, Timer } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.04 },
  }),
};

const rules = [
  {
    Icon: Timer,
    title: "El tiempo es todo",
    body: "El tiempo final es el tiempo total de carrera desde el disparo de salida hasta cruzar la meta. Cada segundo cuenta.",
  },
  {
    Icon: Ruler,
    title: "Estándares estrictos",
    body: "Los estándares de movimiento son verificados por jueces en cada estación. Un rep no válido no cuenta.",
  },
  {
    Icon: AlertTriangle,
    title: "Penalizaciones",
    body: "Los reps incompletos resultan en penalizaciones de tiempo añadidas al resultado final. No hay excepciones.",
  },
];

export function RulesSection() {
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
          <Badge variant="yellow" className="mb-4" style={{ backgroundColor: "#ffffff" }}>
            Reglamento
          </Badge>
          <h2
            className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Las Reglas
          </h2>
        </m.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rules.map((rule, idx) => (
            <m.div
              key={rule.title}
              ref={idx === 0 ? undefined : undefined}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={idx + 1}
            >
              <Card className="h-full p-6" hover>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-none bg-[#ffffff]/10">
                  <rule.Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3
                  className="mb-2 text-xl uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {rule.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{rule.body}</p>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
