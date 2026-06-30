import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animation";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-24">
      <m.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <h2
          className="text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-wider text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          TU PRIMERA VUELTA COMIENZA AQUÍ
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/55">
          La temporada 2027 es solo el inicio. Elige tu desafío, entrena, compite y conviértete en
          parte de la comunidad runluv®.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/eventos">
            <Button variant="primary" size="lg">
              Ver eventos
            </Button>
          </Link>
          <Link to="/tu-nivel">
            <Button variant="outline" size="lg">
              Encuentra tu desafío
            </Button>
          </Link>
        </div>
      </m.div>
    </section>
  );
}
