import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/theme";

export function CategoryStep({
  categories,
  selectedCategory,
  shouldReduceMotion,
  onSelect,
}: {
  categories: string[];
  selectedCategory: string | null;
  shouldReduceMotion: boolean;
  onSelect: (category: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
        Paso 2 — Elige tu categoría
      </p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <m.button
            key={cat}
            type="button"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : i * 0.03,
              duration: 0.18,
              ease: EASE,
            }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => onSelect(cat)}
            className={cn(
              "cursor-pointer border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-150",
              selectedCategory === cat
                ? "border-rl-accent bg-rl-accent text-black"
                : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
            )}
          >
            {cat}
          </m.button>
        ))}
      </div>
    </div>
  );
}
