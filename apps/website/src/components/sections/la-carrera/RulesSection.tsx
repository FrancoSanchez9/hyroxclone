import { m } from "framer-motion";
import { Timer, Route, ShieldCheck } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const rules = [
  {
    Icon: Timer,
    title: "El tiempo es todo",
    body: "Cronometraje oficial con chip desde el disparo de salida hasta la meta. En La Última Vuelta, completa cada vuelta antes del límite o quedas eliminado.",
  },
  {
    Icon: Route,
    title: "Sigue el circuito",
    body: "Recorre el trazado marcado del autódromo. Cortar el recorrido o salirte de la pista invalida tu resultado. Cada kilómetro cuenta.",
  },
  {
    Icon: ShieldCheck,
    title: "Corre seguro",
    body: "Atención médica y staff en ruta durante todo el evento. Escucha a tu cuerpo: tu seguridad siempre está por encima del resultado.",
  },
];

export function RulesSection() {
  return (
    <section
      className="w-full py-20 md:py-28"
      style={{
        background: "#0d0d0d",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Reglamento
          </p>
          <AnimatedTitle
            text="LAS REGLAS"
            accent={["REGLAS"]}
            className="text-5xl text-white sm:text-6xl md:text-7xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rules.map((rule, idx) => (
            <m.div
              key={rule.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: EASE }}
              className="flex h-full flex-col gap-4 border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
            >
              <div
                className="flex h-11 w-11 items-center justify-center"
                style={{ background: "rgba(212,255,0,0.12)" }}
              >
                <rule.Icon className="h-5 w-5" style={{ color: ACCENT }} aria-hidden="true" />
              </div>
              <h3
                className="text-xl uppercase leading-none tracking-wide text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {rule.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">{rule.body}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
