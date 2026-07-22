import { X } from "lucide-react";

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-widest text-white/70">{label}</span>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-11 w-full border border-white/20 bg-rl-card px-3 py-2.5 pr-12 text-sm text-white placeholder-white/60 transition-[border-color] duration-150 focus:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-rl-accent"
            aria-label={`Limpiar ${label.toLowerCase()}`}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </label>
  );
}
