import { css, cssVariant } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  alignItems: "center",
  backgroundColor: colors.blackDarker,
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  position: "relative",
  textAlign: "center",

  "@media": {
    [devices.tablet]: {
      flex: "1 100%",
    },

    [devices.mobile]: {
      flex: "0 1 auto",
      height: 120,
    },
  },
}));

export const imageClass = css({
  maxHeight: "100%",
});

export const statusClass = cssVariant(
  ({ colors, devices, fonts }) => ({
    offline: {
      backgroundColor: colors.red,
      borderRadius: 4,
      color: "white",
      fontWeight: fonts.bold,
      height: 35,
      left: 20,
      lineHeight: "35px",
      paddingInline: 8,
      position: "absolute",
      textTransform: "uppercase",
      top: 20,

      "@media": {
        [devices.desktop]: {
          fontSize: 15,
          height: 30,
          left: 10,
          lineHeight: "30px",
          paddingInline: 5,
          top: 10,
        },

        [devices.mobile]: {
          fontSize: 13,
          height: 26,
          left: 5,
          lineHeight: "26px",
          top: 5,
        },
      },
    },

    online: {
      backgroundColor: colors.green,
      borderRadius: 4,
      color: "white",
      fontWeight: fonts.bold,
      height: 35,
      left: 20,
      lineHeight: "35px",
      paddingInline: 8,
      position: "absolute",
      textTransform: "uppercase",
      top: 20,

      "@media": {
        [devices.desktop]: {
          fontSize: 15,
          height: 30,
          left: 10,
          lineHeight: "30px",
          paddingInline: 5,
          top: 10,
        },

        [devices.mobile]: {
          fontSize: 13,
          height: 26,
          left: 5,
          lineHeight: "26px",
          top: 5,
        },
      },
    },
  }),
  (status) => status,
);
