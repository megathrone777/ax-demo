import type { create } from "nipplejs";

type TCollectionOptions = Parameters<typeof create>[0];

export interface TJoystickData {
  angularSpeed: number;
  linearSpeed: number;
}

export interface TProps {
  lockX?: TCollectionOptions["lockX"];
  lockY?: TCollectionOptions["lockY"];
}
