import React from "react";

import { wrapperClass, itemClass, labelClass, valueClass } from "./Stats.css";

const Stats: React.FC = () => (
  <div className={wrapperClass}>
    <p className={itemClass}>
      <span className={labelClass}>accel:</span>
      <span className={valueClass}>11.856</span>
    </p>

    <p className={itemClass}>
      <span className={labelClass}>brake:</span>
      <span className={valueClass}>-0.0</span>
    </p>
  </div>
);

export { Stats };
