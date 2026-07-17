import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/lib/useInViewOnce";

/** Fades + lifts its children into view once without loading a motion runtime. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, "0px 0px -90px");

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-280 ease-out-strong",
        inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${Math.min(delay, 0.12) * 1000}ms` }}
    >
      {children}
    </div>
  );
}
