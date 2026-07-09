import { ChevronDown } from "lucide-react";

export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-white/15 bg-[#111] px-3 py-2.5 pr-8 text-sm text-white focus:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent transition-[border-color] duration-150"
        >
          {options.map((o) => (
            <option key={o} value={o} style={{ background: "#111" }}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50"
          aria-hidden="true"
        />
      </div>
    </label>
  );
}
