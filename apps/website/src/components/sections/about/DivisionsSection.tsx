import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "@/components/sections/about/SectionTitle";

const EASE = [0.23, 1, 0.32, 1] as const;

const divisionTabs = [
  {
    id: "open",
    label: "Open",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&q=75&fit=crop&auto=format",
    desc: "La categoría estándar de RunLuv. Para quienes buscan un reto accesible pero real. Sin requisitos previos — cualquiera puede entrar.",
  },
  {
    id: "pro",
    label: "Pro",
    img: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=700&q=75&fit=crop&auto=format",
    desc: "Para atletas de alto rendimiento. Pesos y distancias aumentados, cronometrado al segundo.",
  },
  {
    id: "doubles",
    label: "Doubles",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=700&q=75&fit=crop&auto=format",
    desc: "Comparte la experiencia con un compañero. Mujeres, hombres o mixto. El trabajo se reparte — el reto no.",
  },
  {
    id: "relay",
    label: "Relay",
    img: "https://images.unsplash.com/photo-1536922246289-88c42f957773?w=700&q=75&fit=crop&auto=format",
    desc: "Cuatro atletas, una carrera. Cada integrante corre su parte y empuja el equipo hacia el podio.",
  },
];

export function DivisionsSection() {
  const [activeDiv, setActiveDiv] = useState(0);

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: "#050505",
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.018) 40px, rgba(255,255,255,0.018) 41px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>RUNLUV DIVISIONS</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* left: text + tabs + division image */}
          <m.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">RunLuv es muy accesible</h3>
            <p className="text-white/60 leading-relaxed mb-3">
              Con cuatro categorías diferentes para elegir, RunLuv es para cualquier cuerpo.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Ya sea que quieras competir solo en Open o Pro, compartir la experiencia con un
              compañero en Doubles, o dividir RunLuv en cuatro en Relay — tenemos una carrera para
              todos.
            </p>

            {/* tabs */}
            <div
              role="tablist"
              aria-label="Divisiones RunLuv"
              className="flex mb-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
            >
              {divisionTabs.map((d, i) => (
                <button
                  type="button"
                  key={d.id}
                  role="tab"
                  aria-selected={activeDiv === i}
                  aria-controls={`tab-panel-${d.id}`}
                  id={`tab-${d.id}`}
                  onClick={() => setActiveDiv(i)}
                  className="px-4 py-3 min-h-10 text-sm font-medium uppercase tracking-widest cursor-pointer transition-colors duration-150"
                  style={{
                    color: activeDiv === i ? "#ffffff" : "rgba(255,255,255,0.4)",
                    borderBottom: activeDiv === i ? "2px solid #ffffff" : "2px solid transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* division image + desc */}
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={activeDiv}
                role="tabpanel"
                id={`tab-panel-${divisionTabs[activeDiv].id}`}
                aria-labelledby={`tab-${divisionTabs[activeDiv].id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <div className="relative overflow-hidden mb-4" style={{ height: "260px" }}>
                  <img
                    src={divisionTabs[activeDiv].img}
                    alt={divisionTabs[activeDiv].label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    style={{
                      filter: "grayscale(100%)",
                      outline: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {divisionTabs[activeDiv].desc}
                </p>
              </m.div>
            </AnimatePresence>
          </m.div>

          {/* right: large photo */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative overflow-hidden hidden lg:block"
            style={{ minHeight: "640px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=900&q=80&fit=crop&auto=format"
              alt="Atleta RunLuv"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
              style={{ filter: "grayscale(100%)", outline: "1px solid rgba(255,255,255,0.1)" }}
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
