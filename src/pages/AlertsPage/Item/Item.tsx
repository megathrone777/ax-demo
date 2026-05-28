import React, { useEffect, useState } from "react";
import { useAsyncValue, useLinkClickHandler } from "react-router-dom";
import bbox from "@turf/bbox";
import { lineString } from "@turf/helpers";
import { randomPosition } from "@turf/random";

import { useStore } from "@/hooks";
import { addPerson } from "@/store";
import { Icon } from "@/ui";

import {
  wrapperClass,
  buttonsClass,
  contentClass,
  descriptionClass,
  iconClass,
  linkClass,
  typeClass,
} from "./Item.css";

import type { BBox } from "geojson";
import type { TProps } from "./types";

const Item: React.FC<TProps> = ({ description, time, type }) => {
  const vehicles = useAsyncValue() as TVehicle[];
  const [currentBounds, setCurrentBounds] = useState<BBox>([0, 0, 0, 0]);
  const { dispatch } = useStore();
  const handleClick = useLinkClickHandler("/map");

  const handleRouteClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    handleClick(event);
    dispatch(addPerson(randomPosition(currentBounds)));
  };

  useEffect((): void => {
    const coordinates: number[][] = vehicles.map(
      ({
        data: {
          position: { lat, lon },
        },
      }): [number, number] => [lon, lat],
    );
    const bounds: BBox = bbox(lineString(coordinates));

    setCurrentBounds(bounds);
  }, [vehicles]);

  return (
    <div className={wrapperClass}>
      <span className={typeClass}>{type}</span>
      <span className={descriptionClass}>{description}</span>
      <span className={contentClass}>ID: {123}</span>
      <span className={contentClass}>{time}</span>

      <div className={buttonsClass}>
        <a
          className={linkClass}
          href="/map"
          onClick={handleRouteClick}
        >
          <Icon
            className={iconClass}
            id="target"
          />
        </a>
      </div>
    </div>
  );
};

export { Item };
