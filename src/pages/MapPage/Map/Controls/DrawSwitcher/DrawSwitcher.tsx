import React from "react";
import { point } from "@turf/helpers";

import { useBoundary, useDestination, useAppContext } from "@/hooks";

import { DrawControl } from "./DrawControl";

import type { DrawCreateEvent, DrawUpdateEvent } from "@mapbox/mapbox-gl-draw";
import type { Position } from "geojson";
import type { TProps } from "./DrawSwitcher.types";

const DrawSwitcher: React.FC<TProps> = ({ position }) => {
  const { actions } = useAppContext();
  const { polygons } = useBoundary();
  const { id, name, positions } = useDestination();

  const lineString: Position[] = positions.map<Position>(
    ({ geometry: { coordinates } }) => coordinates,
  );

  const handleDrawCreate = ({ features }: DrawCreateEvent): void => {
    const { geometry, id: featureId, properties, type } = features[0]!;

    if (geometry.type === "LineString") {
      actions.addDestination({
        id,
        name,
        positions: geometry.coordinates.map<TDestinationPosition>((coordinate) =>
          point(coordinate, {
            delay: "0",
            id,
            name: "",
          }),
        ),
        waypoints: [],
      });

      return;
    }

    if (geometry.type === "Polygon") {
      actions.addBoundary({
        id,
        polygon: {
          geometry,
          id: featureId,
          properties,
          type,
        },
      });
    }
  };

  const handleDrawUpdate = ({ features }: DrawUpdateEvent): void => {
    const { geometry, id: featureId, type } = features[0]!;

    if (type === "Feature" && geometry.type === "LineString") {
      actions.updateDestination({
        coordinates: geometry.coordinates,
        id,
      });

      return;
    }

    if (type === "Feature" && geometry.type === "Polygon") {
      actions.updateBoundary({
        coordinates: geometry.coordinates,
        id,
        polygonId: `${featureId}`,
      });
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
