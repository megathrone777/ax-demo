import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflowY: "auto",
  padding: 8,
  rowGap: 8,
  width: "100%",

  "@media": {
    [devices.desktop]: {
      padding: 5,
    },

    [devices.tablet]: {
      overflow: "hidden",
    },
  },
}));

export const tableClass = css({
  borderCollapse: "collapse",
  height: "100%",
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
  fontSize: 15,
  paddingInline: 8,
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
      paddingInline: 5,
    },

    [devices.mobile]: {
      fontSize: 14,
      paddingBlock: 5,
    },
  },
}));

export const rowClass = css(({ devices }) => ({
  height: 35,

  "@media": {
    [devices.desktop]: {
      height: 30,
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

export const tfootCellClass = css(({ devices }) => ({
  padding: "8px 8px 0",

  "@media": {
    [devices.desktop]: {
      paddingInline: 5,
      paddingTop: 5,
    },
  },
}));

export const idClass = css(({ fonts }) => ({
  fontWeight: fonts.normal,
}));
