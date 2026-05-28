import React from "react";

import { InitialWaypoint } from "./InitialWaypoint";
import { List } from "./List";

import { wrapperClass } from "./Waypoints.css";

const Waypoints: React.FC = () => (
  <div className={wrapperClass}>
    <InitialWaypoint />
    <List />
  </div>
);

export { Waypoints };
