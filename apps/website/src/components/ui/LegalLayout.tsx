import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";

export interface LegalSection {
  heading: string;
  content: ReactNode;
}

interface LegalLayoutProps {
  badge?: string;
  title: string;
  subtitle?: string;
  lastUpdated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}

export function LegalLayout({
  badge = "LEGAL",
  title,
  subtitle,
  lastUpdated,
  intro,
  sections,
}: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero badge={badge} title={title} subtitle={subtitle} />

      <section className="px-6 py-16 border-t border-[#2a2a2a]">
        <div className="mx-auto max-w-3xl">
          <p className="mb-12 text-xs uppercase tracking-widest text-white/40">
            Última actualización: {lastUpdated}
          </p>

          {intro && (
            <div className="mb-12 space-y-4 text-[15px] leading-relaxed text-white/70">{intro}</div>
          )}

          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
              >
                <h2
                  className="mb-4 flex items-baseline gap-3 text-white"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.75rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span className="text-[#e5f93a]">{String(i + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-white/70 [&_a]:text-[#e5f93a] [&_a]:underline [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:marker:text-[#e5f93a]">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
