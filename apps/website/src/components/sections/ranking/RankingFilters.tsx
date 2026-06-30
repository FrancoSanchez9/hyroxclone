import { type Dispatch } from "react";
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
  const { race, division, workout, lastName, firstName, gender, ageGroup, nationality, pageSize } =
    state;

  return (
    <section
      style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      className="py-7 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="text-[1.6rem] leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Listas de resultados
          </h2>
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer text-[10px] font-bold uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors active:scale-[0.96] transition-transform"
          >
            Limpiar filtros
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <Select
            label="Evento"
            value={race}
            options={races}
            onChange={(v) => dispatch({ type: "SET_RACE", value: v })}
          />
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <Select
              label="Modalidad"
              value={division}
              options={divisions}
              onChange={(v) => dispatch({ type: "SET_DIVISION", value: v })}
            />
          </div>
          <Select
            label="Desafío"
            value={workout}
            options={workouts}
            onChange={(v) => dispatch({ type: "SET_WORKOUT", value: v })}
          />
          <Select
            label="Género"
            value={gender}
            options={["Todos", "Varonil", "Femenil"]}
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
      </div>
    </section>
  );
}
