import { createFileRoute } from "@tanstack/react-router";
import { useReducer, useMemo } from "react";
import { m } from "framer-motion";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { resultsData, races, divisions, workouts } from "@/data/results";
import { SEASON_NAME } from "@/data/season";
import {
  RankingFilters,
  type FilterState,
  type FilterAction,
} from "@/components/sections/ranking/RankingFilters";
import { RankingPodium } from "@/components/sections/ranking/RankingPodium";
import { RankingTable, type SplitStat } from "@/components/sections/ranking/RankingTable";
import { ACCENT } from "@/lib/theme";

const SPLIT_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;

function timeToSec(t: string): number {
  const p = t.split(":").map(Number);
  if (p.length === 3) return (p[0] ?? 0) * 3600 + (p[1] ?? 0) * 60 + (p[2] ?? 0);
  return (p[0] ?? 0) * 60 + (p[1] ?? 0);
}

const initialState: FilterState = {
  race: races[0],
  division: divisions[0],
  workout: workouts[0],
  lastName: "",
  firstName: "",
  gender: "All",
  ageGroup: "All",
  nationality: "All",
  pageSize: 25,
  page: 1,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_RACE":
      return { ...state, race: action.value, page: 1 };
    case "SET_DIVISION":
      return { ...state, division: action.value, page: 1 };
    case "SET_WORKOUT":
      return { ...state, workout: action.value, page: 1 };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.value, page: 1 };
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.value, page: 1 };
    case "SET_GENDER":
      return { ...state, gender: action.value, page: 1 };
    case "SET_AGE_GROUP":
      return { ...state, ageGroup: action.value, page: 1 };
    case "SET_NATIONALITY":
      return { ...state, nationality: action.value, page: 1 };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.value, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.value };
    case "RESET":
      return {
        ...initialState,
        race: state.race,
        division: state.division,
        pageSize: state.pageSize,
      };
    default:
      return state;
  }
}

function RankingPage() {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const { race, division, gender, ageGroup, nationality, lastName, firstName, pageSize, page } =
    state;

  const filtered = useMemo(
    () =>
      resultsData.filter((r) => {
        if (gender !== "All" && r.gender !== gender) return false;
        if (ageGroup !== "All" && r.ageGroup !== ageGroup) return false;
        if (nationality !== "All" && r.nationality !== nationality) return false;
        if (lastName && !r.lastName.toLowerCase().startsWith(lastName.toLowerCase())) return false;
        if (firstName && !r.firstName.toLowerCase().startsWith(firstName.toLowerCase()))
          return false;
        return true;
      }),
    [gender, ageGroup, nationality, lastName, firstName],
  );

  const splitStats = useMemo((): SplitStat[] => {
    if (filtered.length === 0) {
      return SPLIT_KEYS.map((key) => ({ key, min: 0, max: 0, bestBib: -1 }));
    }
    return SPLIT_KEYS.map((key) => {
      let min = Infinity,
        max = -Infinity,
        bestBib = -1;
      for (const r of filtered) {
        const t = timeToSec(r.splits[key as keyof typeof r.splits]);
        if (t < min) {
          min = t;
          bestBib = r.bib;
        }
        if (t > max) max = t;
      }
      return { key, min, max, bestBib };
    });
  }, [filtered]);

  const leaderSec = useMemo(
    () => (filtered.length > 0 ? timeToSec(filtered[0].totalTime) : 0),
    [filtered],
  );

  const totalRange = useMemo(() => {
    if (filtered.length === 0) return { min: 0, max: 1 };
    const times = filtered.map((r) => timeToSec(r.totalTime));
    return { min: Math.min(...times), max: Math.max(...times) };
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const top3 = filtered.slice(0, Math.min(3, filtered.length));

  function resetFilters() {
    dispatch({ type: "RESET" });
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-12 pt-32 md:pt-40">
        <m.img
          src="/images/1461896836934-ffe607ba8211-1920.webp"
          width={1920}
          height={1280}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20 grayscale"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.23, 1, 0.32, 1] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
        <div
          aria-hidden="true"
          className="animate-blob pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,255,0,0.09), transparent 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            {SEASON_NAME}
          </m.span>
          <AnimatedTitle
            text="RESULTADOS OFICIALES"
            accent={["OFICIALES"]}
            className="text-[clamp(2.6rem,8vw,6rem)] text-white"
          />
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Consulta los rankings y resultados oficiales de runluv® por evento, modalidad y
            categoría.
          </m.p>
        </div>
      </section>

      <RankingFilters state={state} dispatch={dispatch} onReset={resetFilters} />

      <RankingPodium top3={top3} race={race} division={division} />

      <RankingTable
        filtered={filtered}
        paginated={paginated}
        splitStats={splitStats}
        leaderSec={leaderSec}
        totalRange={totalRange}
        page={page}
        totalPages={totalPages}
        race={race}
        division={division}
        dispatch={dispatch}
      />
    </div>
  );
}

export const Route = createFileRoute("/ranking")({
  component: RankingPage,
});
