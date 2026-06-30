import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left active:scale-[0.98] transition-transform"
      >
        <span className="text-sm font-semibold text-white sm:text-base">{q}</span>
        <span
          className={cn(
            "shrink-0 text-white/40 transition-transform duration-200",
            open && "rotate-45",
          )}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v12M2 8h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/60">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
