import { cn } from "@/lib/utils";

export function QuizOption<T extends string>({
  id,
  label,
  selected,
  onSelect,
}: {
  id: T;
  label: string;
  selected: boolean;
  onSelect: (id: T) => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      className={cn(
        "cursor-pointer w-full rounded-none border px-5 py-3.5 text-left text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.96]",
        selected
          ? "border-[#ffffff] bg-[#ffffff]/10 text-[#ffffff]"
          : "border-[#2a2a2a] bg-[#1a1a1a] text-white/70 hover:border-[#3a3a3a] hover:text-white",
      )}
    >
      {label}
    </button>
  );
}
