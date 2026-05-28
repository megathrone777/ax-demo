import { globalStyle } from "@/theme";

globalStyle("a", {
  textDecoration: "none",
});

globalStyle("ol, ul", {
  listStyle: "none",
});

globalStyle("canvas, img, picture, video, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("p, h1, h2, h3, h4, h5, h6", {
  overflowWrap: "break-word",
});
