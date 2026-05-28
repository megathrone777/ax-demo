import { css } from "@/theme";

export const labelClass = css({
  alignItems: "center",
  cursor: "pointer",
  display: "flex",
  width: 25,

  ":hover": {
    filter: "brightness(130%)",
  },
});

export const inputClass = css({
  display: "none",
});

export const iconClass = css({
  height: 25,
});
