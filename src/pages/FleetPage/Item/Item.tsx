import React from "react";

import { Button } from "@/ui";

import { Details } from "./Details";
import { Engine } from "./Engine";
import { Preview } from "./Preview";

import { wrapperClass, columnClass, optionsClass } from "./Item.css";

import type { TProps } from "./Item.types";

const Item: React.FC<TProps> = ({ active: isOnline, data, id }) => {
  const {
    control_mode,
    gear_status,
    position,
    vehicle_status: { speed, steer },
  } = data;

  return (
    <div className={wrapperClass}>
      <div className={columnClass}>
        <Preview {...{ isOnline }} />
      </div>

      <div className={columnClass}>
        <Details {...{ id, position }} />

        <div className={optionsClass}>
          <Button
            size="medium"
            template="tertiary"
            to={`/fleet/${id}`}
          >
            Properties
          </Button>
        </div>
      </div>

      <div className={columnClass}>
        <Engine {...{ control_mode, gear_status, speed, steer }} />

        <div className={optionsClass}>
          <Button
            size="medium"
            template="tertiary"
            to={`/cam/${id}`}
          >
            Take control
          </Button>

          <Button
            size="medium"
            template="tertiary"
            to={`/map/${id}`}
          >
            Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Item };
