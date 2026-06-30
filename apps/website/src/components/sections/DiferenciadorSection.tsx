import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const diferencias = [
  { label: "Evento de 6 – 8 horas" },
  { label: "Público activo, no espectador" },
  { label: "Mayor consumo y permanencia" },
  { label: "Experiencia compartible y mediática" },
  { label: "Formato único en México" },
];

export function DiferenciadorSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#060608" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] mb-4 font-medium">
              ¿Qué lo hace diferente?
            </p>
            <h2
              className="text-[clamp(2rem,5vw,4rem)] leading-none text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Las carreras tradicionales
              <br />
              <span className="text-white/45">terminan en la meta.</span>
            </h2>
            <h2
              className="text-[clamp(2rem,5vw,4rem)] leading-none mb-8"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                background: "linear-gradient(135deg, #a855f7, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              runluv® empieza ahí.
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-md">
              El evento no termina cuando cruzan la línea. Comienza la fiesta, el consumo, la
              experiencia. Un format diseñado para que la ciudad gane antes, durante y después.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {diferencias.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-4 px-6 py-4"
                style={{ background: "#16161f", border: "1px solid #2a2a3a" }}
              >
                <div
                  className="w-5 h-5 shrink-0 flex items-center justify-center"
                  style={{
                    background: "rgba(168,85,247,0.15)",
                    border: "1px solid rgba(168,85,247,0.3)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2.5 2.5L8 2.5"
                      stroke="#a855f7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-white/75 text-sm md:text-base">{d.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
