import { MapPin } from "lucide-react";
import { type HyroxEvent } from "@/data/events";

export function EventContentSections({ event }: { event: HyroxEvent }) {
  return (
    <>
      {/* SCHEDULE */}
      {event.schedule && (
        <section aria-labelledby="schedule-heading">
          <h2
            id="schedule-heading"
            className="text-4xl leading-none tracking-wider text-white uppercase mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Horario de Salidas
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {event.schedule.map((day) => (
              <div key={day.day} className="border border-white/10">
                <div
                  className="px-5 py-3 border-b border-white/10"
                  style={{ background: "#ffffff" }}
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

      {/* ABOUT */}
      {event.about && (
        <section aria-labelledby="about-heading">
          <h2
            id="about-heading"
            className="text-4xl leading-none tracking-wider text-white uppercase mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sobre Este Evento
          </h2>
          <p className="text-base leading-relaxed text-white/65 text-pretty max-w-2xl">
            {event.about}
          </p>
        </section>
      )}

      {/* VENUE */}
      {event.address && (
        <section aria-labelledby="venue-heading">
          <h2
            id="venue-heading"
            className="text-4xl leading-none tracking-wider text-white uppercase mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Venue
          </h2>
          <div className="border border-white/10 p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold text-white">{event.venue}</p>
              <p className="text-sm text-white/55 max-w-md">{event.address}</p>
            </div>
            {event.mapsUrl && (
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 shrink-0 border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/8 hover:border-white/50 transition-[background-color,border-color] duration-150"
              >
                <MapPin size={12} aria-hidden="true" />
                Ver en Google Maps
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
}
