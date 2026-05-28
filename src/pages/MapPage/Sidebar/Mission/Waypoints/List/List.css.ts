import { css } from "@/theme";

export const itemClass = css(({ colors, devices }) => ({
  alignItems: "center",
  border: "1px solid transparent",
  boxSizing: "border-box",
  columnGap: 20,
  display: "flex",
  lineHeight: "40px",
  paddingInline: 5,
  selectors: {
    "&.is-dragging": {
      borderColor: colors.green,
      boxShadow: `0 0 2px rgb(8, 58, 30), 0 0 5px ${colors.green}`,
    },
  },
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
}));
