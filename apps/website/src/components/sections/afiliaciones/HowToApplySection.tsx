import { ArrowDownRight, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Cuéntanos de tu sede",
    description:
      "Comparte lo esencial: ubicación, tamaño de tu comunidad y el tipo de colaboración que buscas.",
  },
  {
    number: "02",
    title: "Evaluamos el encaje",
    description:
      "Revisamos requisitos y conversamos contigo para decidir si la colaboración hace sentido para ambos equipos.",
  },
  {
    number: "03",
    title: "Activamos la alianza",
    description:
      "Si avanzamos juntos, definimos el alcance, los recursos y la primera experiencia para tu comunidad.",
  },
];

export function HowToApplySection() {
  return (
    <section className="border-b border-rl-border-subtle bg-rl-surface-canvas px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-rl-accent">
              Así empieza
            </p>
            <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9] tracking-[0.01em] text-white">
              De solicitud a comunidad activa
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-rl-text-secondary">
              Un proceso directo para entender si la colaboración hace sentido para ambos equipos.
            </p>
            <a
              href="#afiliacion"
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-white px-6 text-sm font-bold uppercase tracking-widest text-black transition-[background-color,transform] duration-160 hover:bg-rl-accent active:scale-[0.96]"
            >
              Iniciar solicitud
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <ol className="border-t border-rl-border-subtle">
            {steps.map((step) => (
              <li
                key={step.number}
                className="group grid gap-5 border-b border-rl-border-subtle py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-7"
              >
                <span className="font-mono text-sm font-bold text-rl-accent">{step.number}</span>
                <div>
                  <h3 className="text-3xl leading-none tracking-wide text-white">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-rl-text-secondary">
                    {step.description}
                  </p>
                </div>
                <ArrowDownRight
                  className="hidden h-6 w-6 text-rl-text-muted transition-[color,transform] duration-160 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-rl-accent sm:block"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
