import type React from "react";
import type { Feature, Point, Polygon, Position } from "geojson";

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

export type TDelay = "0" | "1" | "120" | "30" | "60";

export interface TDestination {
  id: number;
  name: string;
  positions: Feature<Point, { delay: TDelay; name: string; }>[];
  waypoints: Position[];
}

export interface TBoundary {
  id: number;
  polygons: Feature<Polygon>[];
}

export interface TStore {
  area: Position;
  boundaries: TBoundary[];
  currentIP: string;
  destinations: TDestination[];
  persons: Position[];
}

export interface TAction<P = unknown> {
  (payload: P): {
    payload: P;
    type: TActionTypes;
  };
}

export interface TContext {
  dispatch: React.Dispatch<ReturnType<TAction>>;
  store: TStore;
}
