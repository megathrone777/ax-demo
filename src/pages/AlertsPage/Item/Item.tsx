import React, { useEffect, useState } from "react";
import { useLoaderData, useLinkClickHandler } from "react-router";
import bbox from "@turf/bbox";
import { lineString } from "@turf/helpers";
import { randomPosition } from "@turf/random";

import { useAppContext } from "@/hooks";
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
import type { TProps } from "./Item.types";

const Item: React.FC<TProps> = ({ description, time, type }) => {
  const { actions } = useAppContext();
  const vehicles = useLoaderData<TVehicle[]>();
  const [currentBounds, setCurrentBounds] = useState<BBox>([0, 0, 0, 0]);

  const clickHandler = useLinkClickHandler("/map/1");

  const handleRouteClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    clickHandler(event);
    actions.addPerson(randomPosition(currentBounds));
  };

  useEffect((): void => {
    const coordinates: number[][] = vehicles.map(
      ({ position: { lat, lon } }): [number, number] => [lon, lat],
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
          href="/map/1"
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
