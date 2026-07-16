import type { ReactNode } from "react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  inverted?: boolean;
  children?: ReactNode;
}

function highlightRunluv(title: string, inverted: boolean) {
  const parts = title.split(/(RUNLUV)/i);
  if (parts.length === 1) return title;
  return parts.map((part) =>
    /^RUNLUV$/i.test(part) ? (
      <span
        key={part.toUpperCase()}
        style={{
          background: inverted ? "#000000" : "#ffffff",
          color: inverted ? "#ffffff" : "#000",
          padding: "0 10px",
          display: "inline-block",
        }}
      >
        {part.toUpperCase()}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * Shared page hero. The entrance is driven by CSS keyframes (`.hero-rise`) rather
 * than a Framer `initial/animate`, so the title ships visible in the SSR HTML and
 * animates at first paint — otherwise the content stays at `opacity: 0` until
 * hydration runs the JS animation, which reads as a broken/undesigned hero.
 */
export function PageHero({ title, subtitle, badge, inverted = false, children }: PageHeroProps) {
  const bg = inverted
    ? `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(0,0,0,0.018) 40px, rgba(0,0,0,0.018) 41px), #ffffff`
    : `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px), #0a0a0a`;

  return (
    <section style={{ background: bg }} className="relative w-full pt-32 pb-16 overflow-hidden">
      {/* Aurora atmosphere — dark heroes only; the inverted (white) variant keeps its clean field */}
      {!inverted && <AuroraBackground intensity="subtle" className="opacity-45" />}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {badge && (
          <span
            className="hero-rise mb-4 inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{
              animationDelay: "0s",
              background: inverted ? "#000000" : "#ffffff",
              color: inverted ? "#ffffff" : "#000000",
            }}
          >
            {badge}
          </span>
        )}

        <h1
          style={{
            animationDelay: badge ? "0.08s" : "0s",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            lineHeight: 1,
          }}
          className={
            inverted ? "hero-rise text-balance text-black" : "hero-rise text-balance text-white"
          }
        >
          {highlightRunluv(title, inverted)}
        </h1>

        {subtitle && (
          <p
            style={{ animationDelay: badge ? "0.18s" : "0.1s", fontFamily: "'Inter', sans-serif" }}
            className={
              inverted
                ? "hero-rise mt-4 max-w-2xl text-lg text-pretty text-black/60"
                : "hero-rise mt-4 max-w-2xl text-lg text-pretty text-white/70"
            }
          >
            {subtitle}
          </p>
        )}

        {children && (
          <div className="hero-rise mt-8" style={{ animationDelay: badge ? "0.28s" : "0.2s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
