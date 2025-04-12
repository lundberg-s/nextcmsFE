import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockProvider } from "@/lib/providers/BlockProvider";
import { DragHandle } from "@/components/ui/drag-handle";
import { Block } from "@/lib/types/blocks";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useBlockPreview } from "@/lib/hooks/useBlockPreview";
import { Button } from "@/components/ui/button";
import { useBlockActions } from "./BlockActions";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { EditBlockForm } from "./EditBlockForm";
import { useSidebar } from "@/components/ui/sidebar";
import { useSidebarContent } from "@/lib/context/SidebarContext";
import { useIconSelector } from "@/lib/helpers/IconSelector";

export function BlockItem({ block }: { block: Block }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block?.id });
  const { toggleSidebar, setOpen, open } = useSidebar();
  const { setBody, setFooter, clear } = useSidebarContent();
  const { selectedBlock, setSelectedBlock } = useCmsContext();
  const { previewBlock } = useBlockPreview();
  const { deleteBlock } = useBlockActions();

  const forms = {
    editBlock:
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
      />,
  };

  const handleClick = () => {
    if (!block) return;

    setSelectedBlock(block);

    if (open && selectedBlock?.id === block?.id) {
      clear();
      setOpen(false);
      setSelectedBlock(null);
    } else {
      setBody(forms.editBlock);
      if (!open) {
        toggleSidebar();
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
      }}
      className="relative group"
    >
      {block && (
        <>
          {selectedBlock?.id === block.id ? (
            <>
              {previewBlock && <BlockProvider block={previewBlock} />}
            </>
          ) : (
            <BlockProvider block={block} />
          )}

          <div className="absolute top-1/2 right-4 flex flex-col gap-10 items-center transform -translate-y-1/2">

            <Button icon={useIconSelector("settings")} variant="ghost" size="sm" onClick={handleClick} />

            <DragHandle attributes={attributes} listeners={listeners} />

            <ConfirmationModal
              trigger={
                <Button icon={useIconSelector("trash")} variant="ghost" size="sm" />
              }
              title="Delete Block"
              description="Are you sure you want to delete this block? This action cannot be undone."
              onConfirm={() => deleteBlock(block.id)}
              cancelText="Cancel"
              confirmText="Delete"
            />

          </div>
        </>
      )}
    </div>
  );
}
