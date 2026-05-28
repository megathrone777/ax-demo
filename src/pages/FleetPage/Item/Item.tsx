import React from "react";

import { Button } from "@/ui";

import { Details } from "./Details";
import { Engine } from "./Engine";
import { Preview } from "./Preview";

import { wrapperClass, columnClass, optionsClass } from "./Item.css";

import type { TProps } from "./Item.types";

const Item: React.FC<TProps> = ({
  active: isOnline,
  controlMode,
  gearStatus,
  id,
  position,
  speed,
  steer,
}) => (
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
      <Engine {...{ controlMode, gearStatus, speed, steer }} />

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

export { Item };
