import type React from "react";
import type { DraggableProvided } from "@hello-pangea/dnd";

export type TDraggableItemProps = {
  index: number;
  isDragging: boolean;
  item: TDestinationPosition;
  provided: DraggableProvided;
  style: React.CSSProperties;
};
