import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  alignItems: "center",
  backgroundColor: colors.blackDarker,
  border: `1px solid ${colors.black}`,
  borderRadius: 5,
  boxShadow: "rgb(0 0 0 / 35%) 0 5px 15px",
  display: "flex",
  height: 38,
  justifyContent: "center",
  position: "absolute",
  right: 8,
  top: 8,
  zIndex: 50,

  "@media": {
    [devices.desktop]: {
      height: 35,
      right: 5,
      top: 8,
    },
    [devices.mobile]: {
      left: 0,
      right: "initial",
      top: 80,
    },
  },
}));

export const itemClass = css(({ colors, devices }) => ({
  borderRight: `1px solid ${colors.black}`,
  height: "100%",
  lineHeight: "38px",
  paddingInline: 9,

  selectors: {
    "&:last-of-type": {
      borderRight: "none",
    },
  },

  "@media": {
    [devices.desktop]: {
      fontSize: 15,
      lineHeight: "35px",
      paddingInline: 5,
    },
    [devices.mobile]: {
      fontSize: 13,
      lineHeight: "32px",
    },
  },
}));

export const labelClass = css(({ colors }) => ({
  color: colors.whiteDarker,
  letterSpacing: 1,
  marginRight: 5,
  textTransform: "uppercase",
}));

export const valueClass = css(({ colors }) => ({
  color: colors.white,
  letterSpacing: 1,
}));
