import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices, fonts }) => ({
  alignItems: "center",
  backgroundColor: colors.grayLighter,
  borderRadius: 5,
  color: colors.whiteDarker,
  columnGap: 20,
  display: "inline-flex",
  fontWeight: fonts.bold,
  height: 50,
  justifyContent: "space-between",
  paddingInline: 8,
  position: "relative",
  textTransform: "uppercase",

  ":last-of-type": {
    marginBottom: 0,
  },

  "@media": {
    [devices.mobile]: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      height: "auto",
      justifyContent: "center",
      padding: 5,
      width: "100%",
    },
  },
}));

export const typeClass = css(({ devices }) => ({
  display: "block",
  minWidth: 150,

  "@media": {
    [devices.mobile]: {
      flex: "0 1 100%",
    },
  },
}));

export const descriptionClass = css(({ devices, fonts }) => ({
  flex: "0 1 300px",
  fontSize: 13,
  fontWeight: fonts.normal,
  lineHeight: 1.1,
  maxWidth: 300,
  overflow: "hidden",
  textOverflow: "ellipsis",
  textTransform: "initial",
  whiteSpace: "nowrap",

  "@media": {
    [devices.mobile]: {
      flex: `0 1 ${calc("50%").subtract("10px")}`,
      maxWidth: `${calc("50%").subtract("10px")}`,
      whiteSpace: "normal",
    },
  },
}));

export const contentClass = css(({ devices }) => ({
  flex: "0 1 150px",
  selectors: {
    "&:nth-of-type(odd)": {
      "@media": {
        [devices.mobile]: {
          textAlign: "right",
        },
      },
    },
  },

  "@media": {
    [devices.mobile]: {
      flex: `${calc("50%").subtract("10px")}`,
    },
  },
}));

export const buttonsClass = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
});

export const linkClass = css({
  alignItems: "center",
  display: "flex",
});

export const iconClass = css(({ colors }) => ({
  color: colors.whiteDarker,
  display: "inline-block",
  height: 22,
  width: 22,
}));
