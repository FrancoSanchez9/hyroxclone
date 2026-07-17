import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then(({ default: features }) => features);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
