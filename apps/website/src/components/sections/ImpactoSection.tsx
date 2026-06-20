import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const stats = [
  { value: "3,000 – 5,000", label: "Corredores por evento" },
  { value: "15,000", label: "Asistentes totales" },
  { value: "20% – 35%", label: "Visitantes foráneos" },
  { value: "1,500 – 3,500", label: "Noches de hotel generadas" },
  { value: "7x", label: "Retorno económico por peso invertido" },
  { value: "90+ días", label: "De impacto visible post-evento" },
];

const mercado = [
  "+15 millones de corredores en México",
  "Crecimiento anual del 8–12%",
  "Saturación de formatos tradicionales",
  "Auge de experiencias híbridas",
];

export function ImpactoSection() {
  return (
    <section
      id="impacto"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0f0f14" }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[400px] opacity-[0.05]"
        style={{ background: "radial-gradient(ellipse at top left, #a855f7, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] mb-3 font-medium">
            Resultados medibles
          </p>
          <h2
            className="text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Impacto en números
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.07 }}
              className="p-6 md:p-8 relative group overflow-hidden"
              style={{ background: "#16161f", border: "1px solid #2a2a3a" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom right, rgba(168,85,247,0.07), transparent 60%)",
                }}
              />
              <div
                className="text-[clamp(1.6rem,3.5vw,2.5rem)] leading-none mb-2 font-normal"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  background: "linear-gradient(135deg, #a855f7, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <p className="text-xs text-white/40 uppercase tracking-wide leading-snug">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Por qué ahora */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] mb-3 font-medium">
              Contexto de mercado
            </p>
            <h2
              className="text-[clamp(2rem,5vw,3.8rem)] leading-none text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ¿Por qué ahora?
            </h2>
            <p className="text-white/45 text-sm md:text-base leading-relaxed">
              Las primeras ciudades que adopten este formato se posicionarán como
              <span className="text-white/70"> sede insignia</span> de una tendencia que ya no puede
              esperar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {mercado.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-5 py-3.5"
                style={{ background: "#16161f", borderLeft: "2px solid #a855f7" }}
              >
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
