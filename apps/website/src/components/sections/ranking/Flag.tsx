import { cn } from "@/lib/utils";

/**
 * Country flag. Self-hosted SVGs live in `public/flags/<code>.svg` (ISO 3166-1
 * alpha-2, lowercase) — crisp at any size, no external CDN dependency.
 * Pass an accessible `label` (e.g. the nationality) when the flag conveys meaning
 * on its own; when it sits next to a visible country label, leave it decorative.
 */
export function Flag({
  code,
  label,
  className,
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  return (
    <img
      src={`/flags/${code}.svg`}
      width={20}
      height={15}
      alt={label ?? ""}
      aria-hidden={label ? undefined : "true"}
      loading="lazy"
      className={cn("inline-block h-[15px] w-5 shrink-0 object-cover", className)}
      style={{ outline: "1px solid color-mix(in srgb, var(--color-white) 10%, transparent)" }}
    />
  );
}
