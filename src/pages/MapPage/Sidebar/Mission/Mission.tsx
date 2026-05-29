import React from "react";

import { useDestination } from "@/hooks";

import { Actions } from "./Actions";
import { Create } from "./Create";
import { Search } from "./Search";
import { Waypoints } from "./Waypoints";

import { wrapperClass, layoutClass } from "./Mission.css";

const Mission: React.FC = () => {
  const { positions } = useDestination();

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
