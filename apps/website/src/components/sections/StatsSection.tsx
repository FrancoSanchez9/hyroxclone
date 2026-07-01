import { useEffect, useRef } from "react";
import { m, useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animation";

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
  const motionValue = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = value.toLocaleString("en-US");
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toLocaleString("en-US");
        }
      },
    });
    return () => controls.stop();
  }, [inView, motionValue, value, prefersReducedMotion]);

  return (
    <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-wide text-[#ffffff]">
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function StatItem({ stat, index, total }: { stat: Stat; index: number; total: number }) {
  const isLast = index === total - 1;

  return (
    <m.div
      className={cn(
        "relative flex flex-col items-center justify-center px-6 py-10 text-center",
        "col-span-1",
        !isLast && "md:border-r md:border-white/10",
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.38,
        delay: index * 0.05,
        ease: EASE,
      }}
    >
      <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
      <p className="mt-3 max-w-[160px] text-sm font-medium uppercase tracking-widest text-white/60">
        {stat.label}
      </p>
    </m.div>
  );
}

export function StatsSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#0a0a0a",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <m.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <p className="mx-auto max-w-2xl text-xl font-medium italic leading-relaxed text-white/80 sm:text-2xl">
            &ldquo;Una carrera. Un estándar. Una comunidad.&rdquo;
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-[#ffffff]" />
        </m.div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 hidden h-px bg-white/10 md:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-px bg-white/10 md:block" />

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
