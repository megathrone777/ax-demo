import React from "react";
import circle from "@turf/circle";
import { points } from "@turf/helpers";
import { Layer, Source, useMap } from "@vis.gl/react-maplibre";

import { Tiles } from "@/components";
import { useAppContext, useTheme } from "@/hooks";

import { zoomClass } from "./Overlay.css";

const Overlay: React.FC = () => {
  const { mainMap } = useMap();
  const { colors } = useTheme();
  const { store } = useAppContext();
  const [zoom, setZoom] = React.useState(0);
  const { area, persons } = store;

  React.useEffect(() => {
    if (!mainMap) return;
    setZoom(mainMap.getZoom());
    const onZoom = (): void => setZoom(mainMap.getZoom());

    mainMap.on("zoom", onZoom);

    return (): void => {
      mainMap.off("zoom", onZoom);
    };
  }, [mainMap]);

  return (
    <>
      <Tiles />

      <Source
        id="terrain"
        type="raster-dem"
        url={`https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${import.meta.env.APP_MAPTILER_API_KEY}`}
      />

      <Source
        type="raster"
        url={`https://api.maptiler.com/tiles/satellite-v2/tiles.json?key=${import.meta.env.APP_MAPTILER_API_KEY}`}
      >
        <Layer
          id="satellite"
          layout={{ visibility: "none" }}
          type="raster"
        />
      </Source>

      {!!persons.length && (
        <Source
          data={points(persons)}
          type="geojson"
        >
          <Layer
            layout={{
              "icon-image": "person",
              "icon-size": 0.4,
            }}
            type="symbol"
          />
        </Source>
      )}

      {!!area.length && (
        <Source
          data={circle(area, 5, {
            steps: 0,
            units: "kilometers",
          })}
          type="geojson"
        >
          <Layer
            paint={{
              "fill-color": colors.yellow,
              "fill-opacity": 0.3,
            }}
            type="fill"
          />
        </Source>
      )}

      <span className={zoomClass}>{zoom.toFixed(4)}</span>
    </>
  );
};

export { Overlay };
