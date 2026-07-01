import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  label: string;
  rows: { station: string; value: string }[];
}

export function Accordion({ label, rows }: AccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left cursor-pointer"
      >
        <span className="text-base text-white font-medium">{label}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-white/50 transition-transform duration-200 shrink-0",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
            className="overflow-hidden"
          >
            <div className="pb-4 flex flex-col gap-0">
              {rows.map((r) => (
                <div
                  key={r.station}
                  className="flex items-center justify-between py-2 px-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="text-sm text-white/60 uppercase tracking-wide">{r.station}</span>
                  <span className="text-sm text-white tabular-nums font-medium">{r.value}</span>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
