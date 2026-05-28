import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Marker } from "@vis.gl/react-maplibre";
import { useRos, useSubscription } from "rosreact";

import { Distances, Lines, Markers, Polygons } from "@/components";
import { useBoundaries, useDestinations, useMapLocate } from "@/hooks";
import { topics } from "@/ros";
import { MarkerWave } from "@/ui";

const Waypoints: React.FC = () => {
  const locatePoint = useMapLocate("mainMap");
  const { id } = useParams();
  const [enabled, toggleEnabled] = useState<boolean>();
  const { isConnected } = useRos();
  const { heading: angle } = useSubscription(topics.HEADING) as { heading: number };
  const { latitude, longitude, speed } = useSubscription(topics.GPS) as TGPSData;
  const { polygons } = useBoundaries();
  const { positions } = useDestinations();

  const handleMapUpdate = (): void => {
    locatePoint([longitude, latitude]);
  };

  const handleMapUpdateRef = useRef(handleMapUpdate);

  handleMapUpdateRef.current = handleMapUpdate;

  useEffect((): void => {
    if (isConnected) {
      toggleEnabled(true);

      return;
    }

    toggleEnabled(false);
  }, [isConnected]);

  useEffect((): void | VoidFunction => {
    if (!enabled) return;

    const intervalId = setInterval((): void => {
      handleMapUpdateRef.current();
    }, 7000);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [enabled]);

  return (
    <>
      <Lines {...{ positions }} />
      <Distances {...{ positions }} />
      <Markers {...{ positions }} />
      <Polygons items={[...polygons]} />

      <Marker
        anchor="center"
        {...{ latitude, longitude }}
      >
        <MarkerWave
          {...{ angle }}
          isActive
          tooltips={[`ID: ${id}`, `IP: ${import.meta.env.APP_VEHICLE_IP}`, `${speed} m/s`]}
        />
      </Marker>
    </>
  );
};

export { Waypoints };
