import React from "react";
import { polygon } from "@turf/helpers";
import { Layer, Source } from "@vis.gl/react-maplibre";

import type { FeatureCollection, Polygon } from "geojson";
import type { TProps } from "./Polygons.types";

const Polygons: React.FC<TProps> = ({ items }) => {
  const getPolygons = (): FeatureCollection<Polygon> => ({
    features: items.map(({ geometry: { coordinates } }) => polygon(coordinates)),
    type: "FeatureCollection",
  });

  return (
    <Source
      data={getPolygons()}
      type="geojson"
    >
      <Layer
        paint={{
          "fill-opacity": 0.4,
          "fill-pattern": "pattern",
        }}
        type="fill"
      />
    </Source>
  );
};

export { Polygons };
