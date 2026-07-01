import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import { Star } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Link } from "@tanstack/react-router";

const EASE = [0.23, 1, 0.32, 1] as const;

const qualificationCriteria = [
  {
    title: "Puntos de temporada",
    description:
      "Acumula puntos en todos los eventos RunLuv de la temporada. Los mejores clasifican automáticamente.",
  },
  {
    title: "Ranking mundial",
    description:
      "Mantén un ranking entre los 15 mejores del mundo en tu división (Pro Men o Pro Women).",
  },
  {
    title: "Wild Card",
    description:
      "Selección por wild card del Director de Carrera por actuaciones destacadas durante la temporada.",
  },
];

const elite15Athletes = [
  { name: "Tim Wenisch", country: "Germany 🇩🇪", division: "Pro Men", rank: 1, bestTime: "54:08" },
  { name: "Hunter McIntyre", country: "USA 🇺🇸", division: "Pro Men", rank: 2, bestTime: "55:23" },
  { name: "Jonas Weber", country: "Germany 🇩🇪", division: "Pro Men", rank: 3, bestTime: "56:12" },
  { name: "Luca Rossetti", country: "Italy 🇮🇹", division: "Pro Men", rank: 4, bestTime: "56:44" },
  {
    name: "Anders Eriksson",
    country: "Sweden 🇸🇪",
    division: "Pro Men",
    rank: 5,
    bestTime: "57:02",
  },
  {
    name: "Linda Meier",
    country: "Germany 🇩🇪",
    division: "Pro Women",
    rank: 1,
    bestTime: "1:02:45",
  },
  { name: "Lauren Weeks", country: "USA 🇺🇸", division: "Pro Women", rank: 2, bestTime: "1:04:17" },
  {
    name: "Emma Fischer",
    country: "Switzerland 🇨🇭",
    division: "Pro Women",
    rank: 3,
    bestTime: "1:05:33",
  },
  {
    name: "Anna Kovaleva",
    country: "Ukraine 🇺🇦",
    division: "Pro Women",
    rank: 4,
    bestTime: "1:06:11",
  },
  {
    name: "Sofia Lenz",
    country: "Austria 🇦🇹",
    division: "Pro Women",
    rank: 5,
    bestTime: "1:06:58",
  },
];

function Elite15Page() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PageHero
        inverted
        title="ELITE 15"
        subtitle="Los corredores con mejores resultados de la temporada compiten por el reconocimiento oficial en la Gran Final runluv®."
        badge="ELITE LUV"
      />

      {/* What is Elite 15 */}
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
                Sobre el programa
              </p>
              <h2
                className="text-5xl md:text-7xl font-normal leading-none text-white uppercase mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                LA ETAPA ELITE
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Elite 15 es la cima de la competición RunLuv. Los 15 mejores atletas Pro del mundo
                compiten cara a cara en el Campeonato Mundial que cierra la temporada, con un
                formato diseñado especialmente para la ocasión.
              </p>
              <p className="text-white/60 leading-relaxed mb-4">
                A diferencia de los eventos RunLuv habituales, donde los atletas compiten contra el
                reloj, Elite 15 utiliza un sistema de eliminatorias en el que los 8 más rápidos
                avanzan, luego 4, hasta el duelo final entre los 2 mejores.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Es el día más emocionante del fitness racing: competición directa, público en vivo y
                transmisión global.
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="p-8"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <div
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-black mb-6"
                style={{ background: "#ffffff" }}
              >
                Formato Elite
              </div>
              <div className="space-y-4">
                {[
                  "Cuartos de final (8 atletas)",
                  "Semifinales (4 atletas)",
                  "Final (2 atletas)",
                  "Campeón Mundial",
                ].map((stage, i) => (
                  <div
                    key={stage}
                    className="flex items-center gap-4 py-3 border-b border-white/10"
                  >
                    <span
                      className="w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: i === 3 ? "#ffffff" : "#333",
                        color: i === 3 ? "#000" : "#fff",
                      }}
                    >
                      {i === 3 ? <Star className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span
                      className={`text-sm ${i === 3 ? "text-[#ffffff] font-semibold" : "text-white/60"}`}
                    >
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Qualification criteria */}
      <section style={{ background: "#0a0a0a" }} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff] mb-3">
              Cómo clasificar
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              CLASIFICACIÓN
            </h2>
          </m.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualificationCriteria.map((item, i) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                className="p-6"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center text-sm font-bold text-black mb-4"
                  style={{ background: "#ffffff" }}
                >
                  {i + 1}
                </div>
                <h3
                  className="text-xl font-normal text-white uppercase mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Elite 15 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff] mb-3">
              Temporada 2026
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              RANKINGS ACTUALES
            </h2>
          </m.div>
          <div className="space-y-2">
            {elite15Athletes.map((athlete, i) => (
              <m.div
                key={athlete.name}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                className="flex items-center gap-4 p-4"
                style={{
                  background: i === 0 || i === 5 ? "rgba(255,255,255,0.08)" : "#111",
                  border: `1px solid ${i === 0 || i === 5 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <span
                  className="w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: i === 0 || i === 5 ? "#ffffff" : "#222",
                    color: i === 0 || i === 5 ? "#000" : "#fff",
                  }}
                >
                  {athlete.rank}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-lg font-normal text-white uppercase"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {athlete.name}
                    </h3>
                    {(i === 0 || i === 5) && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider text-black"
                        style={{ background: "#ffffff" }}
                      >
                        Líder
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60">{athlete.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">
                    {athlete.division}
                  </p>
                  <span
                    className="text-lg font-normal text-[#ffffff] tabular-nums"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {athlete.bestTime}
                  </span>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0a0a0a" }} className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              APUNTA AL ELITE 15
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
              Cada carrera RunLuv es una oportunidad de sumar puntos para clasificar al Elite 15.
              Comienza tu camino hoy.
            </p>
            <Link
              to="/eventos"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96]"
            >
              Encuentra un evento
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/elite-15")({
  component: Elite15Page,
});
