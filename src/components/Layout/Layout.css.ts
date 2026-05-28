import { css } from "@/theme";

export const contentClass = css(({ devices }) => ({
  height: "calc(100% - 65px)",
  overflow: "hidden",
  position: "relative",

  "@media": {
    [devices.desktop]: {
      height: "calc(100% - 50px)",
    },
  },
}));
