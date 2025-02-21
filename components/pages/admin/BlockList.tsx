"use client";
import { useState } from "react";
import { Block } from "@/types/blocks";
import { BlockItem } from "./BlockItem";
import { useCms } from "@/hooks/useCms";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface BlockListProps {
  blocks: Block[];
}

export function BlockList({ blocks }: BlockListProps) {
  const { updateIndex } = useCms();

  const [localBlocks, setLocalBlocks] = useState(blocks);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const updatedBlocks = arrayMove(localBlocks, oldIndex, newIndex).map(
      (block, index) => ({
        ...block,
        drag_index: index + 1,
      })
    );
    setLocalBlocks(updatedBlocks);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      updateIndex.mutate(updatedBlocks);
    }, 300);

    setTimeoutId(id);
  };

  return (
    <div className="space-y-8">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localBlocks}
          strategy={verticalListSortingStrategy}
        >
          {localBlocks.map((block) => (
            <BlockItem key={block.id} blockId={block.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
