import { cssVariant } from "@/theme";

export const inputClass = cssVariant(
  ({ colors, devices, fonts }) => ({
    invisible: {
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      display: "block",
      fontFamily: "inherit",
      fontSize: "inherit",
      height: "100%",
      outline: "none",
      textAlign: "inherit",
      width: "100%",
    },

    primary: {
      backgroundColor: colors.black,
      border: "none",
      fontSize: 20,
      fontWeight: fonts.bold,
      height: 60,
      padding: 10,

      ":-webkit-autofill": {
        "-webkit-box-shadow": `0 0 0 200px ${colors.black} inset`,
        "-webkit-text-fill-color": colors.whiteDarker,
        fontSize: 20,
        fontWeight: fonts.bold,
      },

      "@media": {
        [devices["mobile"]]: {
          fontSize: 18,
          height: 48,
        },
      },
    },

    secondary: {
      backgroundColor: colors.blackLighter,
      border: `1px solid ${colors.whiteDarkest}`,
      fontSize: 17,
      fontWeight: fonts.normal,
      height: 38,
      padding: 5,

      "@media": {
        [devices.tablet]: {
          fontSize: 15,
        },

        [devices.mobile]: {
          height: 35,
        },
      },
    },
  }),

  (template, { colors }) => [
    {
      appearance: "none",
      borderRadius: 4,
      color: colors.whiteDarker,
      outline: "none",
      overflow: "hidden",
      resize: "none",
      selectors: {
        "&:focus::placeholder": {
          color: "transparent",
        },
      },
      width: "100%",

      "::placeholder": {
        color: "rgba(255, 255, 255, .5)",
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
      },
    },
    template,
  ],
);
