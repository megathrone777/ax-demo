import { css } from "@/theme";

export const formClass = css(({ colors, devices }) => ({
  alignItems: "center",
  border: `1px solid ${colors.white}`,
  borderRadius: 5,
  display: "flex",
  height: 47,
  marginBottom: 8,
  minHeight: 47,
  padding: 3,

  "@media": {
    [devices.desktop]: {
      fontSize: 14,
      height: 43,
      minHeight: 43,
    },
  },
}));

export const infoClass = css({
  fontSize: 13,
});

export const layoutClass = css({
  alignItems: "center",
  columnGap: 8,
  display: "flex",
});
