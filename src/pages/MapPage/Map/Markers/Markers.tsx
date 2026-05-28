import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Marker } from "@vis.gl/react-maplibre";
import { useSubscription } from "rosreact";

import { useMapLocate } from "@/hooks";
import { topics } from "@/ros";
import { MarkerWave } from "@/ui";

const Markers: React.FC = () => {
  const locatePoint = useMapLocate("mainMap");
  const navigate = useNavigate();
  const { heading: angle } = useSubscription(topics.HEADING) as { heading: number };
  const { latitude, longitude, speed } = useSubscription(topics.GPS) as TGPSData;
  const { id } = useParams();

  console.log(speed);

  const handleMarkerClick = (): void => {
    navigate("/map/1", { replace: true });
    locatePoint([longitude, latitude]);
  };

  return (
    <Marker
      anchor="center"
      onClick={handleMarkerClick}
      {...{ latitude, longitude }}
    >
      <MarkerWave
        {...{ angle }}
        isActive={id === "1"}
        tooltips={[
          `lat: ${latitude.toFixed(5)} | lon: ${longitude.toFixed(5)}`,
          `IP: ${import.meta.env.APP_VEHICLE_IP}`,
          `${speed.toFixed(3)} m/s | 7.5K m MSL`,
        ]}
      />
    </Marker>
  );
};

export { Markers };
