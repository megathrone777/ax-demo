import { TActionTypes } from "./App.types";

import type React from "react";
import type { TActions, TAppStore, TActionUnion } from "./App.types";

const actions: TActions = {
  [TActionTypes.ADD_BOUNDARY]: (store, { id, polygon }) => {
    const boundaries = [...store.boundaries];
    const foundIndex: number = boundaries.findIndex(
      ({ id: boundaryID }): boolean => boundaryID === id,
    );

    if (foundIndex !== -1) {
      const foundBoundary = boundaries[foundIndex]!;

      foundBoundary.polygons = [...foundBoundary.polygons, polygon];
    }

    boundaries.push({
      id,
      polygons: [polygon],
    });

    return {
      ...store,
      boundaries,
    };
  },

  [TActionTypes.ADD_DESTINATION]: (store, destination) => {
    const destinations = [...store.destinations];
    const { id, positions } = destination;
    const foundIndex: number = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );

    if (foundIndex !== -1) {
      destinations[foundIndex]!.positions = [...positions];

      return {
        ...store,
        destinations,
      };
    }

    destinations.push(destination);

    return {
      ...store,
      destinations,
    };
  },

  [TActionTypes.ADD_PERSON]: (store, person) => ({
    ...store,
    persons: [...store.persons, person],
  }),

  [TActionTypes.ATTACH_DESTINATIONS]: (store, { coordinates, id }) => {
    const destinations = [...store.destinations];
    const foundIndex: number = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );

    if (foundIndex !== -1) {
      const newPositions = coordinates.map<TDestinationPosition>((position) => ({
        geometry: {
          coordinates: position,
          type: "Point",
        },
        properties: {
          delay: "0",
          name: "",
        },
        type: "Feature",
      }));

      if (destinations[foundIndex].positions) {
        destinations[foundIndex] = {
          ...destinations[foundIndex],
          positions: [...destinations[foundIndex].positions, ...newPositions],
        };
      }
    }

    return {
      ...store,
      destinations,
    };
  },

  [TActionTypes.CLEAR_DESTINATIONS]: (store, id) => {
    const boundaries = [...store.boundaries];
    const destinations = [...store.destinations];
    const foundIndex = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );
    const foundIndex2 = boundaries.findIndex(({ id: boundaryId }): boolean => boundaryId === id);

    if (foundIndex !== -1) {
      destinations[foundIndex].positions = [];
    }

    if (foundIndex2 !== -1) {
      boundaries[foundIndex2].polygons = [];
    }

    return {
      ...store,
      boundaries,
      destinations,
    };
  },

  [TActionTypes.DEFAULT]: (store) => store,

  [TActionTypes.DELETE_BOUNDARY]: (store, { id, polygonId }) => {
    const boundaries = [...store.boundaries];
    const foundIndex: number = boundaries.findIndex(
      ({ id: boundaryId }): boolean => boundaryId === id,
    );

    if (foundIndex !== -1) {
      boundaries[foundIndex] = {
        ...boundaries[foundIndex],
        polygons: [...boundaries[foundIndex].polygons].filter(
          ({ id: pid }): boolean => pid !== polygonId,
        ),
      };
    }

    return {
      ...store,
      boundaries,
    };
  },

  [TActionTypes.DELETE_DESTINATION]: (store, { id, index }) => {
    const destinations = [...store.destinations];
    const foundIndex = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );

    if (foundIndex !== -1) {
      destinations[foundIndex] = {
        ...destinations[foundIndex],
        positions: [...destinations[foundIndex].positions.splice(index, 1)],
      };
    }

    return {
      ...store,
      destinations,
    };
  },

  [TActionTypes.SET_AREA]: (store, area) => ({
    ...store,
    area,
  }),

  [TActionTypes.SET_CURRENT_IP]: (store, currentIP) => ({
    ...store,
    currentIP,
  }),

  [TActionTypes.SWAP_DESTINATIONS]: (store, { endIndex, id, startIndex }) => {
    const destinations = [...store.destinations];
    const foundIndex: number = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );

    if (foundIndex !== -1) {
      const [removedCoordinates] = [...destinations[foundIndex].positions].splice(startIndex, 1);

      destinations[foundIndex].positions = [...destinations[foundIndex].positions].splice(
        endIndex,
        0,
        removedCoordinates!,
      );
    }

    return {
      ...store,
      destinations,
    };
  },

  [TActionTypes.UPDATE_BOUNDARY]: (store, { coordinates, id, polygonId }) => {
    const boundaries = [...store.boundaries];
    const foundIndex: number = boundaries.findIndex(
      ({ id: boundaryId }): boolean => boundaryId === id,
    );

    if (foundIndex !== -1) {
      const newPolygons = [...boundaries[foundIndex].polygons];
      const polygonIndex: number = newPolygons.findIndex(
        ({ id: pid }): boolean => pid === polygonId,
      );

      newPolygons[polygonIndex].geometry = {
        ...newPolygons[polygonIndex].geometry,
        coordinates,
      };
      boundaries[foundIndex].polygons = [...newPolygons];
    }

    return {
      ...store,
      boundaries,
    };
  },

  [TActionTypes.UPDATE_DESTINATION]: (store, { coordinates, id }) => {
    const destinations = [...store.destinations];
    const foundIndex: number = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );

    if (foundIndex !== -1) {
      const newPositions = [...destinations[foundIndex].positions].map<TDestinationPosition>(
        (position, index: number) => ({
          ...position,
          geometry: {
            coordinates: coordinates[index]!,
            type: "Point",
          },
        }),
      );

      destinations[foundIndex].positions = [...newPositions];
    }

    return {
      ...store,
      destinations,
    };
  },

  [TActionTypes.UPDATE_DESTINATION_DELAY]: (store, { delay, id, index }) => {
    const destinations = [...store.destinations];
    const foundIndex: number = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );

    if (foundIndex !== -1) {
      const newPositions = [...destinations[foundIndex].positions];

      newPositions[index].properties = {
        ...newPositions[index].properties,
        delay,
      };
      destinations[foundIndex].positions = [...newPositions];
    }

    return {
      ...store,
      destinations,
    };
  },

  [TActionTypes.UPDATE_DESTINATION_NAME]: (store, { id, index, name }) => {
    const destinations = [...store.destinations];
    const foundIndex: number = destinations.findIndex(
      ({ id: destinationId }): boolean => destinationId === id,
    );

    if (foundIndex !== -1) {
      destinations[foundIndex].positions[index].properties = {
        ...destinations[foundIndex].positions[index].properties,
        name,
      };
    }

    return {
      ...store,
      destinations,
    };
  },
};

const AppReducer: React.Reducer<TAppStore, TActionUnion> = (store, { payload, type }) =>
  (actions[type] as (store: TAppStore, payload: never) => TAppStore)(store, payload as never);

export { AppReducer };
