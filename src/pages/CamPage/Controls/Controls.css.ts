import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  bottom: 40,
  display: "flex",
  height: 130,
  justifyContent: "space-between",
  left: 0,
  paddingInline: 40,
  position: "absolute",
  right: 0,
  width: "100%",

  "@media": {
    [devices.tablet]: {
      paddingInline: 30,
    },

    [devices.mobile]: {
      paddingInline: 10,
    },
  },
}));
