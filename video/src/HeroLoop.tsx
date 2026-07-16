import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { BLACK, GRAIN_URL } from "./theme";

/**
 * Ambient, text-free background loop for the website hero. Seamless: the zoom
 * yoyos back to its start and the lime streak fades to 0 at both ends, so the
 * <video loop> never jumps. Text/CTAs are overlaid as HTML on the site, and the
 * site applies its own darkening gradient — so this stays fairly bright.
 */
export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const mid = durationInFrames / 2;

  // Yoyo Ken-Burns push (start === end for a seamless loop).
  const scale = interpolate(frame, [0, mid, durationInFrames], [1.06, 1.14, 1.06]);
  // Single lime light streak that begins and ends fully transparent.
  const sweepX = interpolate(frame, [mid - 60, mid + 60], [-40, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweepOp = interpolate(frame, [mid - 60, mid - 30, mid + 30, mid + 60], [0, 0.4, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK }}>
      <Img
        src={staticFile("runner-blocks.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          scale: String(scale),
        }}
      />
      {/* lime light streak */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(100deg, transparent 40%, rgba(212,255,0,0.10) 47%, rgba(255,255,255,0.22) 50%, rgba(212,255,0,0.10) 53%, transparent 60%)",
          translate: `${sweepX}% 0px`,
          opacity: sweepOp,
        }}
      />
      {/* subtle film grain */}
      <AbsoluteFill
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "180px 180px",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};

export const HERO_LOOP_DURATION = 180; // 6s @ 30fps, seamless
