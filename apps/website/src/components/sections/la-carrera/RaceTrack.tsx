import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ACCENT } from "@/lib/theme";

// Bold graphic racetrack — concentric filled lanes (à la Urban Run Club) with a
// hand-drawn rough edge, in lime. A dark runner-comet loops the middle lane via
// <animateMotion> (off the main thread). Lanes are true concentric offsets.

const CX = 400;
const CY = 220;
const L = 170; // half-length of the straights

/** Stadium oval: two straights + two semicircle ends, at radius r. */
function stadium(r: number): string {
  return (
    `M ${CX - L},${CY - r} H ${CX + L} ` +
    `A ${r},${r} 0 0 1 ${CX + L},${CY + r} H ${CX - L} ` +
    `A ${r},${r} 0 0 1 ${CX - L},${CY - r} Z`
  );
}

/** A filled ring between two radii (even-odd so the center shows through). */
function ring(outer: number, inner: number): string {
  return `${stadium(outer)} ${stadium(inner)}`;
}

// Three lanes, outer → inner, brightening toward the center for depth.
const LANES = [
  { d: ring(184, 154), fill: "#a6cc00" },
  { d: ring(142, 112), fill: "#c8ee1a" },
  { d: ring(100, 70), fill: "#e6ff66" },
];

const RUNNER_PATH = stadium(127); // center line of the middle lane

// Comet trail — dark dots so the runner reads against the lime track.
const TRAIL = Array.from({ length: 6 }, (_, i) => ({
  r: 8 - i * 0.95,
  opacity: 0.85 - i * 0.13,
  begin: `${-i * 0.07}s`,
}));

// Compact checkered start/finish on the outer lane's top straight.
const CELL = 10;
const FLAG_X = 395;
const FLAG_TOP = CY - 184; // 36
const FLAG: { x: number; y: number }[] = [];
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 2; col++) {
    if ((row + col) % 2 === 0) FLAG.push({ x: FLAG_X + col * CELL, y: FLAG_TOP + row * CELL });
  }
}

export function RaceTrack({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 800 460"
        fill="none"
        aria-hidden="true"
        role="presentation"
        className="w-full"
      >
        <defs>
          {/* Hand-drawn rough edge */}
          <filter id="rt-rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.011"
              numOctaves="2"
              seed="7"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
          </filter>
          <radialGradient id="rt-runner">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.5" stopColor="#111" />
            <stop offset="1" stopColor="#111" stopOpacity="0" />
          </radialGradient>
          <filter id="rt-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft glow beneath the track */}
        <ellipse
          cx={CX}
          cy={CY + 30}
          rx="340"
          ry="150"
          fill={ACCENT}
          opacity="0.06"
          filter="url(#rt-glow)"
        />

        {/* Lanes with rough edge */}
        <g filter="url(#rt-rough)">
          {LANES.map((lane) => (
            <path key={lane.fill} d={lane.d} fill={lane.fill} fillRule="evenodd" />
          ))}
        </g>

        {/* White seams between lanes, subtle */}
        <path d={stadium(153)} stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <path d={stadium(111)} stroke="rgba(255,255,255,0.35)" strokeWidth="2" />

        {/* Checkered start / finish */}
        {FLAG.map((c) => (
          <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={CELL} height={CELL} fill="#0a0a0a" />
        ))}

        {/* Runner comet */}
        {TRAIL.map((dot, i) => (
          <circle
            key={i}
            r={dot.r}
            fill={i === 0 ? "url(#rt-runner)" : "#111"}
            opacity={dot.opacity}
            filter={i === 0 ? "url(#rt-glow)" : undefined}
            style={reduce ? { transform: `translate(${CX - L}px, ${CY - 127}px)` } : undefined}
          >
            {!reduce && (
              <animateMotion
                dur="6.5s"
                repeatCount="indefinite"
                path={RUNNER_PATH}
                begin={dot.begin}
                calcMode="linear"
              />
            )}
          </circle>
        ))}
      </svg>

      {/* Crisp HTML label in the hollow center */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className="text-[clamp(1.6rem,4vw,2.8rem)] leading-none tracking-wide text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          El circuito
        </span>
        <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-rl-accent sm:text-[10px]">
          Autódromo · Clase mundial
        </span>
      </div>
    </div>
  );
}
