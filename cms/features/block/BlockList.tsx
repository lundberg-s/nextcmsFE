"use client";
import { BlockItem } from "@/cms/features/block/BlockItem";
import { EditBlockForm } from "@/cms/features/block/EditBlockForm";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { useSidebar } from "@/cms/components/ui/sidebar";
import { useSidebarContent } from "@/cms/lib/context/SidebarContext";
import { useBlock } from "@/cms/lib/hooks/useBlock";
import { useDnd } from "@/cms/lib/hooks/useDnd";
import { Draggable } from "@/cms/components/dnd/Draggable";
import { useEffect } from "react";

export function BlockList() {
  const { selectedPage, selectedBlock, setSelectedBlock } = useCmsContext();
  const { useFilteredBlocks, updateIndex, removeBlock } = useBlock();
  const { toggleSidebar, setOpen, open } = useSidebar();
  const { setBody, clear } = useSidebarContent();

  const page = selectedPage?.id || '';
  const { data: blocks = [], isLoading } = useFilteredBlocks(page);

  useEffect(() => {
    if (blocks.length > 0) {
      console.log("blocks updated", blocks);
    }
  }, [blocks]);

  const { activeBlock, renderDndContext } = useDnd({
    blocks,
    page,
    updateIndex,
  });

  const resetEditor = () => {
    clear();
    setOpen(false);
    setTimeout(() => {
      setSelectedBlock(null);
    }, 200);
  };

  const openEditor = (block: Block) => {
    setSelectedBlock(block);
    setBody(
      <EditBlockForm
        id="edit-block-form"
        onSuccess={resetEditor}
        onCancel={resetEditor}
      />
    );
    if (!open) toggleSidebar();
  };

  const handleEditClick = (block: Block) => {
    const isEditorOpen = open;
    const isSameBlock = selectedBlock?.id === block.id;

    if (!block) return;

    if (isEditorOpen && isSameBlock) {
      resetEditor();
      return;
    }

    if (isEditorOpen && !isSameBlock) {
      setSelectedBlock(block);
      return;
    }

    openEditor(block);
  };

  if (isLoading) {
    return <div>Loading blocks...</div>;
  }

  if (!blocks || blocks.length === 0) {
    return <div>No blocks found for this page.</div>;
  }

  return (
    <>
      {renderDndContext(
        <div className="space-y-4">
          {blocks.map((block) => {
            return (
              <Draggable id={block.id} key={block.id} className="relative group">
                {({ attributes, listeners }) => {
                  const isEditing = selectedBlock?.id === block?.id

                  const blockItemProps = {
                    onEdit: () => handleEditClick(block),
                    onDelete: () => removeBlock(block.id),
                    attributes,
                    listeners,
                  };
                  return (
                    <>
                      {isEditing ? (
                        <BlockItem
                          block={selectedBlock}
                          {...blockItemProps}
                        />
                      ) : (
                        <BlockItem
                          block={block}
                          {...blockItemProps}
                        />
                      )}
                    </>
                  );
                }}
              </Draggable>
            );
          })}
        </div>,
        activeBlock && (
          <BlockItem
            block={activeBlock}
          />
        )
      )}
    </>
  );
}