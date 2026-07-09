import { Link } from "@tanstack/react-router";
import { m, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getNextEvent } from "@/data/events";
import { CountdownStrip } from "@/components/sections/CountdownStrip";
import { ACCENT } from "@/lib/theme";

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
      {/* Background — framer drives the scroll parallax on the wrapper; the CSS
          push-in (.hero-zoom) lives on the img so the two transforms never clash
          and the zoom still runs before JS hydrates. */}
      <m.div
        className="pointer-events-none absolute inset-x-0 -top-[15%] h-[115%] w-full"
        style={{ y: parallaxY }}
        aria-hidden="true"
      >
        <img
          src="/images/1461896836934-ffe607ba8211-1280.webp"
          width={1280}
          height={853}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="hero-zoom h-full w-full object-cover object-center opacity-45"
        />
      </m.div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85" />
      {/* Breathing lime energy */}
      <div
        className="hero-glow pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,255,0,0.08) 0%, transparent 70%)`,
        }}
      />
      {/* One-shot diagonal light streak (behind the text, over the image) */}
      <div
        aria-hidden="true"
        className="hero-sweep pointer-events-none absolute inset-y-0 left-0 z-[5] w-1/3"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(212,255,0,0.10) 42%, rgba(255,255,255,0.22) 50%, rgba(212,255,0,0.10) 58%, transparent 100%)",
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
        <p
          className="hero-rise mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/80"
          style={{ animationDelay: "0.05s" }}
        >
          Elige tu reto · Corre · Vuelve por más
        </p>

        <h1
          aria-label="Descubre de qué estás hecho — runluv®"
          className="uppercase leading-[0.92] tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {TITLE_LINES.map((line, i) => (
            <span key={line.text} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
              <span
                className="hero-line text-[clamp(3.2rem,11vw,9rem)]"
                style={{
                  animationDelay: `${(0.15 + i * 0.13).toFixed(2)}s`,
                  ...(line.accent
                    ? { color: ACCENT }
                    : line.outline
                      ? {
                          color: "transparent",
                          WebkitTextStroke: "2px rgba(255,255,255,0.85)",
                        }
                      : {}),
                }}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        {/* Accent bar wipes in under the headline */}
        <span
          aria-hidden="true"
          className="hero-underline mt-7 block h-[4px] w-28"
          style={{ background: ACCENT, boxShadow: "0 0 24px rgba(212,255,0,0.55)" }}
        />

        <div
          className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.75s" }}
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
        </div>
      </div>

      {/* Scroll cue — just above the countdown strip. Hidden on mobile where the
          strip stacks and would collide with it. */}
      <div
        aria-hidden="true"
        className="animate-scroll-cue pointer-events-none absolute bottom-32 left-1/2 z-10 hidden -translate-x-1/2 text-white/55 md:block"
      >
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <CountdownStrip event={event} />
      </div>
    </section>
  );
}
