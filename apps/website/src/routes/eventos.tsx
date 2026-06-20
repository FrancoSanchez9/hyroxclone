import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@tanstack/react-router";

const MODALIDADES = ["Todas", "La Última Vuelta®", "Endurance 4H", "5K / 10K"] as const;
type Modalidad = (typeof MODALIDADES)[number];

interface RunluvEvent {
  id: string;
  name: string;
  city: string;
  venue: string;
  date: string;
  endDate?: string;
  modalidades: string[];
  status: "Confirmada" | "En gestión";
  imageUrl?: string;
  featured?: boolean;
}

const upcomingEvents: RunluvEvent[] = [
  {
    id: "cdmx-2027",
    name: "runluv® Ciudad de México",
    city: "Ciudad de México",
    venue: "Autódromo Hermanos Rodríguez",
    date: "2027-03-13",
    endDate: "2027-03-14",
    modalidades: ["La Última Vuelta®", "Endurance 4H", "5K / 10K"],
    status: "En gestión",
    imageUrl:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&h=500&q=80&fit=crop&auto=format",
    featured: true,
  },
  {
    id: "queretaro-2027",
    name: "runluv® Querétaro",
    city: "Querétaro",
    venue: "Autódromo de Querétaro",
    date: "2027-05-08",
    modalidades: ["La Última Vuelta®", "Endurance 4H"],
    status: "En gestión",
    imageUrl:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=500&q=80&fit=crop&auto=format",
  },
  {
    id: "monterrey-2027",
    name: "runluv® Monterrey",
    city: "Monterrey",
    venue: "Autódromo Monterrey",
    date: "2027-07-17",
    modalidades: ["La Última Vuelta®", "5K / 10K"],
    status: "En gestión",
    imageUrl:
      "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&h=500&q=80&fit=crop&auto=format",
  },
  {
    id: "guadalajara-2027",
    name: "runluv® Guadalajara",
    city: "Guadalajara",
    venue: "Autódromo Guadalajara",
    date: "2027-09-11",
    modalidades: ["La Última Vuelta®", "Endurance 4H", "5K / 10K"],
    status: "En gestión",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=500&q=80&fit=crop&auto=format",
  },
];

const categorias = [
  {
    name: "Individual Open",
    description: "Para cualquier persona que quiera vivir la experiencia runluv®.",
    color: "#a855f7",
  },
  {
    name: "Individual Pro",
    description: "Para corredores experimentados que buscan el reto máximo.",
    color: "#c084fc",
  },
  {
    name: "Doubles",
    description: "Parejas femenil, varonil o mixta que comparten el recorrido.",
    color: "#d8b4fe",
  },
  {
    name: "Teams",
    description: "Equipos de 3 a 5 integrantes que avanzan por relevos.",
    color: "#a855f7",
  },
  {
    name: "Corporate Teams",
    description: "Hasta 6 integrantes empresariales: activación de marca y team building.",
    color: "#c084fc",
  },
];

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

function EventosPage() {
  const [activeFilter, setActiveFilter] = useState<Modalidad>("Todas");

  const filteredEvents =
    activeFilter === "Todas"
      ? upcomingEvents
      : upcomingEvents.filter((e) => e.modalidades.includes(activeFilter));

  return (
    <main className="min-h-screen bg-[#060608] text-white">
      <section className="pt-24 pb-12 px-6 border-b border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="text-[#a855f7] text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          >
            Próximas sedes 2027
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-6xl md:text-8xl leading-none tracking-wider uppercase text-white"
          >
            Eventos runluv® en autódromos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-[#888899] text-base mt-4 max-w-2xl"
          >
            Sedes en gestión con gobiernos municipales y estatales. ¿Quieres que runluv® llegue a tu
            ciudad? Escríbenos.
          </motion.p>
        </div>
      </section>

      <section className="py-8 px-6 border-b border-[#2a2a3a] sticky top-0 z-10 bg-[#060608]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {MODALIDADES.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={[
                  "px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-150",
                  "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060608]",
                  isActive
                    ? "bg-[#a855f7] text-white border-[#a855f7]"
                    : "bg-transparent text-[#888899] border-[#2a2a3a] hover:border-[#a855f7] hover:text-white",
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
              className="text-[#888899] text-center py-20 text-sm uppercase tracking-widest"
            >
              No hay sedes con esta modalidad
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
                          <div className="absolute top-0 left-0 right-0 h-1 bg-[#a855f7]" />
                        )}
                      </div>
                    )}
                    {!event.imageUrl && event.featured && (
                      <div className="h-1 w-full bg-[#a855f7]" />
                    )}
                    <CardHeader className="pb-3">
                      <p className="text-[#a855f7] text-xs font-semibold uppercase tracking-widest">
                        {formatDateSpanish(event.date, event.endDate)}
                      </p>
                      <h2 className="font-bold text-lg leading-tight text-white mt-1">
                        {event.name}
                      </h2>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col gap-4">
                      <div>
                        <p className="text-[#888899] text-sm">{event.city}</p>
                        <p className="text-white/60 text-xs mt-0.5">{event.venue}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {event.modalidades.map((mod) => (
                          <Badge
                            key={mod}
                            variant="outline"
                            style={{ color: "#c084fc", borderColor: "#3a2a4a" }}
                          >
                            {mod}
                          </Badge>
                        ))}
                        <Badge variant="dark" className="border-[#444455] text-[#888899]">
                          {event.status}
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Link to="/contacto" className="block w-full">
                        <Button size="md" variant="primary" className="w-full">
                          Quiero runluv® en mi ciudad
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

      <section className="py-20 px-6 border-t border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-5xl md:text-6xl uppercase tracking-wider text-white mb-12"
          >
            Categorías de participación
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categorias.map((cat, i) => (
              <motion.div
                key={cat.name}
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
                <Card className="h-full border-t-2" style={{ borderTopColor: cat.color }}>
                  <CardHeader>
                    <span
                      className="font-display text-3xl uppercase tracking-widest"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#888899] text-sm leading-relaxed">{cat.description}</p>
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
  head: () => ({
    meta: seo({
      title: "Eventos y Sedes",
      description:
        "Próximas sedes de runluv® en autódromos de México. Conoce las ciudades en gestión, las modalidades de carrera y las categorías de participación, y lleva runluv® a tu ciudad.",
    }),
  }),
  component: EventosPage,
});
