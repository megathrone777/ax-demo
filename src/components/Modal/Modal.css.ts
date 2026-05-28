import { css } from "@/theme";

export const overlayClass = css({
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  bottom: 0,
  cursor: "pointer",
  height: "100%",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
  width: "100%",
  zIndex: 400,
});

export const layoutClass = css(({ colors }) => ({
  backgroundColor: colors.blackDarker,
  borderRadius: 5,
  left: 0,
  marginInline: "auto",
  padding: 8,
  position: "fixed",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  transformOrigin: "center center",
  width: 300,
  willChange: "transform",
  zIndex: 2600,
}));

export const headingClass = css({
  alignItems: "center",
  display: "flex",
  height: 22,
  justifyContent: "space-between",
  marginBottom: 15,
});

export const closeClass = css(({ colors }) => ({
  backgroundColor: "transparent",
  color: colors.whiteDarker,
  cursor: "pointer",
  height: 22,
  right: 5,
  top: 5,
  width: 22,

  ":hover": {
    color: colors.whiteLighter,
  },
}));
