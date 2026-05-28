import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "stretch",
  columnGap: 8,
  display: "flex",
  height: "100%",
  justifyContent: "center",
  overflow: "hidden",
  padding: 8,

  "@media": {
    [devices.desktop]: {
      columnGap: 5,
      padding: 5,
    },

    [devices.tablet]: {
      columnGap: "initial",
      flexDirection: "column",
      justifyContent: "flex-start",
      overflowY: "auto",
      rowGap: 5,
    },

    [devices.mobile]: {
      height: "calc(100% - 55px)",
      paddingBottom: 0,
    },
  },
}));

export const columnClass = css(({ colors, devices }) => ({
  alignItems: "center",
  backgroundColor: colors.blackDarker,
  borderRadius: 5,
  display: "flex",
  flex: "0 1 50%",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
  width: "50%",

  "@media": {
    [devices.tablet]: {
      flex: "0 1 auto",
      width: "100%",
    },
  },
}));
