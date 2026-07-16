import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { BLACK, LIME, WHITE, EASE_OUT, GRAIN_URL } from "./theme";
import { DISPLAY, BODY } from "./fonts";
import { SEASON_NAME } from "../../packages/content/src/season";

/* ────────────────────────── helpers ────────────────────────── */

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Opacity that fades in at the start and out at the end of a scene. */
function useSceneFade(inFrames = 12, outFrames = 12) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opIn = interpolate(frame, [0, inFrames], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const opOut = interpolate(frame, [durationInFrames - outFrames, durationInFrames], [1, 0], clamp);
  return Math.min(opIn, opOut);
}

const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => (
  <AbsoluteFill
    style={{
      backgroundImage: GRAIN_URL,
      backgroundSize: "180px 180px",
      opacity,
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  />
);

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)",
      pointerEvents: "none",
    }}
  />
);

/* ────────────────────────── scene 1 · intro ────────────────────────── */

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const compact = width <= 1080;
  const fade = useSceneFade(8, 14);

  const mark = {
    scale: interpolate(frame, [4, 26], [1.14, 1], {
      ...clamp,
      easing: EASE_OUT,
    }),
    blur: interpolate(frame, [4, 26], [22, 0], { ...clamp, easing: EASE_OUT }),
    op: interpolate(frame, [4, 22], [0, 1], clamp),
  };
  // Two lime rails slide in from the sides and frame the wordmark.
  const railW = interpolate(frame, [10, 40], [0, compact ? 120 : 320], {
    ...clamp,
    easing: EASE_OUT,
  });
  const tag = interpolate(frame, [30, 48], [0, 1], clamp);
  const tagY = interpolate(frame, [30, 48], [14, 0], {
    ...clamp,
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, opacity: fade }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: compact ? 28 : 34,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: compact ? 20 : 40,
          }}
        >
          <div
            style={{
              height: 6,
              width: railW,
              backgroundColor: LIME,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: compact ? 164 : 210,
              lineHeight: 1,
              letterSpacing: "0.04em",
              color: WHITE,
              opacity: mark.op,
              scale: String(mark.scale),
              filter: `blur(${mark.blur}px)`,
              textShadow: "0 0 60px rgba(212,255,0,0.25)",
            }}
          >
            RUNLUV
            <span style={{ color: LIME }}>®</span>
          </div>
          <div
            style={{
              height: 6,
              width: railW,
              backgroundColor: LIME,
              borderRadius: 3,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 700,
            fontSize: compact ? 32 : 36,
            letterSpacing: compact ? "0.28em" : "0.42em",
            textTransform: "uppercase",
            color: LIME,
            opacity: tag,
            translate: `0px ${tagY}px`,
          }}
        >
          Resiste hasta el final
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

/* ────────────────────────── scene 2 · hero ────────────────────────── */

const HERO_LINES: { text: string; accent?: boolean; outline?: boolean }[] = [
  { text: "DESCUBRE" },
  { text: "DE QUÉ ESTÁS", accent: true },
  { text: "HECHO", outline: true },
];

