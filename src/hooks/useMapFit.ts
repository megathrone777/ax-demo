import { useMap } from "@vis.gl/react-maplibre";
import { LngLat, LngLatBounds } from "maplibre-gl";

const useMapFit = (mapId: TMapId) => {
  const { [mapId]: map } = useMap();

  return (vehicles: TVehicle[]): void => {
    const bounds: LngLatBounds = new LngLatBounds();
    const coordinates: number[][] = vehicles.flatMap(({ position: { lat, lon } }): number[][] => [
      [lon, lat],
    ]);

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
