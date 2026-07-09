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
      <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">
          <span className="tabular-nums text-white/50">{filtered.length}</span> resultados · {race}{" "}
          · {division}
        </p>
        <p className="hidden text-[10px] text-white/50 md:block">Hover S1–S8 para ver splits</p>
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
                    <span className="hidden lg:block text-[8px] uppercase tracking-wide text-black/40 leading-tight whitespace-nowrap">
                      {s}
                    </span>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-widest text-black/40 w-16">
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
                <td colSpan={14} className="py-16 text-center text-sm text-white/25">
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
          <p className="py-16 text-center text-sm text-white/40">
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
        <div className="mt-8 flex items-center justify-between">
          <p className="text-[11px] tabular-nums text-white/50">
            Página {page} de {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Primera página"
              onClick={() => dispatch({ type: "SET_PAGE", value: 1 })}
              disabled={page === 1}
              className="cursor-pointer px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors active:scale-[0.96] transition-transform"
            >
              ««
            </button>
            <button
              type="button"
              aria-label="Página anterior"
              onClick={() => dispatch({ type: "SET_PAGE", value: Math.max(1, page - 1) })}
              disabled={page === 1}
              className="cursor-pointer px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors active:scale-[0.96] transition-transform"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              return (
                <button
                  key={p}
                  type="button"
                  aria-label={`Ir a página ${p}`}
                  onClick={() => dispatch({ type: "SET_PAGE", value: p })}
                  className={cn(
                    "cursor-pointer h-8 w-8 text-xs font-bold transition-[background-color,color,transform] duration-100 active:scale-[0.96]",
                    p === page ? "bg-white text-black" : "text-white/50 hover:text-white",
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
              className="cursor-pointer px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors active:scale-[0.96] transition-transform"
            >
              ›
            </button>
            <button
              type="button"
              aria-label="Última página"
              onClick={() => dispatch({ type: "SET_PAGE", value: totalPages })}
              disabled={page === totalPages}
              className="cursor-pointer px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors active:scale-[0.96] transition-transform"
            >
              »»
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
