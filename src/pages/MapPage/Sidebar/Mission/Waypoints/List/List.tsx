import React from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { useAppContext, useDestination } from "@/hooks";

import { Item } from "./Item";

import { itemClass } from "./List.css";

import type {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
  DroppableProvided,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import type { TDraggableItemProps } from "./List.types";

const getStyle = ({
  draggableProps,
  style,
}: {
  draggableProps: DraggableProvidedDraggableProps;
  style: React.CSSProperties;
}): React.CSSProperties => ({
  ...draggableProps.style,
  ...style,
});

const DraggableItem: React.FC<TDraggableItemProps> = ({
  index,
  isDragging,
  item: { geometry },
  provided: { draggableProps, dragHandleProps, innerRef },
  style,
}) => (
  <div
    {...draggableProps}
    {...dragHandleProps}
    className={itemClass[isDragging ? "dragging" : "default"]}
    ref={innerRef}
    style={getStyle({ draggableProps, style })}
  >
    <Item
      {...{ index }}
      latitude={geometry.coordinates[1]!}
      longitude={geometry.coordinates[0]!}
    />
  </div>
);

const List: React.FC = () => {
  const { actions } = useAppContext();
  const { id, positions } = useDestination();

  const handleDragEnd: OnDragEndResponder = ({ destination, source }): void => {
    if (!destination) return;

    actions.swapDestinations({
      endIndex: destination.index,
      id,
      startIndex: source.index,
    });
  };

  return (
    <DragDropContext
      autoScrollerOptions={{ disabled: false }}
      onDragEnd={handleDragEnd}
    >
      <Droppable
        droppableId={`${id}-droppable`}
        key={`${id}-droppable`}
      >
        {({
          droppableProps,
          innerRef,
          placeholder,
        }: DroppableProvided): React.ReactElement<HTMLElement> => (
          <div
            ref={innerRef}
            style={{ maxHeight: 160, overflowY: "auto" }}
            {...droppableProps}
          >
            {positions.map<React.ReactElement>((item: TDestinationPosition, index: number) => {
              const key = `${item.geometry.coordinates[0]}-${item.geometry.coordinates[1]}`;

              return (
                <Draggable
                  key={key}
                  {...{ index }}
                  draggableId={key}
                >
                  {(dragProvided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => (
                    <DraggableItem
                      {...{ isDragging, item }}
                      provided={dragProvided}
                      style={{}}
                      {...{ index }}
                    />
                  )}
                </Draggable>
              );
            })}

            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { List };
