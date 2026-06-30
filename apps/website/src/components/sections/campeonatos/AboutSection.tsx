import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { MapPin, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { fadeUp } from "@/lib/animation";

const facts = [
  {
    Icon: MapPin,
    label: "4 sedes clasificatorias",
    sub: "Puebla, León, Guadalajara y Monterrey. Cada evento suma al ranking oficial.",
  },
  {
    Icon: Trophy,
    label: "Gran Final en CDMX",
    sub: "El cierre de temporada en el Autódromo Hermanos Rodríguez, uno de los circuitos más icónicos del mundo.",
  },
  {
    Icon: Users,
    label: "Una comunidad en crecimiento",
    sub: "Corredores de todos los niveles, clubes, equipos y familias reunidos en un mismo lugar.",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <m.div
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
            style={{ backgroundColor: "#ffffff", color: "#000" }}
          >
            LA TEMPORADA
          </Badge>
          <h2
            className="text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TEMPORADA RUNLUV® 2027
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            La primera temporada runluv® inicia en 2027 con una ruta nacional diseñada para que cada
            corredor encuentre su desafío, registre su resultado oficial y forme parte de una
            comunidad que crece vuelta a vuelta.
          </p>
        </m.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {facts.map((fact, idx) => (
            <m.div
              key={fact.label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={idx + 1}
            >
              <Card className="h-full border-t-2 p-6" style={{ borderTopColor: "#ffffff" }} hover>
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <fact.Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3
                  className="mb-2 text-xl uppercase tracking-wider text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {fact.label}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{fact.sub}</p>
              </Card>
            </m.div>
          ))}
        </div>

        <m.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={4}
          className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-white/50 sm:text-base"
        >
          Durante la temporada, runluv® llegará a cuatro sedes: Puebla, León, Guadalajara y
          Monterrey. Cada evento será una oportunidad para correr en un autódromo, competir dentro
          de tu modalidad, sumar al ranking oficial y vivir una experiencia donde el running, la
          resistencia y la comunidad se encuentran en un mismo lugar. La temporada cerrará con la
          Gran Final runluv® en la Ciudad de México.
        </m.p>
      </div>
    </section>
  );
}
