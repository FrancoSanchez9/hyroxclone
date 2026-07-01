import { Link } from "@tanstack/react-router";
import { m } from "framer-motion";
import { MapPin, Calendar, ChevronLeft } from "lucide-react";
import { type HyroxEvent } from "@/data/events";
import { formatDateLong } from "@/lib/formatDate";

const EASE = [0.23, 1, 0.32, 1] as const;

export function EventHero({ event }: { event: HyroxEvent }) {
  return (
    <div className="relative h-[65vh] min-h-[420px] overflow-hidden">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ filter: "grayscale(100%)", outline: "1px solid rgba(255,255,255,0.1)" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Back link */}
      <div className="absolute top-0 left-0 right-0 pt-28 px-6">
        <Link
          to="/eventos"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-150"
        >
          <ChevronLeft size={14} aria-hidden="true" />
          Todos los eventos
        </Link>
      </div>

      {/* Event info */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-12">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {event.featured && (
            <span
              className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black px-2.5 py-1"
              style={{ background: "#ffffff" }}
            >
              Destacado
            </span>
          )}
          <h1
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-none tracking-wide text-white uppercase text-balance"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {event.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <Calendar size={14} aria-hidden="true" />
              {formatDateLong(event.date, event.endDate)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              {event.venue}, {event.city}
            </span>
          </div>
          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {event.categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-bold uppercase tracking-widest text-black px-2.5 py-1"
                style={{ background: "#ffffff" }}
              >
                {cat}
              </span>
            ))}
          </div>
        </m.div>
      </div>
    </div>
  );
}
