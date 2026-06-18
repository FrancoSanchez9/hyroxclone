import { upcomingEvents, type HyroxEvent } from "@/data/events";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

function formatDateRange(dateStr: string, endDateStr?: string): string {
  const start = new Date(dateStr + "T00:00:00");
  const day = start.toLocaleDateString("es-MX", { day: "2-digit" }).toUpperCase();
  const month = start
    .toLocaleDateString("es-MX", { month: "short" })
    .toUpperCase()
    .replace(".", "");
  const year = start.getFullYear();

  if (!endDateStr) {
    return `${day} ${month} ${year}`;
  }

  const end = new Date(endDateStr + "T00:00:00");
  const endDay = end.toLocaleDateString("es-MX", { day: "2-digit" }).toUpperCase();
  const endMonth = end
    .toLocaleDateString("es-MX", { month: "short" })
    .toUpperCase()
    .replace(".", "");

  if (month === endMonth) {
    return `${day} ${endMonth} / ${endDay} ${endMonth} ${year}`;
  }

  return `${day} ${month} / ${endDay} ${endMonth} ${year}`;
}

function FeaturedEventCard({ event }: { event: HyroxEvent }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(229,249,58,0.12)" }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full overflow-hidden rounded-lg border border-[#2a2a2a]"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/90 via-[#111111]/80 to-[#1a1a1a]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="relative z-10 flex flex-col gap-6 p-8 md:p-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Badge variant="yellow" className="text-xs font-bold tracking-widest px-3 py-1">
            DESTACADO
          </Badge>
          {event.soldOut && (
            <Badge variant="dark" className="border border-[#444]">
              AGOTADO
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-4xl md:text-6xl text-white leading-none uppercase tracking-wide">
            {event.name}
          </h3>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-[#e5f93a]">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="text-sm font-semibold tracking-wider">
                {formatDateRange(event.date, event.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#888888]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-sm">
                {event.venue} — {event.city}, {event.country}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.categories.map((cat) => (
            <Badge key={cat} variant="outline" className="text-[#888] border-[#444] text-xs">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="mt-2">
          {event.soldOut ? (
            <Button size="lg" variant="outline" disabled className="opacity-40 cursor-not-allowed">
              Agotado
            </Button>
          ) : (
            <Link to={event.registrationUrl as never}>
              <Button size="lg" className="font-bold tracking-widest">
                ¡Inscríbete ahora!
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EventCard({ event }: { event: HyroxEvent }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className="h-full group"
    >
      <Card hover className="flex flex-col h-full overflow-hidden">
        {event.imageUrl && (
          <div className="relative h-36 overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.name}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-[#e5f93a] mb-1">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs font-bold tracking-widest">
              {formatDateRange(event.date, event.endDate)}
            </span>
          </div>
          <h4 className="font-display text-xl text-white leading-none uppercase tracking-wide line-clamp-2">
            {event.name}
          </h4>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <div className="flex items-start gap-2 text-[#888888] mb-4">
            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span className="text-xs leading-relaxed">
              {event.venue}
              <br />
              {event.city}, {event.country}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {event.categories.map((cat) => (
              <Badge key={cat} variant="dark" className="text-[10px] px-2 py-0.5">
                {cat}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          {event.soldOut ? (
            <span className="text-xs text-[#888] uppercase tracking-widest font-semibold">
              Agotado
            </span>
          ) : (
            <Link
              to={event.registrationUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#e5f93a] hover:text-white transition-colors duration-150"
            >
              Registrarse
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function UpcomingEventsSection() {
  const featuredEvent = upcomingEvents.find((e) => e.featured);
  const remainingEvents = upcomingEvents.filter((e) => !e.featured);

  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-white uppercase tracking-wide leading-none mb-3">
            Próximos Eventos
          </h2>
          <p className="text-[#888888] text-base md:text-lg font-sans">
            Encuentra tu carrera HYROX más cercana
          </p>
        </div>

        {featuredEvent && (
          <div className="mb-10">
            <FeaturedEventCard event={featuredEvent} />
          </div>
        )}

        {remainingEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {remainingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#888888] hover:text-[#e5f93a] transition-colors duration-200 border-b border-transparent hover:border-[#e5f93a] pb-0.5"
          >
            Ver todos los eventos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
