import { calc } from "@vanilla-extract/css-utils";

import { css } from "@/theme";

export const wrapperClass = css({
  display: "flex",
  flexDirection: "column",
  height: `${calc("100%").subtract("65px")}`,
  justifyContent: "center",
  marginInline: "auto",
  maxWidth: 300,
  textAlign: "center",
});

export const textClass = css(({ colors }) => ({
  color: colors.whiteDarker,
  fontSize: 22,
  marginBottom: 15,
  padding: 8,
}));
