import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type HyroxEvent } from "@/data/events";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetMs - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

function formatEventDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00")
    .toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })
    .replace(".", "")
    .toUpperCase();
}

const pad = (n: number) => String(n).padStart(2, "0");

interface CountdownStripProps {
  event: HyroxEvent;
  /** In-page anchor (e.g. "#registro"). When set, the register block scrolls instead of routing. */
  registerHref?: string;
}

/** Full-width lime countdown strip that slides in from the left. */
export function CountdownStrip({ event, registerHref }: CountdownStripProps) {
  const { days, hours, minutes, seconds } = useCountdown(
    new Date(event.date + "T00:00:00").getTime(),
  );

  const cells = [
    { value: days, label: "días" },
    { value: hours, label: "hrs" },
    { value: minutes, label: "min" },
    { value: seconds, label: "seg" },
  ];

  const registerClass =
    "group flex items-center justify-center gap-2 bg-black px-10 py-4 text-sm font-bold uppercase tracking-widest transition-colors duration-[160ms] hover:bg-black/85 active:scale-[0.98] md:py-0";

  return (
    <div className="overflow-hidden">
      <m.div
        className="flex flex-col md:flex-row md:items-stretch"
        style={{ background: ACCENT }}
        initial={{ transform: "translateX(-100%)" }}
        whileInView={{ transform: "translateX(0%)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
      >
        {/* Next race label */}
        <div className="flex flex-col justify-center gap-0.5 px-6 py-4 md:py-6 md:pl-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/60">
            Próxima carrera
          </span>
          <span
            className="text-2xl leading-none text-black uppercase tracking-wide md:text-3xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {event.name} — {formatEventDate(event.date)}
          </span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-5 border-t border-black/15 px-6 py-4 md:ml-auto md:border-t-0 md:border-l md:px-10 md:py-6">
          {cells.map((cell) => (
            <div key={cell.label} className="flex items-baseline gap-1.5">
              <span
                className="tabular-nums text-[clamp(2.4rem,5vw,4rem)] leading-none text-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {pad(cell.value)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/55">
                {cell.label}
              </span>
            </div>
          ))}
        </div>

        {/* Register block — inverted within the strip */}
        {registerHref ? (
          <a href={registerHref} className={registerClass} style={{ color: ACCENT }}>
            Regístrate
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        ) : (
          <Link to={event.registrationUrl} className={registerClass} style={{ color: ACCENT }}>
            Regístrate
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </m.div>
    </div>
  );
}
