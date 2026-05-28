import React from "react";
import { lineString } from "@turf/helpers";
import lineLength from "@turf/length";
import { useSubscription } from "rosreact";

import { useDestinations } from "@/hooks";
import { topics } from "@/ros";

import { wrapperClass, rowClass, cellClass, labelClass, valueClass, keyClass } from "./Stats.css";

import type { Position } from "geojson";

const Stats: React.FC = () => {
  const { positions } = useDestinations();
  const {
    altitude,
    latitude,
    longitude,
    speed,
    status: { satellites_used, satellites_visible },
  } = useSubscription(topics.GPS) as TGPSData;

  const getTotalDistance = (): number => {
    if (!!positions.length) {
      const line = lineString([
        [longitude, latitude],
        ...positions.map(({ geometry: { coordinates } }): Position => coordinates),
      ]);

      return lineLength(line, { units: "meters" });
    }

    return 0;
  };

  const renderTotalDistance = (): string => {
    const totalDistance = getTotalDistance();

    return totalDistance > 1000
      ? `${(totalDistance / 1000).toFixed(2)}km`
      : `${totalDistance.toFixed(2)}m`;
  };

  return (
    <div className={wrapperClass}>
      <div className={rowClass}>
        <div className={cellClass}>
          <>
            <p className={labelClass}>Status</p>
            <p className={valueClass}>{renderTotalDistance()}</p>
          </>
        </div>

        <div className={cellClass}>
          <p className={valueClass}>
            <span className={keyClass}>Network:</span>
            {satellites_used}/{satellites_visible}
          </p>
        </div>
      </div>

      <div className={rowClass}>
        <div className={cellClass}>
          <p className={labelClass}>Kinematics</p>
          <p className={valueClass}>{speed.toFixed(3)} m/s</p>
        </div>

        <div className={cellClass}>
          <p className={valueClass}>
            <span className={keyClass}>Lat:</span> {latitude.toFixed(5)}
          </p>

          <p className={valueClass}>
            <span className={keyClass}>Lng:</span> {longitude.toFixed(5)}
          </p>

          <p className={valueClass}>
            <span className={keyClass}>Alt:</span> {altitude.toFixed(5)}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Stats };
