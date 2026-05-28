import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "stretch",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  overflow: "hidden",

  "@media": {
    [devices.mobile]: {
      height: `${calc("100%").subtract("50px")}`,
    },
  },
}));

export const listClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  height: "calc(100% - 16px)",
  overflowY: "scroll",
  paddingInline: 8,
  rowGap: 8,
  scrollBehavior: "smooth",
  scrollSnapType: "block mandatory",

  "@media": {
    [devices.desktop]: {
      height: `${calc("100%").subtract("10px")}`,
      paddingInline: 5,
      rowGap: 5,
    },

    [devices.tablet]: {
      rowGap: 15,
    },

    [devices.mobile]: {
      rowGap: 10,
    },
  },
}));
