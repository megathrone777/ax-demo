import React from "react";
import { point } from "@turf/helpers";

import { useBoundaries, useDestinations, useStore } from "@/hooks";
import type { TDelay } from "@/store";
import { addBoundary, addDestination, updateBoundary, updateDestination } from "@/store";

import { DrawControl } from "./DrawControl";

import type { DrawCreateEvent, DrawUpdateEvent } from "@mapbox/mapbox-gl-draw";
import type { Feature, Point, Position } from "geojson";
import type { TProps } from "./DrawSwitcher.types";

const DrawSwitcher: React.FC<TProps> = ({ position }) => {
  const { dispatch } = useStore();
  const { polygons } = useBoundaries();
  const { id, name, positions } = useDestinations();

  const lineString: Position[] = positions.map(
    ({ geometry: { coordinates } }): Position => coordinates,
  );

  const handleDrawCreate = ({ features }: DrawCreateEvent): void => {
    const { geometry, id: featureId, properties, type } = features[0]!;

    if (geometry.type === "LineString") {
      dispatch(
        addDestination({
          id,
          name,
          positions: geometry.coordinates.map(
            (coordinate): Feature<Point, { delay: TDelay; name: string }> =>
              point(coordinate, {
                delay: "0",
                id,
                name: "",
              }),
          ),
          waypoints: [],
        }),
      );

      return;
    }

    if (geometry.type === "Polygon") {
      dispatch(
        addBoundary({
          id,
          polygon: {
            geometry,
            id: featureId,
            properties,
            type,
          },
        }),
      );
    }
  };

  const handleDrawUpdate = ({ features }: DrawUpdateEvent): void => {
    const { geometry, id: featureId, type } = features[0]!;

    if (type === "Feature" && geometry.type === "LineString") {
      dispatch(
        updateDestination({
          coordinates: geometry.coordinates,
          id,
        }),
      );

      return;
    }

    if (type === "Feature" && geometry.type === "Polygon") {
      dispatch(
        updateBoundary({
          coordinates: geometry.coordinates,
          id,
          polygonId: `${featureId}`,
        }),
      );
    }
  };

  return (
    <DrawControl
      onCreate={handleDrawCreate}
      onUpdate={handleDrawUpdate}
      {...{ id, lineString, polygons, position }}
    />
  );
};

export { DrawSwitcher };
