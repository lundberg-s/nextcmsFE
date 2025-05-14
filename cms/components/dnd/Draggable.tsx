import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface DraggableProps {
  id: string;
  children: (props: { attributes: any; listeners: any }) => React.ReactNode;
  className?: string;
}

export function Draggable({ id, children, className }: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={className}>
      {children({
        attributes,
        listeners,
      })}
    </div>
  );
}
