import React from "react";

import { Column } from "./Column";

import { wrapperClass, contentClass } from "./Engine.css";

import type { TProps } from "./types";

const Engine: React.FC<TProps> = ({ control_mode, gear_status, speed, steer }) => (
  <div className={wrapperClass}>
    <div className={contentClass}>
      <Column
        label="speed"
        title={{
          label: "mode",
          value: control_mode === 2 ? "automatic" : "manual",
        }}
        value={speed}
      />

      <Column
        label="steering"
        title={{
          label: "gear",
          value: gear_status,
        }}
        value={steer}
      />
    </div>
  </div>
);

export { Engine };
