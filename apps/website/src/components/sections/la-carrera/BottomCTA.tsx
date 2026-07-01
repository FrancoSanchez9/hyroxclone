import { useRef } from "react";
import { m, useInView } from "framer-motion";
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

export function BottomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-[#0a0a0a] py-24">
      <m.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <h2
          className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Encuentra tu <span className="text-[#ffffff]">Carrera</span>
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-white/55">
          Próximas fechas en México. Elige tu ciudad, elige tu categoría, regístrate.
        </p>
        <Link to="/eventos">
          <Button variant="primary" size="lg">
            Ver todos los eventos
          </Button>
        </Link>
      </m.div>
    </section>
  );
}
