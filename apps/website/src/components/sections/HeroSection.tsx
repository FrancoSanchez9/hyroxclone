import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DURATION = 0.6;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stats = [
  { value: "100+", label: "Eventos globales" },
  { value: "5,000+", label: "Gimnasios afiliados" },
  { value: "500,000+", label: "Atletas" },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero"
    >
      <img
        src="https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1920&q=80&fit=crop&auto=format"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/65" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,249,58,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-32 pt-24 text-center">
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: DURATION, ease: EASE_OUT, delay: 0 }}
          className="max-w-5xl text-[clamp(3rem,10vw,8rem)] font-normal leading-none tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          THE WORLD SERIES OF <span className="text-[#e5f93a]">FITNESS RACING</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/">
            <Button variant="primary" size="lg">
              ¡Inscríbete Ahora!
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">
              ¿Qué es HYROX?
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="grid grid-cols-3 divide-x divide-white/10 bg-black/40 backdrop-blur-sm">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-4 py-5 sm:py-6"
            >
              <span
                className="text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-none text-[#e5f93a]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-white/50 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
