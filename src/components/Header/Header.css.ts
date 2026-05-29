import { css } from "@/theme";

export const wrapperClass = css(({ colors, devices }) => ({
  alignItems: "center",
  backgroundColor: colors.blackDarker,
  borderBottom: "1px solid black",
  boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",
  display: "flex",
  height: 65,
  minHeight: 65,

  "@media": {
    [devices.desktop]: {
      borderBottom: "none",
      height: 50,
      minHeight: 50,
    },
  },
}));
