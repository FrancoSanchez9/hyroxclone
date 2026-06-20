import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const pillars = [
  {
    icon: (
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
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    label: "Carrera",
    desc: "Competencia de alto rendimiento en circuito de autódromo.",
  },
  {
    icon: (
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Resistencia",
    desc: "Formatos de hasta 4 horas para corredores de todos los niveles.",
  },
  {
    icon: (
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
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Festival",
    desc: "Experiencia de 6 a 8 horas con música, gastronomía y activaciones de marca.",
  },
];

export function WhatIsRunluvSection() {
  return (
    <section
      id="que-es"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0f0f14" }}
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse at center, #a855f7, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#a855f7] mb-3 font-medium">
            La plataforma
          </p>
          <h2
            className="text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ¿Qué es runluv?
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-base md:text-lg leading-relaxed">
            Una plataforma de eventos en autódromos que integra carrera, resistencia y festival en
            un formato único diseñado para generar{" "}
            <span className="text-white/80">impacto económico, turístico y social</span> en una sola
            jornada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.08 }}
              className="relative p-8 flex flex-col gap-4 group"
              style={{
                background: "#16161f",
                border: "1px solid #2a2a3a",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, rgba(168,85,247,0.06), transparent 70%)",
                }}
              />
              <div
                className="w-12 h-12 flex items-center justify-center text-[#a855f7]"
                style={{
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                {p.icon}
              </div>
              <div>
                <h3
                  className="text-2xl text-white mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {p.label}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
