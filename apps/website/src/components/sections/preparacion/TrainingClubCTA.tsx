import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { m, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animation";

export function TrainingClubCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full bg-[#0a0a0a] py-24"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)",
      }}
    >
      <m.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <Badge variant="yellow" className="mb-2" style={{ backgroundColor: "#ffffff" }}>
          Comunidad
        </Badge>
        <h2
          className="text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ENTRENA CON UN <span className="text-[#ffffff]">EXPERTO</span>
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-white/55">
          Encuentra un Training Club oficial o un Performance Coach certificado cerca de ti para
          prepararte con la metodología HYROX.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/gimnasios">
            <Button variant="primary" size="lg">
              Encuentra tu Training Club
            </Button>
          </Link>
          <Link to="/gimnasios">
            <Button variant="outline" size="lg">
              Buscar Performance Coach
            </Button>
          </Link>
        </div>
      </m.div>
    </section>
  );
}
