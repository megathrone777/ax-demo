import { useContext, useMemo } from "react";
import { useParams } from "react-router";

import { AppContext } from "@/context";

const useBoundary = (): TBoundary => {
  const {
    store: { boundaries },
  } = useContext(AppContext);
  const { id } = useParams();

  return useMemo((): TBoundary => {
    if (id) {
      const currentBoundary: TBoundary = boundaries.find(
        ({ id: boundaryID }): boolean => `${boundaryID}` === id,
      ) || {
        id: +id!,
        polygons: [],
      };

      return currentBoundary;
    }

    return {
      id: +id!,
      polygons: [],
    };
  }, [id, boundaries]);
};

export { useBoundary };
