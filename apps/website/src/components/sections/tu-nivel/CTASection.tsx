import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { m, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animation";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-rl-dark py-24">
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
          Ya sé mi <span className="text-white">categoría</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">
          Elige tu evento, confirma tu división y reserva tu lugar antes de que se agoten.
        </p>
        <Link to="/eventos">
          <Button variant="primary" size="lg">
            Ver eventos disponibles
          </Button>
        </Link>
      </m.div>
    </section>
  );
}
