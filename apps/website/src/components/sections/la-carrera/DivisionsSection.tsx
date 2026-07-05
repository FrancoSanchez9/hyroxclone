import { m } from "framer-motion";
import { divisions } from "@/data/events";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

export function DivisionsSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Categorías
          </p>
          <AnimatedTitle
            text="ELIGE TU DIVISIÓN"
            accent={["DIVISIÓN"]}
            className="text-5xl text-white sm:text-6xl md:text-7xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            Desafíos para todos los perfiles, desde tu primera carrera hasta el alto rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {divisions.map((division, idx) => (
            <m.div
              key={division.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-3 border border-white/10 border-l-2 border-l-transparent bg-white/[0.03] p-6 transition-colors duration-200 hover:border-l-[#d4ff00]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3
                  className="text-3xl uppercase leading-none tracking-wide text-white transition-colors duration-200 group-hover:text-[#d4ff00]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {division.name}
                </h3>
                <span
                  className="tabular-nums text-2xl leading-none text-white/15"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/60">{division.description}</p>
              <div className="mt-1 border-t border-white/10 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Formato
                </p>
                <p className="mt-1 text-xs font-semibold" style={{ color: ACCENT }}>
                  {division.weights.women}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
