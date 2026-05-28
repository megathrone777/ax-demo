import { useContext, useMemo } from "react";
import { useParams } from "react-router";

import { AppContext } from "@/context";

const useDestination = (): TDestination => {
  const { id } = useParams();
  const {
    store: { destinations },
  } = useContext(AppContext);

  return useMemo((): TDestination => {
    if (id) {
      const currentDestinations: TDestination = destinations.filter(
        ({ id: vehicleId }): boolean => `${vehicleId}` === id,
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

export { useDestination };
