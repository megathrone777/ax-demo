import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css({
  bottom: 20,
  height: 200,
  insetInline: 0,
  marginInline: "auto",
  position: "absolute",
  width: `${calc("100%").subtract("400px")}`,
  zIndex: 1,
});

export const layoutClass = css({
  height: "100%",
  position: "relative",
  width: "100%",
});

export const loaderWrapperClass = css(({ colors }) => ({
  backgroundColor: colors.black,
  height: "100%",
  inset: 0,
  position: "absolute",
  width: "100%",
  zIndex: 300,
}));
