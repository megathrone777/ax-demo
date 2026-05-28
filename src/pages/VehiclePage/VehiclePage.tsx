import React from "react";
import { useLoaderData } from "react-router-dom";

import { Preview } from "./Preview";
import { Properties } from "./Properties";

import { columnClass } from "./VehiclePage.css";

const VehiclePage: React.FC = () => {
  const vehicle = useLoaderData<TVehicle | null>();

  if (!vehicle) {
    return <div>Vehicle not found.</div>;
  }

  const {
    active,
    data: { ip_addr, position },
    id,
  } = vehicle;

  return (
    <div>
      <div className={columnClass}>
        <Preview isOnline={active} />
      </div>

      <div className={columnClass}>
        <Properties {...{ id, ip_addr, position }} />
      </div>
    </div>
  );
};

export { VehiclePage };
