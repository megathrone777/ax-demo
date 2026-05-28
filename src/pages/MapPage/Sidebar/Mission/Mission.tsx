import React from "react";

import { useDestinations } from "@/hooks";

import { Actions } from "./Actions";
import { Create } from "./Create";
import { Search } from "./Search";
import { Waypoints } from "./Waypoints";

import { wrapperClass, layoutClass } from "./Mission.css";

const Mission: React.FC = () => {
  const { positions } = useDestinations();

  return (
    <div className={wrapperClass}>
      <Create />

      {!!positions.length && (
        <div className={layoutClass}>
          <Waypoints />
          <Search />
          <Actions />
        </div>
      )}
    </div>
  );
};

export { Mission };
