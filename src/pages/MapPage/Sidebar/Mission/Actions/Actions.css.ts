import { css } from "@/theme";

export const layoutClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 8,
  display: "flex",

  "@media": {
    [devices.desktop]: {
      columnGap: 5,
    },
  },
}));

export const deleteClass = css(({ colors, devices }) => ({
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 5,
  color: colors.grayDarker,
  cursor: "pointer",
  display: "flex",
  height: 47,
  minWidth: 47,
  paddingBlock: 12,
  width: 60,

  ":hover": {
    opacity: 0.7,
  },

  "@media": {
    [devices.desktop]: {
      height: 40,
      minWidth: 40,
      paddingBlock: 8,
      width: 40,
    },

    [devices.mobile]: {
      height: 35,
      minWidth: 35,
      width: 35,
    },
  },
}));
