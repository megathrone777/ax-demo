import type { TAppStore } from "./App.types";

const AppStore: TAppStore = {
  area: [],
  boundaries: [],
  currentIP: import.meta.env.APP_ROS_IP,
  destinations: [],
  persons: [],
};

export { AppStore };
