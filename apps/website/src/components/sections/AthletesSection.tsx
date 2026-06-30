import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { EASE, fadeUp } from "@/lib/animation";

const athletes = [
  {
    name: "Hunter McIntyre",
    country: "USA 🇺🇸",
    division: "Pro Men",
    bestTime: "55:23",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&fit=crop&auto=format",
  },
  {
    name: "Lauren Weeks",
    country: "USA 🇺🇸",
    division: "Pro Women",
    bestTime: "1:04:17",
    imageUrl:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80&fit=crop&auto=format",
  },
  {
    name: "Tim Wenisch",
    country: "Germany 🇩🇪",
    division: "Pro Men",
    bestTime: "54:08",
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80&fit=crop&auto=format",
  },
  {
    name: "Linda Meier",
    country: "Germany 🇩🇪",
    division: "Pro Women",
    bestTime: "1:02:45",
    imageUrl:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80&fit=crop&auto=format",
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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      style={{ background: "#111" }}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={athlete.imageUrl}
          alt={athlete.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          style={{ outline: "1px solid rgba(255,255,255,0.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div
          className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black"
          style={{ background: "#ffffff" }}
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
        <p className="mt-1 text-sm text-white/50">{athlete.country}</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs uppercase tracking-widest text-white/50">Best Time</span>
          <span
            className="tabular-nums text-xl font-normal text-[#ffffff]"
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
    <section className="w-full py-20 md:py-28" style={{ background: "#000" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff]">
              Elite Athletes
            </p>
            <h2
              className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl md:text-8xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              MEET THE PROS
            </h2>
          </div>
          <Link
            to="/athletes"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50 hover:text-[#ffffff] transition-colors duration-200 border-b border-transparent hover:border-[#ffffff] pb-0.5 shrink-0"
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
