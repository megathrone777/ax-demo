import React, { useMemo } from "react";
import { NavigationControl, ScaleControl } from "@vis.gl/react-maplibre";

import { useDestinations } from "@/hooks";

import { DrawSwitcher } from "./DrawSwitcher";
import { LocateControls } from "./LocateControls";
import { SatelliteSwitcher } from "./SatelliteSwitcher";
import { TerrainSwitcher } from "./TerrainSwitcher";

const Controls: React.FC = () => {
  const { id, name, positions } = useDestinations();

  const renderControls = useMemo((): null | React.ReactElement => {
    if (id) {
      return (
        <>
          {name && positions && <DrawSwitcher position="top-right" />}
          <LocateControls />
        </>
      );
    }

    return null;
  }, [id, name, positions]);

  return (
    <>
      <NavigationControl
        position="top-left"
        showCompass
        showZoom
        visualizePitch
      />

      <ScaleControl position="bottom-right" />

      <TerrainSwitcher
        exaggeration={2.5}
        position="top-left"
        source="terrain"
      />

      <SatelliteSwitcher layer="satellite" />
      {renderControls}
    </>
  );
};

export { Controls };
