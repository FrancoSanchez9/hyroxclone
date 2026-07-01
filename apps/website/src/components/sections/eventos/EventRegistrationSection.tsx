import { m } from "framer-motion";
import { type HyroxEvent } from "@/data/events";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;

const DIVISION_CATEGORIES: Record<string, string[]> = {
  Open: ["Mujeres", "Hombres"],
  Pro: ["Mujeres", "Hombres"],
  Doubles: ["Femenino", "Masculino", "Mixto"],
  Relay: ["Femenino", "Masculino", "Mixto"],
};

interface EventRegistrationSectionProps {
  event: HyroxEvent;
  selectedDivision: string | null;
  selectedCategory: string | null;
  onSelectDivision: (division: string) => void;
  onSelectCategory: (category: string) => void;
}

export function EventRegistrationSection({
  event,
  selectedDivision,
  selectedCategory,
  onSelectDivision,
  onSelectCategory,
}: EventRegistrationSectionProps) {
  const availableCategories = selectedDivision ? (DIVISION_CATEGORIES[selectedDivision] ?? []) : [];

  return (
    <section aria-labelledby="reg-heading">
      <h2
        id="reg-heading"
        className="text-4xl leading-none tracking-wider text-white uppercase mb-8"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Registro
      </h2>

      {/* Step 1 */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
          Paso 1 — Elige tu división
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {event.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectDivision(cat)}
              className={cn(
                "cursor-pointer flex flex-col items-start gap-1 border p-4 text-left transition-[background-color,border-color,transform] duration-150 active:scale-[0.96]",
                selectedDivision === cat
                  ? "border-white bg-white/8 text-white"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
              )}
            >
              <span className="text-sm font-bold uppercase tracking-wide">{cat}</span>
              <span className="text-[10px] text-white/40">
                {cat === "Open" && "1 atleta · pesos std"}
                {cat === "Pro" && "1 atleta · pesos altos"}
                {cat === "Doubles" && "2 atletas"}
                {cat === "Relay" && "4 atletas"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 */}
      {selectedDivision && (
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mb-8"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
            Paso 2 — Elige tu categoría
          </p>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={cn(
                  "cursor-pointer border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-[background-color,border-color,transform] duration-150 active:scale-[0.96]",
                  selectedCategory === cat
                    ? "border-white bg-white text-black"
                    : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </m.div>
      )}

      {/* Pricing table */}
      {event.prices && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
            Precios
          </p>
          <div className="border border-white/10 divide-y divide-white/10">
            {event.prices.map((tier) => (
              <div
                key={tier.label}
                className={cn(
                  "flex items-center justify-between px-5 py-4",
                  tier.available ? "bg-white/4" : "opacity-45",
                )}
              >
                <div>
                  <p className="text-sm font-bold text-white">{tier.label}</p>
                  {tier.note && <p className="text-[11px] text-white/40 mt-0.5">{tier.note}</p>}
                </div>
                <div className="text-right">
                  <p
                    className="text-xl font-normal tabular-nums text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    ${tier.price.toLocaleString("es-MX")} {event.currency}
                  </p>
                  {tier.available && (
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 mt-0.5">
                      Disponible
                    </p>
                  )}
                  {!tier.available && (
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mt-0.5">
                      No disponible
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
