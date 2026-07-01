import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Link } from "@tanstack/react-router";
import { stations } from "@/data/stations";
import { Dumbbell, User, GraduationCap } from "lucide-react";
import { STATION_ICONS } from "@/lib/station-icons";

const EASE = [0.23, 1, 0.32, 1] as const;

const trainingOptions = [
  {
    title: "Club de entrenamiento",
    description:
      "Entrena en un gimnasio oficial RunLuv con equipamiento y metodología certificada. Encuentra un gimnasio cerca de ti y comienza a entrenar con una comunidad de atletas.",
    cta: "Encuentra un gimnasio",
    href: "/gimnasios",
    Icon: Dumbbell,
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&q=80&fit=crop&auto=format",
  },
  {
    title: "Coach de rendimiento",
    description:
      "Trabaja con un coach certificado RunLuv para una preparación personalizada. Planes de entrenamiento a medida, coaching técnico y estrategia de carrera.",
    cta: "Encuentra un coach",
    href: "/gimnasios",
    Icon: User,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&q=80&fit=crop&auto=format",
  },
  {
    title: "Academia RunLuv",
    description:
      "Certifícate como Coach de Rendimiento RunLuv o afilia tu gimnasio para unirte a la Red Global de Entrenamiento RunLuv.",
    cta: "Certifícate",
    href: "/afiliaciones",
    Icon: GraduationCap,
    imageUrl:
      "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=600&h=400&q=80&fit=crop&auto=format",
  },
];

function TrainPage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PageHero
        inverted
        title="PREPÁRATE PARA RUNLUV®"
        subtitle="Desarrolla la resistencia, el ritmo y la confianza que necesitas para completar tu desafío runluv®."
        badge="ENTRENAMIENTO"
      />

      {/* Training options */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14 text-center"
          >
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              CÓMO ENTRENAR
            </h2>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingOptions.map((option, i) => (
              <m.div
                key={option.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                className="group flex flex-col overflow-hidden cursor-pointer"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={option.imageUrl}
                    alt={option.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                  <div className="absolute bottom-3 left-4">
                    <option.Icon size={24} className="text-[#ffffff]" />
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="text-2xl font-normal text-white uppercase mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {option.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed flex-1">
                    {option.description}
                  </p>
                  <Link
                    to={option.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#ffffff] uppercase tracking-wider hover:opacity-80 transition-opacity"
                  >
                    {option.cta} →
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* The 8 stations */}
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
              Conoce la carrera
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              LAS 8 ESTACIONES
            </h2>
            <p className="mt-4 max-w-xl text-white/50">
              Entrena específicamente para cada estación y optimiza tu tiempo de carrera. Cada
              estación trabaja grupos musculares distintos.
            </p>
          </m.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stations.map((station, i) => (
              <m.div
                key={station.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                className="p-5"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-black shrink-0"
                    style={{ background: "#ffffff" }}
                  >
                    {station.number}
                  </span>
                  {(() => {
                    const Icon = STATION_ICONS[station.number];
                    return Icon ? (
                      <Icon className="h-5 w-5 text-white/60" aria-hidden="true" />
                    ) : null;
                  })()}
                </div>
                <h3
                  className="text-xl font-normal text-white uppercase mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {station.name}
                </h3>
                <p className="text-xs font-semibold text-[#ffffff] uppercase tracking-wider mb-3">
                  {station.detail}
                </p>
                <p className="text-xs text-white/50 leading-relaxed">{station.description}</p>
                <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] uppercase text-white/50 tracking-widest">Open</p>
                    <p className="text-xs text-white/60 mt-0.5">{station.openReps}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-white/50 tracking-widest">Pro</p>
                    <p className="text-xs text-white/60 mt-0.5">{station.proReps}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/train")({
  component: TrainPage,
});
