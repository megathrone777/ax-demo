import React, { useCallback } from "react";
import center from "@turf/center";
import { lineString, point, points } from "@turf/helpers";
import lineLength from "@turf/length";
import { Layer, Source } from "@vis.gl/react-maplibre";

import { useTheme } from "@/hooks";

import type { Feature, FeatureCollection, Point, Position } from "geojson";
import type { TProps } from "./Distances.types";

const Distances: React.FC<TProps> = ({ positions }) => {
  const { colors } = useTheme();

  const calculateDistance = useCallback(
    (
      startPosition: Position,
      endPosition: Position,
    ): {
      distance: number;
      geometry: Point;
    } => {
      const line = lineString([startPosition, endPosition]);
      const distance = lineLength(line, { units: "meters" });
      const { geometry } = center(points([startPosition, endPosition]));

      return {
        distance,
        geometry,
      };
    },
    [positions],
  );

  const getDistances = (): FeatureCollection<Point> => ({
    features: [...positions].map(
      ({ geometry: { coordinates } }, index, currentFeatures): Feature<Point> => {
        if (currentFeatures[index + 1]) {
          const {
            distance,
            geometry: {
              coordinates: [longitude, latitude],
            },
          } = calculateDistance(coordinates, currentFeatures[index + 1]!.geometry.coordinates);

          return point([longitude!, latitude!], {
            title:
              distance > 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance.toFixed(2)}m`,
          });
        }

        return point([0, 0]);
      },
    ),
    type: "FeatureCollection",
  });

  return (
    <Source
      data={getDistances()}
      type="geojson"
    >
      <Layer
        layout={{
          "text-allow-overlap": false,
          "text-anchor": "center",
          "text-field": ["get", "title"],
          "text-rotation-alignment": "auto",
          "text-size": 14,
        }}
        paint={{
          "text-color": colors.white,
          "text-halo-color": colors.black,
          "text-halo-width": 10,
          "text-translate-anchor": "map",
        }}
        type="symbol"
      />
    </Source>
  );
};

export { Distances };
