import React, { useEffect, useRef } from "react";
import { create } from "nipplejs";

import { wrapperClass } from "./Joystick.css";

import type { TProps } from "./Joystick.types";

const joystickDefaults = {
  maxAngularSpeed: 0.85,
  maxDistance: 100,
  maxLinearSpeed: 1.0,
  maxSpeed: 4.0,
};

const Joystick: React.FC<TProps> = ({ lockX, lockY, onValue }) => {
  const joystickZoneRef = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    if (!joystickZoneRef.current) {
      return;
    }

    const joystickManager = create({
      color: {
        back: "gray",
        front: "black",
      },
      lockX,
      lockY,
      mode: "static",
      position: { left: "50%", top: "50%" },
      size: 130,
      zone: joystickZoneRef.current,
    });

    joystickManager.on("move", ({ data: nipple }): void => {
      const { angle, distance } = nipple;

      console.log(angle, distance, "MOVE");

      if (lockX) {
        const { maxAngularSpeed, maxDistance } = joystickDefaults;

        onValue(
          Math.round(
            ((Math.cos(angle.radian) * maxAngularSpeed * distance) / maxDistance + Number.EPSILON) *
              1000,
          ) / 1000,
        );
      } else {
        const { maxDistance, maxLinearSpeed, maxSpeed } = joystickDefaults;

        onValue(
          Math.round(
            ((Math.sin(angle.radian) * maxLinearSpeed * distance) / maxDistance + Number.EPSILON) *
              maxSpeed *
              1000,
          ) / 1000,
        );
      }
    });

    joystickManager.on("end", (): void => {
      onValue(0.0);
    });
  }, []);

  return (
    <div
      className={wrapperClass}
      ref={joystickZoneRef}
    />
  );
};

export { Joystick };
