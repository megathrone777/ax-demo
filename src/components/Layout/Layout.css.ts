import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const contentClass = css(({ devices }) => ({
  height: `${calc("100%").subtract("65px")}`,
  overflow: "hidden",
  position: "relative",

  "@media": {
    [devices.desktop]: {
      height: `${calc("100%").subtract("50px")}`,
    },
  },
}));
