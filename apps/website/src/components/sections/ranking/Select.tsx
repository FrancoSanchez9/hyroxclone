import { ChevronDown } from "lucide-react";

type SelectOption = string | { value: string; label: string };

export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-widest text-white/70">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-11 w-full appearance-none border border-white/20 bg-[#111] px-3 py-2.5 pr-10 text-sm text-white transition-[border-color] duration-150 focus:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent"
        >
          {options.map((option) => {
            const optionValue = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            return (
              <option key={optionValue} value={optionValue} style={{ background: "#111" }}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
          aria-hidden="true"
        />
      </div>
    </label>
  );
}
