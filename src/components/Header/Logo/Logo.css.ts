import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  height: "100%",
  padding: 8,

  "@media": {
    [devices.desktop]: {
      padding: 5,
    },

    [devices.tablet]: {
      position: "relative",
      zIndex: 3001,
    },
  },
}));

export const linkClass = css({
  alignItems: "center",
  display: "flex",
  height: "100%",
});

export const imageClass = css({
  height: "100%",
});
