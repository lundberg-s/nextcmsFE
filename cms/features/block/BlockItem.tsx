import { BlockProvider } from "@/cms/lib/providers/BlockProvider";
import { DragHandle } from "@/cms/components/ui/drag-handle";
import { Block } from "@/cms/lib/types/blocks";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { useBlockPreview } from "@/cms/lib/context/BlockPreviewContext";
import { Button } from "@/cms/components/ui/button";
import { ConfirmationModal } from "@/cms/components/modals/ConfirmationModal";
import { EditBlockForm } from "./EditBlockForm";
import { useSidebar } from "@/cms/components/ui/sidebar";
import { useSidebarContent } from "@/cms/lib/context/SidebarContext";
import { getIcon } from "@/cms/lib/utilities/GetIcon";
import { useBlock } from "@/cms/lib/hooks/useBlock";
import { Draggable } from "@/cms/components/dnd/Draggable";

export function BlockItem({ block }: { block: Block }) {
  const { toggleSidebar, setOpen, open } = useSidebar();
  const { setBody, clear } = useSidebarContent();
  const { selectedBlock, setSelectedBlock } = useCmsContext();
  const { previewBlock } = useBlockPreview();
  const { removeBlock } = useBlock();

  const trashIcon = getIcon("trash");
  const settingsIcon = getIcon("settings");

  const forms = {
    editBlock: (
      <EditBlockForm
        id="edit-block-form"
        onSuccess={() => {
          setOpen(false);
          setSelectedBlock(null);
        }}
        onCancel={() => {
          setOpen(false);
          setSelectedBlock(null);
        }}
      />
    ),
  };

  const handleClick = () => {
    if (!block) return;
    if (open && selectedBlock?.id === block?.id) {
      clear();
      setOpen(false);
      setSelectedBlock(null);
      return;
    }
    if (selectedBlock) clear();

    setSelectedBlock(block);
    setBody(forms.editBlock);

    if (!open) toggleSidebar();
  };

  return (
    <Draggable id={block.id} className="relative group">
      {({ attributes, listeners }) => (
        <>
          {block && (
            <>
              {selectedBlock?.id === block.id ? (
                <>{previewBlock && <BlockProvider block={previewBlock} />}</>
              ) : (
                <BlockProvider block={block} />
              )}

              <div className="absolute top-1/2 right-4 flex flex-col gap-10 items-center transform -translate-y-1/2">
                <Button
                  icon={settingsIcon}
                  variant="ghost"
                  size="sm"
                  onClick={handleClick}
                />

                <DragHandle attributes={attributes} listeners={listeners} />

                <ConfirmationModal
                  trigger={
                    <Button icon={trashIcon} variant="ghost" size="sm" />
                  }
                  title="Delete Block"
                  description="Are you sure you want to delete this block? This action cannot be undone."
                  onConfirm={() => removeBlock(block.id)}
                  cancelText="Cancel"
                  confirmText="Delete"
                />
              </div>
            </>
          )}
        </>
      )}
    </Draggable>
  );
}
