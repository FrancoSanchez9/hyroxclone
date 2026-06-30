import { m } from "framer-motion";
import { SectionTitle } from "@/components/sections/about/SectionTitle";
import { EASE } from "@/lib/animation";

export function FitnessRacingSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: "#060606",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>RUNLUV ES FITNESS RACING</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* text */}
          <m.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col justify-center gap-6 pr-0 lg:pr-16 pb-10 lg:pb-0"
          >
            <p className="max-w-prose text-white/80 leading-relaxed text-lg">
              RunLuv combina running y estaciones de trabajo funcional, donde los participantes
              corren 1 km, seguido de 1 estación funcional, repetido ocho veces.
            </p>
            <p className="max-w-prose text-white/70 leading-relaxed text-pretty">
              Cada carrera se celebra en interiores en amplios recintos de exhibición, creando una
              experiencia inmersiva y electrizante donde tus espectadores pueden apoyarte desde el
              principio hasta el final.
            </p>
            <p className="max-w-prose text-white/70 leading-relaxed text-pretty">
              Este formato es consistente en todo el mundo, permitiendo clasificaciones globales y
              un Campeonato Mundial acumulativo al final de cada temporada.
            </p>
            <p className="max-w-prose text-white/70 leading-relaxed text-pretty">
              Tanto para atletas profesionales como para entusiastas del fitness que buscan llevar
              su entrenamiento al siguiente nivel — RunLuv es para todos.
            </p>
          </m.div>
          {/* photo */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative overflow-hidden"
            style={{ minHeight: "480px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80&fit=crop&auto=format"
              alt="Atleta corriendo en RunLuv"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
              style={{ filter: "grayscale(100%)", outline: "1px solid rgba(255,255,255,0.1)" }}
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
