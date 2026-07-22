import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ACCENT } from "@/lib/theme";

export interface QuizLead {
  name: string;
}

const fieldCls =
  "h-14 w-full border bg-white/[0.03] px-4 text-base text-white placeholder-white/35 outline-none transition-colors duration-150 focus:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Lightweight gate before the result reveal: just the name to personalise the
 * result and the shareable story image ("unlock your ADN" pattern).
 */
export function QuizLeadForm({ onSubmit }: { onSubmit: (lead: QuizLead) => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const clean = name.trim();
    if (!clean) {
      setError(true);
      document.getElementById("ql-name")?.focus();
      return;
    }
    onSubmit({ name: clean });
  }

  return (
    <div className="mx-auto max-w-md">
      <p
        className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]"
        style={{ color: ACCENT }}
      >
        <span
          className="h-2 w-2 animate-pulse rounded-full"
          style={{ background: ACCENT }}
          aria-hidden="true"
        />
        Casi en la meta
      </p>
      <h2
        className="text-balance text-4xl leading-[0.95] tracking-wide text-white uppercase sm:text-5xl"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Desbloquea tu <span style={{ color: ACCENT }}>ADN runluv®</span>
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-white/60">
        Terminaste el recorrido. Dinos cómo quieres que te llamemos y revela tu resultado.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-2">
        <label
          htmlFor="ql-name"
          className="text-[11px] font-bold uppercase tracking-widest text-white/50"
        >
          ¿Cómo te gustaría que te llamen? <span style={{ color: ACCENT }}>*</span>
        </label>
        <input
          id="ql-name"
          type="text"
          autoComplete="name"
          maxLength={24}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(false);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "ql-name-err" : "ql-name-hint"}
          className={fieldCls}
          style={{
            borderColor: error
              ? "#f87171"
              : "color-mix(in srgb, var(--color-white) 15%, transparent)",
            outlineColor: ACCENT,
          }}
          placeholder="Tu nombre o apodo"
        />
        {error ? (
          <p id="ql-name-err" role="alert" className="text-xs text-red-400">
            Escribe cómo quieres que te llamemos.
          </p>
        ) : (
          <p id="ql-name-hint" className="text-[11px] leading-relaxed text-white/40">
            Este nombre aparecerá en tu resultado y en la imagen que compartas.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 inline-flex items-center justify-center gap-2 px-9 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.3)" }}
        >
          Ver mi resultado
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
