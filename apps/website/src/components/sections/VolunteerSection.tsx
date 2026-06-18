import { Button } from "@/components/ui/Button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const benefits = [
  "Acceso gratuito al evento",
  "Camiseta oficial de voluntario",
  "Almuerzo incluido",
  "Conoce a la comunidad HYROX",
];

export function VolunteerSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080808]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 0% 100%, rgba(229,249,58,0.09) 0%, transparent 65%)",
        }}
      />

      <div
        className="absolute top-0 left-0 w-40 h-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(229,249,58,0.12) 0%, transparent 50%)",
          clipPath: "polygon(0 0, 40% 0, 60% 100%, 0 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-[#e5f93a] uppercase">
              HAZTE VOLUNTARIO
            </p>

            <h2
              className="mb-6 text-6xl leading-none tracking-wide text-white sm:text-7xl md:text-8xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SÉ PARTE DEL EQUIPO
            </h2>

            <p className="mb-10 max-w-lg text-base text-white/60 sm:text-lg leading-relaxed">
              Vive la experiencia HYROX desde dentro. Nuestros voluntarios son el corazón de cada
              evento, asegurando que cada atleta tenga la mejor experiencia posible.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/voluntario">
                <Button size="lg" variant="primary">
                  Quiero ser voluntario
                </Button>
              </Link>
            </div>

            <a
              href="https://wa.me/521XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#e5f93a] transition-colors duration-200 w-fit"
            >
              <MessageCircle className="h-4 w-4" />
              ¿Preguntas? Contáctanos por WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=700&h=600&q=80&fit=crop&auto=format"
                alt="Voluntarios HYROX"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/75" />
              <div className="relative z-10 p-8 sm:p-10">
                <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-[#e5f93a] uppercase">
                  BENEFICIOS
                </p>

                <ul className="flex flex-col gap-5">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.3 + index * 0.08,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#080808]"
                        style={{ backgroundColor: "#e5f93a" }}
                      >
                        ✓
                      </span>
                      <span className="text-base font-medium text-white/80">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="text-sm text-white/40 leading-relaxed">
                    Cada evento necesita voluntarios comprometidos. Únete a nosotros y forma parte
                    de algo grande.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
