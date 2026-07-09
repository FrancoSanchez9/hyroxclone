import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { ACCENT } from "@/lib/theme";

export function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "border-b border-white/10 last:border-0 transition-colors duration-200",
        open && "bg-white/[0.03]",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-5 px-2 py-6 text-left active:scale-[0.99] transition-transform"
      >
        <span
          className="w-10 shrink-0 tabular-nums text-3xl leading-none transition-colors duration-200"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: open ? ACCENT : "rgba(255,255,255,0.25)",
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="flex-1 text-xl leading-tight uppercase tracking-wide text-white md:text-2xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {q}
        </span>
        <span
          className={cn("shrink-0 transition-transform duration-200", open && "rotate-45")}
          style={{ color: open ? ACCENT : "rgba(255,255,255,0.4)" }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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
            <p className="max-w-2xl pb-6 pl-[4.25rem] pr-2 text-sm leading-relaxed text-white/60">
              {a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
