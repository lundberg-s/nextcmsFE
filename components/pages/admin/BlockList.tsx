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
  const { updateBlockIndex } = useCms();

  return (
    <div className="space-y-8">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!over || active.id === over.id) return;

          const oldIndex = blocks.findIndex((block) => block.id === active.id);
          const newIndex = blocks.findIndex((block) => block.id === over.id);

          if (oldIndex === -1 || newIndex === -1) return;

          const updatedBlocks = arrayMove(blocks, oldIndex, newIndex).map(
            (block, index) => ({
              ...block,
              drag_index: index,
            })
          );

          updateBlockIndex(updatedBlocks);
        }}
      >
        <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <BlockItem key={block.id} block={block} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
