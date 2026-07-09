import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/Badge";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { EASE } from "@/lib/animation";
import { ACCENT } from "@/lib/theme";

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
    imageUrl: "/images/1461896836934-ffe607ba8211-800x1100.webp",
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
    imageUrl: "/images/1526676537331-7747bf8278fc-800x1100.webp",
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
    imageUrl: "/images/1517836357463-d25dfeac3438-800x1100.webp",
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
      className="group h-full"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -6 }}
    >
      <div className="relative flex h-full min-h-[560px] flex-col justify-end overflow-hidden rounded-lg border border-white/10">
        {/* Full-bleed photo — grayscale until hover */}
        <img
          src={modality.imageUrl}
          width={800}
          height={1100}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-[transform,filter] duration-700 ease-out-strong group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        {/* Giant outlined number */}
        <span
          className="pointer-events-none absolute right-4 top-2 select-none leading-none tabular-nums"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "7rem",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(212,255,0,0.45)",
          }}
          aria-hidden="true"
        >
          {modality.number}
        </span>

        {/* Content — bottom anchored, one clean column */}
        <div className="relative z-10 flex flex-col gap-3 p-6">
          <span
            className="text-4xl leading-none tracking-wide uppercase sm:text-6xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
          >
            {modality.shortName}
          </span>

          <div>
            <h3
              className="text-2xl leading-tight tracking-wide text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {modality.name}
            </h3>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {modality.tagline}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-white/70">{modality.description}</p>

          <div className="flex items-center gap-2 border-y border-white/15 py-2.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Circuito
            </span>
            <span className="text-sm font-semibold tabular-nums text-rl-accent">
              {modality.circuito}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {modality.categories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="rounded-sm border-white/25 text-[10px] text-white/60 font-medium"
              >
                {cat}
              </Badge>
            ))}
          </div>

          <Link
            to="/eventos"
            className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96]"
            style={{ background: ACCENT }}
          >
            Inscríbete <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </m.div>
  );
}

export function RaceFormatSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #000 0%, #0d0d0d 30%, #101204 100%)" }}
    >
      {/* Floating accent glows — motion-graphics backdrop */}
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-48 top-24 h-[32rem] w-[32rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.09), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="animate-blob-slow pointer-events-none absolute -right-56 bottom-0 h-[38rem] w-[38rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.06), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <AnimatedTitle
            text="ELIGE TU DESAFÍO"
            accent={["DESAFÍO"]}
            className="text-5xl text-white text-balance sm:text-6xl md:text-7xl lg:text-8xl"
          />
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
