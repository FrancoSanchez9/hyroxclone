import { ArrowRight, Coffee, Package, Shield, Users } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Acceso de equipo",
    description: "Según tu rol y evento, podrás apoyar desde las zonas donde sucede la operación.",
  },
  {
    icon: Package,
    title: "Materiales del equipo",
    description:
      "Te confirmaremos antes del evento los materiales y elementos que corresponden a tu rol.",
  },
  {
    icon: Coffee,
    title: "Alimentos y apoyo",
    description:
      "La sede te informará qué hidratación, alimentos y apoyo estarán disponibles durante tu turno.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description:
      "Conoce corredores, aliados y personas que comparten la energía de hacer que suceda.",
  },
];

const steps = [
  {
    number: "01",
    eyebrow: "Elige",
    title: "Tu evento",
    description: "Selecciona la sede en la que quieres participar y cuéntanos un poco sobre ti.",
  },
  {
    number: "02",
    eyebrow: "Conecta",
    title: "Con el equipo",
    description:
      "Si existe disponibilidad y encaje, te contactaremos para revisar rol, horario y punto de encuentro.",
  },
  {
    number: "03",
    eyebrow: "Hazlo real",
    title: "El gran día",
    description:
      "Después de confirmar, recibe una inducción, conoce a tu equipo y ayuda a crear una gran carrera.",
  },
];

export function VolunteerBenefitsSection() {
  return (
    <>
      <section className="border-b border-rl-border-subtle bg-rl-surface-subtle px-6 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-rl-accent">
                Lo que puede incluir
              </p>
              <h2 className="max-w-xl text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] text-white">
                Tu energía mueve la carrera
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-rl-text-secondary lg:justify-self-end lg:text-lg">
              No vienes a mirar desde afuera. Eres parte de la salida, la ruta, la meta y cada
              momento que hace sentir acompañado a un corredor.
            </p>
          </div>

          <div className="mt-14 grid border-t border-rl-border-strong sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group min-h-64 border-b border-rl-border-subtle p-6 transition-[background-color] duration-160 hover:bg-white/3 sm:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center bg-rl-accent text-black">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold tabular-nums text-rl-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl leading-none text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-rl-text-secondary">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="proceso"
        className="scroll-mt-24 border-b border-rl-border-subtle bg-rl-surface-canvas px-6 py-20 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-rl-border-strong pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-rl-accent">
                Del registro a la pista
              </p>
              <h2 className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.9] text-white">
                Así funciona
              </h2>
            </div>
            <a
              href="#solicitud"
              className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold uppercase tracking-widest text-white transition-[color,transform] duration-160 hover:text-rl-accent active:scale-[0.96] sm:self-auto"
            >
              Ir al registro
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <ol className="grid lg:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="relative border-b border-rl-border-subtle py-10 lg:min-h-80 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span
                  className="text-[4.5rem] leading-none text-white/12 tabular-nums"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-rl-accent">
                  {step.eyebrow}
                </p>
                <h3 className="mt-2 text-3xl leading-none text-white">{step.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-rl-text-secondary">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
