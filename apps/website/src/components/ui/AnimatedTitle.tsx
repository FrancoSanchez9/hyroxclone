import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  /** Words rendered in the accent color (matched exactly, e.g. "RUNLUV®") */
  accent?: string[];
}

const word = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.07 },
  }),
};

/**
 * Section heading with a per-word mask reveal on scroll into view.
 * The observer lives on the h2 — the masked words are clipped at their
 * initial position, so observing them directly never fires.
 */
export function AnimatedTitle({ text, className, accent = [] }: AnimatedTitleProps) {
  const words = text.split(" ");
  return (
    <m.h2
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn("uppercase leading-none tracking-wide", className)}
      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em] align-bottom"
        >
          <m.span
            className="inline-block"
            variants={word}
            custom={i}
            style={accent.includes(w) ? { color: "#d4ff00" } : undefined}
          >
            {w}
          </m.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </m.h2>
  );
}
