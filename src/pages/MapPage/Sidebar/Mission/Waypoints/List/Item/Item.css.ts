import { css } from "@/theme";

export const contentClass = css({
  display: "flex",
  flexGrow: 1,
  justifyContent: "flex-start",
});

export const optionsClass = css({
  alignItems: "center",
  columnGap: 8,
  display: "flex",
  justifyContent: "flex-end",
});

export const iconClass = css(({ devices }) => ({
  display: "block",
  flexBasis: 25,
  transform: "translateY(1px)",
  width: 25,

  "@media": {
    [devices.tablet]: {
      ":first-of-type": {
        display: "none",
      },
    },
  },
}));

export const buttonClass = css(({ devices }) => ({
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  display: "inline-flex",
  height: 24,
  justifyContent: "space-around",
  overflow: "hidden",
  userSelect: "none",
  width: 24,

  ":hover": {
    filter: "brightness(130%)",
  },

  "@media": {
    [devices.desktop]: {
      height: 20,
      width: 20,
    },
  },
}));
