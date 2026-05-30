import { TopicsTypes } from "./ros.types";

import type { UseSubscriptionProps } from "rosreact";

export type Topics = Record<TopicsTypes, UseSubscriptionProps>;

const topics: Topics = {
  CONTROL: {
    messageType: TopicsTypes.CONTROL + "/data",
    topic: TopicsTypes.CONTROL,
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
    messageType: TopicsTypes.GPS + "/data",
    topic: TopicsTypes.GPS,
  },

  HEADING: {
    messageInitialValue: { heading: 45 },
    messageType: TopicsTypes.HEADING + "/data",
    topic: TopicsTypes.HEADING,
  },

  PATH: {
    messageType: TopicsTypes.PATH + "/data",
    topic: TopicsTypes.PATH,
  },
};

export { topics };
