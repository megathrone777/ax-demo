import { keyframes } from "@vanilla-extract/css";

import { css, cssVariant } from "@/theme";

const slide = keyframes({
  "0%": { opacity: 1, transform: "translateX(0)" },
  "50%": { opacity: 0.5, transform: "translateX(-5px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideReverse = keyframes({
  "0%": { opacity: 1, transform: "rotate(180deg) translateX(0)" },
  "50%": { opacity: 0.5, transform: "rotate(180deg) translateX(5px)" },
  "100%": { opacity: 1, transform: "rotate(180deg) translateX(0)" },
});

export const wrapperClass = css(({ devices }) => ({
  marginBottom: 20,
  marginLeft: 8,

  "@media": {
    [devices.desktop]: {
      marginBottom: 10,
      marginLeft: 5,
    },
  },
}));

export const buttonClass = cssVariant(
  ({ colors, devices, fonts }) => ({
    active: {
      appearance: "none",
      backgroundColor: colors.red,
      borderColor: colors.red,
      borderRadius: 5,
      color: colors.black,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 15,
      fontWeight: fonts.extraBold,
      height: 47,
      letterSpacing: 1,
      lineHeight: "49px",
      outline: "none",
      paddingInline: 10,
      textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
      textTransform: "uppercase",
      userSelect: "none",
      width: "100%",

      "@media": {
        [devices.desktop]: {
          height: 42,
          lineHeight: "42px",
          paddingRight: 5,
        },

        [devices.mobile]: {
          fontSize: 14,
          height: 38,
          lineHeight: "38px",
        },
      },
    },

    inactive: {
      appearance: "none",
      backgroundColor: colors.blackDarker,
      borderColor: colors.whiteDarkest,
      borderRadius: 5,
      color: colors.white,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 15,
      fontWeight: fonts.extraBold,
      height: 47,
      letterSpacing: 1,
      lineHeight: "49px",
      outline: "none",
      paddingInline: 10,
      textShadow: "rgba(0, 0, 0, 0.12) 1px 2px 2px",
      textTransform: "uppercase",
      userSelect: "none",
      width: "100%",

      "@media": {
        [devices.desktop]: {
          height: 42,
          lineHeight: "42px",
          paddingRight: 5,
        },

        [devices.mobile]: {
          fontSize: 14,
          height: 38,
          lineHeight: "38px",
        },
      },
    },
  }),
  (button) => [
    {
      alignItems: "center",
      border: "none",
      columnGap: 15,
      display: "flex",
      justifyContent: "center",
    },
    button,
  ],
);

export const buttonIconActiveClass = css(({ devices }) => ({
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationName: slideReverse,
  animationTimingFunction: "linear",
  height: 30,
  width: 30,

  "@media": {
    [devices.desktop]: {
      height: 24,
      width: 24,
    },
  },
}));

export const buttonIconInactiveClass = css(({ devices }) => ({
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationName: slide,
  animationTimingFunction: "linear",
  height: 30,
  width: 30,

  "@media": {
    [devices.desktop]: {
      height: 24,
      width: 24,
    },
  },
}));
