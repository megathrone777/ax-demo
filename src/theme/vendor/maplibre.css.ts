import { globalStyle } from "@/theme";

globalStyle(".maplibregl-map", {
  overflow: "hidden",
  position: "relative",
  WebkitTapHighlightColor: "rgb(0 0 0/0)",
});

globalStyle(".maplibregl-canvas-container, .maplibregl-canvas", {
  display: "block",
  height: "100%",
  insetInline: 0,
  position: "absolute",
  top: 0,
  width: "100%",
});

globalStyle(".maplibregl-canvas-container.maplibregl-interactive", {
  cursor: "grab",
  userSelect: "none",
});

globalStyle(".maplibregl-canvas-container.maplibregl-interactive.maplibregl-track-pointer", {
  cursor: "pointer",
});

globalStyle(".maplibregl-canvas-container.maplibregl-interactive:active", {
  cursor: "grabbing",
});

globalStyle(".maplibregl-marker", {
  cursor: "pointer",
  position: "absolute",
  willChange: "transform",
});

globalStyle(".maplibregl-marker:hover", {
  filter: "contrast(130%)",
});

globalStyle(".maplibregl-ctrl-top-right", ({ devices }) => ({
  position: "absolute",
  right: 8,
  top: 38,

  "@media": {
    [devices.desktop]: {
      right: 5,
      top: 30,
    },
  },
}));

globalStyle(".maplibregl-ctrl-top-left", ({ devices }) => ({
  left: 8,
  position: "absolute",
  top: 8,

  "@media": {
    [devices["desktop"]]: {
      left: 5,
      top: 5,
    },
  },
}));

globalStyle(".maplibregl-ctrl-bottom-right", ({ colors, devices, fonts }) => ({
  bottom: 8,
  color: colors.orangeDarker,
  display: "inline-block",
  fontSize: 12,
  fontWeight: fonts.extraBold,
  position: "absolute",
  right: 8,
  zIndex: 1,

  "@media": {
    [devices.desktop]: {
      bottom: 5,
      right: 5,
    },
  },
}));

globalStyle(".maplibregl-ctrl-bottom-right::after", ({ colors }) => ({
  backgroundColor: colors.orangeDarker,
  content: "''",
  display: "block",
  height: 3,
  width: "inherit",
}));

globalStyle(".maplibregl-ctrl-group, .mapboxgl-ctrl-group", ({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: 8,
  rowGap: 8,

  "@media": {
    [devices.desktop]: {
      marginBottom: 5,
      rowGap: 5,
    },
  },
}));

globalStyle(".maplibregl-ctrl-icon", ({ devices }) => ({
  backgroundPosition: "center center",
  backgroundSize: "100% 100%",
  display: "block",
  height: 20,
  overflow: "hidden",
  width: 20,

  "@media": {
    [devices.desktop]: {
      height: 18,
      width: 18,
    },

    [devices.mobile]: {
      height: 16,
      width: 16,
    },
  },
}));

globalStyle(".maplibregl-ctrl > button.maplibregl-ctrl-compass > .maplibregl-ctrl-icon", {
  backgroundImage: `
    url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23a9aaae' d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7         69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z'/%3E%3C/svg%3E")
  `,
});

globalStyle(".maplibregl-ctrl > button.maplibregl-ctrl-terrain > .maplibregl-ctrl-icon", {
  backgroundImage: `
    url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M256 32c12.5 0 24.1 6.4 30.8 17L503.4 394.4c5.6 8.9 8.6 19.2 8.6 29.7c0 30.9-25 55.9-55.9 55.9H55.9C25 480 0 455 0 424.1c0-10.5         3-20.8 8.6-29.7L225.2 49c6.6-10.6 18.3-17 30.8-17zm65 192L256 120.4 176.9 246.5l18.3         24.4c6.4 8.5 19.2 8.5 25.6 0l25.6-34.1c6-8.1 15.5-12.8 25.6-12.8h49z' fill='%23a9aaae'/%3E%3C/svg%3E")
  `,
});

globalStyle(".maplibregl-ctrl > button.maplibregl-ctrl-terrain-enabled", ({ colors }) => ({
  backgroundColor: colors.grayLightest,
}));

globalStyle(".maplibregl-ctrl > button.maplibregl-ctrl-terrain-enabled > .maplibregl-ctrl-icon", {
  backgroundImage: `
    url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M256 32c12.5 0 24.1 6.4 30.8 17L503.4 394.4c5.6 8.9 8.6 19.2 8.6 29.7c0 30.9-25 55.9-55.9 55.9H55.9C25 480 0 455 0 424.1c0-10.5         3-20.8 8.6-29.7L225.2 49c6.6-10.6 18.3-17 30.8-17zm65 192L256 120.4 176.9 246.5l18.3 24.4c6.4 8.5 19.2 8.5 25.6 0l25.6-34.1c6-8.1 15.5-12.8 25.6-12.8h49z' fill='%23161922'/%3E%3C/svg%3E")
  `,
});

globalStyle(".maplibregl-ctrl > button.maplibregl-ctrl-zoom-in > .maplibregl-ctrl-icon", {
  backgroundImage: `
    url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z' fill='%23a9aaae' /%3E%3C/svg%3E")
  `,
});

globalStyle(".maplibregl-ctrl > button.maplibregl-ctrl-zoom-out > .maplibregl-ctrl-icon", {
  backgroundImage: `
    url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M0 10h24v4h-24z' fill='%23a9aaae' /%3E%3C/svg%3E")
  `,
});

globalStyle(
  `
    .maplibregl-ctrl-zoom-in,
    .maplibregl-ctrl-zoom-out,
    .maplibregl-ctrl-compass,
    .maplibregl-ctrl-terrain,
    .maplibregl-ctrl-terrain-enabled,
    .mapbox-gl-draw_ctrl-draw-btn
  `,
  ({ colors, devices }) => ({
    alignItems: "center",
    backgroundColor: colors.grayDarkest,
    border: `1px solid ${colors.black}`,
    borderRadius: 5,
    cursor: "pointer",
    display: "flex",
    height: 40,
    justifyContent: "center",
    width: 40,

    "@media": {
      [devices.desktop]: {
        height: 38,
        width: 38,
      },

      [devices.mobile]: {
        height: 36,
        width: 36,
      },
    },
  }),
);

globalStyle(
  `
    .maplibregl-ctrl-zoom-in:hover,
    .maplibregl-ctrl-zoom-out:hover,
    .maplibregl-ctrl-compass:hover,
    .maplibregl-ctrl-terrain:hover,
    .maplibregl-ctrl-terrain-enabled:hover,
    .mapbox-gl-draw_ctrl-draw-btn:hover
  `,
  ({ colors }) => ({
    backgroundColor: colors.grayLighter,
  }),
);
