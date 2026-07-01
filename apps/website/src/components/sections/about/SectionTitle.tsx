import { m } from "framer-motion";
import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center mb-16">
      <m.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="px-6 py-3 text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-none text-black uppercase"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          background: "#ffffff",
          display: "inline-block",
        }}
      >
        {children}
      </m.h2>
    </div>
  );
}
