import { m } from "framer-motion";
import { ACCENT, EASE } from "@/lib/theme";
import {
  Timer,
  Route,
  ShieldCheck,
  Medal,
  Shirt,
  BarChart3,
  Smartphone,
  Award,
} from "lucide-react";

const rules = [
  {
    Icon: Timer,
    title: "El tiempo es todo",
    body: "Cronometraje oficial con chip desde el disparo de salida hasta la meta. En La Última Vuelta, completa cada vuelta antes del límite o quedas eliminado.",
  },
  {
    Icon: Route,
    title: "Sigue el circuito",
    body: "Recorre el trazado marcado del autódromo. Cortar el recorrido o salirte de la pista invalida tu resultado.",
  },
  {
    Icon: ShieldCheck,
    title: "Corre seguro",
    body: "Atención médica y staff en ruta durante todo el evento. Tu seguridad siempre está por encima del resultado.",
  },
];

const includes = [
  { Icon: Medal, label: "Finisher pack (medalla + playera)" },
  { Icon: Timer, label: "Cronometraje oficial con chip" },
  { Icon: BarChart3, label: "Ranking global de temporada" },
  { Icon: Smartphone, label: "Acceso a la app runluv®" },
  { Icon: Award, label: "Certificado digital de finalización" },
  { Icon: Shirt, label: "Zona de hidratación y abastecimiento" },
];

export function EventRulesSection() {
  return (
    <div className="flex flex-col gap-16">
      {/* Rules */}
      <section aria-labelledby="rules-heading">
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ color: ACCENT }}
        >
          Reglamento
        </p>
        <h2
          id="rules-heading"
          className="mb-8 text-4xl leading-none tracking-wider text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Las reglas
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rules.map((rule, i) => (
            <m.div
              key={rule.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
              className="flex h-full flex-col gap-3 border border-white/10 border-t-2 border-t-transparent bg-white/3 p-5 transition-colors duration-200 hover:border-t-rl-accent"
            >
              <rule.Icon className="h-6 w-6" style={{ color: ACCENT }} aria-hidden="true" />
              <h3
                className="text-lg uppercase leading-none tracking-wide text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {rule.title}
              </h3>
              <p className="text-xs leading-relaxed text-white/55">{rule.body}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section aria-labelledby="includes-heading">
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ color: ACCENT }}
        >
          Tu inscripción
        </p>
        <h2
          id="includes-heading"
          className="mb-8 text-4xl leading-none tracking-wider text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Qué incluye
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {includes.map((item, i) => (
            <m.div
              key={item.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
              className="flex items-center gap-3 border border-white/10 p-4"
            >
              <item.Icon
                className="h-5 w-5 shrink-0"
                style={{ color: ACCENT }}
                aria-hidden="true"
              />
              <span className="text-sm text-white/75">{item.label}</span>
            </m.div>
          ))}
        </div>
      </section>
    </div>
  );
}
