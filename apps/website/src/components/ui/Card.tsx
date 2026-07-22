import { cn } from "@/lib/utils";

type CardVariant = "default" | "highlight" | "glass";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  /** Ambient lime glow around the card (aurora design system). */
  glow?: boolean;
}

function Card({
  className,
  variant = "default",
  hover = false,
  glow = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg text-white",
        variant === "glass"
          ? "glass-panel"
          : "rl-surface-card border bg-rl-card2 border-white/15 texture-grain",
        variant === "highlight" && "border-t-2 border-t-white",
        glow && "glow-accent",
        hover &&
          "transition-[outline-color] duration-200 outline outline-1 outline-transparent hover:outline-white",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardContent, CardFooter };
