import React from "react";

import { wrapperClass, imageClass, statusClass } from "./Preview.css";

import type { TProps } from "./Preview.types";

const Preview: React.FC<TProps> = ({ isOnline }) => (
  <div className={wrapperClass}>
    <p className={statusClass[isOnline ? "online" : "offline"]}>
      {isOnline ? "Online" : "Offline"}
    </p>

    <img
      alt="Vehicle"
      className={imageClass}
      src="images/fleet_img.jpg"
    />
  </div>
);

export { Preview };
