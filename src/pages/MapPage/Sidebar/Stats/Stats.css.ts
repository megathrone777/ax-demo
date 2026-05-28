import { css } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "8px 8px 16px",
  rowGap: 10,

  "@media": {
    [devices.desktop]: {
      padding: "5px 5px 12px",
    },
  },
}));

export const rowClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 8,
  display: "flex",
  justifyContent: "space-between",

  "@media": {
    [devices.desktop]: {
      columnGap: 5,
    },
  },
}));

export const cellClass = css({
  alignItems: "flex-start",
  display: "flex",
  flex: "0 1 50%",
  flexDirection: "column",
  width: "50%",

  ":last-of-type": {
    alignItems: "flex-end",
  },
});

export const labelClass = css(({ colors, devices }) => ({
  color: colors.white,
  fontSize: 18,
  marginBottom: 5,

  "@media": {
    [devices.desktop]: {
      fontSize: 16,
    },
  },
}));

export const valueClass = css(({ devices }) => ({
  alignItems: "center",
  columnGap: 5,
  display: "inline-flex",
  fontSize: 15,
  whiteSpace: "nowrap",

  "@media": {
    [devices.desktop]: {
      fontSize: 14,
    },
  },
}));

export const keyClass = css(({ colors }) => ({
  color: colors.white,
}));

export const iconClass = css({
  alignItems: "center",
  display: "inline-flex",
  height: 18,
});
