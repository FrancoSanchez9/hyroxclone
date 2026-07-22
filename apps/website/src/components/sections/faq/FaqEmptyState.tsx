import { Link } from "@tanstack/react-router";

export function FaqEmptyState({
  query,
  onClearQuery,
}: {
  query: string;
  onClearQuery: () => void;
}) {
  return (
    <div className="border-y border-rl-border-subtle py-12 sm:py-16" role="status">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-rl-accent">
        Sin coincidencias
      </p>
      <h2 className="mt-3 max-w-2xl text-balance text-4xl leading-none text-white sm:text-5xl">
        No encontramos “{query}”
      </h2>
      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-rl-text-secondary">
        Prueba con una palabra más corta, revisa la ortografía o contacta a nuestro equipo.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onClearQuery}
          className="inline-flex min-h-12 items-center justify-center bg-rl-accent px-6 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 hover:brightness-95 active:scale-[0.96]"
        >
          Ver todas las preguntas
        </button>
        <Link
          to="/contacto"
          className="inline-flex min-h-12 items-center justify-center border border-rl-border-strong px-6 text-sm font-bold uppercase tracking-widest text-white transition-[border-color,color,transform] duration-160 hover:border-rl-accent hover:text-rl-accent active:scale-[0.96]"
        >
          Contactar al equipo
        </Link>
      </div>
    </div>
  );
}
