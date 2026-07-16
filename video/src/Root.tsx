import "./index.css";
import { Composition } from "remotion";
import { RunluvPromo, PROMO_DURATION } from "./RunluvPromo";
import { HeroLoop, HERO_LOOP_DURATION } from "./HeroLoop";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 15s marketing promo */}
      <Composition
        id="RunluvPromo"
        component={RunluvPromo}
        durationInFrames={PROMO_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Ambient, text-free background loops for the website hero */}
      <Composition
        id="HeroLoopLandscape"
        component={HeroLoop}
        durationInFrames={HERO_LOOP_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroLoopPortrait"
        component={HeroLoop}
        durationInFrames={HERO_LOOP_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
