"use client";
import { BlockItem } from "@/features/block/BlockItem";
import { useBlock } from "@/lib/hooks/useBlock";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useDnd } from "@/lib/hooks/useDnd";

export function BlockList() {
  const { selectedPage } = useCmsContext();
  const { filteredBlocks, updateIndex } = useBlock();

  const pageId = selectedPage?.id || "";
  const { data: blocks = [], isLoading } = filteredBlocks(pageId);

  const { activeBlock, renderDndContext } = useDnd({
    blocks,
    pageId,
    updateIndex,
  });

  if (isLoading) {
    return <div>Loading blocks...</div>;
  }

  if (!blocks || blocks.length === 0) {
    return <div>No blocks found for this page.</div>;
  }

  return (
    <div className="space-y-8">
      {renderDndContext(
        <div className="space-y-4">
          {blocks.map((block) => (
            <BlockItem key={block.id} block={block} />
          ))}
        </div>,
        
        activeBlock && (
          <div className="opacity-80">
            <BlockItem block={activeBlock} />
          </div>
        )
      )}
    </div>
  );
}