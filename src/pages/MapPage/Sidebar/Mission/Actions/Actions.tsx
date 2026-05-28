import React from "react";
import { getTopic, useRos, useSubscription } from "rosreact";

import { useAppContext, useDestination, useMapLocate } from "@/hooks";
import { topics } from "@/ros";
import { Button, Icon } from "@/ui";

import { deleteClass, layoutClass } from "./Actions.css";

const Actions: React.FC = () => {
  const { actions } = useAppContext();
  const { id, positions } = useDestination();
  const locatePoint = useMapLocate("mainMap");
  const ros = useRos();
  const { altitude, latitude, longitude } = useSubscription(topics.GPS) as TGPSData;

  const handleClearDestinations = (): void => {
    if (confirm("Are you sure you want delete mission?")) {
      locatePoint([longitude, latitude]);
      actions.clearDestinations(id);
    }
  };

  const handlePathCalculate = (): void => {
    console.info("Calculate");
  };

  const handleTaskInit = (): void => {
    if (confirm("Are you sure you want to start task?")) {
      const pathTopic = getTopic(ros, topics.PATH);
      const makePose = (
        x: number,
        y: number,
        z: number,
      ): {
        header: {
          frameId: string;
        };
        pose: {
          orientation: {
            w: number;
            x: number;
            y: number;
            z: number;
          };
          position: {
            x: number;
            y: number;
            z: number;
          };
        };
      } => ({
        header: { frameId: "" },
        pose: {
          orientation: { w: 1.0, x: 0.0, y: 0.0, z: 0.0 },
          position: { x, y, z },
        },
      });

      const poses = [
        makePose(latitude, longitude, altitude),
        ...positions.map(({ geometry: { coordinates } }) =>
          makePose(coordinates[1]!, coordinates[0]!, altitude),
        ),
      ];
      const pathPoints = {
        header: { frameId: "map" },
        poses,
      };

      pathTopic.publish(pathPoints);
    }
  };

  return (
    <>
      <div className={layoutClass}>
        <button
          className={deleteClass}
          onClick={handleClearDestinations}
          type="button"
        >
          <Icon id="trash" />
        </button>

        <Button
          disabled={positions.length === 0 || !ros.isConnected}
          onClick={handleTaskInit}
          size="medium"
          template="secondary"
        >
          init task
        </Button>
      </div>

      <Button
        onClick={handlePathCalculate}
        size="medium"
        template="secondary"
      >
        calculate path
      </Button>
    </>
  );
};

export { Actions };
