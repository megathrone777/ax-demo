import type { TStore } from "./types";

const initialStore: TStore = {
  area: [],
  boundaries: [],
  currentIP: import.meta.env.APP_ROS_IP,
  destinations: [],
  persons: [],
};

export { initialStore };
