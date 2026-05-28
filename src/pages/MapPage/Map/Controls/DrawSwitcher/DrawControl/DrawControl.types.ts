import type { DrawCreateEvent, DrawUpdateEvent, Lib, ThemeLayerId } from "@mapbox/mapbox-gl-draw";
import type {
  ControlPosition,
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
} from "@vis.gl/react-maplibre";
import type { Feature, GeoJsonProperties, Polygon, Position } from "geojson";

export interface TStyle extends Omit<Lib, "theme"> {
  theme: ((CircleLayerSpecification | FillLayerSpecification | LineLayerSpecification) & {
    id: "gl-draw-polygon-and-line-vertex-halo-active" | ThemeLayerId;
  })[];
}

export interface TProps {
  id: number;
  lineString: Position[];
  onCreate: (event: DrawCreateEvent) => void;
  onUpdate: (event: DrawUpdateEvent) => void;
  polygons: Feature<Polygon, GeoJsonProperties>[];
  position: ControlPosition;
}
