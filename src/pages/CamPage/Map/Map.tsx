import React, { useEffect, useState } from "react";
import { Map as ReactMap } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import { useSubscription } from "rosreact";

import { Tiles } from "@/components";
import { useMapImage, useMapLocate } from "@/hooks";
import { topics } from "@/ros";
import { Spinner } from "@/ui";

import { Controls } from "./Controls";
import { Waypoints } from "./Waypoints";

import { wrapperClass, layoutClass, loaderWrapperClass } from "./Map.css";

const Map: React.FC = () => {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const { latitude, longitude } = useSubscription(topics.GPS) as TGPSData;
  const setImage = useMapImage("controlsMap");
  const locatePoint = useMapLocate("controlsMap");

  const handleMapLoaded = (): void => {
    setImage("images/destination_icon.png", "destination");
    setImage("images/polygon_bg.png", "pattern");
    locatePoint([longitude, latitude], 14);
    toggleLoading(false);
  };

  useEffect((): VoidFunction => {
    return (): void => {
      locatePoint([longitude, latitude], 14);
    };
  }, []);

  return (
    <div className={wrapperClass}>
      <div className={layoutClass}>
        <ReactMap
          attributionControl={false}
          crossSourceCollisions={false}
          id="controlsMap"
          keyboard={false}
          mapLib={maplibregl}
          mapStyle="map.json"
          maxPitch={70}
          onLoad={handleMapLoaded}
          reuseMaps={false}
          scrollZoom={{
            around: "center",
          }}
        >
          <Tiles />
          <Controls />
          <Waypoints />
        </ReactMap>
      </div>

      {isLoading && (
        <div className={loaderWrapperClass}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export { Map };
