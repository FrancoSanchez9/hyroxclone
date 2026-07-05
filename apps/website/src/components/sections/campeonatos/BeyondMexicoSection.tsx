import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Globe } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

export function BeyondMexicoSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full" style={{ background: "#000" }}>
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 md:py-32">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <Globe className="mx-auto mb-6 h-8 w-8" style={{ color: ACCENT }} aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">La visión</p>
          <h2
            className="mt-4 text-[clamp(3rem,9vw,7rem)] font-normal uppercase leading-[0.9] tracking-wide text-white text-balance"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Más allá de <span style={{ color: ACCENT }}>México</span>
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-5 text-center text-base leading-relaxed text-white/70 sm:text-lg"
        >
          <p>La temporada 2027 será el inicio.</p>
          <p>
            runluv® nace en México con una primera ruta nacional, pero su visión es crecer hacia
            otros países y construir, temporada tras temporada, una comunidad internacional de
            corredores que comparten una misma filosofía:{" "}
            <span className="font-semibold text-white">Resiste hasta el final.</span>
          </p>
          <p>
            En el futuro, nuevas sedes podrán abrir el camino hacia campeonatos internacionales,
            rankings globales y finales donde corredores de distintos países se encuentren para
            descubrir hasta dónde son capaces de llegar.
          </p>
          <p className="text-white/55">Pero toda gran ruta comienza con una primera vuelta.</p>
        </m.div>

        <m.p
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-12 text-center text-[clamp(1.8rem,5vw,3rem)] uppercase leading-none tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
        >
          La primera será México 2027.
        </m.p>
      </div>
    </section>
  );
}
