import { m } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { type RunluvEvent, type ScheduleDay } from "@/data/events";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

// Ambiente de carrera para el collage del venue (IDs ya usados en el sitio).
const VENUE_GALLERY = [
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80&fit=crop&auto=format",
];

// Typical runluv race-day program, used when an event has no custom schedule.
const DEFAULT_SCHEDULE: ScheduleDay[] = [
  {
    day: "Día del evento",
    waves: [
      { time: "06:00", label: "Apertura de accesos y registro" },
      { time: "07:00", label: "Salida 5K / 10K" },
      { time: "08:30", label: "Salida La Última Vuelta" },
      { time: "09:00", label: "Salida Cada Paso Cuenta (4 h)" },
      { time: "12:00", label: "Doubles y Teams" },
      { time: "14:00", label: "Premiación por categoría" },
    ],
  },
];

export function EventContentSections({ event }: { event: RunluvEvent }) {
  const schedule = event.schedule ?? DEFAULT_SCHEDULE;
  return (
    <>
      {/* SCHEDULE */}
      {schedule && (
        <section aria-labelledby="schedule-heading">
          <h2
            id="schedule-heading"
            className="text-4xl leading-none tracking-wider text-white uppercase mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Horario de Salidas
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {schedule.map((day) => (
              <div key={day.day} className="border border-white/10">
                <div
                  className="px-5 py-3 border-b border-white/10"
                  style={{ background: "#d4ff00" }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-black">
                    {day.day}
                  </p>
                </div>
                <div className="divide-y divide-white/6">
                  {day.waves.map((wave) => (
                    <div
                      key={wave.time + wave.label}
                      className="flex items-center gap-4 px-5 py-3.5"
                    >
                      <span className="tabular-nums text-sm font-bold text-white w-12 shrink-0">
                        {wave.time}
                      </span>
                      <span className="text-sm text-white/70">{wave.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VENUE */}
      {event.address && (
        <section aria-labelledby="venue-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p
                className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]"
                style={{ color: ACCENT }}
              >
                Dónde se corre
              </p>
              <h2
                id="venue-heading"
                className="text-4xl leading-none tracking-wider text-white uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Venue
              </h2>
            </div>
            {event.mapsUrl && (
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 items-center gap-2 border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:border-[#d4ff00] hover:bg-[#d4ff00] hover:text-black sm:inline-flex"
              >
                <Navigation size={12} aria-hidden="true" />
                Cómo llegar
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.1fr]">
            {/* LEFT — collage de imágenes con franjas verdes */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col overflow-hidden border border-white/10"
            >
              <div className="group relative h-56 overflow-hidden sm:h-64">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.venue}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                {/* franja de carrera */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-1.5"
                  style={{ background: ACCENT }}
                  aria-hidden="true"
                />
                {/* franjas verdes diagonales */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rotate-45"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, ${ACCENT}, ${ACCENT} 4px, transparent 4px, transparent 11px)`,
                    opacity: 0.55,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    <MapPin size={12} aria-hidden="true" /> {event.city}
                  </p>
                  <p
                    className="mt-1 text-xl leading-none tracking-wide text-white uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {event.venue}
                  </p>
                </div>
              </div>

              {/* tira de miniaturas */}
              <div className="grid grid-cols-2 gap-px bg-white/10">
                {VENUE_GALLERY.map((src, i) => (
                  <div key={src} className="group relative h-24 overflow-hidden bg-black">
                    <img
                      src={src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5"
                      style={{ background: ACCENT, opacity: i === 0 ? 1 : 0.4 }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>

              <div className="flex-1 border-t border-white/10 p-4">
                <p className="text-sm text-white/55">{event.address}</p>
              </div>
            </m.div>

            {/* RIGHT — mapa a color con marco verde */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="flex flex-col overflow-hidden border-2"
              style={{ borderColor: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.12)" }}
            >
              {/* franja verde superior */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ background: ACCENT }}
              >
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-black">
                  <MapPin size={12} aria-hidden="true" /> Ubicación en el mapa
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                  {event.country}
                </span>
              </div>
              {/* ponytail: free Google Maps embed (no API key) keyed off the venue query. */}
              <iframe
                title={`Mapa de ${event.venue}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${event.venue}, ${event.address}`,
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                className="min-h-[18rem] w-full flex-1"
              />
              {event.mapsUrl && (
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-black transition-[filter] duration-150 hover:brightness-95 sm:hidden"
                  style={{ background: ACCENT }}
                >
                  <Navigation size={12} aria-hidden="true" /> Abrir en Google Maps
                </a>
              )}
            </m.div>
          </div>
        </section>
      )}
    </>
  );
}
