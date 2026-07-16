import { ChevronDown } from "lucide-react";

function normalized(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f®]/g, "");
}

function getMatchExcerpt(answer: string, searchTerm: string) {
  if (!searchTerm) return null;

  const matchAt = normalized(answer).indexOf(searchTerm);
  if (matchAt < 0) return null;

  const start = Math.max(0, matchAt - 42);
  const end = Math.min(answer.length, matchAt + searchTerm.length + 92);
  const excerpt = answer.slice(start, end).trim();

  return `${start > 0 ? "…" : ""}${excerpt}${end < answer.length ? "…" : ""}`;
}

export function FaqAccordionItem({
  question,
  answer,
  index,
  searchTerm = "",
}: {
  question: string;
  answer: string;
  index: number;
  searchTerm?: string;
}) {
  const excerpt = getMatchExcerpt(answer, searchTerm);

  return (
    <details className="group border-b border-rl-border-subtle last:border-b-0 open:bg-white/[0.025]">
      <summary className="grid min-h-20 cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4 py-5 text-left transition-[color,background-color] duration-160 marker:hidden hover:bg-white/[0.025] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-focus sm:grid-cols-[3rem_1fr_auto] sm:px-2 [&::-webkit-details-marker]:hidden">
        <span
          className="hidden text-2xl leading-none tabular-nums text-rl-text-muted transition-[color] duration-160 group-open:text-rl-accent sm:block"
          aria-hidden="true"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="min-w-0">
          <span className="block text-pretty text-base font-semibold leading-snug text-white sm:text-lg">
            {question}
          </span>
          {excerpt && (
            <span className="mt-2 block text-pretty text-sm leading-relaxed text-rl-text-muted">
              <span className="font-semibold text-rl-accent">Coincidencia:</span> {excerpt}
            </span>
          )}
        </span>

        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center text-rl-text-muted transition-[color,transform] duration-160 group-open:rotate-180 group-open:text-rl-accent group-hover:text-white"
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </summary>

      <div className="pb-7 pr-2 sm:pl-16 sm:pr-8">
        <p className="max-w-3xl text-pretty text-base leading-7 text-rl-text-secondary">{answer}</p>
      </div>
    </details>
  );
}