const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();
  const compact = width <= 1080;
  const fade = useSceneFade(10, 14);

  // Ken Burns push-in on the backdrop.
  const imgScale = interpolate(frame, [0, durationInFrames], [1.14, 1.32], clamp);
  // One-shot light streak.
  const sweepX = interpolate(frame, [16, 64], [-40, 130], {
    ...clamp,
    easing: EASE_OUT,
  });
  const sweepOp = interpolate(frame, [16, 30, 64], [0, 0.5, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, opacity: fade }}>
      <AbsoluteFill>
        <Img
          src={staticFile("runner-blocks.webp")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.5,
            scale: String(imgScale),
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.86) 100%)",
        }}
      />
      {/* light streak */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(100deg, transparent 40%, rgba(212,255,0,0.10) 47%, rgba(255,255,255,0.24) 50%, rgba(212,255,0,0.10) 53%, transparent 60%)",
          translate: `${sweepX}% 0px`,
          opacity: sweepOp,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {HERO_LINES.map((line, i) => {
            const start = 8 + i * 9;
            const op = interpolate(frame, [start, start + 16], [0, 1], clamp);
            const ty = interpolate(frame, [start, start + 20], [90, 0], {
              ...clamp,
              easing: EASE_OUT,
            });
            const blur = interpolate(frame, [start, start + 20], [18, 0], {
              ...clamp,
              easing: EASE_OUT,
            });
            return (
              <div
                key={line.text}
                style={{
                  fontFamily: DISPLAY,
                  fontSize: compact ? 112 : 168,
                  lineHeight: 0.9,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  color: line.accent ? LIME : line.outline ? "transparent" : WHITE,
                  WebkitTextStroke: line.outline ? "3px rgba(255,255,255,0.9)" : undefined,
                  opacity: op,
                  translate: `0px ${ty}px`,
                  filter: `blur(${blur}px)`,
                }}
              >
                {line.text}
              </div>
            );
          })}
          <div
            style={{
              marginTop: 34,
              height: 6,
              width: interpolate(frame, [40, 60], [0, 220], {
                ...clamp,
                easing: EASE_OUT,
              }),
              backgroundColor: LIME,
              boxShadow: "0 0 30px rgba(212,255,0,0.6)",
            }}
          />
        </div>
      </AbsoluteFill>
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

/* ────────────────────────── scene 3 · tagline (lime) ────────────────────────── */

const TAGLINE = ["UNA CARRERA.", "UN ESTÁNDAR.", "UNA COMUNIDAD."];

const TaglineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const compact = width <= 1080;
  const fade = useSceneFade(10, 14);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LIME,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "40px 40px",
        opacity: fade,
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {TAGLINE.map((line, i) => {
          const start = 6 + i * 12;
          const op = interpolate(frame, [start, start + 12], [0, 1], clamp);
          const sc = interpolate(frame, [start, start + 18], [0.8, 1], {
            ...clamp,
            easing: EASE_OUT,
          });
          const ty = interpolate(frame, [start, start + 18], [40, 0], {
            ...clamp,
            easing: EASE_OUT,
          });
          return (
            <div
              key={line}
              style={{
                fontFamily: DISPLAY,
                fontSize: compact ? 108 : 150,
                lineHeight: 1.0,
                letterSpacing: "0.01em",
                color: BLACK,
                opacity: op,
                scale: String(sc),
                translate: `0px ${ty}px`,
              }}
            >
              {line}
            </div>
          );
        })}
      </AbsoluteFill>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};

/* ────────────────────────── scene 4 · modalities ────────────────────────── */

const MODALITIES = ["LA ÚLTIMA VUELTA", "CADA PASO CUENTA", "5K · 10K"];
const ITEM_FRAMES = 25;

