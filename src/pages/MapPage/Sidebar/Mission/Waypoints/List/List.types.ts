import type { useDestinations } from "@/hooks";

import type { DraggableProvided } from "@hello-pangea/dnd";

export type TPositions = ReturnType<typeof useDestinations>["positions"];
export type TRowProps = { id: number; positions: TPositions };

export type TDraggableItemProps = {
  index: number;
  isDragging: boolean;
  item: TPositions[0];
  provided: DraggableProvided;
  style: React.CSSProperties;
};
