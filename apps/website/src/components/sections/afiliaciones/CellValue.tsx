import { Check, Minus } from "lucide-react";

export function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-semibold text-white">{value}</span>;
  }

  return value ? (
    <span className="inline-flex h-7 w-7 items-center justify-center bg-rl-accent text-black">
      <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      <span className="sr-only">Incluido</span>
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center border border-rl-border-strong text-rl-text-muted">
      <Minus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      <span className="sr-only">No incluido</span>
    </span>
  );
}
