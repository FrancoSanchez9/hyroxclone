import { ChevronDown } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const ACCENT = "#d4ff00";

interface ModalityRules {
  name: string;
  short: string;
  rules: string[];
  criterio: string;
  categorias: string[];
  relevos?: string[];
}

// Reglamento tal cual el documento oficial (secciones 1.1).
const MODALITIES: ModalityRules[] = [
  {
    name: "La Última Vuelta",
    short: "LUV",
    rules: [
      "Circuito cerrado de entre 3 y 5 km, según el autódromo.",
      "La carrera es continua, sin pausas ni reinicios.",
      "Cada vuelta debe completarse dentro de un tiempo máximo.",
      "Si completas la vuelta a tiempo, continúas; si excedes el tiempo, quedas eliminado.",
      "Aunque sigas avanzando, si cruzas fuera del tiempo límite quedas automáticamente eliminado.",
      "El tiempo máximo por vuelta lo define runluv® según la distancia del circuito y se comunica antes del evento. Se establece por categoría (Open y Pro) con parámetros de rendimiento medibles y realistas.",
    ],
    criterio:
      "Gana el último corredor que logra mantenerse en competencia cumpliendo el tiempo límite por vuelta.",
    categorias: [
      "Individual Open — tiempo por vuelta accesible",
      "Individual Pro — tiempo por vuelta más exigente",
      "Doubles (parejas) — completan cada vuelta juntos",
      "Teams (3 a 5 personas) — por relevos",
      "Corporate Teams (hasta 6 personas) — por relevos",
    ],
    relevos: [
      "Los cambios solo pueden realizarse en la zona de meta.",
      "Cada integrante debe completar una vuelta completa.",
      "No se permiten cambios en ningún otro punto del circuito.",
      "Si un integrante no cumple el tiempo de la vuelta, el equipo queda eliminado.",
    ],
  },
  {
    name: "Cada Paso Cuenta",
    short: "4H",
    rules: [
      "Durante un periodo de 4 horas, puedes correr, trotar, caminar o descansar.",
      "El sistema registra continuamente la distancia recorrida mediante chip.",
      "Cada vuelta completada suma al total acumulado.",
    ],
    criterio: "Gana quien acumule mayor número de kilómetros al finalizar el tiempo oficial.",
    categorias: [
      "Individual Open",
      "Individual Pro",
      "Doubles (parejas)",
      "Teams (3 a 5 personas)",
      "Corporate Teams (hasta 6 personas)",
    ],
    relevos: [
      "Los relevos se realizan únicamente en la zona de meta.",
      "Cada participante debe completar una vuelta completa.",
      "Las vueltas incompletas no se contabilizan.",
    ],
  },
  {
    name: "Carreras Tradicionales",
    short: "5K / 10K",
    rules: [
      "Distancias de 5 y 10 kilómetros.",
      "Salidas organizadas por bloques.",
      "Cronometraje mediante chip.",
    ],
    criterio: "Mejor tiempo absoluto. Ganadores por categoría.",
    categorias: ["Femenil y varonil", "18 – 29", "30 – 39", "40 – 49", "50 +"],
  },
];

function RuleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{title}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full"
              style={{ background: ACCENT }}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RulesByModalitySection() {
  return (
    <section className="w-full bg-black py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Reglamento
          </p>
          <AnimatedTitle
            text="REGLAS POR MODALIDAD"
            accent={["MODALIDAD"]}
            className="text-5xl text-white sm:text-6xl md:text-7xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            Cada desafío tiene sus propias reglas. Conócelas antes de elegir tu modalidad.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {MODALITIES.map((m, i) => (
            <details
              key={m.name}
              className="group border border-white/10 bg-white/[0.02] transition-colors duration-200 open:border-white/20 open:bg-white/[0.04]"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:content-none [&::-webkit-details-marker]:hidden">
                <span
                  className="text-3xl leading-none tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
                >
                  {m.short}
                </span>
                <h3
                  className="flex-1 text-2xl uppercase leading-none tracking-wide text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {m.name}
                </h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <div className="flex flex-col gap-6 border-t border-white/10 p-5 pt-6">
                <RuleList title="Cómo funciona" items={m.rules} />

                <div className="border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Criterio de victoria
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white">{m.criterio}</p>
                </div>

                <RuleList title="Categorías" items={m.categorias} />

                {m.relevos && (
                  <RuleList title="Regla de relevos (Teams y Corporate Teams)" items={m.relevos} />
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
