import { loadFont } from "@remotion/fonts";
import { staticFile, delayRender, continueRender } from "remotion";

/** Brand display + body faces, reused from the runluv® website (self-hosted woff2). */
export const DISPLAY = "BebasNeue";
export const BODY = "Inter";

const handle = delayRender("Loading brand fonts");
Promise.all([
  loadFont({
    family: DISPLAY,
    url: staticFile("BebasNeue.woff2"),
    weight: "400",
    format: "woff2",
  }),
  loadFont({
    family: BODY,
    url: staticFile("Inter.woff2"),
    weight: "400",
    format: "woff2",
  }),
])
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error("Font load failed", err);
    continueRender(handle);
  });
