import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockProvider } from "@/lib/providers/BlockProvider";
import { EditBlockModal } from "@/components/modals/EditBlockModal";
import { DeleteBlockModal } from "@/components/modals/DeleteBlockModal";
import { DragHandle } from "@/components/ui/drag-handle";
import { Block } from "@/lib/types/blocks";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useFormContext } from "@/lib/hooks/useFormFontext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useBlockActions } from "./BlockActions";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";

export function BlockItem({ block }: { block: Block }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block?.id });

  const { selectedBlock } = useCmsContext();
  const { currentFormValues } = useFormContext();
  const { deleteBlock } = useBlockActions();

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="relative group"
    >
      {block && (
        <>
          {selectedBlock?.id === block.id ? (
            <>
              {currentFormValues && <BlockProvider block={currentFormValues} />}
            </>
          ) : (
            <BlockProvider block={block} />
          )}

          <div className="absolute top-1/2 right-4 flex flex-col gap-10 items-center transform -translate-y-1/2">
            <EditBlockModal block={block} />
            <DragHandle attributes={attributes} listeners={listeners} />
            <ConfirmationModal
              trigger={<Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>}
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
