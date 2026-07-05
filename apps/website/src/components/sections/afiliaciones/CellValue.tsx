import { Check, X } from "lucide-react";

export function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-white/80">{value}</span>;
  }
  return value ? (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
      <Check size={12} strokeWidth={1.5} className="text-white" aria-hidden="true" />
    </span>
  ) : (
    <span className="inline-flex h-5 w-5 items-center justify-center">
      <X size={12} strokeWidth={1.5} className="text-white/20" aria-hidden="true" />
    </span>
  );
}
