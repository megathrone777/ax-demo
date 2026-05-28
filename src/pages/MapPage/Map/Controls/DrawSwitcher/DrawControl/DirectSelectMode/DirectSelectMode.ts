import MapboxDraw from "@mapbox/mapbox-gl-draw";

import type { TGeoJson, TState } from "./DirectSelectMode.types";

const DirectSelectMode = MapboxDraw.modes.direct_select;

DirectSelectMode.toDisplayFeatures = (state: TState, geojson: TGeoJson, display): void => {
  if (state.featureId === geojson.properties.id) {
    geojson.properties.active = MapboxDraw.constants.activeStates.ACTIVE;
    display(geojson);

    MapboxDraw.lib
      .createSupplementaryPoints(geojson, {
        midpoints: false,
        selectedPaths: state.selectedCoordPaths,
      })
      .forEach(display);
  } else {
    geojson.properties.active = MapboxDraw.constants.activeStates.INACTIVE;
    display(geojson);
  }
};

export { DirectSelectMode };
