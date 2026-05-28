import React, { useState } from "react";
import { useMap } from "@vis.gl/react-maplibre";

import { Icon } from "@/ui";

import { buttonClass } from "./SatelliteSwitcher.css";

import type { TProps } from "./SatelliteSwitcher.types";

const SatelliteSwitcher: React.FC<TProps> = ({ layer }) => {
  const [isActive, toggleActive] = useState<boolean>(false);
  const { current: map } = useMap();

  const handleSatelliteToggle = (): void => {
    toggleActive((prevState: boolean): boolean => {
      if (map) {
        map.getMap().setLayoutProperty(layer, "visibility", prevState ? "none" : "visible");
      }

      return !prevState;
    });
  };

  return (
    <button
      className={buttonClass[isActive ? "active" : "inactive"]}
      onClick={handleSatelliteToggle}
      type="button"
    >
      <Icon id="satellite" />
    </button>
  );
};

export { SatelliteSwitcher };
