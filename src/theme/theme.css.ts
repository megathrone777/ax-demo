import { createGlobalTheme, keyframes } from "@vanilla-extract/css";

import { animations, colors, easing, fonts } from "./variables";

const vars = createGlobalTheme(":root", {
  animations: Object.fromEntries(
    Object.entries(animations).map(([key, value]) => [
      key,
      keyframes(value as Parameters<typeof keyframes>[0]),
    ]),
  ),
  colors,
  easing,
  fonts,
});

export { vars };
