import React from "react";
import { Layer, Source } from "@vis.gl/react-maplibre";

import { useTheme } from "@/hooks";

const Tiles: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <Source
        tiles={[
          `https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${import.meta.env.APP_THUNDERFOREST_API_KEY}`,
        ]}
        type="raster"
      >
        <Layer type="raster" />
      </Source>

      <Source
        type="raster-dem"
        url={`https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${import.meta.env.APP_MAPTILER_API_KEY}`}
      >
        <Layer
          paint={{
            "hillshade-shadow-color": colors.grayDarker,
          }}
          type="hillshade"
        />
      </Source>
    </>
  );
};

export { Tiles };
