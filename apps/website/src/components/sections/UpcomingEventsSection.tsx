import { upcomingEvents, type RunluvEvent } from "@/data/events";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Link } from "@tanstack/react-router";
import { m } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { ACCENT } from "@/lib/theme";

function formatDateRange(dateStr: string, endDateStr?: string): string {
  const start = new Date(dateStr + "T00:00:00");
  const day = start.toLocaleDateString("en-US", { day: "2-digit" }).toUpperCase();
  const month = start
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase()
    .replace(".", "");
  const year = start.getFullYear();

  if (!endDateStr) {
    return `${day} ${month} ${year}`;
  }

  const end = new Date(endDateStr + "T00:00:00");
  const endDay = end.toLocaleDateString("en-US", { day: "2-digit" }).toUpperCase();
  const endMonth = end
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase()
    .replace(".", "");

  if (month === endMonth) {
    return `${day} — ${endDay} ${endMonth} ${year}`;
  }

  return `${day} ${month} — ${endDay} ${endMonth} ${year}`;
}

function FeaturedEventCard({ event }: { event: RunluvEvent }) {
  return (
    <m.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(212,255,0,0.1)" }}
      transition={{
        clipPath: { duration: 0.9, ease: [0.23, 1, 0.32, 1] },
        default: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
      }}
      className="relative w-full overflow-hidden rounded-lg border border-white/10"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          width={1200}
          height={700}
          alt={event.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ outline: "1px solid rgba(255,255,255,0.1)" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="relative z-10 flex flex-col gap-6 p-8 md:p-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <span
            className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-black uppercase"
            style={{ background: ACCENT }}
          >
            DESTACADO
          </span>
          {event.soldOut && (
            <Badge variant="dark" className="border border-white/20">
              SOLD OUT
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3
            className="font-display text-4xl md:text-6xl text-white leading-none uppercase tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {event.name}
          </h3>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-rl-accent">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="text-sm font-semibold tracking-wider">
                {formatDateRange(event.date, event.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-sm">
                {event.venue} — {event.city}, {event.country}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.categories.map((cat) => (
            <Badge key={cat} variant="outline" className="text-white/50 border-white/20 text-xs">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-3">
          {event.spotsLeft !== undefined && event.spotsLeft < 20 && (
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                Solo {event.spotsLeft} lugares
              </span>
            </div>
          )}
          {event.soldOut ? (
            <Button size="lg" variant="outline" disabled className="opacity-40 cursor-not-allowed">
              Sold Out
            </Button>
          ) : (
            <a
              href={event.registrationUrl}
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-black hover:brightness-95 transition-[transform,filter] duration-[160ms] ease-out-strong active:scale-[0.96]"
              style={{ background: ACCENT }}
            >
              ¡Regístrate ahora!
            </a>
          )}
        </div>
      </div>
    </m.div>
  );
}

function EventCard({ event }: { event: RunluvEvent }) {
  return (
    <m.div
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className="h-full group"
    >
      <Card hover className="flex flex-col h-full overflow-hidden">
        {event.imageUrl && (
          <div className="relative h-36 overflow-hidden">
            <img
              src={event.imageUrl}
              width={1200}
              height={700}
              alt={event.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              style={{ outline: "1px solid rgba(255,255,255,0.1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-rl-accent mb-1">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs font-bold tracking-widest">
              {formatDateRange(event.date, event.endDate)}
            </span>
          </div>
          <h4
            className="font-display text-xl text-white leading-none uppercase tracking-wide line-clamp-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {event.name}
          </h4>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <div className="flex items-start gap-2 text-white/50 mb-4">
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

        <CardFooter className="pt-0 flex-col items-start gap-2">
          {event.spotsLeft !== undefined && event.spotsLeft < 20 && (
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                Solo {event.spotsLeft} lugares
              </span>
            </div>
          )}
          {event.soldOut ? (
            <span className="text-xs text-white/60 uppercase tracking-widest font-semibold">
              Sold Out
            </span>
          ) : (
            <Link
              to={event.registrationUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rl-accent hover:text-white transition-colors duration-150"
            >
              Regístrate
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </CardFooter>
      </Card>
    </m.div>
  );
}

export function UpcomingEventsSection() {
  const featuredEvent = upcomingEvents.find((e) => e.featured);
  const remainingEvents = upcomingEvents.filter((e) => !e.featured);

  return (
    <section className="w-full py-20 md:py-28" style={{ background: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <AnimatedTitle
            text="PRÓXIMAS CARRERAS"
            accent={["CARRERAS"]}
            className="text-5xl md:text-7xl text-white mb-3 text-balance"
          />
          <p className="text-white/60 text-base md:text-lg">
            Encuentra tu carrera runluv® más cercana
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
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/60 hover:text-rl-accent transition-colors duration-200 border-b border-transparent hover:border-rl-accent pb-0.5"
          >
            Ver todas las carreras
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
