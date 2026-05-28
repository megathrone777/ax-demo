import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  backgroundColor: colors.blackDarker,
  borderRight: `1px solid ${colors.black}`,
  display: "flex",
  flex: "0 1 50%",
  flexDirection: "column",
  flexGrow: 1,

  selectors: {
    "&:last-of-type": {
      borderRight: "none",
    },
  },

  "@media": {
    [devices.desktop]: {
      // no specific desktop override
    },
  },
}));

export const headingClass = css(({ colors, devices }) => ({
  alignItems: "center",
  borderBottom: `1px solid ${colors.black}`,
  display: "flex",
  height: 61,
  padding: 8,

  "@media": {
    [devices.desktop]: {
      height: 49,
      padding: 5,
    },
    [devices.mobile]: {
      backgroundColor: colors.blackLightest,
      fontSize: 15,
      height: "auto",
    },
  },
}));

export const titleLabelClass = css(({ colors, devices, fonts }) => ({
  color: colors.whiteDarker,
  fontSize: 18,
  fontWeight: fonts.bold,
  letterSpacing: 1,
  textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
  textTransform: "uppercase",

  "@media": {
    [devices.desktop]: {
      fontSize: 16,
    },
    [devices.mobile]: {
      fontSize: 15,
    },
  },
}));

export const titleValueClass = css(({ colors, devices }) => ({
  color: colors.whiteDarker,
  fontSize: 18,
  letterSpacing: 1,
  textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
  textTransform: "uppercase",

  "@media": {
    [devices.desktop]: {
      fontSize: 16,
    },
  },
}));

export const contentClass = css({
  alignItems: "center",
  display: "flex",
  flexGrow: 1,
  paddingLeft: 8,
});

export const labelClass = css(({ colors, devices, fonts }) => ({
  color: colors.whiteDarker,
  fontSize: 17,
  fontWeight: fonts.bold,
  height: 40,
  lineHeight: "41px",
  textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
  textTransform: "uppercase",

  "@media": {
    [devices.desktop]: {
      fontSize: 15,
    },
    [devices.mobile]: {
      fontSize: 14,
    },
  },
}));

export const valueClass = css(({ colors, devices }) => ({
  color: colors.whiteDarker,
  flexGrow: 1,
  fontSize: 17,
  letterSpacing: 1,
  textAlign: "center",
  textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",

  "@media": {
    [devices.desktop]: {
      fontSize: 15,
    },
  },
}));
