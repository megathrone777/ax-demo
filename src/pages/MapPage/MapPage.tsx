import React from "react";

import { Map } from "./Map";
import { Sidebar } from "./Sidebar";

import { wrapperClass } from "./MapPage.css";

const MapPage: React.FC = () => (
  <div className={wrapperClass}>
    <Map />
    <Sidebar />
  </div>
);

export { MapPage };
