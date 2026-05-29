import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css({
  flexGrow: 1,
});

export const tableClass = css({
  borderCollapse: "collapse",
  height: `${calc("100%").add("2px")}`,
  marginTop: -1,
  width: "100%",
});

export const theadClass = css(({ devices }) => ({
  height: 38,

  "@media": {
    [devices.desktop]: {
      height: 35,
    },
  },
}));

export const cellClass = css(({ colors, devices, fonts }) => ({
  backgroundColor: colors.blackDarker,
  border: `1px solid ${colors.black}`,
  color: colors.whiteDarker,
  fontSize: 17,
  paddingInline: 8,
  position: "relative",
  textAlign: "center",
  textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
  textTransform: "uppercase",
  verticalAlign: "middle",
  width: "50%",

  ":first-of-type": {
    fontWeight: fonts.bold,
    letterSpacing: 1,
    textAlign: "left",
  },

  "@media": {
    [devices.desktop]: {
      fontSize: 15,
      paddingInline: 5,
    },

    [devices.mobile]: {
      fontSize: 14,
      paddingBlock: 5,
    },
  },
}));

export const rowClass = css(({ devices }) => ({
  height: 38,
  selectors: {
    "&:last-of-type td:first-of-type &": {
      borderBottomLeftRadius: 4,
    },

    "&:last-of-type td:last-of-type &": {
      borderBottomRightRadius: 4,
    },
  },

  "@media": {
    [devices.desktop]: {
      height: 35,
    },
  },
}));

export const theadCellClass = css(({ colors, devices, fonts }) => ({
  backgroundColor: colors.blackLightest,
  border: `1px solid ${colors.black}`,
  borderRadius: "4px 4px 0 0",
  color: colors.whiteDarker,
  fontSize: 16,
  fontWeight: fonts.extraBold,
  paddingLeft: 8,
  textAlign: "left",
  textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
  textTransform: "uppercase",
  verticalAlign: "middle",
  width: "50%",

  "@media": {
    [devices.desktop]: {
      fontSize: 15,
      paddingLeft: 5,
    },
  },
}));

export const idClass = css(({ fonts }) => ({
  fontWeight: fonts.normal,
}));

export const ipErrorClass = css(({ colors }) => ({
  bottom: 0,
  color: colors.red,
  fontSize: 10,
  insetInline: 0,
  position: "absolute",
  textAlign: "center",
}));
