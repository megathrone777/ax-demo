import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
  paddingInline: 8,

  "@media": {
    [devices.desktop]: {
      paddingInline: 5,
    },
    [devices.mobile]: {
      backgroundColor: "inherit",
      borderRadius: 5,
      bottom: 5,
    },
  },
}));

export const nameClass = css(({ colors, devices }) => ({
  color: colors.whiteDarker,
  marginRight: 8,
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobile]: {
      display: "none",
    },
  },
}));
