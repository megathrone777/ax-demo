import { keyframes } from "@vanilla-extract/css";

import { cssVariant } from "@/theme";

const spin = keyframes({
  from: {
    transform: "translateY(-50%) rotate(0deg)",
  },

  to: {
    transform: "translateY(-50%) rotate(360deg)",
  },
});

export const wrapperClass = cssVariant(
  {
    normal: {
      borderWidth: 10,
      height: 60,
      width: 60,
    },

    small: {
      borderWidth: 6,
      height: 25,
      width: 25,
    },
  },

  (template, { colors }) => [
    {
      animationDuration: "500ms",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
      borderColor: colors.orange,
      borderRadius: "50%",
      borderStyle: "solid",
      borderTopColor: "transparent",
      insetInline: 0,
      marginInline: "auto",
      position: "absolute",
      right: 0,
      top: "50%",
    },
    template,
  ],
);
