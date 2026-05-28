import React from "react";
import { lineString } from "@turf/helpers";
import { Layer, Source } from "@vis.gl/react-maplibre";
import { useSubscription } from "rosreact";

import { useTheme } from "@/hooks";
import { topics } from "@/ros";

import type { Feature, LineString, Position } from "geojson";
import type { TProps } from "./Lines.types";

const Lines: React.FC<TProps> = ({ positions }) => {
  const { colors } = useTheme();
  const { latitude, longitude } = useSubscription(topics.GPS) as TGPSData;

  const getLines = (): Feature<LineString> => {
    if (positions.length > 1) {
      return lineString([
        [longitude, latitude],
        ...positions.map(({ geometry: { coordinates } }): Position => coordinates),
      ]);
    }

    return lineString([[], []]);
  };

  return (
    <Source
      data={getLines()}
      type="geojson"
    >
      <Layer
        layout={{
          "line-cap": "round",
          "line-join": "round",
        }}
        paint={{
          "line-color": colors.orange,
          "line-width": 5,
        }}
        type="line"
      />
    </Source>
  );
};

export { Lines };
