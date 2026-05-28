import { cssVariant } from "@/theme";

export const buttonClass = cssVariant(
  ({ colors, devices }) => ({
    active: {
      backgroundColor: colors.grayLightest,
      border: `1px solid ${colors.black}`,
      borderRadius: 5,
      boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",
      color: colors.blackDarker,
      cursor: "pointer",
      height: 40,
      left: 8,
      overflow: "hidden",
      paddingInline: 7,
      position: "absolute",
      top: 200,
      width: 40,
      zIndex: 300,

      ":hover": {
        backgroundColor: colors.grayLightest,
        color: colors.blackDarker,
      },

      "@media": {
        [devices.desktop]: {
          height: 38,
          left: 5,
          top: 177,
          width: 38,
        },

        [devices.mobile]: {
          height: 36,
          top: 169,
          width: 36,
        },
      },
    },

    inactive: {
      backgroundColor: colors.grayDarkest,
      border: `1px solid ${colors.black}`,
      borderRadius: 5,
      boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",
      color: colors.whiteDarker,
      cursor: "pointer",
      height: 40,
      left: 8,
      overflow: "hidden",
      paddingInline: 7,
      position: "absolute",
      top: 200,
      width: 40,
      zIndex: 300,

      ":hover": {
        backgroundColor: colors.grayLighter,
        color: colors.whiteDarker,
      },

      "@media": {
        [devices.desktop]: {
          height: 38,
          left: 5,
          top: 177,
          width: 38,
        },

        [devices.mobile]: {
          height: 36,
          top: 169,
          width: 36,
        },
      },
    },
  }),
  (button) => button,
);
