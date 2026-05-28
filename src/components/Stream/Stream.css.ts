import { css } from "@/theme";

export const videoClass = css({
  height: "100%",
  objectFit: "cover",
  width: "100%",
});

export const controlsClass = css({
  alignItems: "center",
  display: "flex",
  height: 30,
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "100%",
  zIndex: 2,
});

export const errorClass = css(({ colors }) => ({
  color: colors.red,
  fontSize: 13,
  left: 0,
  position: "absolute",
  right: 0,
  textAlign: "center",
  top: "50%",
  transform: "translateY(-50%)",
  whiteSpace: "nowrap",
}));

export const pauseClass = css(({ colors }) => ({
  appearance: "none",
  backgroundColor: "transparent",
  color: colors.green,
  cursor: "pointer",
  height: "100%",
  width: 40,
}));
