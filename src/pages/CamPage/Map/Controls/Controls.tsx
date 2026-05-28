import React from "react";
import { useSubscription } from "rosreact";

import { useMapLocate } from "@/hooks";
import { topics } from "@/ros";

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
      <svg className={iconClass}>
        <use xlinkHref="images/sprite.svg#targetIcon" />
      </svg>
    </button>
  );
};

export { Controls };