const ModalityWord: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const compact = width <= 1080;
  const op = interpolate(frame, [0, 6, ITEM_FRAMES - 6, ITEM_FRAMES], [0, 1, 1, 0], clamp);
  const ty = interpolate(frame, [0, 8], [70, 0], {
    ...clamp,
    easing: EASE_OUT,
  });
  const blur = interpolate(frame, [0, 8], [16, 0], {
    ...clamp,
    easing: EASE_OUT,
  });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: compact ? 92 : 156,
          lineHeight: 0.95,
          letterSpacing: "0.01em",
          textAlign: "center",
          color: WHITE,
          opacity: op,
          translate: `0px ${ty}px`,
          filter: `blur(${blur}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const ModalitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  const compact = width <= 1080;
  const fade = useSceneFade(8, 12);
  const labelOp = interpolate(frame, [2, 14], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, opacity: fade }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,255,0,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: compact ? Math.max(150, height * 0.18) : 150,
          width: "100%",
          textAlign: "center",
          fontFamily: BODY,
          fontWeight: 700,
          fontSize: compact ? 32 : 36,
          letterSpacing: compact ? "0.28em" : "0.42em",
          textTransform: "uppercase",
          color: LIME,
          opacity: labelOp,
        }}
      >
        Elige tu reto
      </div>
      {MODALITIES.map((m, i) => (
        <Sequence key={m} from={i * ITEM_FRAMES} durationInFrames={ITEM_FRAMES}>
          <ModalityWord text={m} />
        </Sequence>
      ))}
      <Grain />
    </AbsoluteFill>
  );
};

/* ────────────────────────── scene 5 · CTA ────────────────────────── */

const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const compact = width <= 1080;
  const fade = useSceneFade(10, 10);

  const glow = interpolate(frame, [0, 30, 60], [0.25, 0.75, 0.4], clamp);
  const markScale = interpolate(frame, [4, 26], [1.1, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const markOp = interpolate(frame, [4, 22], [0, 1], clamp);
  const seasonOp = interpolate(frame, [0, 14], [0, 1], clamp);
  const ctaOp = interpolate(frame, [22, 36], [0, 1], clamp);
  const ctaY = interpolate(frame, [22, 36], [16, 0], {
    ...clamp,
    easing: EASE_OUT,
  });
  const citiesOp = interpolate(frame, [30, 44], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, opacity: fade }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, rgba(212,255,0,${glow * 0.18}) 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: compact ? 32 : 26,
        }}
      >
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 700,
            fontSize: compact ? 32 : 36,
            letterSpacing: compact ? "0.28em" : "0.42em",
            textTransform: "uppercase",
            color: LIME,
            opacity: seasonOp,
          }}
        >
          {SEASON_NAME}
        </div>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: compact ? 156 : 200,
            lineHeight: 1,
            letterSpacing: "0.04em",
            color: WHITE,
            opacity: markOp,
            scale: String(markScale),
            textShadow: "0 0 70px rgba(212,255,0,0.3)",
          }}
        >
          RUNLUV<span style={{ color: LIME }}>®</span>
        </div>
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 800,
            fontSize: compact ? 36 : 40,
            letterSpacing: "0.08em",
            textAlign: "center",
            color: WHITE,
            opacity: ctaOp,
            translate: `0px ${ctaY}px`,
          }}
        >
          REGÍSTRATE EN <span style={{ color: LIME }}>RUNLUV.MX</span>
        </div>
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 600,
            maxWidth: compact ? 900 : undefined,
            fontSize: compact ? 30 : 32,
            letterSpacing: compact ? "0.16em" : "0.3em",
            textTransform: "uppercase",
            textAlign: "center",
            color: "rgba(255,255,255,0.6)",
            opacity: citiesOp,
          }}
        >
          Puebla · Guadalajara · León · Monterrey · CDMX
        </div>
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

/* ────────────────────────── scene · stats ────────────────────────── */

const STATS = [
  { n: "5", label: "Ciudades" },
  { n: "3", label: "Modalidades" },
  { n: "1", label: "Gran Final" },
];

const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const compact = width <= 1080;
  const fade = useSceneFade(8, 12);

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, opacity: fade }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,255,0,0.08) 0%, transparent 70%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: compact ? 50 : 130,
        }}
      >
        {STATS.map((s, i) => {
          const start = 6 + i * 10;
          const op = interpolate(frame, [start, start + 12], [0, 1], clamp);
          const sc = interpolate(frame, [start, start + 16], [0.6, 1], {
            ...clamp,
            easing: EASE_OUT,
          });
          const ty = interpolate(frame, [start, start + 16], [50, 0], {
            ...clamp,
            easing: EASE_OUT,
          });
          return (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: op,
                scale: String(sc),
                translate: `0px ${ty}px`,
              }}
            >
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: compact ? 200 : 300,
                  lineHeight: 0.9,
                  color: LIME,
                  textShadow: "0 0 50px rgba(212,255,0,0.35)",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: BODY,
                  fontWeight: 700,
                  fontSize: compact ? 32 : 36,
                  letterSpacing: compact ? "0.12em" : "0.24em",
                  textTransform: "uppercase",
                  color: WHITE,
                  textAlign: "center",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

/* ────────────────────────── flash cut ────────────────────────── */

/** Brief lime flash to punch each scene transition. */
const FlashCut: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 2, 7], [0, 0.5, 0], clamp);
  return <AbsoluteFill style={{ backgroundColor: LIME, opacity: op }} />;
};

/* ────────────────────────── main ────────────────────────── */

export const PROMO_DURATION = 525; // 17.5s @ 30fps

export const RunluvPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BLACK }}>
      <Sequence durationInFrames={80}>
        <IntroScene />
      </Sequence>
      <Sequence from={78} durationInFrames={132}>
        <HeroScene />
      </Sequence>
      <Sequence from={210} durationInFrames={90}>
        <TaglineScene />
      </Sequence>
      <Sequence from={300} durationInFrames={90}>
        <StatsScene />
      </Sequence>
      <Sequence from={390} durationInFrames={75}>
        <ModalitiesScene />
      </Sequence>
      <Sequence from={465} durationInFrames={60}>
        <CtaScene />
      </Sequence>

      {/* lime flash on each cut */}
      {[76, 206, 296, 386, 461].map((f) => (
        <Sequence key={f} from={f} durationInFrames={8}>
          <FlashCut />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
