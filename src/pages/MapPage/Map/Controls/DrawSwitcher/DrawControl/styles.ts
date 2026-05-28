import { colors } from "@/theme/variables";

import type { TStyle } from "./DrawControl.types";

export const styles = [
  {
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"],
    ],
    id: "gl-draw-polygon-fill-inactive",
    paint: {
      "fill-color": "transparent",
      "fill-opacity": 0,
    },
    type: "fill",
  },
  {
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    id: "gl-draw-polygon-fill-active",
    paint: {
      "fill-color": colors.red,
      "fill-opacity": 0.1,
      "fill-outline-color": colors.red,
    },
    type: "fill",
  },
  {
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    id: "gl-draw-polygon-midpoint",
    paint: {
      "circle-radius": 0,
    },
    type: "circle",
  },
  {
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"],
    ],
    id: "gl-draw-polygon-stroke-inactive",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "transparent",
      "line-width": 5,
    },
    type: "line",
  },
  {
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    id: "gl-draw-polygon-stroke-active",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "darkblue",
      "line-dasharray": [0.1, 2],
      "line-width": 5,
    },
    type: "line",
  },
  {
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"],
    ],
    id: "gl-draw-line-inactive",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "transparent",
      "line-width": 5,
    },
    type: "line",
  },
  {
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
    id: "gl-draw-line-active",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "darkblue",
      "line-dasharray": [0.1, 2],
      "line-width": 5,
    },
    type: "line",
  },
  {
    filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
    id: "gl-draw-polygon-and-line-vertex-halo-active",
    paint: {
      "circle-color": "green",
      "circle-radius": 12,
    },
    type: "circle",
  },
  {
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"],
    ],
    id: "gl-draw-point-point-stroke-inactive",
    paint: {
      "circle-color": "transparent",
      "circle-radius": 10,
    },
    type: "circle",
  },
  {
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"],
    ],
    id: "gl-draw-point-inactive",
    paint: {
      "circle-color": "transparent",
      "circle-radius": 10,
    },
    type: "circle",
  },
  {
    filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]],
    id: "gl-draw-point-stroke-active",
    paint: {
      "circle-color": "transparent",
      "circle-radius": 10,
    },
    type: "circle",
  },
  {
    filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]],
    id: "gl-draw-point-active",
    paint: {
      "circle-color": "red",
      "circle-radius": 10,
    },
    type: "circle",
  },
  {
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    id: "gl-draw-polygon-fill-static",
    paint: {
      "fill-color": "transparent",
      "fill-opacity": 0.1,
      "fill-outline-color": "transparent",
    },
    type: "fill",
  },
  {
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    id: "gl-draw-polygon-stroke-static",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "darkblue",
      "line-width": 5,
    },
    type: "line",
  },
  {
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
    id: "gl-draw-line-static",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "darkblue",
      "line-width": 5,
    },
    type: "line",
  },
  {
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
    id: "gl-draw-point-static",
    paint: {
      "circle-color": "darkblue",
      "circle-radius": 10,
    },
    type: "circle",
  },
] as unknown as TStyle["theme"];
