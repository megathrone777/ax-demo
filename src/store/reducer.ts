import { TActionTypes } from "./types";

import type React from "react";
import type {
  addBoundary,
  addDestination,
  addPerson,
  attachDestinations,
  clearDestinations,
  deleteBoundary,
  deleteDestination,
  setArea,
  setCurrentIP,
  swapDestinations,
  updateBoundary,
  updateDestination,
  updateDestinationDelay,
  updateDestinationName,
} from "./actions";
import type { TAction, TBoundary, TDestination, TStore } from "./types";

const reducer: React.Reducer<TStore, ReturnType<TAction>> = (store, { payload, type }) => {
  const actions: Record<TActionTypes, () => TStore> = {
    [TActionTypes.ADD_BOUNDARY]: () => {
      const newBoundaries = [...store.boundaries];
      const boundary = payload as Parameters<typeof addBoundary>[0];
      const { id, polygon } = boundary;
      const foundIndex: number = newBoundaries.findIndex(
        ({ id: boundaryID }): boolean => boundaryID === id,
      );

      if (foundIndex !== -1) {
        const b = newBoundaries[foundIndex]!;

        b.polygons = [...b.polygons, polygon];
      }

      newBoundaries.push({
        id,
        polygons: [polygon],
      });

      return {
        ...store,
        boundaries: newBoundaries,
      };
    },

    [TActionTypes.ADD_DESTINATION]: () => {
      const newDestinations: TDestination[] = [...store.destinations];
      const destination = payload as Parameters<typeof addDestination>[0];
      const { id, positions } = destination;
      const foundIndex: number = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );

      if (foundIndex !== -1) {
        newDestinations[foundIndex]!.positions = [...positions];

        return {
          ...store,
          destinations: newDestinations,
        };
      }

      newDestinations.push(destination);

      return {
        ...store,
        destinations: newDestinations,
      };
    },

    [TActionTypes.ADD_PERSON]: () => ({
      ...store,
      persons: [...store.persons, payload as Parameters<typeof addPerson>[0]],
    }),

    [TActionTypes.ATTACH_DESTINATIONS]: () => {
      const newDestinations = [...store.destinations];
      const { coordinates, id } = payload as Parameters<typeof attachDestinations>[0];
      const foundIndex: number = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );

      if (foundIndex !== -1) {
        const dest = newDestinations[foundIndex]!;
        const newPositions = coordinates.map((coordinate): TDestination["positions"][0] => ({
          geometry: {
            coordinates: coordinate,
            type: "Point",
          },
          properties: {
            delay: "0",
            name: "",
          },
          type: "Feature",
        }));

        if (dest.positions) {
          dest.positions = [...dest.positions, ...newPositions];
        }
      }

      return {
        ...store,
        destinations: newDestinations,
      };
    },

    [TActionTypes.CLEAR_DESTINATIONS]: () => {
      const newDestinations = [...store.destinations];
      const newBoundaries = [...store.boundaries];
      const id = payload as Parameters<typeof clearDestinations>[0];
      const foundIndex = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );
      const foundIndex2 = newBoundaries.findIndex(
        ({ id: boundaryID }): boolean => boundaryID === id,
      );

      if (foundIndex !== -1) {
        newDestinations[foundIndex]!.positions = [];
      }

      if (foundIndex2 !== -1) {
        newBoundaries[foundIndex2]!.polygons = [];
      }

      return {
        ...store,
        destinations: newDestinations,
      };
    },

    [TActionTypes.DEFAULT]: () => store,

    [TActionTypes.DELETE_BOUNDARY]: () => {
      const newBoundaries: TBoundary[] = [...store.boundaries];
      const boundary = payload as Parameters<typeof deleteBoundary>[0];
      const { id, polygonId } = boundary;
      const foundIndex: number = newBoundaries.findIndex(
        ({ id: boundaryID }): boolean => boundaryID === id,
      );

      if (foundIndex !== -1) {
        const b = newBoundaries[foundIndex]!;
        const newPolygons = [...b.polygons].filter(({ id: pid }): boolean => pid !== polygonId);

        b.polygons = [...newPolygons];
      }

      return {
        ...store,
        boundaries: newBoundaries,
      };
    },

    [TActionTypes.DELETE_DESTINATION]: () => {
      const newDestinations: TDestination[] = [...store.destinations];
      const { id, index } = payload as Parameters<typeof deleteDestination>[0];
      const foundIndex = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );

      if (foundIndex !== -1) {
        const dest = newDestinations[foundIndex]!;
        const newPositions = [...dest.positions];

        newPositions.splice(index, 1);
        dest.positions = [...newPositions];
      }

      return {
        ...store,
        destinations: newDestinations,
      };
    },

    [TActionTypes.SET_AREA]: () => ({
      ...store,
      area: payload as Parameters<typeof setArea>[0],
    }),

    [TActionTypes.SET_CURRENT_IP]: () => ({
      ...store,
      currentIP: payload as Parameters<typeof setCurrentIP>[0],
    }),

    [TActionTypes.SWAP_DESTINATIONS]: () => {
      const newDestinations = [...store.destinations];
      const { endIndex, id, startIndex } = payload as Parameters<typeof swapDestinations>[0];
      const foundIndex = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );

      if (foundIndex !== -1) {
        const dest = newDestinations[foundIndex]!;
        const newPositions = [...dest.positions];
        const [removedCoordinates] = newPositions.splice(startIndex, 1);

        newPositions.splice(endIndex, 0, removedCoordinates!);
        dest.positions = [...newPositions];
      }

      return {
        ...store,
        destinations: newDestinations,
      };
    },

    [TActionTypes.UPDATE_BOUNDARY]: () => {
      const newBoundaries: TBoundary[] = [...store.boundaries];
      const boundary = payload as Parameters<typeof updateBoundary>[0];
      const { coordinates, id, polygonId } = boundary;
      const foundIndex: number = newBoundaries.findIndex(
        ({ id: boundaryID }): boolean => boundaryID === id,
      );

      if (foundIndex !== -1) {
        const b = newBoundaries[foundIndex]!;
        const newPolygons = [...b.polygons];
        const polygonIndex = newPolygons.findIndex(({ id: pid }): boolean => pid === polygonId);

        newPolygons[polygonIndex]!.geometry = {
          ...newPolygons[polygonIndex]!.geometry,
          coordinates,
        };
        b.polygons = [...newPolygons];
      }

      return {
        ...store,
        boundaries: newBoundaries,
      };
    },

    [TActionTypes.UPDATE_DESTINATION]: () => {
      const newDestinations: TDestination[] = [...store.destinations];
      const { coordinates, id } = payload as Parameters<typeof updateDestination>[0];
      const foundIndex: number = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );

      if (foundIndex !== -1) {
        const dest = newDestinations[foundIndex]!;
        const newPositions = [...dest.positions].map(
          (position, index: number): TDestination["positions"][0] => ({
            ...position,
            geometry: {
              coordinates: coordinates[index]!,
              type: "Point",
            },
          }),
        );

        dest.positions = [...newPositions];
      }

      return {
        ...store,
        destinations: newDestinations,
      };
    },

    [TActionTypes.UPDATE_DESTINATION_DELAY]: () => {
      const newDestinations: TDestination[] = [...store.destinations];
      const { delay, id, index } = payload as Parameters<typeof updateDestinationDelay>[0];
      const foundIndex: number = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );

      if (foundIndex !== -1) {
        const dest = newDestinations[foundIndex]!;
        const newPositions = [...dest.positions];

        newPositions[index]!.properties = {
          ...newPositions[index]!.properties,
          delay,
        };
        dest.positions = [...newPositions];
      }

      return {
        ...store,
        destinations: newDestinations,
      };
    },

    [TActionTypes.UPDATE_DESTINATION_NAME]: () => {
      const newDestinations: TDestination[] = [...store.destinations];
      const { id, index, name } = payload as Parameters<typeof updateDestinationName>[0];
      const foundIndex: number = newDestinations.findIndex(
        ({ id: destinationID }): boolean => destinationID === id,
      );

      if (foundIndex !== -1) {
        const dest = newDestinations[foundIndex]!;

        dest.positions[index]!.properties = {
          ...dest.positions[index]!.properties,
          name,
        };
      }

      return {
        ...store,
        destinations: newDestinations,
      };
    },
  };

  return (actions[type] || actions["DEFAULT"])();
};

export { reducer };
