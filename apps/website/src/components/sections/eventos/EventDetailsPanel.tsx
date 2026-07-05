import { Calendar, MapPin, Users, CheckCircle } from "lucide-react";
import { type RunluvEvent } from "@/data/events";
import { formatDateLong } from "@/lib/formatDate";

export function EventDetailsPanel({ event }: { event: RunluvEvent }) {
  return (
    <div className="border-b border-white/10" style={{ background: "#111111" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
          {[
            { icon: Calendar, label: "Fecha", value: formatDateLong(event.date, event.endDate) },
            { icon: MapPin, label: "Venue", value: event.venue },
            { icon: Users, label: "Categorías", value: event.categories.join(" · ") },
            {
              icon: CheckCircle,
              label: "Estado",
              value: event.soldOut
                ? "Agotado"
                : event.spotsLeft
                  ? `${event.spotsLeft} lugares`
                  : "Disponible",
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                {label}
              </span>
              <span className="text-xs font-semibold text-white leading-tight">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
