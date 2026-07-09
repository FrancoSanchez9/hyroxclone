import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { type RaceResult } from "@/data/results";
import { Flag } from "./Flag";
import { ACCENT } from "@/lib/theme";

export function PodiumCard({
  r,
  stepH,
  isWinner,
}: {
  r: RaceResult;
  stepH: number;
  isWinner?: boolean;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: isWinner ? 24 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: isWinner ? 0 : 0.12,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn("flex flex-col items-center", isWinner ? "w-52 z-10" : "w-44")}
    >
      {/* Info card */}
      <div
        className={cn(
          "w-full flex flex-col items-center px-4 pt-5 pb-4 gap-1 border",
          isWinner ? "border-rl-accent/50 bg-rl-accent/10" : "border-white/10 bg-white/2",
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <Flag code={r.flagCode} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            {r.nationality}
          </span>
        </div>
        {isWinner ? (
          <p
            className="text-white text-center uppercase leading-none text-pretty"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.06em",
            }}
          >
            {r.firstName} {r.lastName}
          </p>
        ) : (
          <p className="text-sm font-bold text-white/90 text-center leading-tight text-pretty">
            {r.firstName} {r.lastName}
          </p>
        )}
        <p
          className={cn(
            "tabular-nums font-bold text-center mt-0.5",
            isWinner ? "text-white" : "text-white/70",
          )}
          style={
            isWinner
              ? {
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2rem",
                  letterSpacing: "0.05em",
                }
              : { fontSize: "1.1rem" }
          }
        >
          {r.totalTime}
        </p>
      </div>
      {/* Step */}
      <div
        className={cn("w-full flex items-center justify-center", !isWinner && "bg-white/12")}
        style={{ height: stepH, background: isWinner ? ACCENT : undefined }}
      >
        <span
          className={cn(isWinner ? "text-black" : "text-white/60")}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isWinner ? "5rem" : "3.5rem",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          {r.rank}
        </span>
      </div>
    </m.div>
  );
}
