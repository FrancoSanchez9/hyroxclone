import { BookOpen, CalendarDays, MapPin, Megaphone, Network, Users } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Más comunidad",
    description:
      "Conecta con corredores que buscan un lugar para prepararse, compartir objetivos y entrenar en equipo.",
  },
  {
    icon: MapPin,
    title: "Presencia visible",
    description:
      "Haz que tu sede sea fácil de descubrir dentro del directorio de gimnasios de runluv®.",
  },
  {
    icon: BookOpen,
    title: "Recursos para activar",
    description:
      "Recibe ideas y materiales para convertir el interés por la carrera en sesiones dentro de tu gimnasio.",
  },
  {
    icon: CalendarDays,
    title: "Experiencias locales",
    description:
      "Crea entrenamientos, retos y encuentros que mantengan a tu comunidad en movimiento.",
  },
  {
    icon: Network,
    title: "Conexión entre sedes",
    description:
      "Forma relaciones con otros espacios y equipos que comparten la misma cultura de entrenamiento.",
  },
  {
    icon: Megaphone,
    title: "Comunicación compartida",
    description:
      "Coordina mensajes y activaciones de marca con una narrativa clara para tus atletas.",
  },
];

export function BenefitsSection() {
  return (
    <section className="rl-deferred-section border-b border-rl-border-subtle bg-rl-surface-canvas px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-rl-accent">
              Lo que suma a tu sede
            </p>
            <h2 className="max-w-xl text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9] tracking-[0.01em] text-white">
              Una alianza que se nota en tu comunidad
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-rl-text-secondary">
              No se trata sólo de colocar un logotipo. Diseñamos una relación útil para tu equipo,
              tus atletas y el crecimiento de tu sede.
            </p>
          </div>

          <div className="grid border-l border-t border-rl-border-subtle sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="group min-h-56 border-b border-r border-rl-border-subtle bg-rl-surface-raised p-6 transition-[background-color] duration-160 hover:bg-rl-surface-overlay sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center border border-rl-accent/40 bg-rl-accent/8 text-rl-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-rl-text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl leading-none tracking-wide text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-rl-text-secondary">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
