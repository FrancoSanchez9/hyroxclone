import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { SectionTitle } from "@/components/sections/about/SectionTitle";
import { EASE } from "@/lib/animation";

export function FindMyLevelSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: "#0a0a0a",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.015) 31px, rgba(255,255,255,0.015) 32px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>FIND MY LEVEL</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* left photo */}
          <m.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden"
            style={{ minHeight: "480px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80&fit=crop&auto=format"
              alt="Atleta RunLuv entrenamiento"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
              style={{ filter: "grayscale(100%)", outline: "1px solid rgba(255,255,255,0.1)" }}
            />
          </m.div>

          {/* right: text + questionnaire card */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex flex-col justify-center pl-0 lg:pl-16 pt-10 lg:pt-0"
          >
            <p className="text-white/70 leading-relaxed mb-8">
              Responde nuestro cuestionario RunLuv para ayudarte a determinar tu nivel de fitness.
              Recuerda, es solo una indicación — puedes entrar a la división que quieras.
            </p>

            <div
              className="p-8"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p
                className="text-lg font-bold uppercase tracking-widest text-black mb-6 px-3 py-1 inline-block"
                style={{
                  background: "#ffffff",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.25rem",
                }}
              >
                CUESTIONARIO
              </p>
              <p className="text-white font-medium mb-4">
                ¿Con qué frecuencia entrenas por semana?
              </p>
              {["0", "1–2", "3 o más"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 mb-3 min-h-10 cursor-pointer group"
                >
                  <span
                    className="w-5 h-5 rounded-full border-2 shrink-0 group-hover:border-white transition-colors"
                    style={{ borderColor: "rgba(255,255,255,0.4)" }}
                  />
                  <span className="text-white/70 group-hover:text-white transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
              <Link
                to="/tu-nivel"
                className="mt-6 inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-colors duration-150 active:scale-[0.96]"
              >
                Siguiente →
              </Link>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
