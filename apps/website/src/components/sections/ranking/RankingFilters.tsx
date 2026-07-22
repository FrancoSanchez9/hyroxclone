import { type Dispatch, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { races, divisions, workouts, ageGroups, nationalities } from "@/data/results";
import { Select } from "./Select";
import { TextInput } from "./TextInput";

const PAGE_SIZES = [10, 25, 50, 100];

export interface FilterState {
  race: string;
  division: string;
  workout: string;
  lastName: string;
  firstName: string;
  gender: string;
  ageGroup: string;
  nationality: string;
  pageSize: number;
  page: number;
}

export type FilterAction =
  | { type: "SET_RACE"; value: string }
  | { type: "SET_DIVISION"; value: string }
  | { type: "SET_WORKOUT"; value: string }
  | { type: "SET_LAST_NAME"; value: string }
  | { type: "SET_FIRST_NAME"; value: string }
  | { type: "SET_GENDER"; value: string }
  | { type: "SET_AGE_GROUP"; value: string }
  | { type: "SET_NATIONALITY"; value: string }
  | { type: "SET_PAGE_SIZE"; value: number }
  | { type: "SET_PAGE"; value: number }
  | { type: "RESET" };

interface RankingFiltersProps {
  state: FilterState;
  dispatch: Dispatch<FilterAction>;
  onReset: () => void;
}

export function RankingFilters({ state, dispatch, onReset }: RankingFiltersProps) {
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const { race, division, workout, lastName, firstName, gender, ageGroup, nationality, pageSize } =
    state;

  const activeFilters: Array<{ key: string; label: string; action: FilterAction }> = [];

  if (workout !== workouts[0]) {
    activeFilters.push({
      key: "workout",
      label: `Desafío: ${workout}`,
      action: { type: "SET_WORKOUT", value: workouts[0] },
    });
  }
  if (gender !== "All") {
    activeFilters.push({
      key: "gender",
      label: `Género: ${gender === "Men" ? "Varonil" : "Femenil"}`,
      action: { type: "SET_GENDER", value: "All" },
    });
  }
  if (ageGroup !== "All") {
    activeFilters.push({
      key: "ageGroup",
      label: `Edad: ${ageGroup}`,
      action: { type: "SET_AGE_GROUP", value: "All" },
    });
  }
  if (nationality !== "All") {
    activeFilters.push({
      key: "nationality",
      label: `País: ${nationality}`,
      action: { type: "SET_NATIONALITY", value: "All" },
    });
  }
  if (lastName) {
    activeFilters.push({
      key: "lastName",
      label: `Apellido: ${lastName}`,
      action: { type: "SET_LAST_NAME", value: "" },
    });
  }
  if (firstName) {
    activeFilters.push({
      key: "firstName",
      label: `Nombre: ${firstName}`,
      action: { type: "SET_FIRST_NAME", value: "" },
    });
  }

  return (
    <section
      style={{
        background: "var(--color-rl-surface-subtle)",
        borderBottom: "1px solid color-mix(in srgb, var(--color-white) 7%, transparent)",
      }}
      className="px-4 py-6 sm:px-6 sm:py-7 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2
            className="text-[1.6rem] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Listas de resultados
          </h2>
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center px-2 text-xs font-bold uppercase tracking-widest text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Evento"
            value={race}
            options={races}
            onChange={(v) => dispatch({ type: "SET_RACE", value: v })}
          />
          <Select
            label="Modalidad"
            value={division}
            options={divisions}
            onChange={(v) => dispatch({ type: "SET_DIVISION", value: v })}
          />
        </div>

        <button
          type="button"
          aria-expanded={moreFiltersOpen}
          aria-controls="ranking-more-filters"
          onClick={() => setMoreFiltersOpen((open) => !open)}
          className="mt-3 flex min-h-11 w-full items-center justify-between border border-white/20 bg-white/[0.03] px-3 text-sm font-bold text-white transition-[background-color,border-color,transform] duration-150 hover:border-white/35 hover:bg-white/[0.06] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent md:hidden"
        >
          <span className="flex items-center gap-2">
            Más filtros
            {activeFilters.length > 0 && (
              <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-rl-text-primary px-1.5 text-xs tabular-nums text-rl-surface-canvas">
                {activeFilters.length}
              </span>
            )}
          </span>
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`transition-transform duration-150 ${moreFiltersOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          id="ranking-more-filters"
          className={`${moreFiltersOpen ? "grid" : "hidden"} mt-3 grid-cols-1 gap-3 sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid-cols-5`}
        >
          <Select
            label="Desafío"
            value={workout}
            options={workouts}
            onChange={(v) => dispatch({ type: "SET_WORKOUT", value: v })}
          />
          <Select
            label="Género"
            value={gender}
            options={[
              { value: "All", label: "Todos" },
              { value: "Men", label: "Varonil" },
              { value: "Women", label: "Femenil" },
            ]}
            onChange={(v) => dispatch({ type: "SET_GENDER", value: v })}
          />
          <Select
            label="Categoría de edad"
            value={ageGroup}
            options={ageGroups}
            onChange={(v) => dispatch({ type: "SET_AGE_GROUP", value: v })}
          />
          <Select
            label="Nacionalidad"
            value={nationality}
            options={nationalities}
            onChange={(v) => dispatch({ type: "SET_NATIONALITY", value: v })}
          />
          <TextInput
            label="Apellido"
            value={lastName}
            onChange={(v) => dispatch({ type: "SET_LAST_NAME", value: v })}
            placeholder="Buscar..."
          />
          <TextInput
            label="Nombre"
            value={firstName}
            onChange={(v) => dispatch({ type: "SET_FIRST_NAME", value: v })}
            placeholder="Buscar..."
          />
          <Select
            label="Resultados / página"
            value={String(pageSize)}
            options={PAGE_SIZES.map(String)}
            onChange={(v) => dispatch({ type: "SET_PAGE_SIZE", value: Number(v) })}
          />
        </div>

        <div className="mt-3 md:hidden">
          {activeFilters.length > 0 ? (
            <>
              <p className="mb-2 text-xs font-semibold text-white/70" aria-live="polite">
                {activeFilters.length}{" "}
                {activeFilters.length === 1 ? "filtro aplicado" : "filtros aplicados"}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => dispatch(filter.action)}
                    className="inline-flex min-h-10 max-w-full items-center gap-2 border border-white/25 bg-white/[0.05] px-3 text-left text-xs font-semibold text-white/80 transition-[background-color,border-color,transform] duration-150 hover:border-white/45 hover:bg-white/[0.08] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent"
                    aria-label={`Quitar filtro ${filter.label}`}
                  >
                    <span className="truncate">{filter.label}</span>
                    <X className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-white/70" aria-live="polite">
              Sin filtros adicionales
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
