"use client";
import { useState, useMemo } from "react";
import { BlockItem } from "@/lib/entities/blocks/BlockItem";
import { useCms } from "@/lib/hooks/useCms";
import { useCmsContext } from "@/lib/context/CmsContext";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";

export function BlockList() {
  const queryClient = useQueryClient();

  const { selectedPage } = useCmsContext();
  const { updateIndex } = useCms();
  const { usePageBlocks } = useCms();

  const effectivePageId = selectedPage?.id || "";
  const { data: blocks = [], isLoading } = usePageBlocks(effectivePageId);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const activeBlock = useMemo(() => {
    if (!activeId) return null;
    return blocks.find((block) => block.id === activeId) || null;
  }, [activeId, blocks]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const updatedBlocks = arrayMove([...blocks], oldIndex, newIndex).map(
      (block, index) => ({
        ...block,
        drag_index: index + 1,
      })
    );

    queryClient.setQueryData(["blocks", effectivePageId], updatedBlocks);

    const timeoutId = setTimeout(() => {
      updateIndex.mutate(updatedBlocks);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  if (isLoading) {
    return <div>Loading blocks...</div>;
  }

  if (!blocks || blocks.length === 0) {
    return <div>No blocks found for this page.</div>;
  }

  return (
    <div className="space-y-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <SortableContext
          items={blocks.map((block) => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {blocks.map((block) => (
              <BlockItem key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={false}>
          {activeBlock && (
            <div className="opacity-80">
              <BlockItem block={activeBlock} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
