import { cn } from "@/lib/utils";
import * as React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: React.ElementType;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#e5f93a] text-[#0a0a0a] border-transparent hover:bg-[#d4e82e] font-semibold",
  outline: "bg-transparent text-[#e5f93a] border border-[#e5f93a] hover:bg-[#e5f93a]/10",
  ghost: "bg-transparent text-white border-transparent hover:text-white/70 hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", as: Component = "button", children, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-none font-medium tracking-wide",
          "select-none outline-none cursor-pointer",
          "transition-[transform,background-color,color,opacity] duration-[160ms]",
          "ease-[cubic-bezier(0.23,1,0.32,1)]",
          "active:scale-[0.97]",
          "@media(hover:hover){hover:scale-[1.02]}",
          "focus-visible:ring-2 focus-visible:ring-[#e5f93a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
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
  },
);

Button.displayName = "Button";
