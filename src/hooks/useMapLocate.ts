import { useMap } from "@vis.gl/react-maplibre";
import { LngLat } from "maplibre-gl";

import type { TUseMapLocate } from "./types";

const useMapLocate: TUseMapLocate = (mapID) => {
  const { [mapID]: map } = useMap();

  return ([longitude, latitude], zoom) => {
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
