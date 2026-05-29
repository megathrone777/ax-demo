import React from "react";

import { Distances, Lines, Markers, Polygons, Stream } from "@/components";
import { useBoundary, useDestination } from "@/hooks";

import { streamClass } from "./Waypoints.css";

const Waypoints: React.FC = () => {
  const { polygons } = useBoundary();
  const { positions } = useDestination();

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
