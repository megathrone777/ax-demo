import { css } from "@/theme";

export const wrapperClass = css({
  display: "flex",
  flexDirection: "column",
});

export const layoutClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "8px 8px 0",
  rowGap: 8,

  "@media": {
    [devices.desktop]: {
      padding: "5px 5px 0",
      rowGap: 5,
    },
  },
}));
