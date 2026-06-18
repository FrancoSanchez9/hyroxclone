import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { Zap, Dumbbell, Activity, Calendar } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

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

const phases = [
  {
    range: "Semanas 1–4",
    name: "Base",
    color: "#e5f93a",
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
    color: "#f97316",
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
    color: "#a78bfa",
    focuses: [
      "Entrenamiento específico de carrera",
      "Simulacros completos de HYROX",
      "Semana 11: carga alta final",
      "Semana 12: taper, reducción de volumen",
    ],
  },
];

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

function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-14 text-center"
        >
          <Badge variant="yellow" className="mb-4" style={{ backgroundColor: "#e5f93a" }}>
            Metodología
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            LOS 4 PILARES DEL ENTRENAMIENTO HYROX
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={idx + 1}
              >
                <Card
                  className="h-full border-t-2 border-t-transparent transition-all duration-200 hover:border-t-[#e5f93a] hover:scale-[1.01]"
                  hover
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="yellow"
                          className="shrink-0 px-2.5 py-1 text-sm font-bold"
                          style={{ backgroundColor: "#e5f93a" }}
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
                      <Icon className="h-6 w-6 shrink-0 text-[#e5f93a]/70" aria-hidden="true" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-white/60">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
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
        </motion.div>

        <div className="relative flex flex-col gap-6 sm:flex-row">
          <div
            className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-[#e5f93a]/30 via-[#f97316]/30 to-[#a78bfa]/30 sm:block"
            aria-hidden="true"
          />

          {phases.map((phase, idx) => (
            <motion.div
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StationTipsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-12 text-center"
        >
          <Badge variant="yellow" className="mb-4" style={{ backgroundColor: "#e5f93a" }}>
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
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stationTips.map((station, idx) => (
            <motion.div
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
                    className="border-[#e5f93a]/40 text-[10px] text-[#e5f93a]/80"
                  >
                    {station.badge}
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-white/60">{station.tip}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingClubCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-[#0a0a0a] py-24">
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <Badge variant="yellow" className="mb-2" style={{ backgroundColor: "#e5f93a" }}>
          Comunidad
        </Badge>
        <h2
          className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ENTRENA CON UN <span className="text-[#e5f93a]">EXPERTO</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">
          Encuentra un Training Club oficial o un Performance Coach certificado cerca de ti para
          prepararte con la metodología HYROX.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/gimnasios">
            <Button variant="primary" size="lg">
              Encuentra tu Training Club
            </Button>
          </Link>
          <Link to="/gimnasios">
            <Button variant="outline" size="lg">
              Buscar Performance Coach
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function PreparacionPage() {
  return (
    <>
      <PageHero
        badge="PREPARACIÓN"
        title="LA MEJOR PREPARACIÓN HYROX"
        subtitle="Todo lo que necesitas saber para llegar al día de la carrera en tu mejor forma."
      />
      <PillarsSection />
      <TimelineSection />
      <StationTipsSection />
      <TrainingClubCTA />
    </>
  );
}

export const Route = createFileRoute("/preparacion")({
  component: PreparacionPage,
});
