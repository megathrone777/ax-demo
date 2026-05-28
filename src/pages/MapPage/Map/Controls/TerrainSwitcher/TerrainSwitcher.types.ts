import type { ControlPosition } from "@vis.gl/react-maplibre";
import type { TerrainSpecification } from "maplibre-gl";

export interface TProps extends TerrainSpecification {
  position: ControlPosition;
}
