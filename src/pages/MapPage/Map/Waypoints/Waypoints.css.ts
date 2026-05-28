import { css } from "@/theme";

export const streamClass = css(({ colors, devices }) => ({
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${colors.black}`,
  borderRadius: 5,
  bottom: 8,
  height: 150,
  left: 8,
  position: "absolute",
  width: 150,

  "@media": {
    [devices.mobile]: {
      bottom: 5,
      height: 100,
      left: 5,
      width: 100,
    },
  },
}));
