import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { stations } from "@/data/stations";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const flowSteps = Array.from({ length: 8 }, (_, i) => i + 1).flatMap((n) => [
  { type: "run" as const, label: "1 km Run", key: `run-${n}` },
  { type: "station" as const, label: `Estación ${n}`, key: `station-${n}` },
]);
const allSteps = [...flowSteps, { type: "finish" as const, label: "Finish", key: "finish" }];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: i * 0.07 },
  }),
};

function StationCard({ station, index }: { station: (typeof stations)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
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
              <Badge variant="yellow" className="shrink-0 text-sm font-bold px-2.5 py-1">
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
          <p className="mt-1 text-sm font-semibold tracking-wider text-[#e5f93a]/80 uppercase">
            {station.detail}
          </p>
        </CardHeader>

        <CardContent className="pt-0 flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-white/60">{station.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {station.muscles.map((muscle) => (
              <Badge
                key={muscle}
                variant="outline"
                className="text-white/50 border-white/20 text-[10px]"
              >
                {muscle}
              </Badge>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2 border-t border-[#2a2a2a] pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Open</p>
              <p className="text-xs text-white/70 mt-0.5">{station.openReps}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Pro</p>
              <p className="text-xs text-white/70 mt-0.5">{station.proReps}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RaceFormatSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <h2
            className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            LA CARRERA
          </h2>
          <p className="mt-3 text-base font-semibold tracking-widest text-[#e5f93a] uppercase sm:text-lg">
            8 km de running + 8 estaciones funcionales
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Comienza corriendo 1 km, luego completa una estación funcional. Repite 8 veces. Sin
            descanso entre corrida y estación.
          </p>
        </motion.div>

        <div className="mb-14 overflow-x-auto pb-3">
          <div className="flex min-w-max items-center gap-0">
            {allSteps.map((step, idx) => (
              <div key={step.key} className="flex items-center">
                <div
                  className={[
                    "flex h-9 shrink-0 items-center justify-center rounded px-3 text-xs font-bold uppercase tracking-wider",
                    step.type === "run"
                      ? "bg-[#1a1a1a] text-white/70 border border-[#2a2a2a]"
                      : step.type === "station"
                        ? "bg-[#e5f93a] text-black"
                        : "bg-white text-black",
                  ].join(" ")}
                >
                  {step.label}
                </div>
                {idx < allSteps.length - 1 && (
                  <div className="flex items-center px-1 text-[#e5f93a]/50">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stations.map((station, idx) => (
            <StationCard key={station.number} station={station} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
