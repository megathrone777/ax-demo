import type React from "react";
import type { Feature, Polygon, Position } from "geojson";

export interface TAppStore {
  area: Position;
  boundaries: TBoundary[];
  currentIP: string;
  destinations: TDestination[];
  persons: Position[];
}

export enum TActionTypes {
  ADD_BOUNDARY = "ADD_BOUNDARY",
  ADD_DESTINATION = "ADD_DESTINATION",
  ADD_PERSON = "ADD_PERSON",
  ATTACH_DESTINATIONS = "ATTACH_DESTINATIONS",
  CLEAR_DESTINATIONS = "CLEAR_DESTINATIONS",
  DEFAULT = "DEFAULT",
  DELETE_BOUNDARY = "DELETE_BOUNDARY",
  DELETE_DESTINATION = "DELETE_DESTINATION",
  SET_AREA = "SET_AREA",
  SET_CURRENT_IP = "SET_CURRENT_IP",
  SWAP_DESTINATIONS = "SWAP_DESTINATIONS",
  UPDATE_BOUNDARY = "UPDATE_BOUNDARY",
  UPDATE_DESTINATION = "UPDATE_DESTINATION",
  UPDATE_DESTINATION_DELAY = "UPDATE_DESTINATION_DELAY",
  UPDATE_DESTINATION_NAME = "UPDATE_DESTINATION_NAME",
}

type TActionPayloadMap = {
  [TActionTypes.ADD_BOUNDARY]: { id: number; polygon: Feature<Polygon> };
  [TActionTypes.ADD_DESTINATION]: TDestination;
  [TActionTypes.ADD_PERSON]: Position;
  [TActionTypes.ATTACH_DESTINATIONS]: { coordinates: Position[]; id: number };
  [TActionTypes.CLEAR_DESTINATIONS]: number;
  [TActionTypes.DEFAULT]: undefined;
  [TActionTypes.DELETE_BOUNDARY]: { id: number; polygonId: string };
  [TActionTypes.DELETE_DESTINATION]: { id: number; index: number };
  [TActionTypes.SET_AREA]: Position;
  [TActionTypes.SET_CURRENT_IP]: string;
  [TActionTypes.SWAP_DESTINATIONS]: { endIndex: number; id: number; startIndex: number };
  [TActionTypes.UPDATE_BOUNDARY]: { coordinates: Position[][]; id: number; polygonId: string };
  [TActionTypes.UPDATE_DESTINATION_DELAY]: { delay: TDestinationDelay; id: number; index: number };
  [TActionTypes.UPDATE_DESTINATION_NAME]: { id: number; index: number; name: string };
  [TActionTypes.UPDATE_DESTINATION]: { coordinates: Position[]; id: number };
};

export type TActionUnion = {
  [K in keyof TActionPayloadMap]: { payload: TActionPayloadMap[K]; type: K };
}[keyof TActionPayloadMap];

export type TActions = {
  [K in keyof TActionPayloadMap]: (store: TAppStore, payload: TActionPayloadMap[K]) => TAppStore;
};

export const makeAction =
  <K extends TActionTypes>(type: K) =>
    (payload: TActionPayloadMap[K]): Extract<TActionUnion, { type: K }> =>
      ({ payload, type }) as Extract<TActionUnion, { type: K }>;

export interface TAppContext {
  dispatch: React.Dispatch<TActionUnion>;
  store: TAppStore;
}
