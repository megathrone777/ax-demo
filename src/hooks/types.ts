import type { TBoundary, TContext, TDestination } from "@/store";
import type { colors, devices, easing, fonts } from "@/theme/variables";

import type { Position } from "geojson";

type TMapID = "controlsMap" | "mainMap";

export type TCallbackFn<TArgs extends unknown[]> = (...args: TArgs) => Promise<void> | void;

export interface TUseStore {
  (): TContext;
}

export interface TUseDestinations {
  (): TDestination;
}

export interface TUseBoundaries {
  (): TBoundary;
}

export interface TUseResize {
  (breakpoint: number): boolean;
}

export type TUseMapFit = (mapID: TMapID) => (items: TVehicle[]) => void;
export type TUseMapLocate = (mapID: TMapID) => (center: Position, zoom?: number) => void;
export type TUseMapImage = (mapID: TMapID) => (url: string, name: string) => void;

export type TUseTheme = () => {
  colors: typeof colors;
  devices: typeof devices;
  easing: typeof easing;
  fonts: typeof fonts;
};
