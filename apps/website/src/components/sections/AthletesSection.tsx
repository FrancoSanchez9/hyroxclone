import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Flag } from "@/components/sections/ranking/Flag";
import { EASE, fadeUp } from "@/lib/animation";
import { ACCENT } from "@/lib/theme";

const athletes = [
  {
    name: "Hunter McIntyre",
    country: "USA",
    flagCode: "us",
    division: "Pro Men",
    bestTime: "55:23",
    imageUrl: "/images/1571019613454-1cb2f99b2d8b-400.webp",
  },
  {
    name: "Lauren Weeks",
    country: "USA",
    flagCode: "us",
    division: "Pro Women",
    bestTime: "1:04:17",
    imageUrl: "/images/1594381898411-846e7d193883-400.webp",
  },
  {
    name: "Tim Wenisch",
    country: "Germany",
    flagCode: "de",
    division: "Pro Men",
    bestTime: "54:08",
    imageUrl: "/images/1534438327276-14e5300c3a48-400.webp",
  },
  {
    name: "Linda Meier",
    country: "Germany",
    flagCode: "de",
    division: "Pro Women",
    bestTime: "1:02:45",
    imageUrl: "/images/1541534741688-6078c6bfb5c5-400.webp",
  },
];

function AthleteCard({ athlete, index }: { athlete: (typeof athletes)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative overflow-hidden"
      style={{ background: "var(--color-rl-surface-raised)" }}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={athlete.imageUrl}
          width={400}
          height={267}
          alt={athlete.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top grayscale transition-[transform,filter] duration-500 ease-out-strong group-hover:scale-105 group-hover:grayscale-0"
          style={{ outline: "1px solid color-mix(in srgb, var(--color-white) 10%, transparent)" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
        <div
          className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black"
          style={{ background: ACCENT }}
        >
          {athlete.division}
        </div>
      </div>

      <div className="p-5">
        <h3
          className="text-2xl font-normal leading-none tracking-wider text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {athlete.name}
        </h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-white/50">
          <Flag code={athlete.flagCode} />
          {athlete.country}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs uppercase tracking-widest text-white/50">Best Time</span>
          <span
            className="tabular-nums text-xl font-normal text-rl-accent"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {athlete.bestTime}
          </span>
        </div>
      </div>
    </m.div>
  );
}

export function AthletesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="w-full py-20 md:py-28"
      style={{ background: "var(--color-rl-surface-canvas)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rl-accent">
              Elite Athletes
            </p>
            <AnimatedTitle
              text="MEET THE PROS"
              accent={["PROS"]}
              className="text-6xl text-white sm:text-7xl md:text-8xl"
            />
          </div>
          <Link
            to="/athletes"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50 hover:text-rl-accent transition-colors duration-200 border-b border-transparent hover:border-rl-accent pb-0.5 shrink-0"
          >
            Meet All Athletes →
          </Link>
        </m.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {athletes.map((athlete, idx) => (
            <AthleteCard key={athlete.name} athlete={athlete} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
