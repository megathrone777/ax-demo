import React from "react";

import { Icon } from "@/ui";

import {
  angleClass,
  iconClass,
  layoutClass,
  tooltipClass,
  tooltipTextClass,
  waveClass,
  wrapperClass,
} from "./MarkerWave.css";

import type { TProps } from "./MarkerWave.types";

const MarkerWave: React.FC<TProps> = ({ angle, isActive, isMoving, tooltips }) => (
  <span
    className={wrapperClass}
    data-moving={isMoving ? "true" : undefined}
  >
    <Icon
      className={iconClass}
      id="car"
    />

    {tooltips && !!tooltips.length && (
      <span className={tooltipClass}>
        {tooltips.map<React.ReactElement>((tooltip: string) => (
          <span
            className={tooltipTextClass}
            key={`${tooltip}-wave`}
          >
            {tooltip}
          </span>
        ))}
      </span>
    )}

    <span
      className={layoutClass}
      style={{ "--angle": `${angle}deg` } as React.CSSProperties}
    >
      <span className={angleClass} />

      {isActive && (
        <>
          <span className={waveClass.primary} />
          <span className={waveClass.secondary} />
        </>
      )}
    </span>
  </span>
);

export { MarkerWave };
