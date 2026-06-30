import { useState } from "react";
import { m } from "framer-motion";

export function SplitCell({
  runTime,
  stationTime,
  stationLabel,
  alpha,
  isBest,
}: {
  runTime: string;
  stationTime: string;
  stationLabel: string;
  alpha: number;
  isBest: boolean;
}) {
  const [open, setOpen] = useState(false);
  const bgAlpha = alpha * 0.16;
  const textOpacity = 0.4 + alpha * 0.6;

  return (
    <div className="relative flex items-center justify-center">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="relative flex h-10 w-full items-center justify-center px-1 transition-[background-color] duration-100 hover:bg-white/8 cursor-default"
        style={{ background: `rgba(255,255,255,${bgAlpha})` }}
        aria-label={`${stationLabel}: ${stationTime}`}
      >
        {isBest && (
          <span
            className="absolute top-0.5 right-0.5 text-[7px] font-bold leading-none text-white/70"
            aria-hidden="true"
          >
            ▲
          </span>
        )}
        <span
          className="tabular-nums text-[11px] font-semibold"
          style={{ color: `rgba(255,255,255,${textOpacity})` }}
        >
          {stationTime}
        </span>
      </button>

      {open && (
        <m.div
          initial={{ opacity: 0, y: 5, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.12 }}
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 whitespace-nowrap border border-white/18 bg-[#1c1c1c] px-4 py-3 shadow-2xl shadow-black/70"
        >
          <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-white/35">
            {stationLabel}
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-8">
              <span className="text-[10px] uppercase tracking-wider text-white/35">Run</span>
              <span className="tabular-nums text-[12px] font-semibold text-white/80">
                {runTime}
              </span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-[10px] uppercase tracking-wider text-white/35">WO</span>
              <span className="tabular-nums text-[12px] font-bold text-white">{stationTime}</span>
            </div>
          </div>
          {isBest && (
            <div className="mt-2 flex items-center gap-1.5 border-t border-white/10 pt-2">
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/50">
                ▲ Best split
              </span>
            </div>
          )}
        </m.div>
      )}
    </div>
  );
}
