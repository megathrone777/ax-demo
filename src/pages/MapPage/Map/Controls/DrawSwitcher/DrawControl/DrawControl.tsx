import { useEffect } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "@vis.gl/react-maplibre";
import { enable } from "mapbox-gl-draw-waypoint";

import { DirectSelectMode } from "./DirectSelectMode";
import { styles } from "./styles";

import type React from "react";
import type { DrawModeChangeEvent, MapboxDrawOptions } from "@mapbox/mapbox-gl-draw";
import type { IControl, MapRef } from "@vis.gl/react-maplibre";
import type { TProps } from "./DrawControl.types";

type MapboxDrawControl = MapboxDraw & IControl;

const DrawControl: React.FC<TProps> = ({
  id,
  lineString,
  onCreate,
  onUpdate,
  polygons,
  position,
}) => {
  const draw = useControl<MapboxDrawControl>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => {
      const modes: MapboxDrawOptions["modes"] = enable(
        {
          ...MapboxDraw.modes,
          [MapboxDraw.constants.modes.DIRECT_SELECT]: DirectSelectMode,
        },
        (): boolean => false,
      );

      return new MapboxDraw({
        boxSelect: true,
        clickBuffer: 10,
        controls: {
          [MapboxDraw.constants.types.LINE]: true,
          polygon: true,
        },
        defaultMode: MapboxDraw.constants.modes.SIMPLE_SELECT,
        displayControlsDefault: false,
        keybindings: true,
        modes,
        styles,
        touchBuffer: 30,
        touchEnabled: true,
      });
    },

    ({ map }: { map: MapRef }): void => {
      map.on("draw.create", onCreate);
      map.on("draw.modechange", handleDrawModeChange);
      map.on("draw.polygondelete", handlePolygonDelete);
      map.on("draw.polygonedit", handlePolygonEdit);
      map.on("draw.update", onUpdate);
    },

    ({ map }: { map: MapRef }): void => {
      map.off("draw.create", onCreate);
      map.off("draw.modechange", handleDrawModeChange);
      map.off("draw.polygondelete", handlePolygonDelete);
      map.off("draw.polygonedit", handlePolygonEdit);
      map.off("draw.update", onUpdate);
    },

    {
      position,
    },
  );

  const handleDrawModeChange = ({ mode, target }: DrawModeChangeEvent): void => {
    if (mode === "draw_line_string") {
      const line = draw.get(`line-string-${id}`);

      if (line && line.geometry.type === "LineString") {
        const { geometry } = line;

        draw.changeMode("draw_line_string", {
          featureId: `line-string-${id}`,
          from: geometry.coordinates[geometry.coordinates.length - 1],
        });
      }
    }

    if (mode === "direct_select" || mode === "draw_line_string") {
      target.setLayoutProperty("destinations-layer", "visibility", "none");
    }

    if (mode !== "direct_select") {
      target.setLayoutProperty("destinations-layer", "visibility", "visible");
    }
  };

  const handlePolygonEdit = ({ polygonId }: { polygonId: string }): void => {
    draw.changeMode("direct_select", {
      featureId: polygonId,
    });
  };

  const handlePolygonDelete = ({ polygonId }: { polygonId: string }): void => {
    draw.delete(polygonId);
  };

  useEffect((): void => {
    const featureIds = draw.set({
      features: [
        {
          geometry: {
            coordinates: lineString,
            type: "LineString",
          },
          id: `line-string-${id}`,
          properties: {},
          type: "Feature",
        },
        ...polygons,
      ],
      type: "FeatureCollection",
    });

    if (!!lineString.length) {
      if (draw.getMode() === "draw_line_string") {
        draw.changeMode("direct_select", {
          featureId: `${featureIds[0]}`,
        });
      }

      return;
    }

    if (lineString.length === 0) {
      draw.changeMode("draw_line_string");
    }
  }, [lineString]);

  useEffect((): void => {
    if (lineString.length === 0) {
      draw.changeMode("draw_line_string");
    }
  }, []);

  return null;
};

export { DrawControl };
