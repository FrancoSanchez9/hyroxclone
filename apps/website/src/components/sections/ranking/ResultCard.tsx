import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { type RaceResult } from "@/data/results";
import { Flag } from "./Flag";
import { ACCENT } from "@/lib/theme";

// Mobile-only card view of a result row. The desktop <table> forces a 1020px
// horizontal scroll on phones; this lays the same data out vertically with every
// split visible (no hover/tooltip needed on touch).

const SPLIT_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const RUN_KEYS = ["run1", "run2", "run3", "run4", "run5", "run6", "run7", "run8"] as const;
const SHORT_LABELS = ["Ski", "Push", "Pull", "Burp", "Row", "Farm", "Sand", "Wall"];

type SplitKey = (typeof SPLIT_KEYS)[number];
type SplitStat = { key: SplitKey; min: number; max: number; bestBib: number };

function timeToSec(t: string): number {
  const p = t.split(":").map(Number);
  if (p.length === 3) return (p[0] ?? 0) * 3600 + (p[1] ?? 0) * 60 + (p[2] ?? 0);
  return (p[0] ?? 0) * 60 + (p[1] ?? 0);
}

function formatGap(diff: number): string {
  if (diff <= 0) return "—";
  const m = Math.floor(diff / 60);
  const s = diff % 60;
  return `+${m}:${String(s).padStart(2, "0")}`;
}

export function ResultCard({
  r,
  splitStats,
  leaderSec,
}: {
  r: RaceResult;
  splitStats: SplitStat[];
  leaderSec: number;
}) {
  const gap = formatGap(timeToSec(r.totalTime) - leaderSec);
  const isWinner = r.rank === 1;

  return (
    <m.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      className="border border-white/10 bg-white/[0.02] p-4"
      style={
        isWinner
          ? { borderLeft: `3px solid ${ACCENT}`, background: "rgba(255,255,255,0.05)" }
          : r.rank === 2
            ? { borderLeft: "3px solid rgba(255,255,255,0.4)" }
            : r.rank === 3
              ? { borderLeft: "3px solid rgba(255,255,255,0.18)" }
              : { borderLeft: "3px solid transparent" }
      }
    >
      {/* Header: rank + athlete + total */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold tabular-nums",
              isWinner ? "bg-white text-black" : "text-white",
            )}
            style={isWinner ? undefined : { border: "1.5px solid rgba(255,255,255,0.4)" }}
          >
            {r.rank}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-white">
              {r.lastName} <span className="font-normal text-white/60">{r.firstName}</span>
            </p>
            <p className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
              <Flag code={r.flagCode} />
              <span className="font-bold tracking-wide">{r.nationality}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{r.ageGroup}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums text-white/30">#{r.bib}</span>
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p
            className="tabular-nums font-bold text-white"
            style={
              isWinner
                ? {
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.4rem",
                    letterSpacing: "0.04em",
                  }
                : { fontSize: "0.95rem" }
            }
          >
            {r.totalTime}
          </p>
          <p className="mt-0.5 text-[11px] tabular-nums text-white/40">{gap}</p>
        </div>
      </div>

      {/* Splits — all 8 visible, 4×2 grid, heat-shaded */}
      <div className="mt-3 grid grid-cols-4 gap-1">
        {SPLIT_KEYS.map((key, i) => {
          const stat = splitStats[i];
          const t = timeToSec(r.splits[key as keyof typeof r.splits]);
          const alpha = stat.max > stat.min ? 1 - (t - stat.min) / (stat.max - stat.min) : 1;
          const isBest = stat.bestBib === r.bib;
          return (
            <div
              key={key}
              className="relative flex flex-col items-center gap-0.5 px-1 py-1.5"
              style={{ background: `rgba(255,255,255,${alpha * 0.14})` }}
            >
              {isBest && (
                <span
                  className="absolute right-0.5 top-0.5 text-[7px] font-bold leading-none text-white/70"
                  aria-hidden="true"
                >
                  ▲
                </span>
              )}
              <span className="text-[8px] font-bold uppercase tracking-wider text-white/35">
                {SHORT_LABELS[i]}
              </span>
              <span
                className="tabular-nums text-[11px] font-semibold text-white/85"
                aria-label={`${SHORT_LABELS[i]} estación`}
              >
                {r.splits[key as keyof typeof r.splits]}
              </span>
              <span className="tabular-nums text-[9px] text-white/35">
                {r.splits[RUN_KEYS[i] as keyof typeof r.splits]}
              </span>
            </div>
          );
        })}
      </div>
    </m.article>
  );
}
