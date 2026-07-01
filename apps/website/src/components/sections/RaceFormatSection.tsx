import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { EASE } from "@/lib/animation";

const modalities = [
  {
    id: "luv",
    number: "01",
    name: "La Última Vuelta",
    shortName: "LUV",
    tagline: "Resistencia con eliminación progresiva",
    description:
      "Desafío de resistencia continua donde los corredores deben completar cada vuelta antes de que se acabe el tiempo; si no lo logran, quedan eliminados.",
    characteristics: [
      "Sin pausas ni reinicios",
      "Eliminación progresiva",
      "Alto componente mental y estratégico",
    ],
    criterio:
      "Gana el último corredor que logra mantenerse en competencia cumpliendo el tiempo límite por vuelta.",
    categories: ["Individual Open", "Individual Pro", "Doubles", "Teams", "Corporate Teams"],
    circuito: "3 — 5 km por vuelta (según autódromo)",
  },
  {
    id: "cpc",
    number: "02",
    name: "Cada Paso Cuenta",
    shortName: "4H",
    tagline: "Máxima distancia en 4 horas",
    description:
      "Desafío de acumulación de distancia donde los participantes buscan recorrer la mayor distancia posible dentro de un periodo de 4 horas.",
    characteristics: [
      "Ritmo libre",
      "Permite estrategias personales",
      "Ideal para todos los niveles",
    ],
    criterio: "Gana quien acumule mayor número de kilómetros al finalizar el tiempo oficial.",
    categories: ["Individual Open", "Individual Pro", "Doubles", "Teams", "Corporate Teams"],
    circuito: "4 horas continuas",
  },
  {
    id: "tradicional",
    number: "03",
    name: "Carreras Tradicionales",
    shortName: "5K / 10K",
    tagline: "Velocidad y marca personal",
    description:
      "Formato clásico de running enfocado en velocidad y mejora de marca personal. Distancias de 5 y 10 kilómetros con salidas por bloques.",
    characteristics: [
      "Cronometraje mediante chip",
      "Salidas organizadas por bloques",
      "Ganadores por categoría de edad",
    ],
    criterio: "Mejor tiempo absoluto y ganadores por categoría de edad.",
    categories: ["Femenil / Varonil", "18–29", "30–39", "40–49", "50+"],
    circuito: "5 km y 10 km",
  },
] as const;

function ModalityCard({
  modality,
  index,
}: {
  modality: (typeof modalities)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.42, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* border-t-2 border-t-transparent reserved always so layout never shifts */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 border-t-2 border-t-transparent bg-[#111111] p-6 transition-colors duration-200 group-hover:border-t-white">
        {/* Decorative large number — background accent */}
        <span
          className="pointer-events-none absolute -right-2 -top-2 select-none leading-none tabular-nums text-white/[0.06]"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "9rem" }}
          aria-hidden="true"
        >
          {modality.number}
        </span>

        {/* Number + short name header */}
        <div className="relative mb-3 flex items-end gap-3">
          <span
            className="text-[4.5rem] leading-none tabular-nums text-white/35"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {modality.number}
          </span>
          <div className="mb-1 flex flex-col">
            <span
              className="text-2xl leading-none tracking-wider text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {modality.shortName}
            </span>
          </div>
        </div>

        {/* Full name */}
        <h3
          className="text-xl leading-tight tracking-wide text-white uppercase text-balance"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {modality.name}
        </h3>

        {/* Tagline */}
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
          {modality.tagline}
        </p>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/60 text-balance">{modality.description}</p>

        {/* Circuito block — rounded-sm inside rounded-lg card */}
        <div className="mt-4 rounded-sm bg-white/[0.05] px-3 py-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Circuito
          </p>
          <p className="mt-0.5 text-sm font-semibold tabular-nums text-white/80">
            {modality.circuito}
          </p>
        </div>

        {/* Characteristics */}
        <ul className="mt-4 flex flex-col gap-2.5">
          {modality.characteristics.map((char) => (
            <li key={char} className="flex items-center gap-2.5 text-sm text-white/65">
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
                aria-hidden="true"
              />
              {char}
            </li>
          ))}
        </ul>

        {/* Spacer pushes categories to bottom */}
        <div className="mt-auto" />

        {/* Categories */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Categorías
          </p>
          <div className="flex flex-wrap gap-1.5">
            {modality.categories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="rounded-sm border-white/20 text-[10px] text-white/50 font-medium"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}

export function RaceFormatSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full py-20 md:py-28" style={{ background: "#0d0d0d" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="mb-14 text-center"
        >
          <Badge variant="outline" className="mb-5 border-white/25 text-white/55 tracking-[0.2em]">
            DESAFÍOS
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase text-balance sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ELIGE TU DESAFÍO
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base text-balance">
            Tres modalidades diseñadas para diferentes formas de correr y competir.
          </p>
        </m.div>

        {/* Modality cards — 3 columns on desktop */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {modalities.map((modality, index) => (
            <ModalityCard key={modality.id} modality={modality} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.38, delay: 0.28, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <a
            href="/la-carrera"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/55 transition-colors duration-200 hover:text-white active:scale-[0.96]"
          >
            Ver todos los desafíos
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </m.div>
      </div>
    </section>
  );
}
