import { css } from "@/theme";

export const zoomClass = css(({ colors, devices }) => ({
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${colors.black}`,
  borderRadius: 5,
  display: "block",
  paddingInline: 4,
  position: "absolute",
  right: 8,
  top: 8,
  zIndex: 1,

  "@media": {
    [devices.desktop]: {
      fontSize: 14,
      right: 5,
      top: 5,
    },
  },
}));
