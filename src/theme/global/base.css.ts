import { globalStyle } from "@/theme";

globalStyle("::-webkit-scrollbar", ({ colors }) => ({
  backgroundColor: colors.whiteDarkest,
  width: 5,
}));

globalStyle("::-webkit-scrollbar-thumb", ({ colors }) => ({
  backgroundColor: colors.whiteLighter,
}));

globalStyle("body", {
  MozOsxFontSmoothing: "grayscale",
  WebkitFontSmoothing: "antialiased",
});

globalStyle("button", {
  cursor: "pointer",
});

globalStyle("b", ({ fonts }) => ({
  fontWeight: fonts.bold,
}));

globalStyle("img", {
  maxWidth: "100%",
});

globalStyle("svg", {
  height: "100%",
  width: "100%",
});
