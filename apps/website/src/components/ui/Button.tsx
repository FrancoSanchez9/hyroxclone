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
  primary: "bg-white text-black border-transparent hover:bg-white/90 font-semibold",
  outline: "bg-transparent text-[#ffffff] border border-[#ffffff] hover:bg-[#ffffff]/10",
  ghost: "bg-transparent text-white border-transparent hover:text-white/70 hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
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
        "ease-[cubic-bezier(0.23,1,0.32,1)]",
        "active:scale-[0.96]",
        "focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000]",
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
