import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  paddingInline: 10,
  position: "relative",

  "@media": {
    [devices.desktop]: {
      paddingInline: 5,
    },

    [devices.tablet]: {
      maxWidth: 170,
    },

    [devices.mobile]: {
      maxWidth: 160,
    },
  },
}));

export const listClass = css(({ colors, devices }) => ({
  backgroundColor: colors.blackDarker,
  borderRadius: 5,
  maxWidth: 300,
  position: "absolute",
  right: 10,
  top: `${calc("100%").add("8px")}`,
  zIndex: 1000,

  "@media": {
    [devices.desktop]: {
      right: 5,
    },
  },
}));

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
