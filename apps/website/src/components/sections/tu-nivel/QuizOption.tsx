import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";

export function QuizOption<T extends string>({
  id,
  letter,
  label,
  selected,
  index,
  onSelect,
}: {
  id: T;
  letter: string;
  label: string;
  selected: boolean;
  index: number;
  onSelect: (id: T) => void;
}) {
  return (
    <m.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: EASE }}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      className={cn(
        "group flex w-full cursor-pointer items-stretch overflow-hidden border text-left transition-[border-color,background-color,transform] duration-150 active:scale-[0.98]",
        selected
          ? "border-[#d4ff00] bg-[#d4ff00]/10"
          : "border-white/12 bg-white/[0.03] hover:border-white/35 hover:bg-white/[0.06]",
      )}
    >
      <span
        className={cn(
          "flex w-14 shrink-0 items-center justify-center border-r text-3xl leading-none transition-colors duration-150 sm:w-16 sm:text-4xl",
          selected
            ? "border-[#d4ff00] bg-[#d4ff00] text-black"
            : "border-white/10 bg-white/5 text-white/50 group-hover:text-white/70",
        )}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        aria-hidden="true"
      >
        {letter}
      </span>
      <span
        className={cn(
          "flex-1 px-5 py-4 text-base font-medium transition-colors duration-150 sm:py-5 sm:text-lg",
          selected ? "text-white" : "text-white/70 group-hover:text-white",
        )}
      >
        {label}
      </span>
    </m.button>
  );
}
