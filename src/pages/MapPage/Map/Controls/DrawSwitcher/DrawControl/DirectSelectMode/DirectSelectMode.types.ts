import type { DrawCustomMode } from "@mapbox/mapbox-gl-draw";

export interface TState {
  featureId: string;
  selectedCoordPaths: string[];
}

export type TGeoJson = Parameters<DrawCustomMode["toDisplayFeatures"]>[0];
