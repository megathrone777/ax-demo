import { useControl } from "@vis.gl/react-maplibre";

import type React from "react";
import type { TProps } from "./TerrainSwitcher.types";

const TerrainSwitcher: React.FC<TProps> = ({ position, ...props }) => {
  useControl(({ mapLib }) => new mapLib.TerrainControl(props), {
    position,
  });

  return null;
};

export { TerrainSwitcher };
