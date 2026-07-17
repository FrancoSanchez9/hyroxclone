import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ACCENT } from "@/lib/theme";
import { useInViewOnce } from "@/lib/useInViewOnce";

interface Stat {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 5, suffix: "", label: "Ciudades" },
  { value: 3, suffix: "", label: "Modalidades" },
  { value: 4, suffix: "", label: "Sedes clasificatorias" },
  { value: 1, suffix: "", label: "Gran Final" },
];

function AnimatedNumber({
  value,
  suffix,
  prefix,
}: {
  value: number;
  suffix: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref, "0px 0px -10%");

  useEffect(() => {
    const element = ref.current;
    if (!inView || !element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = value.toLocaleString("en-US");
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 900;
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = Math.round(value * eased).toLocaleString("en-US");
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span
      aria-label={`${prefix ?? ""}${value.toLocaleString("en-US")}${suffix}`}
      className="font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-wide text-black"
    >
      {prefix}
      <span ref={ref} aria-hidden="true">
        0
      </span>
      {suffix}
    </span>
  );
}

function StatItem({ stat, index, total }: { stat: Stat; index: number; total: number }) {
  const isLast = index === total - 1;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center px-6 py-10 text-center",
        "col-span-1",
        !isLast && "md:border-r md:border-black/15",
      )}
    >
      <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
      <p className="mt-3 max-w-[160px] text-sm font-medium uppercase tracking-widest text-black/60">
        {stat.label}
      </p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: ACCENT,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Drifting emerald shade keeps the flat lime field alive (compositor-only) */}
      <div
        aria-hidden="true"
        className="animate-blob-slow pointer-events-none absolute -top-1/2 left-1/4 h-[42rem] w-[42rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,120,60,0.22), transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mx-auto max-w-2xl text-xl font-medium italic leading-relaxed text-black/85 sm:text-2xl">
            &ldquo;Una carrera. Un estándar. Una comunidad.&rdquo;
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-black" />
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 hidden h-px bg-black/15 md:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-px bg-black/15 md:block" />

          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} total={stats.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
