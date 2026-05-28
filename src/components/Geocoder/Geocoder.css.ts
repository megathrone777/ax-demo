import { css } from "@/theme";

export const wrapperClass = css({
  position: "relative",
  width: "100%",
});

export const loaderWrapperClass = css({
  position: "absolute",
  right: 35,
  top: "50%",
  transform: "translateY(-50%)",
});

export const clearClass = css(({ colors }) => ({
  appearance: "none",
  backgroundColor: "transparent",
  color: colors.whiteDarker,
  cursor: "pointer",
  height: 20,
  padding: 0,
  position: "absolute",
  right: 15,
  top: "50%",
  transform: "translateY(-50%)",
  width: 20,

  ":hover": {
    color: colors.whiteLighter,
  },
}));
