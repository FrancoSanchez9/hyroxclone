import { m } from "framer-motion";
import { Flag, Timer, Trophy } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { ACCENT, EASE } from "@/lib/theme";

const STEPS = [
  {
    Icon: Flag,
    step: "01",
    title: "Elige tu desafío",
    body: "Tres modalidades para distintas formas de correr: eliminación progresiva, máxima distancia en 4 horas, o carrera clásica de 5K / 10K.",
  },
  {
    Icon: Timer,
    step: "02",
    title: "Recorre el circuito",
    body: "Sales al asfalto de un autódromo de clase mundial. Cada recta y cada curva es tuya. Administra tu ritmo y resiste hasta el final.",
  },
  {
    Icon: Trophy,
    step: "03",
    title: "Recibe tu resultado",
    body: "Cronometraje oficial con chip y ranking de temporada. Cada llegada marca el inicio de tu siguiente desafío.",
  },
];

export function FormatSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)" }}
    >
      {/* Faded circuit backdrop */}
      <img
        src="/images/1476480862126-209bfaa8edc8-1600.webp"
        width={1600}
        height={1067}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.12] grayscale"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0d0d0d]" />
      <div
        aria-hidden="true"
        className="animate-blob-slow pointer-events-none absolute -right-48 top-20 h-[32rem] w-[32rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.06), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            El Formato
          </p>
          <AnimatedTitle
            text="ASÍ FUNCIONA"
            accent={["FUNCIONA"]}
            className="text-5xl text-white sm:text-6xl md:text-7xl"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            No hay estaciones ni obstáculos. Solo tú, el circuito y tu desafío. runluv® se corre en
            tres pasos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <m.div
              key={s.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="group relative flex flex-col gap-4 overflow-hidden border border-white/10 border-t-2 border-t-transparent bg-white/[0.03] p-7 transition-colors duration-200 hover:border-t-rl-accent"
            >
              <span
                className="pointer-events-none absolute -right-2 -top-4 select-none tabular-nums leading-none text-white/[0.05]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "8rem" }}
                aria-hidden="true"
              >
                {s.step}
              </span>
              <s.Icon size={28} style={{ color: ACCENT }} aria-hidden="true" />
              <h3
                className="text-2xl uppercase leading-none tracking-wide text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{s.body}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
