import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Trophy, ArrowRight } from "lucide-react";
import { upcomingEvents } from "@/data/events";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { ACCENT, EASE } from "@/lib/theme";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
function shortDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()].toUpperCase()} ${d.getFullYear()}`;
}

export function QualifySection() {
  const qualifiers = upcomingEvents.slice(0, 4);
  const final = upcomingEvents[upcomingEvents.length - 1];

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Clasificación
          </p>
          <AnimatedTitle
            text="EL CAMINO A LA GRAN FINAL"
            accent={["FINAL"]}
            className="text-4xl text-white sm:text-5xl md:text-6xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            Cada sede suma al ranking runluv® según tu modalidad, categoría y grupo de edad. Los
            mejores de la temporada se reúnen en la Ciudad de México.
          </p>
        </div>

        {/* Roadmap — vertical connected path */}
        <div className="relative pl-12 sm:pl-16">
          {/* Connecting line */}
          <div
            className="absolute left-[1.15rem] top-2 bottom-2 w-px sm:left-[1.65rem]"
            style={{
              background: "linear-gradient(180deg, rgba(212,255,0,0.5), rgba(212,255,0,0.15))",
            }}
            aria-hidden="true"
          />

          {qualifiers.map((event, i) => (
            <m.div
              key={event.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              className="relative pb-6"
            >
              {/* Node */}
              <span
                className="absolute -left-12 flex h-9 w-9 items-center justify-center border tabular-nums text-lg leading-none sm:-left-16 sm:h-11 sm:w-11"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  borderColor: "rgba(212,255,0,0.4)",
                  color: ACCENT,
                  background: "#0a0a0a",
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <Link
                to={event.registrationUrl}
                className="group flex flex-col gap-1 border border-white/10 border-l-2 border-l-transparent bg-white/[0.03] p-5 transition-colors duration-200 hover:border-l-rl-accent"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className="text-2xl uppercase leading-none tracking-wide text-white transition-colors duration-200 group-hover:text-rl-accent"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {event.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-rl-accent" />
                </div>
                <p className="text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
                  {shortDate(event.date)}
                </p>
                <p className="text-sm text-white/50">
                  {event.venue} — {event.city}
                </p>
              </Link>
            </m.div>
          ))}

          {/* Gran Final node */}
          <m.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            className="relative"
          >
            <span
              className="absolute -left-12 flex h-9 w-9 items-center justify-center sm:-left-16 sm:h-11 sm:w-11"
              style={{ background: ACCENT }}
              aria-hidden="true"
            >
              <Trophy className="h-4 w-4 text-black sm:h-5 sm:w-5" />
            </span>

            <Link
              to={final.registrationUrl}
              className="group block overflow-hidden p-6"
              style={{ background: ACCENT }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/60">
                Gran Final · {shortDate(final.date)}
              </p>
              <h3
                className="mt-1 text-3xl uppercase leading-none tracking-wide text-black sm:text-4xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {final.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-black/70">
                {final.venue} — {final.city}
              </p>
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  );
}
