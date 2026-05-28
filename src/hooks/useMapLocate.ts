import { useMap } from "@vis.gl/react-maplibre";
import { LngLat } from "maplibre-gl";

import type { Position } from "geojson";

const useMapLocate = (mapId: TMapId) => {
  const { [mapId]: map } = useMap();

  return ([longitude, latitude]: Position, zoom?: number): void => {
    const defaults = {
      center: new LngLat(longitude!, latitude!),
      duration: 200,
    };

    if (map) {
      map.easeTo({
        ...defaults,
        zoom: zoom ? zoom : map.getZoom(),
      });
    }
  };
};

export { useMapLocate };
