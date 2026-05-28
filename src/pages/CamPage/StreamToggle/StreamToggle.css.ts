import { css, cssVariant } from "@/theme";

export const wrapperClass = css({
  borderRadius: 5,
  height: "100%",
  overflow: "hidden",
});

export const holderClass = cssVariant(
  {
    collapsed: {
      cursor: "pointer",
      height: 150,
      left: 8,
      position: "absolute",
      top: 150,
      width: 150,
      zIndex: 20,
    },

    default: {
      height: "100%",
      width: "100%",
    },
  },

  (state) => state,
);
