import React from "react";

import { Joystick } from "./Joystick";

import { wrapperClass } from "./Controls.css";

const Controls: React.FC = () => (
  <div className={wrapperClass}>
    <Joystick lockX />
    <Joystick lockY />
  </div>
);

export { Controls };
