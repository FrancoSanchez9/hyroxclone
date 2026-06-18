import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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

const facts = [
  {
    icon: "🏋️",
    label: "Pesos PRO para todos",
    sub: "Open, Doubles y Pro compiten con los mismos pesos exigentes",
  },
  {
    icon: "⭐",
    label: "Ranking global Elite 15",
    sub: "Solo los 15 mejores por región acumulan puntos durante la temporada",
  },
  {
    icon: "🌍",
    label: "La mayor carrera de fitness del mundo",
    sub: "Miles de atletas de más de 50 países en un solo evento",
  },
];

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-14 text-center"
        >
          <Badge
            variant="yellow"
            className="mb-5"
            style={{ backgroundColor: "#e5f93a", color: "#0a0a0a" }}
          >
            El Evento Cumbre
          </Badge>
          <h2
            className="text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¿QUÉ ES EL <span style={{ color: "#e5f93a" }}>WORLD CHAMPIONSHIP?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Todos los competidores participan con pesos Pro. Las categorías Open y Doubles también
            usan pesos Pro. La temporada 2025/26 culmina en el campeonato mundial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {facts.map((fact, idx) => (
            <motion.div
              key={fact.label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={idx + 1}
            >
              <Card className="h-full border-t-2 p-6" style={{ borderTopColor: "#e5f93a" }} hover>
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center text-xl"
                  style={{ background: "rgba(255,215,0,0.08)" }}
                >
                  {fact.icon}
                </div>
                <h3
                  className="mb-2 text-xl uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {fact.label}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{fact.sub}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const qualifyPaths = [
  {
    number: "01",
    title: "División Open",
    body: "Clasifica por posición en tu división Open durante eventos certificados de la temporada en tu región.",
    accent: "#e5f93a",
  },
  {
    number: "02",
    title: "Ranking Elite 15",
    body: "Acumula puntos en el sistema Elite 15 durante la temporada y sé uno de los 15 mejores atletas de tu región.",
    accent: "#e5f93a",
  },
  {
    number: "03",
    title: "División Pro",
    body: "Los resultados en la división Pro te posicionan directamente en el ranking global con acceso al campeonato.",
    accent: "#C0C0C0",
  },
];

function QualifySection() {
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
          <Badge variant="dark" className="mb-5 border border-[#2a2a2a]">
            Clasificación
          </Badge>
          <h2
            className="text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¿CÓMO <span style={{ color: "#e5f93a" }}>CLASIFICAR?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Existen tres caminos para llegar al campeonato mundial. Elige el tuyo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {qualifyPaths.map((path, idx) => (
            <motion.div
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
                  <h3
                    className="text-2xl uppercase tracking-wider text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {path.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">{path.body}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pointsRows = [
  { position: "1°", points: "100 pts", color: "#e5f93a" },
  { position: "2°", points: "90 pts", color: "#C0C0C0" },
  { position: "3°", points: "80 pts", color: "#CD7F32" },
  { position: "4° – 5°", points: "70 – 60 pts", color: "rgba(255,255,255,0.5)" },
  { position: "6° – 10°", points: "50 – 20 pts", color: "rgba(255,255,255,0.4)" },
  { position: "11° – 15°", points: "15 – 5 pts", color: "rgba(255,255,255,0.3)" },
];

function Elite15Section() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
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
            style={{ backgroundColor: "#e5f93a", color: "#0a0a0a" }}
          >
            Sistema de puntos
          </Badge>
          <h2
            className="text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            EL SISTEMA <span style={{ color: "#e5f93a" }}>ELITE 15</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            Los mejores 15 atletas de cada región acumulan puntos en eventos certificados durante la
            temporada para clasificar al campeonato mundial.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="overflow-x-auto rounded-lg border border-[#2a2a2a]"
        >
          <table className="w-full min-w-[360px] text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] bg-[#111111]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                  Posición
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/40">
                  Puntos otorgados
                </th>
              </tr>
            </thead>
            <tbody>
              {pointsRows.map((row, idx) => (
                <tr
                  key={row.position}
                  className={[
                    "border-b border-[#2a2a2a] transition-colors duration-150 hover:bg-white/[0.03]",
                    idx === pointsRows.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <td className="px-6 py-4">
                    <span
                      className="text-sm font-bold uppercase tracking-wide"
                      style={{ color: row.color }}
                    >
                      {row.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          className="mt-5 text-center text-xs text-white/30"
        >
          Los puntos se acumulan en los mejores 3 resultados de la temporada por atleta.
        </motion.p>
      </div>
    </section>
  );
}

function ChampionshipTeaserSection() {
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
          className="relative overflow-hidden rounded-lg border border-[#2a2a2a] p-10 text-center sm:p-16"
          style={{
            background: "linear-gradient(135deg, #111111 0%, #0f0f0f 50%, #141414 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,215,0,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.012) 40px,
                rgba(255,255,255,0.012) 41px
              )`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <Badge
              className="mb-2"
              style={{ backgroundColor: "#e5f93a", color: "#0a0a0a", borderColor: "transparent" }}
            >
              Próximo campeonato
            </Badge>
            <h2
              className="max-w-3xl text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-wider text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PUMA HYROX <span style={{ color: "#e5f93a" }}>WORLD CHAMPIONSHIPS</span> STOCKHOLM
            </h2>
            <p
              className="text-lg font-semibold uppercase tracking-[0.2em] text-white/60"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Mayo 2026 — Estocolmo, Suecia
            </p>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/45">
              La arena donde los mejores atletas del mundo se reunirán para decidir quién es el
              campeón mundial de fitness funcional.
            </p>
            <a
              href="https://hyrox.com/world-championship/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="lg"
                style={{ backgroundColor: "#e5f93a", color: "#0a0a0a" }}
              >
                Ver información oficial
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-24">
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <h2
          className="text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-wider text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ¿Listo para <span style={{ color: "#e5f93a" }}>clasificar?</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">
          Participa en un evento certificado en México y da el primer paso hacia el campeonato
          mundial.
        </p>
        <Link to="/eventos">
          <Button variant="primary" size="lg">
            Ver eventos en México
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}

function CampeonatosPage() {
  return (
    <>
      <PageHero
        badge="WORLD CHAMPIONSHIP"
        title="CAMPEONATO MUNDIAL HYROX"
        subtitle="El destino de los mejores atletas del mundo. La cima de la competencia de fitness."
      />
      <AboutSection />
      <QualifySection />
      <Elite15Section />
      <ChampionshipTeaserSection />
      <CTASection />
    </>
  );
}

export const Route = createFileRoute("/campeonatos")({
  component: CampeonatosPage,
});
