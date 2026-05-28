import type { Feature, Point } from "geojson";

export interface TProps {
  positions: Feature<Point, { delay: string }>[];
}
