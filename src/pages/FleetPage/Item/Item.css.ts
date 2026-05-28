import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "flex-start",
  columnGap: 8,
  display: "flex",
  justifyContent: "space-between",
  scrollSnapAlign: "start",

  "@media": {
    [devices.desktop]: {
      columnGap: 5,
    },
    [devices.tablet]: {
      flexFlow: "row wrap",
      rowGap: 5,
    },
    [devices.mobile]: {
      flexFlow: "column nowrap",
    },
  },
}));

export const columnClass = css(({ colors, devices }) => ({
  backgroundColor: colors.blackDarker,
  borderRadius: 5,
  display: "flex",
  flex: "0 1 33.3333%",
  flexDirection: "column",
  height: 250,
  overflow: "hidden",

  selectors: {
    "&:first-of-type": {
      "@media": {
        [devices.tablet]: {
          flex: "0 1 100%",
        },
        [devices.mobile]: {
          flex: "none",
        },
      },
    },
  },

  "@media": {
    [devices.desktop]: {
      height: 180,
    },
    [devices.tablet]: {
      flex: "0 1 calc(50% - 2.5px)",
    },
    [devices.mobile]: {
      flex: "none",
      height: "auto",
      width: "100%",
    },
  },
}));

export const emptyClass = css(({ colors }) => ({
  color: colors.white,
}));

export const optionsClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 50,
  display: "flex",
  height: 75,
  justifyContent: "space-between",
  paddingInline: 8,

  "@media": {
    [devices.desktop]: {
      columnGap: 15,
      paddingInline: 5,
    },
    [devices.mobile]: {
      columnGap: 5,
      paddingBlock: 5,
    },
  },
}));
