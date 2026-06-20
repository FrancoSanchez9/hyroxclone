import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const categorias = [
  {
    name: "Individual Open",
    desc: "Para cualquier persona que quiera vivir la experiencia runluv.",
    icon: "○",
  },
  {
    name: "Individual Pro",
    desc: "Mayor exigencia y nivel competitivo para corredores experimentados.",
    icon: "◆",
  },
  {
    name: "Doubles",
    desc: "Compite en pareja: femenil, varonil o mixta.",
    icon: "⊕",
  },
  {
    name: "Teams",
    desc: "3 a 5 integrantes. Equipos por relevos donde cada vuelta cuenta.",
    icon: "◈",
  },
  {
    name: "Corporate Teams",
    desc: "Hasta 6 integrantes. Equipos empresariales representando a su organización.",
    icon: "▣",
  },
];

export function CategoriasSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#0f0f14" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] mb-3 font-medium">
            Para todos los niveles
          </p>
          <h2
            className="text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Categorías
          </h2>
          <p className="mt-4 text-white/40 text-sm max-w-lg">
            Las categorías aplican según la modalidad seleccionada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {categorias.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.07 }}
              className="group p-6 relative overflow-hidden"
              style={{ background: "#16161f", border: "1px solid #2a2a3a" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(168,85,247,0.07), transparent 60%)",
                }}
              />
              <div className="flex items-start gap-4">
                <span
                  className="text-2xl text-[#a855f7] leading-none mt-0.5 select-none"
                  aria-hidden="true"
                >
                  {cat.icon}
                </span>
                <div>
                  <h3
                    className="text-lg text-white mb-1.5 leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
