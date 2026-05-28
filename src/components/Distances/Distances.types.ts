import type { Feature, GeoJsonProperties, Point } from "geojson";

export interface TProps {
  positions: Feature<Point, GeoJsonProperties>[];
}
