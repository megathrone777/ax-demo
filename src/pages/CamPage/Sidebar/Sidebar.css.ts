import { keyframes } from "@vanilla-extract/css";

import { css } from "@/theme";

const slide = keyframes({
  "0%": { opacity: 1, transform: "translateX(0)" },
  "50%": { opacity: 0.5, transform: "translateX(-5px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const wrapperClass = css(({ colors, devices }) => ({
  backgroundColor: colors.black,
  bottom: 0,
  display: "flex",
  flex: "0 1 400px",
  flexDirection: "column",
  padding: "20px 8px 8px 0",
  position: "absolute",
  right: 0,
  top: 0,
  transform: "translate3d(var(--sidebar-x, 400px), 0, 0)",
  transition: "transform 0.1s linear",
  width: 400,
  willChange: "transform",
  zIndex: 3,

  "@media": {
    [devices.desktop]: {
      flex: "0 1 300px",
      padding: "12px 5px 5px 5px",
      transform: "translate3d(var(--sidebar-x-sm, 300px), 0, 0)",
      width: 300,
    },
    [devices.mobile]: {
      paddingLeft: 5,
    },
  },
}));

export const headingClass = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 20,
  paddingInline: 5,
});

export const layoutClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
  overflowY: "auto",
  padding: 8,
  rowGap: 8,
  scrollBehavior: "smooth",

  "@media": {
    [devices.desktop]: {
      padding: 5,
      rowGap: 5,
    },
  },
}));

export const arrowsIconClass = css({
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationName: slide,
  animationTimingFunction: "linear",
  color: "white",
  height: 30,
  width: 30,
});

export const burgerWrapperClass = css(({ devices }) => ({
  position: "absolute",
  right: "calc(100% + 15px)",
  top: 60,

  "@media": {
    [devices.desktop]: {
      top: 50,
    },
    [devices.mobile]: {
      top: 5,
    },
  },
}));
