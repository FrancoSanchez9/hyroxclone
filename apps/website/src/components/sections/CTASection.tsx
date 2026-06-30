import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function CTASection() {
  return (
    <section
      id="contacto"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "#0f0f14" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #a855f7 50%, transparent)" }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#a855f7] mb-4 font-medium">
            Únete al movimiento
          </p>
          <h2
            className="text-[clamp(2.5rem,8vw,6rem)] leading-none text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Lleva runluv®{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              a tu estado
            </span>
          </h2>

          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
            {["Activa tu economía", "Posiciona tu destino", "Genera impacto visible"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1 h-1 rounded-full bg-[#a855f7]" />
                  {item}
                </li>
              ),
            )}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:contacto@runluv.mx"
              className="inline-flex items-center justify-center h-14 px-10 font-semibold uppercase tracking-widest text-white bg-[#a855f7] hover:bg-[#9333ea] transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem" }}
            >
              Agenda una reunión
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center h-14 px-10 font-semibold uppercase tracking-widest text-[#a855f7] border border-[#a855f7]/40 hover:border-[#a855f7] hover:bg-[#a855f7]/8 transition-all duration-[160ms]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem" }}
            >
              Descarga dossier
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
