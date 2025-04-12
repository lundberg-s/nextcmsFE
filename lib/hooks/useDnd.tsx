import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
import { Block } from "@/lib/types/blocks";

interface useDndProps {
  blocks: Block[];
  pageId: string;
  updateIndex: (blocks: Block[]) => void;
}

export function useDnd({
  blocks,
  pageId,
  updateIndex,
}: useDndProps) {
  const queryClient = useQueryClient();
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

    queryClient.setQueryData(["blocks", pageId], updatedBlocks);

    setTimeout(() => {
      updateIndex(updatedBlocks);
    }, 300);
  };

  const renderDndContext = (children: React.ReactNode, overlay: React.ReactNode) => (
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
        {children}
      </SortableContext>

      <DragOverlay adjustScale={false}>
        {activeId && overlay}
      </DragOverlay>
    </DndContext>
  );

  return {
    activeId,
    activeBlock,
    sensors,
    handleDragStart,
    handleDragEnd,
    renderDndContext,
  };
}