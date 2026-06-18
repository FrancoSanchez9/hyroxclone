import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, badge, children }: PageHeroProps) {
  return (
    <section
      style={{
        background: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255, 255, 255, 0.015) 40px,
            rgba(255, 255, 255, 0.015) 41px
          ),
          #0a0a0a
        `,
      }}
      className="relative w-full pt-32 pb-16 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {badge && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="inline-block mb-4 px-3 py-1 bg-yellow-400 text-black text-xs font-bold uppercase tracking-widest"
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: badge ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            lineHeight: 1,
          }}
          className="text-white"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: badge ? 0.3 : 0.15, ease: "easeOut" }}
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="mt-4 max-w-2xl text-lg text-white/70"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: badge ? 0.42 : 0.27, ease: "easeOut" }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
