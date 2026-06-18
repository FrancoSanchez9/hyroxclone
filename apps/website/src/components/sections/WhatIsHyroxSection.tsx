import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

const EASE = [0.23, 1, 0.32, 1] as const;

const bullets = [
  "Sin clasificación previa — cualquiera puede participar",
  "Mismo formato en todo el mundo",
  "Rankings globales y por temporada",
];

const quickStats = [
  { value: "8 km", label: "de running" },
  { value: "8", label: "estaciones" },
  { value: "1", label: "formato mundial" },
  { value: "100%", label: "para todos" },
];

export function WhatIsHyroxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="w-full bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
          <motion.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              className="text-[clamp(3.5rem,9vw,7.5rem)] font-normal leading-none tracking-wide text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ¿QUÉ ES <span className="bg-[#e5f93a] px-2 text-[#0a0a0a]">HYROX</span>?
            </h2>
          </motion.div>

          <motion.div
            className="lg:w-[45%] relative overflow-hidden rounded-lg"
            style={{ minHeight: "360px" }}
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          >
            <img
              src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&h=600&q=80&fit=crop&auto=format"
              alt="Atletas corriendo en HYROX"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#e5f93a]">
                THE FITNESS RACE
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          <motion.div
            className="flex-1 flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
              HYROX es la nueva carrera de fitness que combina{" "}
              <span className="text-white font-semibold">8 km de running</span> y{" "}
              <span className="text-white font-semibold">8 workouts</span> de manera intercalada.
            </p>
            <p className="text-base leading-relaxed text-white/55">
              Se organizan eventos a lo largo de la temporada, donde cualquiera puede competir sin
              clasificación previa.
            </p>

            <ul className="flex flex-col gap-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 text-[#e5f93a] text-lg leading-none"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/la-carrera">
                <Button variant="primary" size="lg">
                  Descubrir La Carrera
                </Button>
              </Link>
              <Link to="/tu-nivel">
                <Button variant="outline" size="lg">
                  Encuentra tu Nivel
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 h-px w-full bg-white/10" />

        <motion.div
          className="mt-10 grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
        >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-4 py-6 text-center"
            >
              <span
                className="text-[clamp(1.75rem,4vw,3rem)] font-normal leading-none text-[#e5f93a]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="mt-1.5 text-xs uppercase tracking-widest text-white/45">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
