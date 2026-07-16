import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { VolunteerBenefitsSection } from "@/components/sections/voluntario/VolunteerBenefitsSection";
import { VolunteerFormSection } from "@/components/sections/voluntario/VolunteerFormSection";
import { VolunteerFaqSection } from "@/components/sections/voluntario/VolunteerFaqSection";

function VolunteerHero() {
  return (
    <section className="relative isolate min-h-[44rem] overflow-hidden border-b border-rl-border-subtle bg-rl-surface-canvas pt-20 sm:min-h-[46rem]">
      <img
        src="/images/1532444458054-01a7dd3e9fca-1920.webp"
        alt=""
        aria-hidden="true"
        width={1920}
        height={1184}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-[42%_center] grayscale outline -outline-offset-1 outline-white/10"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/85 to-black/35" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/35" />
      <div
        className="texture-grain pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(44rem-5rem)] max-w-7xl flex-col justify-end px-6 pb-10 pt-24 sm:min-h-[calc(46rem-5rem)] sm:pb-14 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-rl-accent">
            <span className="h-2 w-2 bg-rl-accent" aria-hidden="true" />
            Equipo runluv®
          </p>
          <h1 className="max-w-4xl text-[clamp(3.5rem,9vw,7.75rem)] leading-[0.88] tracking-[0.01em] text-white">
            La carrera también se gana <span className="text-rl-accent">fuera de la pista</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-rl-text-secondary sm:text-lg">
            Sé parte del equipo que convierte cada salida, cada punto de la ruta y cada llegada en
            una experiencia que los corredores recuerdan.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#solicitud"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-rl-accent px-7 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 ease-out-strong hover:brightness-95 active:scale-[0.96]"
            >
              Quiero sumarme
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#proceso"
              className="inline-flex min-h-12 items-center justify-center border border-white/35 bg-black/35 px-7 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-[background-color,border-color,transform] duration-160 hover:border-white/60 hover:bg-white/8 active:scale-[0.96]"
            >
              Conocer el proceso
            </a>
          </div>
        </div>

        <div className="mt-12 grid max-w-3xl grid-cols-1 border-y border-white/20 sm:grid-cols-3">
          {[
            { icon: MapPin, value: "5 eventos", label: "en esta temporada" },
            { icon: Users, value: "1 equipo", label: "detrás de cada carrera" },
            { icon: ArrowRight, value: "Tu energía", label: "hace que suceda" },
          ].map((item) => (
            <div
              key={item.value}
              className="flex min-h-20 items-center gap-3 border-white/20 px-4 py-4 sm:border-l sm:first:border-l-0"
            >
              <item.icon className="h-5 w-5 shrink-0 text-rl-accent" aria-hidden="true" />
              <p>
                <span className="block text-sm font-bold uppercase tracking-wider text-white">
                  {item.value}
                </span>
                <span className="mt-0.5 block text-xs text-rl-text-secondary">{item.label}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoluntarioPage() {
  return (
    <div className="min-h-screen bg-rl-surface-canvas text-white">
      <VolunteerHero />
      <VolunteerBenefitsSection />
      <VolunteerFormSection />
      <VolunteerFaqSection />
    </div>
  );
}

export const Route = createFileRoute("/voluntario")({
  head: () => ({
    meta: [
      { title: "Voluntario | runluv® — Únete al Equipo de Operación" },
      {
        name: "description",
        content:
          "Sé parte del equipo runluv® como voluntario. Vive el evento desde adentro, apoya a los corredores y ayuda a que cada carrera suceda.",
      },
    ],
  }),
  component: VoluntarioPage,
});
