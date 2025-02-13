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
  const { updateBlockOrder } = useCms();


  return (
    <div className="space-y-8">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!over || active.id === over.id) return;

          const oldIndex = blocks.findIndex(
            (block) => block.id === active.id
          );
          const newIndex = blocks.findIndex(
            (block) => block.id === over.id
          );
          updateBlockOrder(arrayMove(blocks, oldIndex, newIndex));
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
