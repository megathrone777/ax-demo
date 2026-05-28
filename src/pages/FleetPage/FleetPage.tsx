import React from "react";
import { Await, useLoaderData } from "react-router-dom";

import { Error } from "@/components";

import { Item } from "./Item";

import { wrapperClass, listClass } from "./FleetPage.css";

const FleetPage: React.FC = () => {
  const data = useLoaderData() as { vehicles: TVehicle[] };

  return (
    <Await
      children={(vehicles: TVehicle[]): React.ReactElement => (
        <div className={wrapperClass}>
          <div className={listClass}>
            {vehicles.map(
              ({ id, ...rest }: TVehicle): React.ReactElement => (
                <Item key={id} {...{ id, ...rest }} />
              )
            )}
          </div>
        </div>
      )}
      errorElement={<Error />}
      resolve={data.vehicles}
    />
  );
};

export { FleetPage };
