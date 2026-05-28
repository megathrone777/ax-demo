import type { UseSubscriptionProps } from "rosreact";

type TData = Partial<{ heading: number } | TGPSData>;

const topics: Record<"GPS" | "HEADING" | "JOYSTICK" | "PATH", UseSubscriptionProps<TData>> = {
  GPS: {
    compareFunc: (currentMessage, incomingMessage): boolean => {
      if (
        currentMessage &&
        incomingMessage &&
        "latitude" in currentMessage &&
        "longitude" in currentMessage &&
        "latitude" in incomingMessage &&
        "longitude" in incomingMessage
      ) {
        if (
          currentMessage.latitude === incomingMessage.latitude &&
          currentMessage.longitude === incomingMessage.longitude
        ) {
          return true;
        }
      }

      return false;
    },

    messageInitialValue: {
      altitude: 400,
      err: 0,
      latitude: 50.808406829833984,
      longitude: 14.882061004638672,
      speed: 5,
      status: {
        satellites_used: 8,
        satellites_visible: 20,
      },
    },

    messageType: "gps_msgs/msg/GPSFix",
    topic: "/novatel/oem7/gps",
  },

  HEADING: {
    messageInitialValue: { heading: 45 },
    messageType: "novatel_oem7_msgs/msg/HEADING2",
    topic: "/novatel/oem7/heading2",
  },

  JOYSTICK: {
    messageType: "autoware_auto_control_msgs/msg/AckermannControlCommand",
    topic: "/control/command/control_cmd",
  },

  PATH: {
    messageType: "nav_msgs/msg/Path",
    topic: "/utm_path",
  },
};

export { topics };
