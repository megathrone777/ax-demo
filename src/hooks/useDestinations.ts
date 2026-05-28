import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import type { TDestination } from "@/store";
import { AppContext } from "@/store";

import type { TUseDestinations } from "./types";

const useDestinations: TUseDestinations = () => {
  const {
    store: { destinations },
  } = useContext(AppContext);
  const { id } = useParams();

  return useMemo((): TDestination => {
    if (id) {
      const currentDestinations: TDestination = destinations.filter(
        ({ id: vehicleID }): boolean => `${vehicleID}` === id,
      )[0] || {
        id: +id!,
        name: "",
        positions: [],
        waypoints: [],
      };

      return currentDestinations;
    }

    return {
      id: +id!,
      name: "",
      positions: [],
      waypoints: [],
    };
  }, [id, destinations]);
};

export { useDestinations };
