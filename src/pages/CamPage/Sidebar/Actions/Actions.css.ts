import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  marginBottom: 20,
  pointerEvents: "auto",

  "@media": {
    [devices.desktop]: {
      marginBottom: 15,
    },
  },
}));

export const titleClass = css(({ colors, devices }) => ({
  color: colors.whiteDarker,
  marginBottom: 10,
  textTransform: "uppercase",

  "@media": {
    [devices.mobile]: {
      fontSize: 15,
      marginBottom: 5,
    },
  },
}));

export const layoutClass = css(({ devices }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,

  "@media": {
    [devices.desktop]: {
      gap: 5,
    },
  },
}));

export const actionClass = css({
  flex: "0 1 calc(50% - 4px)",
});
