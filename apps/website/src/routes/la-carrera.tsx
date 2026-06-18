import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { stations } from "@/data/stations";
import { divisions } from "@/data/events";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const muscleTooltips: Record<string, string> = {
  Brazos: "Tríceps y bíceps durante la tracción",
  Hombros: "Deltoides frontales y mediales",
  Core: "Estabilización del tronco y transferencia de fuerza",
  "Tren inferior": "Glúteos y cuádriceps al extender la postura",
  "Cadena posterior": "Glúteos, isquiotibiales y espalda baja",
  Cuádriceps: "Extensión de rodilla en cada paso",
  Glúteos: "Potencia en extensión de cadera",
  Espalda: "Erector spinae y trapecios",
  Bíceps: "Flexión de codo al jalar",
  "Cuerpo completo": "Activación coordinada de todos los grupos musculares",
  Cardiovascular: "Sistema aeróbico y capacidad de VO₂",
  Piernas: "Cuádriceps, isquiotibiales y pantorrillas",
  "Espalda alta": "Trapecios y romboides bajo carga sostenida",
  Grip: "Músculos del antebrazo y fuerza de agarre",
  Estabilizadores: "Core y músculos profundos de la cadera",
};

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-28 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.015) 40px,
            rgba(255,255,255,0.015) 41px
          )`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,249,58,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[#e5f93a]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          HYROX México
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="max-w-4xl text-[clamp(3.5rem,11vw,8.5rem)] font-normal leading-none tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          LA CARRERA DE <span className="text-[#e5f93a]">FITNESS</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="max-w-lg text-base leading-relaxed text-white/60 sm:text-lg"
        >
          8 km corriendo + 8 estaciones funcionales. Sin descanso.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          <Link to="/eventos">
            <Button variant="primary" size="lg">
              Inscríbete ahora
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StationCard({ station, index }: { station: (typeof stations)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group"
    >
      <Card
        className="h-full cursor-default border-t-2 border-t-transparent transition-transform duration-200 group-hover:border-t-[#e5f93a] group-hover:scale-[1.02]"
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
                {station.number}
              </Badge>
              <h3
                className="text-xl leading-none tracking-wider text-white uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {station.name}
              </h3>
            </div>
            <span className="text-2xl" aria-hidden="true">
              {station.icon}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[#e5f93a]/80">
            {station.detail}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-0">
          <p className="text-sm leading-relaxed text-white/60">{station.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {station.muscles.map((muscle) => (
              <Tooltip.Root key={muscle}>
                <Tooltip.Trigger asChild>
                  <Badge
                    variant="outline"
                    className="cursor-default border-white/20 text-[10px] text-white/50"
                  >
                    {muscle}
                  </Badge>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="top"
                    sideOffset={6}
                    className="z-50 max-w-[200px] rounded-sm border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-[11px] leading-relaxed text-white/70 shadow-xl"
                    style={{
                      transformOrigin: "var(--radix-tooltip-content-transform-origin)",
                    }}
                  >
                    {muscleTooltips[muscle] ?? muscle}
                    <Tooltip.Arrow className="fill-[#1a1a1a]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2 border-t border-[#2a2a2a] pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Open</p>
              <p className="mt-0.5 text-xs text-white/70">{station.openReps}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Pro</p>
              <p className="mt-0.5 text-xs text-white/70">{station.proReps}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StationsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          custom={0}
          className="mb-14 text-center"
        >
          <Badge variant="yellow" className="mb-4" style={{ backgroundColor: "#e5f93a" }}>
            Las 8 Estaciones
          </Badge>
          <h2
            className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            El Formato
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Comienza corriendo 1 km, luego completa una estación funcional. Repite 8 veces. Sin
            descanso entre corrida y estación.
          </p>
        </motion.div>

        <Tooltip.Provider delayDuration={400} skipDelayDuration={150}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station, idx) => (
              <StationCard key={station.number} station={station} index={idx} />
            ))}
          </div>
        </Tooltip.Provider>
      </div>
    </section>
  );
}

const divisionNotes: Record<string, string> = {
  Open: "Recomendado para quienes compiten por primera vez",
  Pro: "Para atletas con experiencia en funcional y running",
  Doubles: "Ambos atletas corren juntos y se turnan en las estaciones",
  "Pro Doubles": "Versión Pro del formato en pareja",
  Relay: "4 atletas × 2 km × 2 estaciones cada uno",
};

function DivisionsSection() {
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
          className="mb-12 text-center"
        >
          <Badge variant="dark" className="mb-4 border border-[#2a2a2a]">
            Categorías
          </Badge>
          <h2
            className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Divisiones
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            HYROX ofrece categorías para todos los perfiles, desde principiantes hasta atletas de
            élite.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="overflow-x-auto rounded-lg border border-[#2a2a2a]"
        >
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] bg-[#111111]">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                  División
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                  Descripción
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                  Nota especial
                </th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((division, idx) => (
                <tr
                  key={division.name}
                  className={[
                    "border-b border-[#2a2a2a] transition-colors duration-150 hover:bg-white/[0.03]",
                    idx === divisions.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <td className="px-5 py-4">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                      style={{ color: division.color }}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: division.color }}
                      />
                      {division.name}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/70">{division.description}</td>
                  <td className="px-5 py-4 text-white/40 text-xs">
                    {divisionNotes[division.name] ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

const rules = [
  {
    icon: "⏱",
    title: "El tiempo es todo",
    body: "El tiempo final es el tiempo total de carrera desde el disparo de salida hasta cruzar la meta. Cada segundo cuenta.",
  },
  {
    icon: "📏",
    title: "Estándares estrictos",
    body: "Los estándares de movimiento son verificados por jueces en cada estación. Un rep no válido no cuenta.",
  },
  {
    icon: "⚠️",
    title: "Penalizaciones",
    body: "Los reps incompletos resultan en penalizaciones de tiempo añadidas al resultado final. No hay excepciones.",
  },
];

function RulesSection() {
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
            Reglamento
          </Badge>
          <h2
            className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Las Reglas
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rules.map((rule, idx) => (
            <motion.div
              key={rule.title}
              ref={idx === 0 ? undefined : undefined}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={idx + 1}
            >
              <Card className="h-full p-6" hover>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-none bg-[#e5f93a]/10 text-xl">
                  {rule.icon}
                </div>
                <h3
                  className="mb-2 text-xl uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {rule.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{rule.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
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
        <h2
          className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Encuentra tu <span className="text-[#e5f93a]">Carrera</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">
          Próximas fechas en México. Elige tu ciudad, elige tu categoría, regístrate.
        </p>
        <Link to="/eventos">
          <Button variant="primary" size="lg">
            Ver todos los eventos
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}

function LaCarreraPage() {
  return (
    <>
      <HeroSection />
      <StationsSection />
      <DivisionsSection />
      <RulesSection />
      <BottomCTA />
    </>
  );
}

export const Route = createFileRoute("/la-carrera")({
  component: LaCarreraPage,
});
