import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  flexGrow: 1,
  height: "100%",
  paddingInline: 10,

  "@media": {
    [devices.desktop]: {
      paddingInline: 5,
    },
  },
}));

export const listClass = css(({ colors, devices }) => ({
  alignItems: "center",
  columnGap: 10,
  display: "flex",
  flexGrow: 1,
  height: "100%",
  willChange: "transform",

  "@media": {
    [devices.desktop]: {
      gap: 5,
    },

    [devices.tablet]: {
      backgroundColor: colors.blackDarker,
      bottom: 0,
      flexDirection: "column",
      gap: "25px 0",
      height: "100%",
      justifyContent: "center",
      left: 0,
      overflow: "hidden",
      position: "fixed",
      right: 0,
      rowGap: 20,
      top: 0,
      transform: "var(--list-transform, scale(0))",
      transition: "var(--list-transition, none)",
      width: "100%",
      zIndex: 1000,
    },
  },
}));

export const itemClass = css(({ devices }) => ({
  flexBasis: "33%",
  flexShrink: 1,

  "@media": {
    [devices.desktop]: {
      width: "auto",
    },

    [devices.tablet]: {
      flexBasis: "initial",
      width: 200,
    },
  },
}));

export const burgerWrapperClass = css(({ devices }) => ({
  display: "none",
  zIndex: 3001,

  "@media": {
    [devices.tablet]: {
      display: "block",
    },
  },
}));
