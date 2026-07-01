import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { type RaceResult } from "@/data/results";
import { Flag } from "./Flag";
import { SplitCell } from "./SplitCell";

const STATION_LABELS = [
  "SkiErg",
  "Sled Push",
  "Sled Pull",
  "Burpee BJ",
  "Rowing",
  "Farmers",
  "Sandbag",
  "Wall Balls",
];
const SPLIT_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const RUN_KEYS = ["run1", "run2", "run3", "run4", "run5", "run6", "run7", "run8"] as const;

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

export function ResultRow({
  r,
  idx,
  splitStats,
  leaderSec,
  totalRange,
}: {
  r: RaceResult;
  idx: number;
  splitStats: SplitStat[];
  leaderSec: number;
  totalRange: { min: number; max: number };
}) {
  const totalSec = timeToSec(r.totalTime);
  const gap = formatGap(totalSec - leaderSec);
  const barW =
    totalRange.max > totalRange.min
      ? 100 - 55 * ((totalSec - totalRange.min) / (totalRange.max - totalRange.min))
      : 100;

  return (
    <m.tr
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, delay: idx * 0.025, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "group border-b transition-colors duration-100",
        r.rank <= 3 ? "border-white/10 hover:bg-white/5" : "border-white/5 hover:bg-white/3",
      )}
      style={
        r.rank === 1
          ? {
              borderLeft: "3px solid rgba(255,255,255,0.85)",
              background: "rgba(255,255,255,0.055)",
            }
          : r.rank === 2
            ? {
                borderLeft: "3px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.025)",
              }
            : r.rank === 3
              ? {
                  borderLeft: "3px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.012)",
                }
              : { borderLeft: "3px solid transparent" }
      }
    >
      {/* Rank */}
      <td className="px-3 py-3.5">
        {r.rank === 1 ? (
          <div className="inline-flex h-8 w-8 items-center justify-center bg-white text-xs font-bold text-black tabular-nums">
            1
          </div>
        ) : r.rank === 2 ? (
          <div
            className="inline-flex h-8 w-8 items-center justify-center text-xs font-bold text-white tabular-nums"
            style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
          >
            2
          </div>
        ) : r.rank === 3 ? (
          <div
            className="inline-flex h-8 w-8 items-center justify-center text-xs font-bold text-white/75 tabular-nums"
            style={{ border: "1.5px solid rgba(255,255,255,0.22)" }}
          >
            3
          </div>
        ) : (
          <span className="tabular-nums text-sm font-bold text-white/25 pl-2">{r.rank}</span>
        )}
      </td>

      {/* Athlete */}
      <td className="px-4 py-3.5 min-w-[155px]">
        <p
          className={cn("font-bold leading-tight", r.rank === 1 ? "text-white" : "text-white/88")}
          style={r.rank === 1 ? { fontSize: "0.9375rem" } : { fontSize: "0.8125rem" }}
        >
          {r.lastName}
          <span
            className={cn("font-normal ml-1", r.rank === 1 ? "text-white/75" : "text-white/55")}
          >
            {r.firstName}
          </span>
        </p>
        <p className="mt-0.5 text-[10px] tabular-nums text-white/22">#{r.bib}</p>
      </td>

      {/* Nationality */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Flag code={r.flagCode} />
          <span className="text-[11px] font-bold tracking-wide text-white/50">{r.nationality}</span>
        </div>
      </td>

      {/* Age */}
      <td className="px-4 py-3.5 text-[11px] tabular-nums text-white/30">{r.ageGroup}</td>

      {/* Splits */}
      {SPLIT_KEYS.map((key, i) => {
        const stat = splitStats[i];
        const t = timeToSec(r.splits[key as keyof typeof r.splits]);
        const alpha = stat.max > stat.min ? 1 - (t - stat.min) / (stat.max - stat.min) : 1;
        return (
          <td key={key} className="p-0.5 py-2">
            <SplitCell
              runTime={r.splits[RUN_KEYS[i] as keyof typeof r.splits]}
              stationTime={r.splits[key as keyof typeof r.splits]}
              stationLabel={STATION_LABELS[i]}
              alpha={alpha}
              isBest={stat.bestBib === r.bib}
            />
          </td>
        );
      })}

      {/* Gap */}
      <td className="px-4 py-3.5 text-right">
        <span className="tabular-nums text-xs font-semibold text-white/30">{gap}</span>
      </td>

      {/* Total + bar */}
      <td className="px-4 py-3.5 text-right">
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={cn("tabular-nums font-bold text-white")}
            style={
              r.rank === 1
                ? {
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.3rem",
                    letterSpacing: "0.05em",
                  }
                : { fontSize: "0.8125rem" }
            }
          >
            {r.totalTime}
          </span>
          <div
            className="h-px w-14 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full"
              style={{
                width: `${barW}%`,
                background: "#ffffff",
                opacity: r.rank === 1 ? 0.85 : 0.18 + 0.22 * (1 - (r.rank - 1) / 15),
              }}
            />
          </div>
        </div>
      </td>
    </m.tr>
  );
}
