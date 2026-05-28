import React from "react";
import { useSubscription } from "rosreact";

import { topics } from "@/ros";

import { wrapperClass, positionClass } from "./InitialWaypoint.css";

const InitialWaypoint: React.FC = () => {
  const { latitude, longitude } = useSubscription(topics.GPS) as TGPSData;

  return (
    <div className={wrapperClass}>
      <span className={positionClass}>
        <span>{latitude.toFixed(5)}</span> - <span>{longitude.toFixed(5)}</span>
      </span>
    </div>
  );
};

export { InitialWaypoint };
