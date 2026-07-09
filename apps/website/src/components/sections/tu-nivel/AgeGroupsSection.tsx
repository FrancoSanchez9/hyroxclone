import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animation";

const AGE_BRACKETS = [
  "16-24",
  "25-29",
  "30-34",
  "35-39",
  "40-44",
  "45-49",
  "50-54",
  "55-59",
  "60-64",
  "65-69",
  "70-74",
  "75-79",
  "80-84",
  "85-89",
];

const PRO_MAX_AGE_GROUP = "55-59";

export function AgeGroupsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const proIndex = AGE_BRACKETS.indexOf(PRO_MAX_AGE_GROUP);

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-10 text-center"
        >
          <Badge variant="dark" className="mb-4 border border-[#2a2a2a]">
            Edades
          </Badge>
          <h2
            className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            GRUPOS DE EDAD
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50">
            HYROX distribuye a los competidores por grupos de edad dentro de cada división.
          </p>
        </m.div>

        {/* Mobile: one compact card per age group (avoids the wide table's scroll) */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="grid gap-2 md:hidden"
        >
          {AGE_BRACKETS.map((bracket, idx) => {
            const isProAvailable = idx <= proIndex;
            const isRelayBracket = idx === 0 || idx === 8;
            return (
              <div
                key={bracket}
                className="flex items-center justify-between gap-3 border border-[#2a2a2a] bg-[#111111] px-4 py-3"
              >
                <span
                  className="uppercase tracking-widest text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem" }}
                >
                  {bracket}
                </span>
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80">
                    Open
                  </span>
                  {isProAvailable && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80">
                      Pro
                    </span>
                  )}
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/80">
                    Doubles
                  </span>
                  {isRelayBracket && (
                    <span className="rounded-full bg-[#d4ff00]/15 px-2 py-0.5 text-[11px] font-semibold text-[#d4ff00]">
                      Relay {idx === 0 ? "U40" : "40+"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </m.div>

        {/* Desktop: full matrix table */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="hidden overflow-x-auto rounded-none border border-[#2a2a2a] md:block"
        >
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-white">
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-black"
                >
                  Grupo de edad
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black"
                >
                  Open
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black"
                >
                  Pro
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black"
                >
                  Doubles
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-black"
                >
                  Relay
                </th>
              </tr>
            </thead>
            <tbody>
              {AGE_BRACKETS.map((bracket, idx) => {
                const isProAvailable = idx <= proIndex;
                const isRelayBracket = idx === 0 || idx === 8;
                return (
                  <tr
                    key={bracket}
                    className={cn(
                      "border-b border-[#2a2a2a] transition-colors duration-100 hover:bg-white/[0.03]",
                      idx === AGE_BRACKETS.length - 1 && "border-b-0",
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className="font-bold text-white uppercase tracking-widest"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}
                      >
                        {bracket}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <Check className="h-4 w-4 text-[#ffffff] mx-auto" aria-hidden="true" />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {isProAvailable ? (
                        <Check className="h-4 w-4 text-white/70 mx-auto" aria-hidden="true" />
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="text-xs text-white/50">Promedio</span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {isRelayBracket ? (
                        <span className="text-xs font-semibold text-white/70">
                          {idx === 0 ? "Under 40" : "40+"}
                        </span>
                      ) : (
                        <span className="text-white/20 text-xs">ver nota</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          className="mt-6 space-y-2"
        >
          <p className="text-xs leading-relaxed text-white/60">
            * Las divisiones Pro solo están disponibles hasta el grupo de edad 55-59.
          </p>
          <p className="text-xs leading-relaxed text-white/60">
            * En Doubles se usa el promedio de edad de ambos atletas para asignar el grupo.
          </p>
          <p className="text-xs leading-relaxed text-white/60">
            * En Relay existen dos categorías: Under 40 (todos los miembros menores de 40 años) y
            40+ (al menos un miembro de 40 años o más).
          </p>
        </m.div>
      </div>
    </section>
  );
}
