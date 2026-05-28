import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 20,
  display: "flex",
  lineHeight: "40px",
  paddingInline: 5,
  userSelect: "none",

  "@media": {
    [devices.desktop]: {
      columnGap: 10,
      fontSize: 15,
      marginBottom: 5,
    },
  },
}));

export const positionClass = css(({ devices }) => ({
  columnGap: 20,
  display: "flex",
  flexGrow: 1,

  "@media": {
    [devices.desktop]: {
      columnGap: 10,
    },
  },
}));
