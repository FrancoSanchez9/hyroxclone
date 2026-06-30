import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Link } from "@tanstack/react-router";
import { Award, Shirt, Trophy, BarChart2 } from "lucide-react";
import type { LucideProps } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

const finisherPerks: {
  Icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}[] = [
  {
    Icon: Award,
    title: "Medalla de finisher",
    description:
      "Medalla única para cada finisher de RunLuv, diseñada específicamente para cada evento.",
  },
  {
    Icon: Shirt,
    title: "Camiseta de finisher",
    description: "Camiseta técnica premium para conmemorar tu logro.",
  },
  {
    Icon: Trophy,
    title: "Certificado de finisher",
    description: "Certificado digital oficial con tu tiempo final y posición en el ranking.",
  },
  {
    Icon: BarChart2,
    title: "Panel de resultados",
    description: "Análisis completo de la carrera con tiempos parciales por estación y kilómetro.",
  },
];

const rankingTiers = [
  {
    tier: "Finisher",
    color: "#888",
    description: "Completa las 8 estaciones y los 8 km. Eres un RunLuv Finisher.",
  },
  {
    tier: "Plata",
    color: "#C0C0C0",
    description: "Top 40% de tu división. Una actuación sólida.",
  },
  {
    tier: "Oro",
    color: "#ffffff",
    description: "Top 20% de tu división. Condición física de élite.",
  },
  {
    tier: "Elite LUV",
    color: "#ffffff",
    description: "Los 15 mejores atletas del mundo. Clasificación para el Campeonato Mundial.",
  },
];

function CompletePage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PageHero
        inverted
        title="CRUZA LA META"
        subtitle="Cruza la meta, recibe tu finisher pack y descubre tu posición en el ranking oficial."
        badge="META"
      />

      {/* Results */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <m.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff] mb-4">
                Resultados de la carrera
              </p>
              <h2
                className="text-5xl md:text-7xl font-normal leading-none text-white uppercase mb-6 text-balance"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                TUS RESULTADOS
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Tras cruzar la meta, tus resultados oficiales están disponibles en minutos. Cada
                parcial, tiempo por estación y posición general se registra en tiempo real.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Los resultados se publican en el marcador global de RunLuv. Compárate con atletas de
                todo el mundo en tu división y grupo de edad.
              </p>
              <Link
                to="/eventos"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96]"
              >
                Encuentra un evento
              </Link>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="p-8"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#ffffff] mb-6">
                Tarjeta de resultados (ejemplo)
              </p>
              <div className="space-y-4">
                {["1 km Run", "SkiErg 1,000m", "1 km Run", "Sled Push 50m"].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2 border-b border-white/10"
                  >
                    <span className="text-sm text-white/60">{item}</span>
                    <span className="text-sm font-semibold text-white tabular-nums">
                      {["4:32", "3:15", "4:41", "1:52"][i]}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    Tiempo total
                  </span>
                  <span
                    className="text-2xl font-normal text-[#ffffff] tabular-nums"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    1:08:42
                  </span>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Finisher Pack */}
      <section style={{ background: "#0a0a0a" }} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff] mb-3">
              Para cada finisher
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              FINISHER PACK
            </h2>
          </m.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {finisherPerks.map((perk, i) => (
              <m.div
                key={perk.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                className="p-6 text-center"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex justify-center mb-4">
                  <perk.Icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3
                  className="text-xl font-normal text-white uppercase mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {perk.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{perk.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ranking */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14"
          >
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              NIVELES DE RANKING
            </h2>
          </m.div>
          <div className="space-y-3">
            {rankingTiers.map((tier, i) => (
              <m.div
                key={tier.tier}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: "easeOut" }}
                className="flex items-center gap-6 p-5"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: tier.color }} />
                <div className="flex-1">
                  <h3
                    className="text-xl font-normal uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: tier.color }}
                  >
                    {tier.tier}
                  </h3>
                  <p className="text-sm text-white/50">{tier.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/complete")({
  component: CompletePage,
});
