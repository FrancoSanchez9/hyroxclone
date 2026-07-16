import { cn } from "@/lib/utils";

type BadgeVariant = "yellow" | "dark" | "outline" | "accent" | "accent-outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  yellow: "bg-white text-black border-transparent",
  dark: "bg-[#1A1A1A] text-white border-transparent",
  outline: "bg-transparent text-current border-current",
  accent: "bg-rl-accent text-black border-transparent",
  "accent-outline": "bg-transparent text-rl-accent border-rl-accent/50",
};

export function Badge({ variant = "yellow", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
