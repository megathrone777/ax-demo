import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import type { TBoundary } from "@/store";
import { AppContext } from "@/store";

import type { TUseBoundaries } from "./types";

const useBoundaries: TUseBoundaries = () => {
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

export { useBoundaries };
