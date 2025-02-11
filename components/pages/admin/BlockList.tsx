"use client";
import { useState } from "react";
import { Block } from "@/types/blocks";
import { BlockItem } from "./BlockItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface BlockListProps {
  blocks: Block[];
}

export function BlockList({ blocks: initialBlocks }: BlockListProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  return (
    <div className="space-y-8">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!over || active.id === over.id) return;

          setBlocks((prevBlocks) => {
            const oldIndex = prevBlocks.findIndex(
              (block) => block.id === active.id
            );
            const newIndex = prevBlocks.findIndex(
              (block) => block.id === over.id
            );
            return arrayMove(prevBlocks, oldIndex, newIndex);
          });
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
