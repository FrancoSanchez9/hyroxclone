import { m } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.04 },
  }),
};

export function LaCarreraHeroSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-28 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.015) 40px,
            rgba(255,255,255,0.015) 41px
          )`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,249,58,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <m.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffffff]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          HYROX México
        </m.p>
        <m.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="max-w-4xl text-[clamp(3.5rem,11vw,8.5rem)] font-normal leading-none tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          LA CARRERA DE <span className="text-[#ffffff]">FITNESS</span>
        </m.h1>
        <m.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="max-w-lg text-base leading-relaxed text-white/60 sm:text-lg"
        >
          8 km corriendo + 8 estaciones funcionales. Sin descanso.
        </m.p>
        <m.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          <Link to="/eventos">
            <Button variant="primary" size="lg">
              Inscríbete ahora
            </Button>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
