import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";
import { ACCENT } from "@/lib/theme";

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
    transition: { duration: 0.26, ease: EASE, delay: i * 0.035 },
  }),
};

/**
 * Section heading with a per-word mask reveal on scroll into view.
 * The observer lives on the h2 — the masked words are clipped at their
 * initial position, so observing them directly never fires.
 */
export function AnimatedTitle({ text, className, accent = [] }: AnimatedTitleProps) {
  const words = text.split(" ");
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.h2
      aria-label={text}
      initial={shouldReduceMotion ? "visible" : "hidden"}
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
            style={accent.includes(w) ? { color: ACCENT } : undefined}
          >
            {w}
          </m.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </m.h2>
  );
}
