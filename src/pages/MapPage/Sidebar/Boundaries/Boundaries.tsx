import React, { useCallback } from "react";
import { useMap } from "@vis.gl/react-maplibre";

import { useBoundary, useDestination, useAppContext } from "@/hooks";
import { Icon } from "@/ui";

import {
  itemClass,
  pairsListClass,
  pairsItemClass,
  buttonsClass,
  buttonIconClass,
  buttonClass,
} from "./Boundaries.css";

import type { Feature, Polygon, Position } from "geojson";
import type { TFormattedBoundary } from "./Boundaries.types";

const Boundaries: React.FC = () => {
  const { actions } = useAppContext();
  const { id, polygons } = useBoundary();
  const { name } = useDestination();
  const { mainMap } = useMap();

  const getFormattedCoordinates = (): TFormattedBoundary[] =>
    polygons.map(
      ({ geometry: { coordinates }, id }: Feature<Polygon>): TFormattedBoundary => ({
        id: `${id}`,
        pairs:
          coordinates.map((positions: Position[]): string[] =>
            positions.map(
              ([longitute, latitude]: Position): string =>
                `${longitute!.toFixed(3)} - ${latitude!.toFixed(3)}`,
            ),
          )[0] ?? [],
      }),
    );

  const handlePolygonEdit = useCallback(
    ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
      if (mainMap) {
        mainMap.getMap().fire("draw.polygonedit", {
          polygonId: currentTarget.id,
        });
      }
    },
    [polygons],
  );

  const handlePolygonDelete = useCallback(
    ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
      if (mainMap) {
        actions.deleteBoundary({ id, polygonId: currentTarget.id });
        mainMap.getMap().fire("draw.polygondelete", {
          polygonId: currentTarget.id,
        });
      }
    },
    [polygons],
  );

  return (
    <>
      {!!polygons.length ? (
        <div>
          {getFormattedCoordinates().map<React.ReactElement>(
            ({ id, pairs }: TFormattedBoundary) => (
              <div
                className={itemClass}
                key={id}
              >
                <ul className={pairsListClass}>
                  {pairs.map<React.ReactElement>((pair: string) => (
                    <li
                      className={pairsItemClass}
                      key={`${id}-pair-item-${pair}`}
                    >
                      {pair}
                    </li>
                  ))}
                </ul>

                <div className={buttonsClass}>
                  <button
                    {...{ id }}
                    className={buttonClass}
                    onClick={handlePolygonEdit}
                    type="button"
                  >
                    <Icon
                      className={buttonIconClass}
                      id="edit"
                    />
                  </button>

                  <button
                    {...{ id }}
                    className={buttonClass}
                    onClick={handlePolygonDelete}
                    type="button"
                  >
                    <Icon
                      className={buttonIconClass}
                      id="trash"
                    />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <p>
          No boundaries.
          <br />
          {name.length === 0 && <span> Please create a mission.</span>}
        </p>
      )}
    </>
  );
};

export { Boundaries };
