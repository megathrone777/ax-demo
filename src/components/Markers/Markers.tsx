import React from "react";
import { point } from "@turf/helpers";
import { Layer, Source } from "@vis.gl/react-maplibre";

import { useTheme } from "@/hooks";

import type { FeatureCollection, Point } from "geojson";
import type { TProps } from "./Markers.types";

const Markers: React.FC<TProps> = ({ positions }) => {
  const { colors } = useTheme();

  const getMarkers = (): FeatureCollection<Point, { delay: string }> => ({
    features: [...positions].map(({ geometry: { coordinates }, properties: { delay } }) =>
      point(coordinates, {
        delay: delay === "0" ? "" : `+${delay}m`,
      }),
    ),
    type: "FeatureCollection",
  });

  return (
    <Source
      data={getMarkers()}
      type="geojson"
    >
      <Layer
        id="destinations-layer"
        layout={{
          "icon-ignore-placement": true,
          "icon-image": "destination",
          "icon-size": 0.5,
          "text-allow-overlap": false,
          "text-anchor": "top",
          "text-field": ["get", "delay"],
          "text-ignore-placement": true,
          "text-offset": [0, -2],
          "text-optional": true,
          "text-size": 15,
        }}
        paint={{
          "text-color": colors.red,
        }}
        type="symbol"
      />
    </Source>
  );
};

export { Markers };
