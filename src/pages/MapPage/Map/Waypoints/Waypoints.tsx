import React from "react";

import { Distances, Lines, Markers, Polygons, Stream } from "@/components";
import { useBoundaries, useDestinations } from "@/hooks";

import { streamClass } from "./Waypoints.css";

const Waypoints: React.FC = () => {
  const { polygons } = useBoundaries();
  const { positions } = useDestinations();

  return (
    <>
      <Lines {...{ positions }} />
      <Distances {...{ positions }} />
      <Markers {...{ positions }} />
      <Polygons items={[...polygons]} />

      <div className={streamClass}>
        <Stream
          direction="front"
          showControls={false}
        />
      </div>
    </>
  );
};

export { Waypoints };
