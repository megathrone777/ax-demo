import { css } from "@/theme";

export const wrapperClass = css(({ colors }) => ({
  borderBottom: `1px solid ${colors.black}`,
  flexGrow: 1,
}));

export const contentClass = css({
  display: "flex",
  height: "100%",
});
