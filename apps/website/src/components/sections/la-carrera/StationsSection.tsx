import { useRef } from "react";
import { m, useInView } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { stations } from "@/data/stations";
import { Badge } from "@/components/ui/Badge";
import { StationCard } from "./StationCard";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.04 },
  }),
};

export function StationsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={headerRef}
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          custom={0}
          className="mb-14 text-center"
        >
          <Badge variant="yellow" className="mb-4" style={{ backgroundColor: "#ffffff" }}>
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
        </m.div>

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
