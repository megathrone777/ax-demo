import React, { useRef } from "react";
import { getTopic, useRos } from "rosreact";

import { topics } from "@/ros";

import { Joystick } from "./Joystick";

import { wrapperClass } from "./Controls.css";

const Controls: React.FC = () => {
  const ros = useRos();
  const cmdRef = useRef({ angularSpeed: 0.0, linearSpeed: 0.0 });

  const publishCmd = (): void => {
    getTopic(ros, topics.CONTROL).publish({
      lateral: {
        steeringTireAngle: cmdRef.current.angularSpeed,
        steeringTireRotationRate: 0.0,
      },

      longitudinal: {
        jerk: 0.0,
        speed: cmdRef.current.linearSpeed,
      },
    });
  };

  const handleSteer = (value: number): void => {
    cmdRef.current.angularSpeed = value;
    publishCmd();
  };

  const handleSpeed = (value: number): void => {
    cmdRef.current.linearSpeed = value;
    publishCmd();
  };

  return (
    <div className={wrapperClass}>
      <Joystick
        lockX
        onValue={handleSteer}
      />

      <Joystick
        lockY
        onValue={handleSpeed}
      />
    </div>
  );
};

export { Controls };
