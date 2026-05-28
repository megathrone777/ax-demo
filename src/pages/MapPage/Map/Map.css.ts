import { css } from "@/theme";

export const wrapperClass = css({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
});

export const loaderWrapperClass = css(({ colors }) => ({
  backgroundColor: colors.black,
  height: "100%",
  inset: 0,
  position: "absolute",
  width: "100%",
  zIndex: 3000,
}));
