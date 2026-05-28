import { css, cssVariant } from "@/theme";

export const baseClass = css(({ fonts }) => ({
  alignItems: "center",
  appearance: "none",
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 1,
  cursor: "pointer",
  display: "inline-flex",
  fontFamily: "inherit",
  fontWeight: fonts.extraBold,
  justifyContent: "center",
  outline: "none",
  paddingInline: 10,
  position: "relative",
  textDecoration: "none",
  textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
  textTransform: "uppercase",
  userSelect: "none",
  width: "100%",

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.8,
  },
}));

export const sizeClass = cssVariant(
  ({ devices }) => ({
    large: {
      fontSize: 16,
      height: 48,
      letterSpacing: 1,

      "@media": {
        [devices.tablet]: { fontSize: 15, height: 46 },
        [devices.mobile]: { fontSize: 15, height: 40 },
      },
    },

    medium: {
      fontSize: 16,
      height: 47,
      letterSpacing: 1,
      paddingInline: 10,

      "@media": {
        [devices.desktop]: { fontSize: 15, height: 40, paddingInline: 5 },
        [devices.mobile]: { fontSize: 14, height: 35 },
      },
    },

    small: {
      fontSize: 19,
      height: 39,
      letterSpacing: 3,

      "@media": {
        [devices.desktop]: { fontSize: 15, height: 35, letterSpacing: 2 },
        [devices.mobile]: { fontSize: 14 },
      },
    },
  }),

  (size) => size,
);

export const templateClass = cssVariant(
  ({ colors }) => ({
    primary: {
      backgroundColor: colors.blackLighter,
      borderColor: colors.whiteDarkest,
      color: colors.white,
      selectors: {
        "&.active": {
          backgroundColor: colors.grayLightest,
          borderColor: colors.white,
          color: colors.black,

          ":hover": {
            backgroundColor: colors.grayLightest,
            borderColor: colors.white,
            color: colors.black,
          },
        },
      },

      ":hover": {
        backgroundColor: colors.grayDarker,
        borderColor: colors.white,
        color: colors.white,
      },
    },

    secondary: {
      backgroundColor: colors.blackLighter,
      borderColor: colors.whiteDarkest,
      boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",
      color: colors.whiteDarker,
      selectors: {
        "&.active": {
          backgroundColor: colors.grayLightest,
          borderColor: colors.white,
          boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",
          color: colors.black,

          ":hover": {
            backgroundColor: colors.grayDarker,
            borderColor: colors.whiteLighter,
            color: colors.whiteLighter,
          },
        },
      },

      ":hover": {
        backgroundColor: colors.grayDarker,
        borderColor: colors.white,
        color: colors.white,
      },
    },

    tertiary: {
      backgroundColor: colors.grayDarkest,
      borderColor: colors.black,
      boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",
      color: colors.white,
      selectors: {
        "&.active": {
          backgroundColor: colors.grayLightest,
          color: colors.blackDarker,
        },

        "&.active:hover": {
          backgroundColor: colors.grayLightest,
          color: colors.blackDarker,
        },
      },

      ":hover": {
        backgroundColor: colors.grayLighter,
      },
    },
  }),

  (template) => template,
);
