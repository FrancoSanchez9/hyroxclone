import { ArrowRight } from "lucide-react";
import { CellValue } from "@/components/sections/afiliaciones/CellValue";

const plans = [
  {
    key: "runningClub",
    name: "Running Club",
    eyebrow: "Comunidad",
    description: "Para clubes que quieren acercar experiencias runluv® a sus corredores.",
  },
  {
    key: "performanceCentre",
    name: "Performance Centre",
    eyebrow: "Entrenamiento",
    description: "Una colaboración activa con acompañamiento y experiencias locales.",
  },
  {
    key: "performanceAcademy",
    name: "Performance Academy",
    eyebrow: "Alto rendimiento",
    description: "Para espacios que desarrollan preparación especializada y comunidad deportiva.",
  },
] as const;

const tableFeatures = [
  {
    label: "Perfil en el directorio",
    runningClub: true,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Recursos de comunicación",
    runningClub: true,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Activaciones locales",
    runningClub: false,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Acompañamiento de lanzamiento",
    runningClub: false,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Experiencias con la comunidad",
    runningClub: false,
    performanceCentre: false,
    performanceAcademy: true,
  },
  {
    label: "Alcance inicial",
    runningClub: "Comunidad",
    performanceCentre: "Entrenamiento",
    performanceAcademy: "Especializado",
  },
];

export function PlansTableSection() {
  return (
    <section
      id="modelo"
      className="scroll-mt-24 border-b border-rl-border-subtle bg-black px-6 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-rl-accent">
              Modelo de colaboración
            </p>
            <h2 className="max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9] tracking-[0.01em] text-white">
              El nivel correcto para tu siguiente paso
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-rl-text-secondary">
            Esta comparación es una guía inicial. Las inclusiones y condiciones finales se definen
            después de conocer tu sede, comunidad y objetivos.
          </p>
        </div>

        <div className="grid gap-px bg-rl-border-subtle md:hidden">
          {plans.map((plan) => (
            <article key={plan.key} className="relative bg-rl-surface-raised p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-rl-accent">
                {plan.eyebrow}
              </p>
              <h3 className="mt-4 text-4xl leading-none text-white">{plan.name}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-rl-text-secondary">
                {plan.description}
              </p>
              <dl className="mt-7 border-t border-rl-border-subtle">
                {tableFeatures.map((row) => (
                  <div
                    key={row.label}
                    className="flex min-h-12 items-center justify-between gap-4 border-b border-rl-border-subtle py-3 text-sm"
                  >
                    <dt className="text-rl-text-secondary">{row.label}</dt>
                    <dd className="shrink-0 text-right">
                      <CellValue value={row[plan.key]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[25%] border border-rl-border-subtle bg-rl-surface-raised p-5 text-left text-xs font-bold uppercase tracking-[0.18em] text-rl-text-muted"
                >
                  Incluye
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.key}
                    scope="col"
                    className="relative w-[25%] border border-rl-border-subtle bg-rl-surface-raised p-5 text-left align-top"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-rl-accent">
                      {plan.eyebrow}
                    </span>
                    <span className="mt-3 block text-3xl leading-none text-white">{plan.name}</span>
                    <span className="mt-3 block max-w-xs text-xs font-normal leading-relaxed text-rl-text-secondary">
                      {plan.description}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableFeatures.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="border border-rl-border-subtle bg-rl-surface-canvas px-5 py-4 text-left text-sm font-medium text-rl-text-secondary"
                  >
                    {row.label}
                  </th>
                  {plans.map((plan) => (
                    <td
                      key={plan.key}
                      className="border border-rl-border-subtle bg-rl-surface-canvas px-5 py-4 text-center"
                    >
                      <CellValue value={row[plan.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-rl-border-subtle pt-7 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-rl-text-secondary">
            ¿No sabes qué nivel corresponde a tu sede? Cuéntanos cómo entrenan y te ayudamos a
            identificar el mejor encaje.
          </p>
          <a
            href="#afiliacion"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 bg-rl-accent px-6 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 hover:brightness-95 active:scale-[0.96]"
          >
            Solicitar una propuesta
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
