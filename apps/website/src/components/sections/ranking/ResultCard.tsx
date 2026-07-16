import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type RaceResult } from "@/data/results";
import { Flag } from "./Flag";
import { ACCENT } from "@/lib/theme";

// Mobile-only card view. The desktop table is intentionally replaced with a
// concise summary; station splits stay available on demand in a native details.

const SPLIT_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const RUN_KEYS = ["run1", "run2", "run3", "run4", "run5", "run6", "run7", "run8"] as const;
const STATION_LABELS = [
  "SkiErg",
  "Empuje de trineo",
  "Arrastre de trineo",
  "Burpees",
  "Remo",
  "Farmer's carry",
  "Zancadas con saco",
  "Wall balls",
];

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
    <article
      className="border border-white/15 bg-white/[0.02] p-4"
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
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={cn(
              "inline-flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold tabular-nums",
              isWinner ? "bg-white text-black" : "text-white",
            )}
            style={isWinner ? undefined : { border: "1.5px solid rgba(255,255,255,0.4)" }}
            aria-label={`Posición ${r.rank}`}
          >
            {r.rank}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold leading-tight text-white">
              {r.lastName} <span className="font-normal text-white/70">{r.firstName}</span>
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/70">
              <Flag code={r.flagCode} />
              <span className="font-bold tracking-wide">{r.nationality}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{r.ageGroup}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">#{r.bib}</span>
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
                    fontSize: "1.5rem",
                    letterSpacing: "0.04em",
                  }
                : { fontSize: "1rem" }
            }
          >
            {r.totalTime}
          </p>
          <p className="mt-0.5 text-xs tabular-nums text-white/70">{gap}</p>
        </div>
      </div>

      <details className="group mt-4 border border-white/15 bg-black/20">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-white transition-[background-color] duration-150 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-sm font-bold">Detalle por estación</span>
            <span className="block text-xs text-white/70">8 estaciones y parciales de carrera</span>
          </span>
          <ChevronDown
            className="h-5 w-5 shrink-0 transition-transform duration-150 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2">
          {SPLIT_KEYS.map((key, i) => {
            const stat = splitStats[i];
            const t = timeToSec(r.splits[key as keyof typeof r.splits]);
            const alpha = stat.max > stat.min ? 1 - (t - stat.min) / (stat.max - stat.min) : 1;
            const isBest = stat.bestBib === r.bib;
            return (
              <div
                key={key}
                className="border-b border-white/10 p-3 last:border-b-0 sm:odd:border-r"
                style={{ background: `rgba(255,255,255,${alpha * 0.1})` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-white/80">
                    S{i + 1} · {STATION_LABELS[i]}
                  </span>
                  {isBest && (
                    <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-rl-accent">
                      Mejor
                    </span>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <p>
                    <span className="block text-xs text-white/70">Estación</span>
                    <span className="block text-sm font-semibold tabular-nums text-white">
                      {r.splits[key as keyof typeof r.splits]}
                    </span>
                  </p>
                  <p>
                    <span className="block text-xs text-white/70">Carrera</span>
                    <span className="block text-sm font-semibold tabular-nums text-white">
                      {r.splits[RUN_KEYS[i] as keyof typeof r.splits]}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </details>
    </article>
  );
}
