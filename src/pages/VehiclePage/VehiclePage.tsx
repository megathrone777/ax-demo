import React from "react";
import { useLoaderData } from "react-router";

import { Preview } from "./Preview";
import { Properties } from "./Properties";

import { wrapperClass, columnClass } from "./VehiclePage.css";

const VehiclePage: React.FC = () => {
  const vehicle = useLoaderData<null | TVehicle>();

  if (!vehicle) {
    return <div>Vehicle not found.</div>;
  }

  const { active, id, ipAddres, position } = vehicle;

  return (
    <div className={wrapperClass}>
      <div className={columnClass}>
        <Preview isOnline={active} />
      </div>

      <div className={columnClass}>
        <Properties {...{ id, ipAddres, position }} />
      </div>
    </div>
  );
};

export { VehiclePage };
