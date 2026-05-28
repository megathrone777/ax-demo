import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  backgroundColor: colors.blackDarker,
  borderRadius: 5,
  bottom: 200,
  columnGap: 8,
  display: "flex",
  padding: 8,
  position: "absolute",
  right: 40,
  zIndex: 2,

  "@media": {
    [devices.mobile]: {
      bottom: 180,
      columnGap: 5,
      padding: 5,
      right: 10,
    },
  },
}));
