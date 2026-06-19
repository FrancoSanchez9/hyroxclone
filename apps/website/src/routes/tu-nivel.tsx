import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { motion, useInView } from "framer-motion";
import { divisions } from "@/data/events";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

type Q1Option = "none" | "some" | "regular" | "elite";
type Q2Option = "solo" | "pair" | "team";

interface Recommendation {
  division: string;
  reason: string;
}

function getRecommendation(q1: Q1Option | null, q2: Q2Option | null): Recommendation | null {
  if (!q1 || !q2) return null;
  if (q2 === "pair") {
    return {
      division: "Doubles",
      reason:
        "Compite con un compañero/a. Corren juntos y se turnan en las estaciones. Ideal para quienes disfrutan del trabajo en equipo.",
    };
  }
  if (q2 === "team") {
    return {
      division: "Relay",
      reason:
        "Equipo de 4 personas. Cada atleta completa 2 km y 2 estaciones. La opción más accesible para grupos.",
    };
  }
  if (q1 === "none" || q1 === "some") {
    return {
      division: "Open",
      reason:
        "La categoría perfecta para debutantes y atletas en desarrollo. Mismos pesos estándar, toda la adrenalina.",
    };
  }
  return {
    division: "Pro",
    reason:
      "Para atletas experimentados que buscan el mayor desafío. Misma distancia y estaciones, pesos más altos.",
  };
}

const q1Options: { id: Q1Option; label: string }[] = [
  { id: "none", label: "A) Ninguna — soy principiante" },
  { id: "some", label: "B) Algo de experiencia" },
  { id: "regular", label: "C) Competidor regular" },
  { id: "elite", label: "D) Atleta de alto rendimiento" },
];

const q2Options: { id: Q2Option; label: string }[] = [
  { id: "solo", label: "A) Solo/a" },
  { id: "pair", label: "B) En pareja" },
  { id: "team", label: "C) En equipo de 4" },
];

function QuizOption<T extends string>({
  id,
  label,
  selected,
  onSelect,
}: {
  id: T;
  label: string;
  selected: boolean;
  onSelect: (id: T) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "w-full rounded-none border px-5 py-3.5 text-left text-sm font-medium transition-all duration-150",
        selected
          ? "border-[#e5f93a] bg-[#e5f93a]/10 text-[#e5f93a]"
          : "border-[#2a2a2a] bg-[#1a1a1a] text-white/70 hover:border-[#3a3a3a] hover:text-white",
      )}
    >
      {label}
    </button>
  );
}

function QuizSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [q1, setQ1] = useState<Q1Option | null>(null);
  const [q2, setQ2] = useState<Q2Option | null>(null);

  const recommendation = getRecommendation(q1, q2);

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-12 text-center"
        >
          <Badge variant="dark" className="mb-4 border border-[#2a2a2a]">
            Selector
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¿PRIMERA VEZ EN HYROX?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Responde dos preguntas y te diremos cuál es tu división ideal.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="space-y-8"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e5f93a]">
              Pregunta 1 de 2
            </p>
            <p className="mb-4 text-base font-medium text-white sm:text-lg">
              ¿Cuánta experiencia tienes en competencias de fitness?
            </p>
            <div className="space-y-2">
              {q1Options.map((opt) => (
                <QuizOption
                  key={opt.id}
                  id={opt.id}
                  label={opt.label}
                  selected={q1 === opt.id}
                  onSelect={setQ1}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#e5f93a]">
              Pregunta 2 de 2
            </p>
            <p className="mb-4 text-base font-medium text-white sm:text-lg">
              ¿Prefieres competir...?
            </p>
            <div className="space-y-2">
              {q2Options.map((opt) => (
                <QuizOption
                  key={opt.id}
                  id={opt.id}
                  label={opt.label}
                  selected={q2 === opt.id}
                  onSelect={setQ2}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={false}
            animate={recommendation ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {recommendation && (
              <div className="rounded-none border border-[#e5f93a] bg-[#e5f93a]/5 p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#e5f93a]/70">
                  Tu categoría recomendada
                </p>
                <p
                  className="mb-2 text-4xl leading-none tracking-wider text-[#e5f93a] uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {recommendation.division}
                </p>
                <p className="text-sm leading-relaxed text-white/60">{recommendation.reason}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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

function DivisionsDetailSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
        </motion.div>

        <div className="space-y-4">
          {divisions.map((division, idx) => {
            const detail = divisionDetails[division.name];
            return (
              <motion.div
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
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                            Para quién es
                          </p>
                          <p className="text-sm leading-relaxed text-white/70">{detail.forWho}</p>
                        </div>
                        <div>
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
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
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const AGE_BRACKETS = [
  "16-24",
  "25-29",
  "30-34",
  "35-39",
  "40-44",
  "45-49",
  "50-54",
  "55-59",
  "60-64",
  "65-69",
  "70-74",
  "75-79",
  "80-84",
  "85-89",
];

const PRO_MAX_AGE_GROUP = "55-59";

function AgeGroupsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const proIndex = AGE_BRACKETS.indexOf(PRO_MAX_AGE_GROUP);

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-10 text-center"
        >
          <Badge variant="dark" className="mb-4 border border-[#2a2a2a]">
            Edades
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            GRUPOS DE EDAD
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50">
            HYROX distribuye a los competidores por grupos de edad dentro de cada división.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="overflow-x-auto rounded-none border border-[#2a2a2a]"
        >
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-[#e5f93a]">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-black">
                  Grupo de edad
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black">
                  Open
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black">
                  Pro
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black">
                  Doubles
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black">
                  Relay
                </th>
              </tr>
            </thead>
            <tbody>
              {AGE_BRACKETS.map((bracket, idx) => {
                const isProAvailable = idx <= proIndex;
                const isRelayBracket = idx === 0 || idx === 8;
                return (
                  <tr
                    key={bracket}
                    className={cn(
                      "border-b border-[#2a2a2a] transition-colors duration-100 hover:bg-white/[0.03]",
                      idx === AGE_BRACKETS.length - 1 && "border-b-0",
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className="font-bold text-white uppercase tracking-widest"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}
                      >
                        {bracket}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="text-[#e5f93a]">✓</span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {isProAvailable ? (
                        <span className="text-white/70">✓</span>
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="text-xs text-white/50">Promedio</span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {isRelayBracket ? (
                        <span className="text-xs font-semibold text-white/70">
                          {idx === 0 ? "Under 40" : "40+"}
                        </span>
                      ) : (
                        <span className="text-white/20 text-xs">ver nota</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          className="mt-6 space-y-2"
        >
          <p className="text-xs leading-relaxed text-white/40">
            * Las divisiones Pro solo están disponibles hasta el grupo de edad 55-59.
          </p>
          <p className="text-xs leading-relaxed text-white/40">
            * En Doubles se usa el promedio de edad de ambos atletas para asignar el grupo.
          </p>
          <p className="text-xs leading-relaxed text-white/40">
            * En Relay existen dos categorías: Under 40 (todos los miembros menores de 40 años) y
            40+ (al menos un miembro de 40 años o más).
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
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
          Ya sé mi <span className="text-[#e5f93a]">categoría</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">
          Elige tu evento, confirma tu división y reserva tu lugar antes de que se agoten.
        </p>
        <Link to="/eventos">
          <Button variant="primary" size="lg">
            Ver eventos disponibles
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}

function TuNivelPage() {
  return (
    <>
      <PageHero
        badge="ENCUENTRA TU NIVEL"
        title="¿CUÁL ES TU CATEGORÍA?"
        subtitle="HYROX tiene una división para cada atleta. Descubre cuál es la tuya."
      />
      <QuizSection />
      <DivisionsDetailSection />
      <AgeGroupsSection />
      <CTASection />
    </>
  );
}

export const Route = createFileRoute("/tu-nivel")({
  head: () => ({
    meta: seo({
      title: "Encuentra tu Nivel",
      description:
        "Descubre qué división HYROX es para ti —Open, Pro, Doubles o Relay— y entrena con un objetivo claro.",
    }),
  }),
  component: TuNivelPage,
});
