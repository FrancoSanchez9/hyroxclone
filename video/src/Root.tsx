import "./index.css";
import { Composition } from "remotion";
import { RunluvPromo, PROMO_DURATION } from "./RunluvPromo";
import { HeroLoop, HERO_LOOP_DURATION } from "./HeroLoop";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 17.5s marketing promo — one timeline, adapted to each social format */}
      <Composition
        id="RunluvPromo"
        component={RunluvPromo}
        durationInFrames={PROMO_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RunluvPromoSquare"
        component={RunluvPromo}
        durationInFrames={PROMO_DURATION}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="RunluvPromoPortrait"
        component={RunluvPromo}
        durationInFrames={PROMO_DURATION}
        fps={30}
        width={1080}
        height={1920}
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
