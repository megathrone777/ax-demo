export enum TopicsTypes {
  CONTROL = "CONTROL",
  GPS = "GPS",
  HEADING = "HEADING",
  PATH = "PATH",
}

export interface TVehicleData extends TVehiclePosition, Pick<TVehicle, "speed"> {
  autoPilot: boolean;
  heading: number;
  waypointIndex: number;
  waypoints: TVehiclePosition[];
}

type TMessageOption = "publish" | "subscribe" | "unsubscribe";

export interface TMessage {
  data?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  msg?: Record<string, any>;
  option: TMessageOption;
  topic: string;
}
