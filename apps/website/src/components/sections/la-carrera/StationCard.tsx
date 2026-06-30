import { useRef } from "react";
import { m, useInView } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { stations } from "@/data/stations";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { STATION_ICONS } from "@/lib/station-icons";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.04 },
  }),
};

const muscleTooltips: Record<string, string> = {
  Brazos: "Tríceps y bíceps durante la tracción",
  Hombros: "Deltoides frontales y mediales",
  Core: "Estabilización del tronco y transferencia de fuerza",
  "Tren inferior": "Glúteos y cuádriceps al extender la postura",
  "Cadena posterior": "Glúteos, isquiotibiales y espalda baja",
  Cuádriceps: "Extensión de rodilla en cada paso",
  Glúteos: "Potencia en extensión de cadera",
  Espalda: "Erector spinae y trapecios",
  Bíceps: "Flexión de codo al jalar",
  "Cuerpo completo": "Activación coordinada de todos los grupos musculares",
  Cardiovascular: "Sistema aeróbico y capacidad de VO₂",
  Piernas: "Cuádriceps, isquiotibiales y pantorrillas",
  "Espalda alta": "Trapecios y romboides bajo carga sostenida",
  Grip: "Músculos del antebrazo y fuerza de agarre",
  Estabilizadores: "Core y músculos profundos de la cadera",
};

export function StationCard({
  station,
  index,
}: {
  station: (typeof stations)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group -translate-y-0 hover:-translate-y-1 active:scale-[0.97] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
    >
      <Card
        className="h-full cursor-default border-t-2 border-t-transparent transition-colors duration-200 group-hover:border-t-[#ffffff]"
        hover
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Badge
                variant="yellow"
                className="shrink-0 px-2.5 py-1 text-sm font-bold"
                style={{ backgroundColor: "#ffffff" }}
              >
                {station.number}
              </Badge>
              <h3
                className="text-xl leading-none tracking-wider text-white uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {station.name}
              </h3>
            </div>
            {(() => {
              const Icon = STATION_ICONS[station.number];
              return Icon ? <Icon className="h-5 w-5 text-white/50" aria-hidden="true" /> : null;
            })()}
          </div>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[#ffffff]/80">
            {station.detail}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-0">
          <p className="text-sm leading-relaxed text-white/60">{station.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {station.muscles.map((muscle) => (
              <Tooltip.Root key={muscle}>
                <Tooltip.Trigger asChild>
                  <Badge
                    variant="outline"
                    className="cursor-default border-white/20 text-[10px] text-white/50"
                  >
                    {muscle}
                  </Badge>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="top"
                    sideOffset={6}
                    className="z-50 max-w-[200px] rounded-sm border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-[11px] leading-relaxed text-white/70 shadow-xl"
                    style={{
                      transformOrigin: "var(--radix-tooltip-content-transform-origin)",
                    }}
                  >
                    {muscleTooltips[muscle] ?? muscle}
                    <Tooltip.Arrow className="fill-[#1a1a1a]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2 border-t border-[#2a2a2a] pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Open</p>
              <p className="mt-0.5 text-xs text-white/70">{station.openReps}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Pro</p>
              <p className="mt-0.5 text-xs text-white/70">{station.proReps}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
}
