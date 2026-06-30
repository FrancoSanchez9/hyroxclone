import { m } from "framer-motion";
import type { ReactNode } from "react";

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

export function PageHero({ title, subtitle, badge, inverted = false, children }: PageHeroProps) {
  const bg = inverted
    ? `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(0,0,0,0.018) 40px, rgba(0,0,0,0.018) 41px), #ffffff`
    : `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px), #0a0a0a`;

  return (
    <section style={{ background: bg }} className="relative w-full pt-32 pb-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {badge && (
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="inline-block mb-4 px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{
              background: inverted ? "#000000" : "#ffffff",
              color: inverted ? "#ffffff" : "#000000",
            }}
          >
            {badge}
          </m.span>
        )}

        <m.h1
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: badge ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            lineHeight: 1,
          }}
          className={inverted ? "text-black text-balance" : "text-white text-balance"}
        >
          {highlightRunluv(title, inverted)}
        </m.h1>

        {subtitle && (
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: badge ? 0.25 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className={
              inverted
                ? "mt-4 max-w-2xl text-lg text-black/60 text-pretty"
                : "mt-4 max-w-2xl text-lg text-white/70 text-pretty"
            }
          >
            {subtitle}
          </m.p>
        )}

        {children && (
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: badge ? 0.35 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            {children}
          </m.div>
        )}
      </div>
    </section>
  );
}
