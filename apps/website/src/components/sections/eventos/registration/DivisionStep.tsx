import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT, EASE } from "@/lib/theme";
import {
  DIVISION_HINTS,
  gridStagger,
  cardItem,
} from "@/components/sections/eventos/registration/shared";

export function DivisionStep({
  categories,
  selectedDivision,
  shouldReduceMotion,
  onSelect,
}: {
  categories: string[];
  selectedDivision: string | null;
  shouldReduceMotion: boolean;
  onSelect: (division: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
        Paso 1 — Elige tu división
      </p>
      <m.div
        variants={gridStagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
      >
        {categories.map((cat) => {
          const selected = selectedDivision === cat;
          return (
            <m.button
              key={cat}
              type="button"
              variants={cardItem}
              onClick={() => onSelect(cat)}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.16, ease: EASE }}
              className={cn(
                "group relative flex cursor-pointer flex-col items-start gap-1 overflow-hidden border p-4 text-left transition-colors duration-200",
                selected
                  ? "border-rl-accent text-white"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
              )}
              style={selected ? { background: "rgba(212,255,0,0.08)" } : undefined}
            >
              <span
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 w-1 transition-opacity duration-200",
                  selected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                )}
                style={{ background: ACCENT }}
                aria-hidden="true"
              />
              <span className="text-sm font-bold uppercase tracking-wide">{cat}</span>
              <span className="text-[10px] text-white/50">{DIVISION_HINTS[cat]}</span>
              <ArrowRight
                size={14}
                className={cn(
                  "absolute right-3 top-3 transition-[opacity,transform] duration-200",
                  selected
                    ? "text-rl-accent opacity-100"
                    : "-translate-x-1 text-white/50 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                )}
                aria-hidden="true"
              />
            </m.button>
          );
        })}
      </m.div>
    </div>
  );
}
