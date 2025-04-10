import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockProvider } from "@/lib/providers/BlockProvider";
import { EditBlockModal } from "@/components/modals/EditBlockModal";
import { DeleteBlockModal } from "@/components/modals/DeleteBlockModal";
import { DragHandle } from "@/components/ui/drag-handle";
import { Block } from "@/lib/types/blocks";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useFormContext } from "@/lib/hooks/useFormFontext";

export function BlockItem({ block }: { block: Block }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block?.id });

  const { selectedBlock } = useCmsContext();
  const { currentFormValues } = useFormContext();

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
            <DeleteBlockModal block={block} />
          </div>
        </>
      )}
    </div>
  );
}
