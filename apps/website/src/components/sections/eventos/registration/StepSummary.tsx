import { m } from "framer-motion";
import { Check, Pencil } from "lucide-react";
import { ACCENT, EASE } from "@/lib/theme";

/** Compact summary of a completed step, click to re-open it. */
export function StepSummary({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <m.button
      layout
      type="button"
      onClick={onEdit}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.16, ease: EASE }}
      className="group flex w-full cursor-pointer items-center justify-between border border-white/10 bg-white/2 px-5 py-3.5 text-left transition-[border-color,transform] duration-(--motion-duration-fast) hover:border-rl-accent/40 active:scale-[0.96]"
    >
      <span className="flex items-center gap-3">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center"
          style={{ background: ACCENT }}
        >
          <Check size={14} strokeWidth={3} className="text-black" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          {label}
        </span>
        <span className="text-sm font-bold text-white">{value}</span>
      </span>
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-colors group-hover:text-rl-accent">
        <Pencil size={11} /> Cambiar
      </span>
    </m.button>
  );
}
