import { css } from "@/theme";

export const selectWrapperClass = css({
  marginBottom: 10,

  ":last-of-type": {
    marginBottom: 0,
  },
});

export const labelClass = css({
  display: "inline-block",
  marginBottom: 5,
});

export const selectClass = css(({ colors }) => ({
  appearance: "none",
  backgroundColor: colors.blackLighter,
  borderRadius: 5,
  color: colors.whiteDarker,
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: 18,
  height: 40,
  paddingInline: 5,
  width: "100%",
}));
