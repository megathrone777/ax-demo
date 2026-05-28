import { useMap } from "@vis.gl/react-maplibre";
import { LngLat, LngLatBounds } from "maplibre-gl";

import type { TUseMapFit } from "./types";

const useMapFit: TUseMapFit = (mapID) => {
  const { [mapID]: map } = useMap();

  return (items: TVehicle[]) => {
    const bounds: LngLatBounds = new LngLatBounds();
    const coordinates: number[][] = items.flatMap(
      ({
        data: {
          position: { lat, lon },
        },
      }): number[][] => [[lon, lat]],
    );

    for (const coordinate of coordinates) {
      bounds.extend(new LngLat(coordinate[0]!, coordinate[1]!));
    }

    if (map) {
      map.fitBounds([bounds.getNorthWest(), bounds.getSouthEast()], {
        animate: true,
        bearing: 0,
        duration: 200,
        linear: true,
        maxZoom: 14,
        padding: 35,
        pitch: 0,
      });
    }
  };
};

export { useMapFit };
