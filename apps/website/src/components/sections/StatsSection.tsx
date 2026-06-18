import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stat {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Eventos Globales por Temporada" },
  { value: 5000, suffix: "+", label: "Gimnasios Afiliados Worldwide" },
  { prefix: "+", value: 500, suffix: "K", label: "Atletas Registrados" },
  { value: 8, suffix: "", label: "Estaciones Funcionales" },
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

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: [0.23, 1, 0.32, 1],
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toLocaleString("en-US");
        }
      },
    });
    return () => controls.stop();
  }, [inView, motionValue, value]);

  return (
    <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-wide text-[#e5f93a]">
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function StatItem({ stat, index, total }: { stat: Stat; index: number; total: number }) {
  const isLast = index === total - 1;

  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center justify-center px-6 py-10 text-center",
        "col-span-1",
        !isLast && "md:border-r md:border-[#2a2a2a]",
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
      <p className="mt-3 max-w-[160px] text-sm font-medium uppercase tracking-widest text-[#888888]">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="mx-auto max-w-2xl text-xl font-medium italic leading-relaxed text-[#f5f5f5] sm:text-2xl">
            &ldquo;Una competencia diseñada para todos &mdash; desde principiantes hasta
            élite&rdquo;
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-[#e5f93a]" />
        </motion.div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 hidden h-px bg-[#2a2a2a] md:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-px bg-[#2a2a2a] md:block" />

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
