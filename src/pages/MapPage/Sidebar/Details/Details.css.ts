import { css, cssVariant } from "@/theme";

export const wrapperClass = css(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: 8,

  "@media": {
    [devices.desktop]: {
      rowGap: 5,
    },
  },
}));

export const controlClass = cssVariant(
  ({ colors, devices }) => ({
    connected: {
      backgroundColor: colors.blackDarker,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      padding: 6,
      position: "relative",
      rowGap: 6,

      "::before": {
        backgroundColor: colors.green,
        borderRadius: "50%",
        content: "''",
        display: "block",
        height: 20,
        position: "absolute",
        right: 5,
        top: 8,
        width: 20,
      },

      "@media": {
        [devices.desktop]: {
          fontSize: 15,
          padding: 5,
          rowGap: 5,
        },
      },
    },

    disconnected: {
      backgroundColor: colors.blackDarker,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      padding: 6,
      position: "relative",
      rowGap: 6,

      "::before": {
        backgroundColor: colors.red,
        borderRadius: "50%",
        content: "''",
        display: "block",
        height: 20,
        position: "absolute",
        right: 5,
        top: 8,
        width: 20,
      },

      "@media": {
        [devices.desktop]: {
          fontSize: 15,
          padding: 5,
          rowGap: 5,
        },
      },
    },
  }),
  (control) => control,
);

export const linkClass = css(({ colors, devices }) => ({
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${colors.black}`,
  borderRadius: 5,
  boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",
  color: colors.white,
  display: "inline-block",
  height: 47,
  lineHeight: "47px",
  minWidth: 150,
  paddingInline: 10,
  textAlign: "center",
  textDecoration: "none",

  ":hover": {
    backgroundColor: colors.grayLighter,
    borderColor: colors.whiteLighter,
  },

  "@media": {
    [devices.desktop]: {
      fontSize: 15,
      height: 40,
      lineHeight: "40px",
      paddingInline: 5,
    },
  },
}));

export const headingClass = css(({ colors, devices }) => ({
  color: "inherit",
  columnGap: 10,
  cursor: "pointer",
  display: "flex",
  fontWeight: "inherit",
  textDecoration: "none",
  userSelect: "none",

  ":hover": {
    color: colors.whiteLighter,
  },

  "@media": {
    [devices.desktop]: {
      fontSize: 15,
    },
  },
}));

export const contentClass = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  lineHeight: 1,
  padding: 4,
});

export const mediaClass = css(({ colors, devices, fonts }) => ({
  alignItems: "center",
  color: colors.white,
  columnGap: 8,
  display: "flex",
  fontSize: 22,
  fontWeight: fonts.bold,
  paddingInline: 8,
  textTransform: "uppercase",

  "@media": {
    [devices.desktop]: {
      fontSize: 19,
      paddingInline: 5,
    },
  },
}));

export const imageHolderClass = css({
  display: "block",
  height: 40,
  minWidth: 84,
});

export const imageClass = css({
  height: "100%",
  objectFit: "cover",
});
