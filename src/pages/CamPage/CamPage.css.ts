import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignContent: "space-between",
  display: "flex",
  height: "100%",
  overflow: "hidden",
  padding: 8,
  position: "relative",

  "@media": {
    [devices.desktop]: {
      padding: 5,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  position: "relative",
  width: "var(--layout-width, 100%)",
  zIndex: 1,

  "@media": {
    [devices.desktop]: {
      width: "var(--layout-width-sm, 100%)",
    },
    [devices.mobile]: {
      width: "100%",
    },
  },
}));

export const columnClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  left: 0,
  position: "absolute",
  rowGap: 8,
  top: 0,
  zIndex: 2,

  "@media": {
    [devices.desktop]: {
      left: 0,
      rowGap: 5,
      top: 0,
    },
    [devices.mobile]: {
      alignItems: "flex-start",
    },
  },
}));
