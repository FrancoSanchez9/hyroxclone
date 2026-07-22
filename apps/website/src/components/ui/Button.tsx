import { cn } from "@/lib/utils";
import type { ComponentPropsWithRef, ElementType } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: ElementType;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-rl-text-primary text-rl-surface-canvas border-transparent hover:bg-rl-text-primary/90 font-semibold",
  outline: "bg-transparent text-white border border-white hover:bg-white/10",
  ghost: "bg-transparent text-white border-transparent hover:text-white/70 hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  as: Component = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-none font-medium tracking-wide",
        "select-none outline-none cursor-pointer",
        "transition-[transform,background-color,color,opacity] duration-[160ms]",
        "ease-out-strong",
        "active:scale-[0.96]",
        "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rl-surface-canvas",
        "disabled:pointer-events-none disabled:opacity-40",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
