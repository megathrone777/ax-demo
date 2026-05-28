import React from "react";
import { useLoaderData } from "react-router-dom";

import { Item } from "./Item";

import { wrapperClass, listClass } from "./FleetPage.css";

const FleetPage: React.FC = () => {
  const { vehicles } = useLoaderData<{ vehicles: TVehicle[] }>();

  return (
    <div className={wrapperClass}>
      <div className={listClass}>
        {vehicles.map<React.ReactElement>(({ id, ...rest }: TVehicle) => (
          <Item
            key={`vehicle-row-${id}`}
            {...{ id, ...rest }}
          />
        ))}
      </div>
    </div>
  );
};

export { FleetPage };
