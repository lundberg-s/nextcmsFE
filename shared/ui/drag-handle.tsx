import { GripVertical } from "lucide-react";

interface DragHandleProps {
  attributes?: Record<string, any>;
  listeners?: Record<string, any>;
}

export function DragHandle({ attributes, listeners }: DragHandleProps) {
  return (
    <div
      {...listeners}
      {...attributes}
      className="cursor-grab p-1.5 hover:bg-accent rounded-md"
    >
      <GripVertical size={20} />
    </div>
  );
}