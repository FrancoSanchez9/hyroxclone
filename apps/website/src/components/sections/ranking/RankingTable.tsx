import { type Dispatch } from "react";
import { type RaceResult } from "@/data/results";
import { cn } from "@/lib/utils";
import { ResultRow } from "./ResultRow";
import { ResultCard } from "./ResultCard";
import { type FilterAction } from "./RankingFilters";
import { ACCENT } from "@/lib/theme";

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
type SplitKey = (typeof SPLIT_KEYS)[number];
export type SplitStat = { key: SplitKey; min: number; max: number; bestBib: number };

interface RankingTableProps {
  filtered: RaceResult[];
  paginated: RaceResult[];
  splitStats: SplitStat[];
  leaderSec: number;
  totalRange: { min: number; max: number };
  page: number;
  totalPages: number;
  race: string;
  division: string;
  dispatch: Dispatch<FilterAction>;
}

export function RankingTable({
  filtered,
  paginated,
  splitStats,
  leaderSec,
  totalRange,
  page,
  totalPages,
  race,
  division,
  dispatch,
}: RankingTableProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/70">
          <span className="tabular-nums text-white">{filtered.length}</span> resultados · {race} ·{" "}
          {division}
        </p>
        <p className="hidden text-xs text-white/70 md:block">Hover S1–S8 para ver splits</p>
      </div>

      {/* Desktop: scrollable table */}
      <div
        className="hidden overflow-x-auto rounded-none md:block"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
      >
        <table className="w-full min-w-[1020px] border-collapse text-left">
          <thead>
            <tr style={{ background: ACCENT }}>
              <th className="px-3 py-3.5 text-[10px] font-bold uppercase tracking-widest text-black w-14">
                #
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-black">
                Athlete
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-black w-20">
                Nat.
              </th>
              <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-black w-16">
                Age
              </th>
              {STATION_LABELS.map((s, i) => (
                <th
                  key={s}
                  className="text-center w-[70px] py-2 px-0.5"
                  style={{ verticalAlign: "bottom" }}
                >
                  <div className="flex flex-col items-center gap-0.5 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                      S{i + 1}
                    </span>
                    <span className="hidden text-[10px] leading-tight tracking-wide whitespace-nowrap text-black/60 uppercase lg:block">
                      {s}
                    </span>
                  </div>
                </th>
              ))}
              <th className="w-16 px-4 py-3.5 text-right text-[10px] font-bold tracking-widest text-black/60 uppercase">
                Gap
              </th>
              <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-widest text-black w-24">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={14} className="py-16 text-center text-sm text-white/70">
                  No se encontraron resultados con los filtros actuales.
                </td>
              </tr>
            ) : (
              paginated.map((r, idx) => (
                <ResultRow
                  key={r.bib}
                  r={r}
                  idx={idx}
                  splitStats={splitStats}
                  leaderSec={leaderSec}
                  totalRange={totalRange}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile: card list (the table's 1020px width would force horizontal scroll) */}
      <div className="flex flex-col gap-2 md:hidden">
        {paginated.length === 0 ? (
          <p className="py-16 text-center text-sm text-white/70">
            No se encontraron resultados con los filtros actuales.
          </p>
        ) : (
          paginated.map((r) => (
            <ResultCard key={r.bib} r={r} splitStats={splitStats} leaderSec={leaderSec} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tabular-nums text-white/70">
            Página {page} de {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Primera página"
              onClick={() => dispatch({ type: "SET_PAGE", value: 1 })}
              disabled={page === 1}
              className="hidden h-11 w-11 cursor-pointer items-center justify-center text-xs font-bold text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex"
            >
              ««
            </button>
            <button
              type="button"
              aria-label="Página anterior"
              onClick={() => dispatch({ type: "SET_PAGE", value: Math.max(1, page - 1) })}
              disabled={page === 1}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-base font-bold text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 1, totalPages - 2));
              const p = start + i;
              return (
                <button
                  key={p}
                  type="button"
                  aria-label={`Ir a página ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => dispatch({ type: "SET_PAGE", value: p })}
                  className={cn(
                    "h-11 min-w-11 cursor-pointer px-2 text-xs font-bold transition-[background-color,color,transform] duration-150 active:scale-[0.96]",
                    p === page ? "bg-white text-black" : "text-white/70 hover:text-white",
                  )}
                >
                  {p}
                </button>
              );
            })}
            <button
              type="button"
              aria-label="Página siguiente"
              onClick={() => dispatch({ type: "SET_PAGE", value: Math.min(totalPages, page + 1) })}
              disabled={page === totalPages}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-base font-bold text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ›
            </button>
            <button
              type="button"
              aria-label="Última página"
              onClick={() => dispatch({ type: "SET_PAGE", value: totalPages })}
              disabled={page === totalPages}
              className="hidden h-11 w-11 cursor-pointer items-center justify-center text-xs font-bold text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex"
            >
              »»
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
