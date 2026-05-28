import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  alignItems: "center",
  display: "flex",
  paddingBlock: 8,

  "@media": {
    [devices.desktop]: {
      paddingBlock: 5,
    },
  },
}));
