import { keyframes } from "@vanilla-extract/css";

import { css, cssVariant, globalStyle } from "@/theme";

const wave = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0)",
  },

  "1%": {
    opacity: 1,
  },

  "10%": {
    backgroundColor: "rgba(203, 95, 0, 0.4)",
  },

  "100%": {
    backgroundColor: "rgba(203, 95, 0, 0)",
    transform: "scale(1)",
  },
});

export const tooltipClass = css(({ colors }) => ({
  backgroundColor: colors.blackDarker,
  borderRadius: 5,
  bottom: "calc(50% + 15px)",
  color: colors.orange,
  display: "none",
  flexDirection: "column",
  fontSize: 12,
  padding: 5,
  position: "absolute",
  zIndex: 2,
}));

export const tooltipTextClass = css({
  whiteSpace: "nowrap",
});

export const wrapperClass = css({
  alignItems: "center",
  display: "flex",
  height: 18,
  justifyContent: "center",
  position: "relative",
  width: 18,
});

export const iconClass = css(({ colors }) => ({
  borderRadius: 3,
  color: colors.orangeDarker,
  height: 18,
  width: 18,
}));

export const layoutClass = css({
  alignItems: "center",
  display: "flex",
  height: 80,
  justifyContent: "center",
  pointerEvents: "none",
  position: "absolute",
  transform: "rotate(var(--angle, 0deg))",
  transformOrigin: "50% 50%",
  transition: "transform .2s linear",
  width: 80,
});

export const waveClass = cssVariant(
  {
    primary: "0.9s",
    secondary: "1.07s",
  },

  (animationDelay) => ({
    animationDelay,
    animationDuration: "3s",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
    animationName: wave,
    animationTimingFunction: "cubic-bezier(0, 0.54, 0.53, 1)",
    backgroundColor: "rgba(203, 95, 0, 0.4)",
    borderRadius: 200,
    bottom: 0,
    display: "block",
    height: 80,
    left: 0,
    marginInline: "auto",
    opacity: 0,
    position: "absolute",
    right: 0,
    top: 0,
    transformOrigin: "50% 50%",
    width: 80,
  }),
);

export const angleClass = css({
  alignItems: "flex-start",
  bottom: 0,
  display: "flex",
  height: 60,
  justifyContent: "center",
  left: 0,
  margin: "auto",
  position: "absolute",
  right: 0,
  top: 0,
  width: 60,

  "::before": {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z' fill='%23fb1f1f' /%3E%3C/svg%3E\")",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    content: "''",
    display: "block",
    height: 20,
    transform: "rotate(-45deg)",
    width: 20,
  },
});

globalStyle(`${wrapperClass}:hover > ${tooltipClass}`, ({ devices }) => ({
  "@media": {
    [devices.pointerFine]: {
      display: "inline-flex",
    },
  },
}));
