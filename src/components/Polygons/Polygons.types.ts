import type { Feature, Polygon } from "geojson";

export interface TProps {
  items: Feature<Polygon>[];
}
