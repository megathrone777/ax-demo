import { css } from "@/theme";

export const itemClass = css(({ colors }) => ({
  borderBottom: `1px solid ${colors.whiteLighter}`,
  display: "flex",
  fontSize: 12,
  marginBottom: 8,
  paddingBottom: 8,
  rowGap: 8,
}));

export const pairsListClass = css({
  flexBasis: "50%",
  width: "50%",
});

export const pairsItemClass = css({
  display: "block",
});

export const buttonClass = css(({ devices }) => ({
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  display: "inline-flex",
  height: 24,
  justifyContent: "space-around",
  overflow: "hidden",
  width: 24,

  ":hover": {
    filter: "brightness(130%)",
  },

  "@media": {
    [devices.desktop]: {
      height: 20,
      width: 20,
    },
  },
}));

export const buttonIconClass = css({
  display: "block",
  height: 20,
});

export const buttonsClass = css({
  alignItems: "center",
  columnGap: 8,
  display: "flex",
  justifyContent: "flex-end",
});
