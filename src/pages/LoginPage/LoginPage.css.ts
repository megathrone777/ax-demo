import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  backgroundColor: colors.blackDarker,
  height: "100%",
  width: "100%",
}));

export const logoHolderClass = css({
  height: 70,
  marginBottom: 20,
  textAlign: "center",
});

export const logoClass = css({
  height: "100%",
});

export const layoutClass = css({
  left: 0,
  marginInline: "auto",
  maxWidth: 400,
  paddingInline: 10,
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
});

export const itemClass = css(({ devices }) => ({
  paddingBottom: 30,
  position: "relative",

  "@media": {
    [devices.mobile]: {
      paddingBottom: 15,
    },
  },
}));

export const errorClass = css(({ colors }) => ({
  color: colors.red,
  fontSize: 15,
  left: 5,
  position: "absolute",
  top: 62,
}));

export const submitClass = css({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
});

export const loaderWrapperClass = css({
  height: 88,
  position: "relative",
});
