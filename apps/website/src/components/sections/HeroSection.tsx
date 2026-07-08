import { Link } from "@tanstack/react-router";
import { m, useScroll, useTransform } from "framer-motion";
import { getNextEvent } from "@/data/events";
import { CountdownStrip } from "@/components/sections/CountdownStrip";
import { ACCENT, EASE } from "@/lib/theme";

const TITLE_LINES: { text: string; accent?: boolean; outline?: boolean }[] = [
  { text: "DESCUBRE" },
  { text: "DE QUÉ ESTÁS", accent: true },
  { text: "HECHO", outline: true },
];

export function HeroSection() {
  const event = getNextEvent();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 900], [0, 180]);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
      style={{ background: "#000" }}
      aria-label="Hero"
    >
      {/* Background image — slow zoom-out on load + scroll parallax */}
      <m.img
        src="/images/1461896836934-ffe607ba8211-1280.webp"
        width={1280}
        height={853}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute inset-x-0 -top-[15%] h-[115%] w-full object-cover object-center opacity-45"
        style={{ y: parallaxY }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 2.4, ease: EASE }}
      />

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,255,0,0.05) 0%, transparent 70%)`,
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
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-44 pt-32 text-center">
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/80"
        >
          Elige tu reto · Corre · Vuelve por más
        </m.p>

        <h1
          aria-label="Descubre de qué estás hecho — runluv®"
          className="uppercase leading-[0.92] tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {TITLE_LINES.map((line, i) => (
            <span key={line.text} aria-hidden="true" className="block overflow-hidden">
              <m.span
                className="block text-[clamp(3.2rem,11vw,9rem)]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.11 }}
                style={
                  line.accent
                    ? { color: ACCENT }
                    : line.outline
                      ? { color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.85)" }
                      : undefined
                }
              >
                {line.text}
              </m.span>
            </span>
          ))}
        </h1>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to={event.registrationUrl}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
          >
            Regístrate a {event.name}
          </Link>
          <Link
            to="/tu-nivel"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/40 transition-[border-color,background-color] duration-[160ms] hover:border-white hover:bg-white/8 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            ¿Cuál es tu reto?
          </Link>
        </m.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <CountdownStrip event={event} />
      </div>
    </section>
  );
}
