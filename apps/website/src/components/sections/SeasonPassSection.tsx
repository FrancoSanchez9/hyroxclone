import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { seasonPass, seasonCircuits } from "@/data/events";
import { ACCENT } from "@/lib/theme";

const perks = [
  "Inscripción a las 5 paradas de la temporada",
  "Ranking nacional acumulativo — tu marca suma pista tras pista",
  "Pasaporte runluv®: sella los 5 autódromos y entra al muro de honor",
];

const money = (n: number) => `$${n.toLocaleString("es-MX")}`;

export function SeasonPassSection() {
  const tier = seasonPass.prices?.[0];

  return (
    <section className="w-full" style={{ background: "#000" }}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              Pase de Temporada 2026
            </p>
            <h2
              className="text-[clamp(3rem,8vw,6rem)] font-normal uppercase leading-[0.9] tracking-wide text-white text-balance"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Una inscripción.
              <br />
              <span style={{ color: ACCENT }}>Los 5 autódromos.</span>
              <br />
              Un ranking.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 text-pretty">
              No corres una carrera: corres una temporada. Asegura tu lugar en los 5 autódromos del
              país y persigue tu marca en el ranking nacional acumulativo, de Puebla a la gran final
              en CDMX.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-rl-accent" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-white/75 sm:text-base">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-white/12 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex items-end gap-3">
              <span
                className="text-[clamp(3rem,7vw,4.5rem)] leading-none text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {tier ? money(tier.price) : "—"}
              </span>
              <span className="pb-2 text-sm font-bold uppercase tracking-widest text-white/50">
                {seasonPass.currency}
              </span>
            </div>
            {tier?.note && (
              <p
                className="mt-1 text-xs font-bold uppercase tracking-widest"
                style={{ color: ACCENT }}
              >
                {tier.note}
              </p>
            )}

            <ol className="mt-8 flex flex-col gap-3">
              {seasonCircuits.map((c, i) => (
                <li key={c.id} className="flex items-center gap-3 border-b border-white/8 pb-3">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center border border-white/20 text-[11px] font-bold tabular-nums text-white/60"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-white">{c.city}</span>
                  <span className="ml-auto hidden text-xs text-white/40 sm:block">{c.venue}</span>
                </li>
              ))}
            </ol>

            <Link
              to="/checkout"
              search={{ event: seasonPass.id, division: "", category: "", qty: 1 }}
              className="mt-8 inline-flex w-full items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] hover:brightness-95 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.2)" }}
            >
              Quiero el pase de temporada
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
