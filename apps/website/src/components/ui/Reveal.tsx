import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/theme";

/** Fades + lifts its children into view once, on scroll. Respects reduced motion via MotionConfig. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.28,
        ease: EASE,
        delay: shouldReduceMotion ? 0 : Math.min(delay, 0.12),
      }}
    >
      {children}
    </m.div>
  );
}
