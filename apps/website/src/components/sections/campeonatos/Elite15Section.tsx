import { m } from "framer-motion";
import { BarChart3, Medal } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { ACCENT, EASE } from "@/lib/theme";

const cards = [
  {
    Icon: BarChart3,
    title: "Ranking runluv®",
    body: "Consulta tus resultados oficiales, compara tu desempeño y sigue tu evolución durante la temporada. Ve tu posición dentro de tu modalidad, categoría y grupo de edad, y mide tu avance de una sede a otra.",
  },
  {
    Icon: Medal,
    title: "El desafío elite",
    body: "En la Gran Final, los participantes elite competirán por el reconocimiento oficial como los corredores más destacados de la temporada. Velocidad, estrategia, resistencia y mentalidad reunidas en una sola vuelta.",
  },
];

export function Elite15Section() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)" }}
    >
      <div
        aria-hidden="true"
        className="animate-blob-slow pointer-events-none absolute -left-48 bottom-0 h-[32rem] w-[32rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.06), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Elite LUV
          </p>
          <AnimatedTitle
            text="EL NIVEL MÁS ALTO"
            accent={["ALTO"]}
            className="text-5xl text-white sm:text-6xl md:text-7xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            Elite LUV es la línea competitiva más alta de runluv®. Los corredores con mejores
            resultados buscan colocarse en el ranking para acceder a la competencia elite de la Gran
            Final.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1fr]">
          {/* Image panel */}
          <m.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative min-h-[280px] overflow-hidden lg:min-h-full"
          >
            <img
              src="/images/1552674605-db6ffd4facb5-900.webp"
              width={900}
              height={600}
              alt="Corredores de élite runluv®"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p
                className="text-4xl uppercase leading-none tracking-wide sm:text-5xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
              >
                Elite LUV
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/60">
                La línea competitiva más alta
              </p>
            </div>
          </m.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4">
            {cards.map((card, i) => (
              <m.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
                whileHover={{ y: -4 }}
                className="flex flex-col gap-4 border border-white/10 border-l-2 border-l-transparent bg-white/[0.03] p-8 transition-colors duration-200 hover:border-l-rl-accent"
              >
                <card.Icon size={28} style={{ color: ACCENT }} aria-hidden="true" />
                <h3
                  className="text-2xl uppercase leading-none tracking-wide text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{card.body}</p>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
