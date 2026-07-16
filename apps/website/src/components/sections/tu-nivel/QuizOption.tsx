import { cn } from "@/lib/utils";

export function QuizOption<T extends string>({
  id,
  letter,
  label,
  selected,
  onSelect,
}: {
  id: T;
  letter: string;
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
        "group flex w-full cursor-pointer items-stretch overflow-hidden border text-left transition-[border-color,background-color,transform] duration-(--motion-duration-fast) ease-out-strong active:scale-[0.96]",
        selected
          ? "border-rl-accent bg-rl-accent/10"
          : "border-rl-border-subtle bg-rl-surface-raised/30 hover:border-rl-border-strong hover:bg-rl-surface-raised/60",
      )}
    >
      <span
        className={cn(
          "flex w-14 shrink-0 items-center justify-center border-r text-3xl leading-none transition-colors duration-150 sm:w-16 sm:text-4xl",
          selected
            ? "border-rl-accent bg-rl-accent text-black"
            : "border-rl-border-subtle bg-rl-surface-raised/50 text-rl-text-muted group-hover:text-rl-text-secondary",
        )}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        aria-hidden="true"
      >
        {letter}
      </span>
      <span
        className={cn(
          "flex-1 px-5 py-4 text-base font-medium transition-colors duration-150 sm:py-5 sm:text-lg",
          selected
            ? "text-rl-text-primary"
            : "text-rl-text-secondary group-hover:text-rl-text-primary",
        )}
      >
        {label}
      </span>
    </button>
  );
}
