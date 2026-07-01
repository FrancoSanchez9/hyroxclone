import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Link } from "@tanstack/react-router";

const EASE = [0.23, 1, 0.32, 1] as const;

const timeline = [
  {
    time: "6:00 AM",
    title: "Apertura del recinto",
    description: "Llega al recinto, recoge tu dorsal y chip de cronometraje.",
  },
  {
    time: "7:00 AM",
    title: "Zona de calentamiento",
    description:
      "Área de calentamiento libre con sesiones guiadas. Foam rollers, bandas de resistencia y pesas ligeras.",
  },
  {
    time: "8:00 AM",
    title: "Salidas por ola",
    description:
      "Los atletas salen en grupos de 30 cada 3 minutos. Tu recorrido comienza con 1 km de carrera.",
  },
  {
    time: "Todo el día",
    title: "Carrera en marcha",
    description:
      "Completa tus 8 km de carrera y 8 estaciones a tu ritmo. Los chips de cronometraje registran tus parciales.",
  },
  {
    time: "Tras la meta",
    title: "Zona de finisher",
    description:
      "Recibe tu medalla y camiseta de finisher, y celebra con la comunidad en el festival post-carrera.",
  },
  {
    time: "Por la tarde",
    title: "Ceremonia de premiación",
    description:
      "Los ganadores de cada división reciben sus trofeos en el escenario. Se anuncian las clasificaciones para Elite 15.",
  },
];

const zones = [
  {
    name: "Zona de salida/meta",
    description:
      "El corazón del evento. Cronometraje electrónico, gradas para espectadores y sistema de megafonía.",
  },
  {
    name: "Estaciones de entrenamiento",
    description:
      "8 estaciones de fitness funcional distribuidas en secuencia alrededor del circuito de carrera.",
  },
  {
    name: "Pueblo del atleta",
    description:
      "Consigna de equipaje, asistencia médica, estaciones de nutrición y activaciones de patrocinadores.",
  },
  {
    name: "Zona de espectadores",
    description: "Observa desde múltiples puntos mientras los atletas afrontan cada estación.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&q=80&fit=crop&auto=format",
];

function ExperiencePage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PageHero
        inverted
        title="LA EXPERIENCIA RUNLUV®"
        subtitle="Desde el primer kilómetro hasta la meta — así se vive un día de carrera runluv®."
        badge="DÍA DEL EVENTO"
      />

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff] mb-3">
              Programa del día de carrera
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TU DÍA
            </h2>
          </m.div>

          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-white/10" />
            {timeline.map((item, i) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="flex gap-8 mb-8 relative"
              >
                <div className="w-20 shrink-0 text-right">
                  <span className="text-xs font-bold text-[#ffffff] uppercase tracking-wider">
                    {item.time}
                  </span>
                </div>
                <div
                  className="absolute left-[86px] top-1.5 w-3 h-3 rounded-full border-2 border-[#ffffff]"
                  style={{ background: "#000" }}
                />
                <div className="flex-1 pb-8">
                  <h3
                    className="text-xl font-normal text-white uppercase mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue zones */}
      <section style={{ background: "#0a0a0a" }} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12"
          >
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ZONAS DEL RECINTO
            </h2>
          </m.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {zones.map((zone, i) => (
              <m.div
                key={zone.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="p-6"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-2 h-2 rounded-full mb-4" style={{ background: "#ffffff" }} />
                <h3
                  className="text-xl font-normal text-white uppercase mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {zone.name}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{zone.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12"
          >
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              GALERÍA
            </h2>
          </m.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <m.div
                key={src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="relative overflow-hidden aspect-square"
              >
                <img
                  src={src}
                  alt={`Momento del evento RunLuv ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  style={{ outline: "1px solid rgba(255,255,255,0.1)" }}
                />
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0a0a0a" }} className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ¿LISTO PARA COMPETIR?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
              Encuentra tu próximo evento RunLuv y regístrate hoy. Te espera la experiencia de tu
              vida.
            </p>
            <Link
              to="/eventos"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96]"
            >
              Encuentra un evento
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
});
