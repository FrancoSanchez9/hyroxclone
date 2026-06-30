import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const modalidades = [
  {
    num: "01",
    name: "La Última Vuelta®",
    tag: "LUV",
    desc: "Completa cada vuelta antes de que termine el tiempo límite. Quien no lo logra queda eliminado. Gana quien resiste hasta el final.",
    badge: "Formato exclusivo",
  },
  {
    num: "02",
    name: "Endurance 4H",
    tag: "Cada Paso Cuenta",
    desc: "Cuatro horas para acumular la mayor distancia posible. Corre, trota, camina o descansa. Cada kilómetro cuenta.",
    badge: null,
  },
  {
    num: "03",
    name: "5K / 10K",
    tag: "Clásico",
    desc: "Formato clásico para quienes buscan velocidad, mejorar su marca personal o vivir por primera vez la experiencia runluv.",
    badge: null,
  },
];

export function ModalidadesSection() {
  return (
    <section
      id="modalidades"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#060608" }}
    >
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] opacity-[0.05]"
        style={{ background: "radial-gradient(ellipse at bottom right, #a855f7, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] mb-3 font-medium">
            Formatos de competencia
          </p>
          <h2
            className="text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Modalidades
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {modalidades.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-10 border-b"
              style={{ borderColor: "#2a2a3a" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.04), transparent)" }}
              />

              <span
                className="text-[clamp(3rem,6vw,5rem)] leading-none text-white/8 select-none shrink-0 w-24"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {m.num}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3
                    className="text-[clamp(1.5rem,3vw,2.5rem)] leading-none text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {m.name}
                  </h3>
                  {m.badge && (
                    <span
                      className="text-xs uppercase tracking-widest font-medium px-2 py-0.5 text-[#a855f7]"
                      style={{
                        background: "rgba(168,85,247,0.12)",
                        border: "1px solid rgba(168,85,247,0.25)",
                      }}
                    >
                      {m.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a855f7] mb-3 font-medium">
                  {m.tag}
                </p>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
                  {m.desc}
                </p>
              </div>

              <div className="text-[#a855f7]/30 group-hover:text-[#a855f7] transition-colors duration-300 shrink-0 hidden md:block">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
