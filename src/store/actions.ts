import { TActionTypes } from "./types";

import type { Feature, Polygon, Position } from "geojson";
import type { TAction, TDelay, TDestination } from "./types";

export const addBoundary: TAction<{ id: number; polygon: Feature<Polygon> }> = (boundary) => ({
  payload: boundary,
  type: TActionTypes.ADD_BOUNDARY,
});

export const attachDestinations: TAction<{ coordinates: Position[]; id: number; }> = (
  destinations
) => ({
  payload: destinations,
  type: TActionTypes.ATTACH_DESTINATIONS,
});

export const updateBoundary: TAction<{
  coordinates: Position[][];
  id: number;
  polygonId: string;
}> = (boundary) => ({
  payload: boundary,
  type: TActionTypes.UPDATE_BOUNDARY,
});

export const deleteBoundary: TAction<{ id: number; polygonId: string }> = (boundary) => ({
  payload: boundary,
  type: TActionTypes.DELETE_BOUNDARY,
});

export const addDestination: TAction<TDestination> = (destination) => ({
  payload: destination,
  type: TActionTypes.ADD_DESTINATION,
});

export const updateDestination: TAction<{
  coordinates: Position[];
  id: number;
}> = (destination) => ({
  payload: destination,
  type: TActionTypes.UPDATE_DESTINATION,
});

export const updateDestinationDelay: TAction<{
  delay: TDelay;
  id: number;
  index: number;
}> = (delay) => ({
  payload: delay,
  type: TActionTypes.UPDATE_DESTINATION_DELAY,
});

export const updateDestinationName: TAction<{
  id: number;
  index: number;
  name: string;
}> = (name) => ({
  payload: name,
  type: TActionTypes.UPDATE_DESTINATION_NAME,
});

export const deleteDestination: TAction<{ id: number; index: number }> = (destination) => ({
  payload: destination,
  type: TActionTypes.DELETE_DESTINATION,
});

export const clearDestinations: TAction<number> = (vehicleID) => ({
  payload: vehicleID,
  type: TActionTypes.CLEAR_DESTINATIONS,
});

export const swapDestinations: TAction<{
  endIndex: number;
  id: number;
  startIndex: number;
}> = (indexes) => ({
  payload: indexes,
  type: TActionTypes.SWAP_DESTINATIONS,
});

export const setArea: TAction<Position> = (area) => ({
  payload: area,
  type: TActionTypes.SET_AREA,
});

export const addPerson: TAction<Position> = (position) => ({
  payload: position,
  type: TActionTypes.ADD_PERSON,
});

export const setCurrentIP: TAction<string> = (ip) => ({
  payload: ip,
  type: TActionTypes.SET_CURRENT_IP,
});
