"use client";
import { BlockItem } from "@/cms/features/block/BlockItem";
import { DragHandle } from "@/cms/components/ui/drag-handle";
import { Button } from "@/cms/components/ui/button";
import { ConfirmationModal } from "@/cms/components/modals/ConfirmationModal";
import { EditBlockForm } from "@/cms/features/block/EditBlockForm";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { useSidebar } from "@/cms/components/ui/sidebar";
import { useSidebarContent } from "@/cms/lib/context/SidebarContext";
import { useBlock } from "@/cms/lib/hooks/useBlock";
import { useDnd } from "@/cms/lib/hooks/useDnd";
import { getIcon } from "@/cms/lib/utilities/GetIcon";
import { Draggable } from "@/cms/components/dnd/Draggable";

export function BlockList() {
  const { selectedPage, selectedBlock, setSelectedBlock } = useCmsContext();
  const { useFilteredBlocks, updateIndex, removeBlock } = useBlock();
  const { toggleSidebar, setOpen, open } = useSidebar();
  const { setBody, clear } = useSidebarContent();

  const page = selectedPage?.id || "";
  const { data: blocks = [], isLoading } = useFilteredBlocks(page);

  const { activeBlock, renderDndContext } = useDnd({
    blocks,
    page,
    updateIndex,
  });

  const trashIcon = getIcon("trash");
  const settingsIcon = getIcon("settings");

  const resetEditor = () => {
    clear();
    setOpen(false);
    setTimeout(() => {
      setSelectedBlock(null);
    }
    , 200);
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
  
  
  const renderBlock = (block: any) => (
    <Draggable id={block.id} key={block.id} className="relative group">
      {({ attributes, listeners }) => (
        <>
          {selectedBlock?.id === block.id ? (
            selectedBlock && <BlockItem block={selectedBlock} />
          ) : (
            <BlockItem block={block} />
          )}

          <div className="absolute bg-gray-200 py-4 rounded-lg bg-opacity-80 top-1/2 right-4 flex flex-col gap-10 items-center transform -translate-y-1/2">
            <Button
              icon={settingsIcon}
              variant="ghost"
              size="sm"
              onClick={() => handleEditClick(block)}
            />

            <DragHandle attributes={attributes} listeners={listeners} />

            <ConfirmationModal
              trigger={<Button icon={trashIcon} variant="ghost" size="sm" />}
              title="Delete Block"
              description="Are you sure you want to delete this block? This action cannot be undone."
              onConfirm={() => removeBlock(block.id)}
              cancelText="Cancel"
              confirmText="Delete"
            />
          </div>
        </>
      )}
    </Draggable>
  );

  return (
    <>
      {renderDndContext(
        <div className="space-y-4">
          {blocks.map((block) => renderBlock(block))}
        </div>,
        activeBlock && (
          <div className="opacity-90">{renderBlock(activeBlock)}</div>
        )
      )}
    </>
  );
}
