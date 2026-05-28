import { css } from "@/theme";

export const buttonClass = css(({ colors, devices }) => ({
  alignItems: "center",
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${colors.black}`,
  borderRadius: 5,
  color: colors.whiteDarker,
  cursor: "pointer",
  display: "flex",
  height: 40,
  justifyContent: "center",
  left: 8,
  position: "absolute",
  top: 248,
  width: 40,

  "@media": {
    [devices.pointerFine]: {
      ":hover": {
        backgroundColor: colors.grayLighter,
      },
    },

    [devices.desktop]: {
      height: 38,
      left: 5,
      top: 220,
      width: 38,
    },

    [devices.mobile]: {
      height: 36,
      top: 210,
      width: 36,
    },
  },
}));

export const iconClass = css({
  display: "block",
  height: 20,
  width: 20,
});
