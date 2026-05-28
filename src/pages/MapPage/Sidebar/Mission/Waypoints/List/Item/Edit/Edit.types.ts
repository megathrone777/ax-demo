type TDelay = "0" | "1" | "120" | "30" | "60";
type TPointType = "checkpoint" | "destination";
type TSensorType = "360cam" | "camera" | "none" | "thermal";

export interface TOption {
  delay: TDelay;
  pointType: TPointType;
  sensorType: TSensorType;
}

export interface TProps {
  index: number;
}
