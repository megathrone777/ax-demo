import React from "react";
import { useSubscription } from "rosreact";

import { topics } from "@/ros";

import { wrapperClass, itemClass, labelClass, valueClass } from "./Coords.css";

const Coords: React.FC = () => {
  const { latitude, longitude } = useSubscription(topics.GPS) as TGPSData;

  return (
    <div className={wrapperClass}>
      <p className={itemClass}>
        <span className={labelClass}>lat:</span>
        <span className={valueClass}>{latitude.toFixed(4)}</span>
      </p>

      <p className={itemClass}>
        <span className={labelClass}>lon:</span>
        <span className={valueClass}>{longitude.toFixed(4)}</span>
      </p>
    </div>
  );
};

export { Coords };
