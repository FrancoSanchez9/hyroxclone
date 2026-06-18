import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { upcomingEvents, divisions } from "@/data/events";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@tanstack/react-router";

const FILTERS = ["Todos", "Open", "Pro", "Doubles", "Relay"] as const;
type Filter = (typeof FILTERS)[number];

function formatDateSpanish(dateStr: string, endDateStr?: string): string {
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const start = new Date(dateStr + "T00:00:00");
  const startDay = start.getDate();
  const startMonth = months[start.getMonth()];
  const startYear = start.getFullYear();

  if (!endDateStr) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  const end = new Date(endDateStr + "T00:00:00");
  const endDay = end.getDate();
  const endMonth = months[end.getMonth()];
  const endYear = end.getFullYear();

  if (startMonth === endMonth && startYear === endYear) {
    return `${startDay}–${endDay} ${startMonth} ${startYear}`;
  }

  if (startYear === endYear) {
    return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
  }

  return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
}

const divisionColors: Record<string, string> = {
  Open: "#e5f93a",
  Pro: "#ffffff",
  Doubles: "#aaaaaa",
  Relay: "#666666",
};

function EventosPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Todos");

  const filteredEvents =
    activeFilter === "Todos"
      ? upcomingEvents
      : upcomingEvents.filter((e) => e.categories.includes(activeFilter));

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="pt-24 pb-12 px-6 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="text-[#e5f93a] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          >
            Temporada 2026–2027
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-6xl md:text-8xl leading-none tracking-wider uppercase text-white"
          >
            Eventos Oficiales México
          </motion.h1>
        </div>
      </section>

      <section className="py-8 px-6 border-b border-[#2a2a2a] sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={[
                  "px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-150",
                  "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5f93a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
                  isActive
                    ? "bg-[#e5f93a] text-[#0a0a0a] border-[#e5f93a]"
                    : "bg-transparent text-[#888888] border-[#2a2a2a] hover:border-[#e5f93a] hover:text-white",
                ].join(" ")}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#888888] text-center py-20 text-sm uppercase tracking-widest"
            >
              No hay eventos para esta categoría
            </motion.p>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.07,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <Card
                    hover
                    className="h-full flex flex-col transition-shadow duration-200 overflow-hidden"
                  >
                    {event.imageUrl && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={event.imageUrl}
                          alt={event.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        {event.featured && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-[#e5f93a]" />
                        )}
                      </div>
                    )}
                    {!event.imageUrl && event.featured && (
                      <div className="h-1 w-full bg-[#e5f93a]" />
                    )}
                    <CardHeader className="pb-3">
                      <p className="text-[#e5f93a] text-xs font-semibold uppercase tracking-widest">
                        {formatDateSpanish(event.date, event.endDate)}
                      </p>
                      <h2 className="font-bold text-lg leading-tight text-white mt-1">
                        {event.name}
                      </h2>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col gap-4">
                      <div>
                        <p className="text-[#888888] text-sm">{event.city}</p>
                        <p className="text-white/60 text-xs mt-0.5">{event.venue}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {event.categories.map((cat) => (
                          <Badge
                            key={cat}
                            variant={cat === "Open" ? "yellow" : "outline"}
                            style={
                              cat !== "Open"
                                ? {
                                    color: divisionColors[cat] ?? "#ffffff",
                                    borderColor: divisionColors[cat] ?? "#ffffff",
                                  }
                                : undefined
                            }
                          >
                            {cat}
                          </Badge>
                        ))}
                        {event.soldOut && (
                          <Badge variant="dark" className="border-[#444444] text-[#888888]">
                            Agotado
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Link to={event.registrationUrl as never} className="block w-full">
                        <Button
                          size="md"
                          variant="primary"
                          className="w-full"
                          disabled={event.soldOut}
                        >
                          {event.soldOut ? "Agotado" : "Registrarse"}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-5xl md:text-6xl uppercase tracking-wider text-white mb-12"
          >
            Categorías
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {divisions.map((div, i) => (
              <motion.div
                key={div.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full border-t-2" style={{ borderTopColor: div.color }}>
                  <CardHeader>
                    <span
                      className="font-display text-3xl uppercase tracking-widest"
                      style={{ color: div.color }}
                    >
                      {div.name}
                    </span>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-[#888888] text-sm leading-relaxed">{div.description}</p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">
                        Pesos
                      </p>
                      <p className="text-xs text-white/70">Mujeres: {div.weights.women}</p>
                      <p className="text-xs text-white/70">Hombres: {div.weights.men}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/eventos")({
  component: EventosPage,
});
