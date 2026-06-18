import { Button } from "@/components/ui/Button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const trustSignals = ["Para todos los niveles", "+100 eventos al año", "Comunidad global"];

export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(229,249,58,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2
          className="mb-5 text-5xl leading-none tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ¿LISTO PARA TU PRIMER HYROX?
        </h2>

        <p className="mb-10 max-w-xl text-base text-white/60 sm:text-lg">
          Únete a más de 500,000 atletas en todo el mundo. Tu primera carrera de fitness te espera.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link to="/eventos">
            <Button size="lg" variant="primary">
              Encontrar mi Carrera
            </Button>
          </Link>
          <Link to="/la-carrera">
            <Button size="lg" variant="outline">
              ¿Qué es HYROX?
            </Button>
          </Link>
        </div>

        <ul className="mt-10 flex flex-col items-center gap-2 sm:flex-row sm:gap-8">
          {trustSignals.map((signal) => (
            <li key={signal} className="flex items-center gap-2 text-sm font-medium text-white/50">
              <span className="text-[#e5f93a]">✓</span>
              {signal}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
