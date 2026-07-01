import { m } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DURATION = 0.5;

const fadeUp = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stats = [
  { value: "5", label: "Ciudades" },
  { value: "3", label: "Modalidades" },
  { value: "2027", label: "Primera temporada" },
  { value: "100%", label: "Para todos" },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      style={{ background: "#000" }}
      aria-label="Hero"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80&fit=crop&auto=format"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      {/* Radial white highlight at top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.07,
          mixBlendMode: "overlay",
        }}
      />
      {/* Horizontal scan lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, #000)" }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-36 pt-32 text-center">
        <m.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.35, ease: EASE_OUT, delay: 0 }}
          className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff]"
        >
          LA EXPERIENCIA RUNLUV®
        </m.p>

        <m.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.08 }}
          className="max-w-5xl text-[clamp(2.8rem,9vw,7rem)] font-normal leading-none tracking-tight text-white uppercase text-balance"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          LA EXPERIENCIA RUNLUV® <span style={{ color: "#ffffff" }}>PARA TODOS</span>
        </m.h1>

        <m.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/eventos"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] glow-white-sm focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            FIND A RACE
          </a>
          <a
            href="/la-carrera"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-white border border-white/40 hover:border-white hover:bg-white/8 transition-[border-color,background-color] duration-[160ms] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            ¿QUÉ ES RUNLUV?
          </a>
        </m.div>
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #ffffff 50%, transparent)" }}
        />
        <div
          className="grid grid-cols-4 divide-x divide-white/10"
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-4 py-5 sm:py-6"
            >
              <span
                className="text-[clamp(1.4rem,3vw,2.1rem)] font-normal leading-none text-[#ffffff]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="tabular-nums">{stat.value}</span>
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-white/60 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
