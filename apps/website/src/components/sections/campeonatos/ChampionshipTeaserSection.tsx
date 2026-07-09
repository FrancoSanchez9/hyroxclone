import { m } from "framer-motion";
import { ACCENT, EASE } from "@/lib/theme";

export function ChampionshipTeaserSection() {
  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative overflow-hidden border border-white/10"
        >
          {/* Iconic circuit backdrop */}
          <img
            src="/images/1552674605-db6ffd4facb5-1600.webp"
            width={1600}
            height={1067}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-25 grayscale"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,255,0,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-16 text-center sm:px-16 sm:py-24">
            <span
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black"
              style={{ background: ACCENT }}
            >
              Gran Final
            </span>
            <h2
              className="max-w-3xl text-[clamp(2.8rem,9vw,6rem)] leading-[0.9] tracking-wide text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ciudad de <span style={{ color: ACCENT }}>México</span>
            </h2>
            <p
              className="text-lg font-semibold uppercase tracking-[0.2em] text-white/60"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Autódromo Hermanos Rodríguez
            </p>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/55">
              Después de recorrer Puebla, León, Guadalajara y Monterrey, los corredores clasificados
              se reúnen en la Ciudad de México para el desafío más importante de la temporada —
              donde cada kilómetro del año encuentra su momento, y comienza la siguiente vuelta.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
