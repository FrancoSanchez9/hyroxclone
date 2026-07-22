import { Search, X } from "lucide-react";

export function FaqSearchHeader({
  query,
  onQueryChange,
  totalQuestions,
  topicCount,
  searchTerm,
  resultCount,
  filteredCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  totalQuestions: number;
  topicCount: number;
  searchTerm: string;
  resultCount: number;
  filteredCount: number;
}) {
  return (
    <header className="mb-9 sm:mb-12">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rl-accent sm:text-sm">
        runluv® México
      </p>
      <h1 className="max-w-4xl text-balance text-[clamp(3.25rem,9vw,7rem)] leading-[0.9] tracking-tight text-white uppercase">
        Resuelve tus <span className="text-rl-accent">dudas</span>
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-rl-text-secondary">
        Todo lo que necesitas saber antes de tu desafío runluv®.{" "}
        <span className="tabular-nums text-rl-text-muted">
          {totalQuestions} preguntas · {topicCount} temas
        </span>
      </p>
      <p className="mt-2 text-xs text-rl-text-muted">
        Última actualización: <time dateTime="2026-06-23">23 de junio de 2026</time>
      </p>

      <div className="mt-8 max-w-2xl">
        <label htmlFor="faq-search" className="sr-only">
          Buscar en preguntas frecuentes
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-rl-text-muted"
            aria-hidden="true"
          />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={`Buscar en ${totalQuestions} preguntas…`}
            className="min-h-13 w-full appearance-none border border-rl-border-strong bg-white/[0.045] py-3 pl-12 pr-14 text-base text-white placeholder:text-rl-text-muted transition-[border-color,background-color,box-shadow] duration-160 hover:border-white/40 focus:border-rl-accent focus:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-rl-accent/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-rl-text-muted transition-[color,transform] duration-160 hover:text-white active:scale-[0.96]"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
        <p className="mt-3 min-h-5 text-sm text-rl-text-muted" role="status" aria-live="polite">
          {searchTerm
            ? `${resultCount} ${resultCount === 1 ? "resultado" : "resultados"} en ${filteredCount} ${filteredCount === 1 ? "tema" : "temas"}`
            : "Busca por modalidad, horario, boleto, seguridad o cualquier palabra clave."}
        </p>
      </div>
    </header>
  );
}
