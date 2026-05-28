declare module "mapbox-gl-draw-waypoint" {
  import type MapboxDraw from "@mapbox/mapbox-gl-draw";

  const enable: {
    (
      drawModes: MapboxDraw.Modes,
      preventFunction?: () => boolean,
    ): MapboxDraw.MapboxDrawOptions["modes"];
  };

  export { enable };
}
