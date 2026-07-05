import { m } from "framer-motion";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const tips = [
  {
    name: "La Última Vuelta",
    badge: "Eliminación",
    tip: "El límite por vuelta es tu enemigo. Entrena cambios de ritmo y aprende a recuperar en movimiento. Nunca gastes de más en las primeras vueltas: la carrera se decide al final.",
  },
  {
    name: "Cada Paso Cuenta",
    badge: "4 horas",
    tip: "Es una prueba de gestión. Empieza más lento de lo que crees, come e hidrátate desde temprano y mantén un ritmo que puedas sostener horas. La constancia gana kilómetros.",
  },
  {
    name: "5K / 10K",
    badge: "Contrarreloj",
    tip: "Aquí sí corres fuerte. Calienta bien, sal a tu ritmo objetivo desde el primer kilómetro y reparte el esfuerzo. Trabaja series en tu preparación para tolerar el ritmo.",
  },
];

export function StationTipsSection() {
  return (
    <section
      className="w-full bg-[#0d0d0d] py-20 md:py-28"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.02) 31px, rgba(255,255,255,0.02) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.02) 31px, rgba(255,255,255,0.02) 32px)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Estrategia
          </p>
          <AnimatedTitle
            text="CONSEJOS POR DESAFÍO"
            accent={["DESAFÍO"]}
            className="text-5xl text-white sm:text-6xl md:text-7xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            Cada modalidad se corre distinto. Así se prepara cada una.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tips.map((t, idx) => (
            <m.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: EASE }}
              whileHover={{ y: -4 }}
              className="flex h-full flex-col gap-3 border border-white/10 border-t-2 border-t-transparent bg-black/40 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-t-[#d4ff00]"
            >
              <div className="flex items-center justify-between gap-2">
                <h3
                  className="text-2xl uppercase leading-none tracking-wide text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {t.name}
                </h3>
              </div>
              <span
                className="w-fit border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ borderColor: "rgba(212,255,0,0.4)", color: ACCENT }}
              >
                {t.badge}
              </span>
              <p className="text-sm leading-relaxed text-white/60">{t.tip}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
