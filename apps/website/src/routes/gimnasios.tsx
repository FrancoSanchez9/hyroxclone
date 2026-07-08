import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { m } from "framer-motion";
import { Search, MapPin, Star, Trophy, Zap, ArrowRight } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const tiers = [
  {
    icon: Star,
    name: "runluv® Running Club",
    level: "Nivel 1",
    description:
      "El punto de entrada. Clubes que ofrecen entrenamiento de running con la metodología runluv® y comunidad para tu primer desafío.",
  },
  {
    icon: Trophy,
    name: "runluv® Performance Centre",
    level: "Nivel 2",
    description:
      "Nivel premium. Coaches con certificación avanzada, planes personalizados y preparación específica para cada modalidad.",
  },
  {
    icon: Zap,
    name: "runluv® Performance Academy",
    level: "Nivel 3",
    description:
      "El nivel más alto. Formación de coaches y centro de excelencia para corredores de alto rendimiento.",
  },
];

const FILTERS = ["Todos", "Running Club", "Performance Centre"] as const;
type Filter = (typeof FILTERS)[number];

const clubs = [
  {
    id: 1,
    name: "Club Corredores CDMX",
    city: "Ciudad de México",
    type: "Performance Centre" as const,
    address: "Bosque de Chapultepec",
  },
  {
    id: 2,
    name: "Monterrey Run Collective",
    city: "Monterrey",
    type: "Performance Centre" as const,
    address: "Parque Fundidora",
  },
  {
    id: 3,
    name: "Guadalajara Running Club",
    city: "Guadalajara",
    type: "Running Club" as const,
    address: "Bosque Los Colomos",
  },
  {
    id: 4,
    name: "Puebla Runners",
    city: "Puebla",
    type: "Running Club" as const,
    address: "Paseo Bravo",
  },
  {
    id: 5,
    name: "León Endurance Club",
    city: "León",
    type: "Running Club" as const,
    address: "Parque Metropolitano",
  },
  {
    id: 6,
    name: "Bajío Performance",
    city: "León",
    type: "Performance Centre" as const,
    address: "Blvd. Adolfo López Mateos",
  },
];

function GimnasiasPage() {
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");

  const q = searchValue.trim().toLowerCase();
  const visible = clubs.filter((c) => {
    const matchesType = filter === "Todos" || c.type === filter;
    const matchesSearch =
      !q || c.city.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 70%, #101204 100%)" }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-14 pt-32 md:pt-40">
        <m.img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=60&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          loading="eager"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20 grayscale"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
        <div
          aria-hidden="true"
          className="animate-blob pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,255,0,0.09), transparent 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Comunidad runluv®
          </m.span>
          <AnimatedTitle
            text="ENCUENTRA TU CLUB"
            accent={["CLUB"]}
            className="text-[clamp(2.6rem,8vw,6rem)] text-white"
          />
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Clubes de running y coaches certificados con la metodología runluv® en toda la
            República. Entrena en comunidad y llega listo a tu próxima carrera.
          </m.p>
        </div>
      </section>

      {/* Certification tiers */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              Certificación
            </p>
            <AnimatedTitle
              text="NIVELES DE CLUB"
              accent={["CLUB"]}
              className="text-5xl text-white sm:text-6xl"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <m.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col gap-4 border border-white/10 border-t-2 border-t-transparent bg-white/[0.03] p-7 transition-colors duration-200 hover:border-t-[#d4ff00]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon size={28} style={{ color: ACCENT }} aria-hidden="true" />
                    <span
                      className="border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                      style={{ borderColor: "rgba(212,255,0,0.4)", color: ACCENT }}
                    >
                      {tier.level}
                    </span>
                  </div>
                  <h3
                    className="text-2xl uppercase leading-none tracking-wide text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">{tier.description}</p>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              Directorio
            </p>
            <AnimatedTitle
              text="BUSCA TU CLUB"
              accent={["CLUB"]}
              className="text-5xl text-white sm:text-6xl"
            />
          </div>

          {/* Search + filters */}
          <div className="mb-8 flex flex-col gap-4">
            <div className="relative max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Buscar por ciudad o nombre"
                placeholder="Busca por ciudad o nombre del club…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-[border-color] duration-150 focus:border-[#d4ff00] focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-[background-color,border-color,color] duration-150 active:scale-[0.96]",
                    filter === f
                      ? "border-[#d4ff00] bg-[#d4ff00] text-black"
                      : "border-white/15 text-white/50 hover:border-white/50 hover:text-white",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm uppercase tracking-widest text-white/50">
              No encontramos clubes para "{searchValue}"
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {visible.map((club, i) => (
                <m.div
                  key={club.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                  whileHover={{ y: -3 }}
                  className="group flex flex-col gap-3 border border-white/10 border-l-2 border-l-transparent bg-white/[0.03] p-5 transition-colors duration-200 hover:border-l-[#d4ff00]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-2xl uppercase leading-none tracking-wide text-white transition-colors duration-200 group-hover:text-[#d4ff00]"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {club.name}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                        club.type === "Performance Centre"
                          ? "border-transparent bg-[#d4ff00] text-black"
                          : "border-white/20 text-white/50",
                      )}
                    >
                      {club.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/55">
                    <MapPin
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: ACCENT }}
                      aria-hidden="true"
                    />
                    {club.city} — {club.address}
                  </div>
                </m.div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-4 border border-white/10 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-white/60">
              ¿No encuentras tu ciudad? Ayúdanos a expandir la red runluv®.
            </p>
            <Link
              to="/afiliaciones"
              className="inline-flex shrink-0 items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] hover:brightness-95 active:scale-[0.96]"
              style={{ background: ACCENT }}
            >
              Afiliar mi club
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/gimnasios")({
  head: () => ({
    meta: [
      { title: "Clubes | runluv® — Entrena en tu Ciudad" },
      {
        name: "description",
        content:
          "Encuentra clubes de running y coaches certificados runluv® en toda México. Entrena en comunidad y prepárate para competir. Busca por ciudad.",
      },
    ],
  }),
  component: GimnasiasPage,
});
