import React from "react";
import { useSubscription } from "rosreact";

import { useMapLocate } from "@/hooks";
import { topics } from "@/ros";
import { Icon } from "@/ui";

import { buttonClass, iconClass } from "./LocateControls.css";

const LocateControls: React.FC = () => {
  const { latitude, longitude } = useSubscription(topics.GPS) as TGPSData;
  const locatePoint = useMapLocate("mainMap");

  const handleCenterClick = (): void => {
    locatePoint([longitude, latitude]);
  };

  return (
    <button
      className={buttonClass}
      onClick={handleCenterClick}
      type="button"
    >
      <Icon
        className={iconClass}
        id="target"
      />
    </button>
  );
};

export { LocateControls };
