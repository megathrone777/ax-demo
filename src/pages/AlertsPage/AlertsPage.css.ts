import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const listClass = css(({ devices }) => ({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  padding: "8px 8px 0",
  rowGap: 8,

  "@media": {
    [devices.mobile]: {
      height: `${calc("100%").subtract("50px")}`,
      padding: 5,
      rowGap: 5,
    },
  },
}));
