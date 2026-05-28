import { css } from "@/theme";

export const wrapperClass = css({
  bottom: 20,
  height: 200,
  left: 0,
  marginInline: "auto",
  position: "absolute",
  right: 0,
  width: "calc(100% - 400px)",
  zIndex: 1,
});

export const layoutClass = css({
  height: "100%",
  position: "relative",
  width: "100%",
});

export const loaderWrapperClass = css(({ colors }) => ({
  backgroundColor: colors.black,
  bottom: 0,
  height: "100%",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
  width: "100%",
  zIndex: 300,
}));
