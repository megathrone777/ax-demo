import React, { useState } from "react";
import { Map as ReactMap } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import { useSubscription } from "rosreact";

import { useDestinations, useMapImage, useMapLocate } from "@/hooks";
import { topics } from "@/ros";
import { Spinner } from "@/ui";
import "@/theme/vendor";

import { Controls } from "./Controls";
import { Markers } from "./Markers";
import { Overlay } from "./Overlay";
import { Waypoints } from "./Waypoints";

import { wrapperClass, loaderWrapperClass } from "./Map.css";

const Map: React.FC = () => {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const locatePoint = useMapLocate("mainMap");
  const setImage = useMapImage("mainMap");
  const { id } = useDestinations();
  const { latitude, longitude } = useSubscription(topics.GPS) as TGPSData;

  const handleMapResize = (): void => {
    locatePoint([longitude, latitude], 14);
  };

  const handleMapLoaded = (): void => {
    setImage("images/person_icon.png", "person");
    setImage("images/destination_icon.png", "destination");
    setImage("images/polygon_bg.png", "pattern");
    locatePoint([longitude, latitude], 14);
    toggleLoading(false);
  };

  return (
    <div className={wrapperClass}>
      <ReactMap
        attributionControl={false}
        crossSourceCollisions={false}
        id="mainMap"
        mapLib={maplibregl}
        mapStyle="map.json"
        maxPitch={70}
        onLoad={handleMapLoaded}
        onResize={handleMapResize}
        reuseMaps
        scrollZoom={{
          around: "center",
        }}
      >
        <Overlay />
        <Controls />
        <Markers />
        {id && <Waypoints />}

        {isLoading && (
          <div className={loaderWrapperClass}>
            <Spinner />
          </div>
        )}
      </ReactMap>
    </div>
  );
};

export { Map };
