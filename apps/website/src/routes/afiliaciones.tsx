import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Megaphone, Users } from "lucide-react";
import { BenefitsSection } from "@/components/sections/afiliaciones/BenefitsSection";
import { PlansTableSection } from "@/components/sections/afiliaciones/PlansTableSection";
import { HowToApplySection } from "@/components/sections/afiliaciones/HowToApplySection";
import { ApplicationFormSection } from "@/components/sections/afiliaciones/ApplicationFormSection";

const AFFILIATIONS_SIGNALS = [
  { icon: Users, value: "Comunidad", label: "corredores que entrenan contigo" },
  { icon: MapPin, value: "Presencia", label: "un lugar dentro del ecosistema" },
  { icon: Megaphone, value: "Activaciones", label: "experiencias que mueven tu sede" },
];

function AffiliationsHero() {
  return (
    <section className="stay-dark relative isolate min-h-svh overflow-hidden border-b border-rl-border-subtle bg-rl-surface-canvas pt-20 sm:min-h-[46rem]">
      <img
        src="/images/1552674605-db6ffd4facb5-1600.webp"
        srcSet="/images/1552674605-db6ffd4facb5-500.webp 500w, /images/1552674605-db6ffd4facb5-900.webp 900w, /images/1552674605-db6ffd4facb5-1600.webp 1600w"
        sizes="100vw"
        alt="Corredores entrenan al amanecer sobre una pista al aire libre"
        width={1600}
        height={1067}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="affiliations-hero-image absolute inset-0 h-full w-full object-cover object-[48%_center] grayscale outline -outline-offset-1 outline-white/10 sm:object-center"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/65 to-black/10 lg:bg-linear-to-r lg:from-black lg:via-black/80 lg:to-black/15" />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/35" />
      <div
        className="texture-grain pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <div
        className="absolute top-25 right-6 z-10 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 sm:flex lg:right-8"
        aria-hidden="true"
      >
        <span>Pista</span>
        <span className="h-px w-14 bg-white/35" />
        <span className="text-rl-accent">Kilómetro 01</span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-end px-6 pb-7 pt-24 sm:min-h-[calc(46rem-5rem)] sm:pb-14 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-rl-accent">
            <span className="h-2 w-2 bg-rl-accent" aria-hidden="true" />
            Afiliaciones runluv®
          </p>
          <h1 className="max-w-4xl text-[clamp(3.35rem,9vw,7.75rem)] leading-[0.88] tracking-[0.01em] text-white">
            Convierte tu comunidad en el <span className="text-rl-accent">punto de partida</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-rl-text-secondary sm:text-lg">
            Haz de tu sede una base para corredores: entrenamiento, experiencias y una comunidad
            conectada con la pista.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#afiliacion"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-rl-accent px-7 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 ease-out-strong hover:brightness-95 active:scale-[0.96]"
            >
              Solicitar afiliación
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#modelo"
              className="inline-flex min-h-12 items-center justify-center border border-white/35 bg-black/35 px-7 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-[background-color,border-color,transform] duration-160 hover:border-white/60 hover:bg-white/8 active:scale-[0.96]"
            >
              Conocer el modelo
            </a>
          </div>
        </div>

        <div className="mt-8 grid max-w-4xl grid-cols-3 border-y border-white/20 sm:mt-12">
          {AFFILIATIONS_SIGNALS.map((item) => (
            <div
              key={item.value}
              className="flex min-h-20 flex-col items-start justify-center gap-2 border-l border-white/20 px-3 py-3 first:border-l-0 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-4"
            >
              <item.icon className="h-5 w-5 shrink-0 text-rl-accent" aria-hidden="true" />
              <p>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-white sm:text-sm">
                  {item.value}
                </span>
                <span className="mt-0.5 hidden text-xs text-rl-text-secondary sm:block">
                  {item.label}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AfiliacionesPage() {
  return (
    <div className="min-h-dvh bg-rl-surface-canvas text-white">
      <AffiliationsHero />
      <BenefitsSection />
      <PlansTableSection />
      <HowToApplySection />
      <ApplicationFormSection />
    </div>
  );
}

export const Route = createFileRoute("/afiliaciones")({
  head: () => ({
    meta: [
      { title: "Afiliaciones | runluv® — Solicita información para tu gimnasio" },
      {
        name: "description",
        content:
          "Conoce los niveles de colaboración de runluv® y solicita una propuesta para conectar tu gimnasio con corredores y experiencias de comunidad.",
      },
    ],
  }),
  component: AfiliacionesPage,
});
