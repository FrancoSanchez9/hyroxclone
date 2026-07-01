import { cn } from "@/lib/utils";

type CardVariant = "default" | "highlight";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
}

function Card({ className, variant = "default", hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-[#1a1a1a] border-[#2a2a2a] text-white texture-grain",
        variant === "highlight" && "border-t-2 border-t-[#ffffff]",
        hover &&
          "transition-[outline-color] duration-200 outline outline-1 outline-transparent hover:outline-[#ffffff]",
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
