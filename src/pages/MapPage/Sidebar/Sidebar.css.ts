import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices, easing }) => ({
  backgroundColor: colors.black,
  color: colors.whiteDarker,
  flexBasis: 400,
  height: "100%",
  overflow: "hidden",
  transition: `flex-basis 0.15s ${easing.default}`,

  "@media": {
    [devices.desktop]: {
      flexBasis: 300,
    },

    [devices.tablet]: {
      flexBasis: 0,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflowY: "auto",
  padding: 8,
  rowGap: 8,

  "@media": {
    [devices.desktop]: {
      padding: 5,
      rowGap: 5,
    },
  },
}));

export const burgerWrapperClass = css(({ devices }) => ({
  display: "none",
  position: "absolute",
  right: "calc(100% + 8px)",

  "@media": {
    [devices.tablet]: {
      display: "block",
      top: 115,
    },
  },
}));

export const tabsWrapperClass = css({
  columnGap: 8,
  display: "flex",
});
