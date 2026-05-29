import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const resultsClass = css(({ colors }) => ({
  backgroundColor: colors.blackDarker,
  borderRadius: 5,
  bottom: 30,
  maxWidth: "100%",
  minWidth: 200,
  position: "absolute",
  right: `${calc("100%").add("8px")}`,
  zIndex: 1000,
}));

export const listClass = css({
  width: "100%",
});

export const itemClass = css(({ colors }) => ({
  borderBottom: `1px solid ${colors.whiteDarker}`,
  color: colors.whiteDarker,
  cursor: "pointer",
  height: 35,
  lineHeight: "35px",
  maxWidth: "100%",
  overflow: "hidden",
  paddingInline: 8,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  ":hover": {
    color: colors.whiteLighter,
  },

  ":last-of-type": {
    borderBottom: "none",
  },
}));

export const layoutClass = css({
  position: "relative",
});

export const clearClass = css(({ colors }) => ({
  appearance: "none",
  backgroundColor: "transparent",
  color: colors.whiteDarker,
  cursor: "pointer",
  height: 20,
  padding: 0,
  position: "absolute",
  right: 15,
  top: "50%",
  transform: "translateY(-50%)",
  width: 20,

  ":hover": {
    color: colors.whiteLighter,
  },
}));
