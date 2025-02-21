import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockProvider } from "@/utils/BlockProvider";
import { BlockSettings } from "@/components/wrappers/BlockSettings";
import { EditBlockModal } from "@/components/modals/EditBlockModal";
import { DeleteBlockModal } from "@/components/modals/DeleteBlockModal";
import { Block } from "@/types/blocks";
import { DragHandle } from "@/components/ui/drag-handle";
import { useCms } from "@/hooks/useCms";

export function BlockItem({ blockId }: { blockId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: blockId });

  const block = useCms().getBlockById(blockId);

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
          <BlockProvider block={block} />
          
          <BlockSettings>
            <EditBlockModal block={block} />
            <DragHandle attributes={attributes} listeners={listeners} />
            <DeleteBlockModal block={block} />
          </BlockSettings>
        </>
      )}
    </div>
  );
}
