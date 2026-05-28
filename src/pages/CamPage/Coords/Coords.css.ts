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
  marginLeft: 8,
  marginTop: 8,

  "@media": {
    [devices.desktop]: {
      height: 35,
      marginLeft: 5,
      marginTop: 5,
    },
    [devices.mobile]: {
      height: 32,
    },
  },
}));

export const itemClass = css(({ colors, devices }) => ({
  borderRight: `1px solid ${colors.black}`,
  height: "100%",
  lineHeight: "38px",
  paddingInline: 8,

  selectors: {
    "&:last-of-type": {
      borderRight: "none",
    },
  },

  "@media": {
    [devices.desktop]: {
      lineHeight: "35px",
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
