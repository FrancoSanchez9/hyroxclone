import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const gobiernoItems = ["Infraestructura", "Permisos", "Seguridad", "Difusión", "Coinversión"];

const runluvItems = ["Producción integral", "Comercialización", "Operación", "Marca"];

const propuesta = [
  { label: "Ediciones", value: "1 anual" },
  { label: "Duración", value: "6 – 8 horas" },
  { label: "Corredores", value: "3,000 – 5,000" },
  { label: "Impacto", value: "Activación turística inmediata" },
];

export function ModeloSection() {
  return (
    <section
      id="modelo"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#060608" }}
    >
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.04]"
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
            Colaboración público-privada
          </p>
          <h2
            className="text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Modelo llave en mano
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-xl">
            Riesgo controlado. Tú pones la ciudad. Nosotros ponemos el evento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {/* Gobierno */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="p-8 relative"
            style={{ background: "#16161f", border: "1px solid #2a2a3a" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3
                className="text-2xl text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Gobierno aporta
              </h3>
            </div>
            <ul className="flex flex-col gap-2">
              {gobiernoItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/55">
                  <span className="w-1 h-1 rounded-full bg-[#a855f7] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* runluv */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 }}
            className="p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(124,58,237,0.06))",
              border: "1px solid rgba(168,85,247,0.3)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(168,85,247,0.15), transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(168,85,247,0.2)",
                  border: "1px solid rgba(168,85,247,0.4)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3
                className="text-2xl text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                runluv® aporta
              </h3>
            </div>
            <ul className="relative flex flex-col gap-2">
              {runluvItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="w-1 h-1 rounded-full bg-[#a855f7] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Propuesta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <h3
            className="text-xl text-white/60 mb-6 uppercase tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Propuesta inicial
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {propuesta.map((p) => (
              <div
                key={p.label}
                className="p-5 text-center"
                style={{ background: "#16161f", border: "1px solid #2a2a3a" }}
              >
                <div
                  className="text-lg mb-1 leading-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    background: "linear-gradient(135deg, #a855f7, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {p.value}
                </div>
                <p className="text-xs text-white/60 uppercase tracking-wide">{p.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
