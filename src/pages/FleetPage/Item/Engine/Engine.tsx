import React from "react";

import { Column } from "./Column";

import { wrapperClass, contentClass } from "./Engine.css";

import type { TProps } from "./Engine.types";

const Engine: React.FC<TProps> = ({ controlMode, gearStatus, speed, steer }) => (
  <div className={wrapperClass}>
    <div className={contentClass}>
      <Column
        label="speed"
        title={{
          label: "mode",
          value: controlMode === 2 ? "automatic" : "manual",
        }}
        value={speed}
      />

      <Column
        label="steering"
        title={{
          label: "gear",
          value: gearStatus,
        }}
        value={steer}
      />
    </div>
  </div>
);

export { Engine };
