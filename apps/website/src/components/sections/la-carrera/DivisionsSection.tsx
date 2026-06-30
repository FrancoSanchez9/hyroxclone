import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { divisions } from "@/data/events";
import { Badge } from "@/components/ui/Badge";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.04 },
  }),
};

const divisionNotes: Record<string, string> = {
  Open: "Recomendado para quienes compiten por primera vez",
  Pro: "Para atletas con experiencia en funcional y running",
  Doubles: "Ambos atletas corren juntos y se turnan en las estaciones",
  "Pro Doubles": "Versión Pro del formato en pareja",
  Relay: "4 atletas × 2 km × 2 estaciones cada uno",
};

export function DivisionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-12 text-center"
        >
          <Badge variant="dark" className="mb-4 border border-[#2a2a2a]">
            Categorías
          </Badge>
          <h2
            className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Divisiones
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            HYROX ofrece categorías para todos los perfiles, desde principiantes hasta atletas de
            élite.
          </p>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="overflow-x-auto rounded-lg border border-[#2a2a2a]"
        >
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] bg-[#111111]">
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/60"
                >
                  División
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/60"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/60"
                >
                  Nota especial
                </th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((division, idx) => (
                <tr
                  key={division.name}
                  className={[
                    "border-b border-[#2a2a2a] transition-colors duration-150 hover:bg-white/[0.03]",
                    idx === divisions.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <th scope="row" className="px-5 py-4">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                      style={{ color: division.color }}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: division.color }}
                      />
                      {division.name}
                    </span>
                  </th>
                  <td className="px-5 py-4 text-white/70">{division.description}</td>
                  <td className="px-5 py-4 text-white/60 text-xs">
                    {divisionNotes[division.name] ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </m.div>
      </div>
    </section>
  );
}
