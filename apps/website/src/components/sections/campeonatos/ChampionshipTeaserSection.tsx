import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { fadeUp } from "@/lib/animation";

export function ChampionshipTeaserSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full py-20 md:py-28" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="relative overflow-hidden rounded-lg border border-[#2a2a2a] p-10 text-center sm:p-16"
          style={{
            background: "linear-gradient(135deg, #111111 0%, #0f0f0f 50%, #141414 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.012) 40px,
                rgba(255,255,255,0.012) 41px
              )`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <Badge
              className="mb-2"
              style={{ backgroundColor: "#ffffff", color: "#000", borderColor: "transparent" }}
            >
              GRAN FINAL
            </Badge>
            <h2
              className="max-w-3xl text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-wider text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              CIUDAD DE MÉXICO
            </h2>
            <p
              className="text-lg font-semibold uppercase tracking-[0.2em] text-white/60"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              AUTÓDROMO HERMANOS RODRÍGUEZ
            </p>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/45">
              La Gran Final runluv® será el cierre de la temporada 2027. Después de recorrer Puebla,
              León, Guadalajara y Monterrey, los corredores clasificados se reunirán en la Ciudad de
              México para vivir el desafío más importante de la temporada.
            </p>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/45">
              Será el lugar donde cada kilómetro recorrido durante el año encuentre su momento más
              importante. Y también será el inicio de la siguiente vuelta.
            </p>
          </div>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="mt-6 rounded-lg border border-[#2a2a2a] px-8 py-6 text-center"
          style={{ backgroundColor: "#111111" }}
        >
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
            Pero la Gran Final no será solo una competencia. Será el punto de encuentro de la
            comunidad runluv®: corredores, clubes, acompañantes, marcas, espectadores y equipos
            reunidos para celebrar una temporada completa de resistencia.
          </p>
        </m.div>
      </div>
    </section>
  );
}
