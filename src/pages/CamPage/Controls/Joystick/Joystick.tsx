import React, { useEffect, useRef } from "react";
import { create } from "nipplejs";
import { getTopic, useRos } from "rosreact";

import { topics } from "@/ros";

import { wrapperClass } from "./Joystick.css";

import type { TProps, TJoystickData } from "./Joystick.types";

const joystickDefaults = {
  maxAngularSpeed: 0.85,
  maxDistance: 100,
  maxLinearSpeed: 1.0,
  maxSpeed: 4.0,
};

const Joystick: React.FC<TProps> = ({ lockX, lockY }) => {
  const ros = useRos();
  const rosRef = useRef(ros);
  const joystickZoneRef = useRef<HTMLDivElement>(null);
  const joyStickDataRef = useRef<TJoystickData>({
    angularSpeed: 0.0,
    linearSpeed: 0.0,
  });

  useEffect((): void => {
    rosRef.current = ros;
  }, [ros]);

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

      if (lockX) {
        const { maxAngularSpeed, maxDistance } = joystickDefaults;

        joyStickDataRef.current.angularSpeed =
          Math.round(
            ((Math.cos(angle.radian) * maxAngularSpeed * distance) / maxDistance + Number.EPSILON) *
              1000,
          ) / 1000;
      } else {
        const { maxDistance, maxLinearSpeed, maxSpeed } = joystickDefaults;

        joyStickDataRef.current.linearSpeed =
          Math.round(
            ((Math.sin(angle.radian) * maxLinearSpeed * distance) / maxDistance + Number.EPSILON) *
              maxSpeed *
              1000,
          ) / 1000;
      }

      getTopic(rosRef.current, topics.JOYSTICK).publish({
        lateral: {
          steering_tire_angle: joyStickDataRef.current.angularSpeed,
          steering_tire_rotation_rate: 0.0,
        },
        longitudinal: {
          jerk: 0.0,
          speed: joyStickDataRef.current.linearSpeed,
        },
      });
    });

    joystickManager.on("end", (): void => {
      if (lockX) {
        joyStickDataRef.current.angularSpeed = 0.0;
      } else {
        joyStickDataRef.current.linearSpeed = 0.0;
      }

      getTopic(rosRef.current, topics.JOYSTICK).publish({
        lateral: {
          steering_tire_angle: joyStickDataRef.current.angularSpeed,
          steering_tire_rotation_rate: 0.0,
        },
        longitudinal: {
          jerk: 0.0,
          speed: joyStickDataRef.current.linearSpeed,
        },
      });
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
