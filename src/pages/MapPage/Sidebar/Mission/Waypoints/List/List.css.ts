import { cssVariant } from "@/theme";

export const itemClass = cssVariant(
  ({ colors }) => ({
    default: {
      borderColor: "transparent",
    },

    dragging: {
      borderColor: colors.green,
      boxShadow: `0 0 2px rgb(8, 58, 30), 0 0 5px ${colors.green}`,
    },
  }),

  (variant, { devices }) => [
    {
      alignItems: "center",
      borderStyle: "solid",
      borderWidth: 1,
      boxSizing: "border-box",
      columnGap: 20,
      display: "flex",
      lineHeight: "40px",
      paddingInline: 5,
      userSelect: "none",

      ":last-of-type": {
        borderBottomColor: "transparent",
      },

      "@media": {
        [devices.desktop]: {
          columnGap: 10,
          fontSize: 15,
        },
      },
    },
    variant,
  ],
);
