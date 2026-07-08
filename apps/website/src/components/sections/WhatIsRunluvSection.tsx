import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.23, 1, 0.32, 1] as const;

const bullets = [
  "Sin clasificación previa — todos pueden participar",
  "Modalidades para cada nivel",
  "Resultados y rankings oficiales en cada temporada",
];

export function WhatIsRunluvSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="w-full" style={{ background: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
          <m.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, x: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -60, filter: "blur(8px)" }
            }
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              className="text-[clamp(3.5rem,9vw,7.5rem)] font-normal leading-none tracking-wide text-white uppercase text-balance"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ¿QUÉ ES{" "}
              <span
                style={{
                  background: "#d4ff00",
                  padding: "0 8px",
                  color: "#000",
                  display: "inline-block",
                }}
              >
                RUNLUV
              </span>
              ?
            </h2>
          </m.div>

          <m.div
            className="lg:w-[45%] relative overflow-hidden rounded-lg"
            style={{ minHeight: "360px" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={inView ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&q=65&fit=crop&auto=format"
              alt="Corredores en un evento runluv®"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
              style={{ outline: "1px solid rgba(255,255,255,0.1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#d4ff00]">
                LA EXPERIENCIA RUNLUV®
              </p>
            </div>
          </m.div>
        </div>

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          <m.div
            className="flex-1 flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl text-pretty">
              runluv® es una experiencia de running que transforma los autódromos en escenarios
              donde corredores de todos los niveles descubren hasta dónde son capaces de llegar.
            </p>
            <p className="text-base leading-relaxed text-white/55 text-pretty">
              A lo largo de la temporada, los participantes eligen el desafío que mejor se adapta a
              su nivel, recorren el circuito y reciben un resultado oficial que marca el inicio del
              siguiente desafío.
            </p>
            <p
              className="text-lg font-bold uppercase tracking-wide text-[#d4ff00] text-pretty"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Bienvenido a la comunidad runluv®
            </p>

            <ul className="flex flex-col gap-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d4ff00]" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-white/70 sm:text-base">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/la-carrera"
                className="inline-flex items-center justify-center h-12 px-7 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96]"
              >
                Descubre la carrera
              </Link>
              <Link
                to="/tu-nivel"
                className="inline-flex items-center justify-center h-12 px-7 text-sm font-bold uppercase tracking-widest text-[#d4ff00] border border-[#d4ff00]/50 hover:border-[#d4ff00] hover:bg-[#d4ff00]/10 transition-[border-color,background-color] duration-[160ms] active:scale-[0.96]"
              >
                Encuentra tu desafío
              </Link>
            </div>
          </m.div>
        </div>

        {/* Sport marquee — constant motion, linear by definition */}
        <div className="mt-14 overflow-hidden border-y border-white/10 py-5" aria-hidden="true">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center pr-10">
                {["CORRE", "COMPITE", "VUELVE", "RUNLUV®"].map((word) => (
                  <span key={word} className="flex items-center gap-10 pr-10">
                    <span
                      className="text-5xl uppercase leading-none md:text-6xl"
                      style={
                        word === "RUNLUV®"
                          ? { fontFamily: "'Bebas Neue', sans-serif", color: "#d4ff00" }
                          : {
                              fontFamily: "'Bebas Neue', sans-serif",
                              color: "transparent",
                              WebkitTextStroke: "1.5px rgba(255,255,255,0.5)",
                            }
                      }
                    >
                      {word}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#d4ff00]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
