import { useRef } from "react";
import { cn } from "@/lib/utils";
import { ACCENT } from "@/lib/theme";
import { useInViewOnce } from "@/lib/useInViewOnce";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  /** Words rendered in the accent color (matched exactly, e.g. "RUNLUV®") */
  accent?: string[];
}

/**
 * Section heading with a per-word mask reveal on scroll into view.
 * The observer lives on the h2 — the masked words are clipped at their
 * initial position, so observing them directly never fires.
 */
export function AnimatedTitle({ text, className, accent = [] }: AnimatedTitleProps) {
  const words = text.split(" ");
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInViewOnce(ref, "0px 0px -60px");

  return (
    <h2
      ref={ref}
      aria-label={text}
      className={cn("uppercase leading-none tracking-wide", className)}
      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em] align-bottom"
        >
          <span
            className={cn(
              "inline-block transition-transform duration-260 ease-out-strong",
              inView ? "translate-y-0" : "translate-y-[110%]",
            )}
            style={{
              transitionDelay: `${i * 35}ms`,
              ...(accent.includes(w) ? { color: ACCENT } : {}),
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}
