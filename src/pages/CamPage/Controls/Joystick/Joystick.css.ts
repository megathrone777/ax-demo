import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  height: 130,
  position: "relative",
  width: 130,

  "@media": {
    [devices.mobile]: {
      transform: "scale(0.8)",
      transformOrigin: "left center",

      ":last-of-type": {
        [devices.mobile]: {
          transformOrigin: "right center",
        },
      },
    },
  },
}));
