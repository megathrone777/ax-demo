export const TOPIC_CONTROL = "control";
export const TOPIC_GPS = "gps";
export const TOPIC_HEADING = "heading";
export const TOPIC_PATH = "path";

import type { UseSubscriptionProps } from "rosreact";

export interface Topics {
  CONTROL: UseSubscriptionProps;
  GPS: UseSubscriptionProps<TGPSData>;
  HEADING: UseSubscriptionProps<THeadingData>;
  PATH: UseSubscriptionProps;
}

const topics: Topics = {
  CONTROL: {
    messageType: TOPIC_CONTROL + "/data",
    topic: TOPIC_CONTROL,
  },

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
      latitude: 50.808406829833984,
      longitude: 14.882061004638672,
      speed: 0,
      status: {
        satellitesUsed: 8,
        satellitesVisible: 20,
      },
    },
    messageType: TOPIC_GPS + "/data",
    topic: TOPIC_GPS,
  },

  HEADING: {
    messageInitialValue: { heading: 45 },
    messageType: TOPIC_HEADING + "/data",
    topic: TOPIC_HEADING,
  },

  PATH: {
    messageType: TOPIC_PATH + "/data",
    topic: TOPIC_PATH,
  },
};

export { topics };
