import React from "react";
import { useSubscription } from "rosreact";

import { useMapLocate } from "@/hooks";
import { topics } from "@/ros";
import { Icon } from "@/ui";

import { centerClass, iconClass } from "./Controls.css";

const Controls: React.FC = () => {
  const { latitude, longitude } = useSubscription(topics.GPS) as TGPSData;
  const locatePoint = useMapLocate("controlsMap");

  const handleCenterClick = (): void => {
    locatePoint([longitude, latitude]);
  };

  return (
    <button
      className={centerClass}
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

export { Controls };
