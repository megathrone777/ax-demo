import { css } from "@/theme";

export const centerClass = css(({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${colors.black}`,
  borderRadius: 5,
  color: colors.whiteDarker,
  cursor: "pointer",
  display: "flex",
  height: 40,
  justifyContent: "center",
  left: 5,
  position: "absolute",
  top: 5,
  width: 40,

  "@media": {
    "(hover: hover) and (pointer: fine)": {
      ":hover": {
        backgroundColor: colors.grayLighter,
      },
    },
  },
}));

export const iconClass = css({
  display: "block",
  height: 20,
  width: 20,
});
