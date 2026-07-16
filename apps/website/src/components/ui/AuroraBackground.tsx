import { cn } from "@/lib/utils";

type Intensity = "strong" | "subtle";

/**
 * Aurora backdrop — three blurred color fields (lime → emerald → cyan) drifting
 * on independent orbits. Pure CSS animation (SSR-safe, compositor-only), so it
 * runs at first paint and collapses under prefers-reduced-motion via the global
 * rule. The parent section must be `relative overflow-hidden`.
 */
export function AuroraBackground({
  intensity = "subtle",
  className,
}: {
  intensity?: Intensity;
  className?: string;
}) {
  const strong = intensity === "strong";
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ opacity: strong ? 1 : 0.55 }}
    >
      <div className="aurora-blob aurora-a -top-[20%] -left-[10%] h-[55vmax] w-[55vmax]" />
      <div className="aurora-blob aurora-b top-[30%] -right-[15%] h-[45vmax] w-[45vmax]" />
      <div className="aurora-blob aurora-c -bottom-[25%] left-[20%] h-[50vmax] w-[50vmax]" />
    </div>
  );
}
